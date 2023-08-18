// Import the functions you need from the SDKs you need
import { FirebaseOptions, getApps, getApp, initializeApp } from "firebase/app";
import { Auth } from "firebase/auth";
import {
  getAuth,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Avoiding multiple instances of Firebase unnecesarily
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth();

export { app, auth };
