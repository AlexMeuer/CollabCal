import * as functions from "firebase-functions";

export const ry = functions
  .region("europe-west1")
  .https.onRequest((req, res) => {
    const auth = req.headers.authorization;
    res.send({ message: "Hello from Firebase!", auth: auth || "no auth" });
  });
