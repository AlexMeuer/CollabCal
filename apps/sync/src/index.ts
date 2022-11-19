import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { z } from "zod";
import { syncRyEvents as syncRyEventsImpl } from "./syncEvents";

export const syncRyEvents = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method not allowed");
      return;
    }

    const BodySchema = z.object({
      cookie: z.string().min(1),
    });

    const body = BodySchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).send(body.error.toString());
      return;
    }

    initializeApp({
      credential: applicationDefault(),
    });

    const result = await syncRyEventsImpl(body.data.cookie);
    res.status(200).send(result);
  });

export const createUserDoc = functions
  .auth
  .user()
  .onCreate(async (user) => {
    initializeApp({
      credential: applicationDefault(),
    });
    await getFirestore().collection("users").doc(user.uid).set({
      name: user.displayName,
      photoURL: user.photoURL,
    });
  });
