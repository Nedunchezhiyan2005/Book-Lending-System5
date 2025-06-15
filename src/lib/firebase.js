// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnvZM65Dtp0nuhvA-NTO9zDub29f6E8vU",
  authDomain: "library-book-lending-system.firebaseapp.com",
  projectId: "library-book-lending-system",
  storageBucket: "library-book-lending-system.appspot.com",
  messagingSenderId: "44095976833",
  appId: "1:44095976833:web:ed52d1e19d9b68e2ad2480",
  measurementId: "G-PYV1E5JL3X",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
