import { initializeApp } from "firebase/app";
import {
  enableMultiTabIndexedDbPersistence,
  getFirestore,
} from "firebase/firestore";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);

export const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);
enableMultiTabIndexedDbPersistence(db).catch((err) => {
  console.error("Failed to enable IndexedDB persistence", err);
});

export const auth = getAuth();
// connectAuthEmulator(auth, "http://localhost:9099");
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Failed to enable auth persistence", err);
});
