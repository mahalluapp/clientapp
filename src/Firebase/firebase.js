// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA14auYHSft_6DDNbj8HSiLMI1D26DzDQs",
  authDomain: "kcpmahallu.firebaseapp.com",
  projectId: "kcpmahallu",
  storageBucket: "kcpmahallu.appspot.com",
  messagingSenderId: "32729517475",
  appId: "1:32729517475:web:33e8f12b37d1b3af4e5e16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);