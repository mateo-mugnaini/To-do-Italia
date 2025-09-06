// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_FIREBASE,
  authDomain: import.meta.env.VITE_AUTHDOMAIN_FIREBASE,
  projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_STORAGE_FIREBASE,
  messagingSenderId: import.meta.env.VITE_MESSAGING_ID_FIREBASE,
  appId: import.meta.env.VITE_APP_ID_FIREBASE,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
