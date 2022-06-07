import { initializeApp, getApp, cert } from "firebase-admin";
import myCredentials from "./credentials.js";
import { getFirestore } from "firebase-admin/firestore";

export default function connectDb() {
  if (getApps().length === 0) {
    // are we already connected?
    initializeApp({
      // if not, connect
      credential: cert(myCredentials),
    });
  } // now we have access to the database
  return getFirestore();
}
