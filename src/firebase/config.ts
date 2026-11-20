import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// All values come from your .env file (see .env.example).
// Get these from the Firebase Console: Project Settings > General > Your apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// True once real values are filled into .env. Lets the rest of the app
// detect "not configured yet" and show a helpful message instead of
// crashing with a raw Firebase error.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

// Only initialize Firebase if config actually looks real — calling
// initializeApp with empty strings throws and takes down the whole app.
export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;

// Note: Firebase Storage is intentionally not used here — as of 2026,
// Cloud Storage for Firebase requires the paid Blaze plan (a linked
// billing card). Product images are instead uploaded to Cloudinary,
// which has a genuinely free tier. See src/lib/cloudinary.ts.
