import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import fetch from "node-fetch-commonjs";
import { z } from "zod";
import { ryEvent } from "./ryTypes";

const BodySchema = z.object({
  cookie: z.string().min(1),
});

export const syncRyEvents = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method not allowed");
      return;
    }
    const body = BodySchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).send(body.error.toString());
      return;
    }

    initializeApp({
      credential: applicationDefault(),
    });

    const db = getFirestore();
    const collectionRef = db.collection("appointments");

    const response = await fetch(
      "https://community.remoteyear.com/api/web/v1/spaces/8097043/event_instances/upcoming?page=1&per_page=50",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "accept-language": "en-GB,en;q=0.8",
          cookie:
            "messagesUtk=162889daa6834c0fb78eb7a059f1a00b; cookie_notified=true; _session_id=dfb1ae9e2bfb3128c7d542426c90d679; mp_e90d586adb1203ba22c2b3b862e286b0_mixpanel=%7B%22distinct_id%22%3A%20%2217fb2375e72c69-015b13955c8a2d-113f645d-1ea000-17fb2375e73de8%22%2C%22%24device_id%22%3A%20%2217fb2375e72c69-015b13955c8a2d-113f645d-1ea000-17fb2375e73de8%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%7D; locale=; _y=a1380b14-7ab1-4c93-b2af-1404cf1d8250; _shopify_y=a1380b14-7ab1-4c93-b2af-1404cf1d8250; u_source=manual; u_medium=; u_term=; u_content=; u_campaign=; u_from=; u_time=1667843211; u_lp=%2Fposts%2Fyuri-loves-3-its-time-to-start-thinking-about-our-capetown-adventure-%25F0%259F%2598%2586when-would-you-prefer-to-have-the-webinar-ps-poll-closes-eod-tuesday-8th; _cfuvid=.wJRbbGau4qQvpVN1uQ0BKNjPWfcO.8Ts2OTrgSUa8Q-1667843212131-0-604800000; CSRF-TOKEN=Ms2BaEYQpXC9TilCo2dhFfy7OOPE5yhTdmLhN5l%2F0ek0n51mDBL%2FbYnZs%2F6INpy8qsGg%2Fbakz5j5bsRzbeW94A%3D%3D",
        },
      }
    );

    if (!response.ok) {
      console.error(
        `Unexpected response: ${response.status} ${response.statusText}`,
        await response.json()
      );
      res.status(500).send("Internal server error");
      return;
    }

    const raw = await response.json();
    if (!Array.isArray(raw)) {
      console.error("Unexpected response", raw);
      res.status(500).send("Internal server error");
      return;
    }

    const batch = db.batch();
    const fails = [];
    for (const datum of raw) {
      const parsed = ryEvent.safeParse(datum);
      if (parsed.success) {
        const domainEvent = mapRyEventToDomain(parsed.data);
        const docRef = collectionRef.doc(parsed.data.id);
        batch.set(docRef, domainEvent, { merge: true });
      } else {
        fails.push(parsed.error);
      }
    }
    await batch.commit();

    res.status(200).send({ total: raw.length, failed: fails.length, fails });
  });

// Firebase-functions fails to deploy if we import a workspace dependency.
const mapRyEventToDomain = (event: ryEvent) => ({
  title: event.post.title,
  description: event.post.content.description,
  startDate: new Date(event.starts_at),
  endDate: new Date(event.ends_at),
  allDay: false,
  external: true,
  externalUrl: `https://community.remoteyear.com/events/${event.post.slug}?instance_index=${event.post.event_instance.index}`,
});
