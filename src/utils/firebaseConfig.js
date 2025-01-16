import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQHIQ4dYvXUHf3lm3_1YOfgvJWYfsYDwE",
  authDomain: "database-9e197.firebaseapp.com",
  projectId: "database-9e197",
  storageBucket: "database-9e197.appspot.com",
  messagingSenderId: "1054187190513",
  appId: "1:1054187190513:web:ce6c3f37e41f6469dfd150",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);