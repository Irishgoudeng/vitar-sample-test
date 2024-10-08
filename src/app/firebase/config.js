/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth"; // Import browserLocalPersistence
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

auth
  .setPersistence(browserLocalPersistence)
  .then(() => {
    // Persistence is set successfully
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { app, auth, db };
