import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBpvoo3UX_ihxt3yHY95DWqJHk6a2EXsIc",
    authDomain: "farmfeed-7b9f2.firebaseapp.com",
    projectId: "farmfeed-7b9f2",
    storageBucket: "farmfeed-7b9f2.firebasestorage.app",
    messagingSenderId: "372930664551",
    appId: "1:372930664551:web:15a1d384fd55b3291ddcc2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
