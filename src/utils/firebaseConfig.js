import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfm_5ez5MFioIZ3A2aEHcWUB-lcp5s5Fk",
  authDomain: "lecoqfrench-e8982.firebaseapp.com",
  projectId: "lecoqfrench-e8982",
  storageBucket: "lecoqfrench-e8982.firebasestorage.app",
  messagingSenderId: "993059747578",
  appId: "1:993059747578:web:a8945efcf1b1cf49213b43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);