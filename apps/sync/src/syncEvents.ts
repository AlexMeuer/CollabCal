import { getFirestore } from "firebase-admin/firestore";
import fetch from "node-fetch-commonjs";
import { ryEvent } from "./ryTypes";
import TurndownService = require("turndown");

export const syncRyEvents = async (ryCookie: string): Promise<any> => {
  const db = getFirestore();
  const collectionRef = db.collection("appointments");

  const response = await fetch(
    "https://community.remoteyear.com/api/web/v1/spaces/8097043/event_instances/upcoming?page=1&per_page=50",
    {
      headers: {
        cookie: ryCookie,
      },
    }
  );

  if (!response.ok) {
    console.error(
      `Unexpected response: ${response.status} ${response.statusText}`,
      await response.json()
    );
    throw new Error(
      `Unexpected response: ${response.status} ${response.statusText}`
    );
  }

  const raw = await response.json();
  if (!Array.isArray(raw)) {
    console.error("Unexpected response", raw);
    throw new Error("Unexpected response body from RemoteYear.");
  }

  const turndownService = new TurndownService();

  const batch = db.batch();
  const fails = [];
  for (const datum of raw) {
    const parsed = ryEvent.safeParse(datum);
    if (parsed.success) {
      const domainEvent = mapRyEventToDomain(parsed.data, turndownService);
      const docRef = collectionRef.doc(parsed.data.id);
      batch.set(docRef, domainEvent, { merge: true });
    } else {
      fails.push(parsed.error);
    }
  }
  await batch.commit();

  return { total: raw.length, failed: fails.length, fails };
};

// Firebase-functions fails to deploy if we import a workspace dependency.
const mapRyEventToDomain = (
  event: ryEvent,
  turndownService: TurndownService
) => ({
  title: event.post.title,
  description: turndownService.turndown(event.post.content.description),
  startDate: new Date(event.starts_at),
  endDate: new Date(event.ends_at),
  allDay: false,
  external: true,
  externalUrl: `https://community.remoteyear.com/events/${event.post.slug}?instance_index=${event.post.event_instance.index}`,
});
