import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDLbq43QKx5xrCySOmfcKFPMeZ_aXJz6Wo",
    authDomain: "farmfeedig-web.firebaseapp.com",
    projectId: "farmfeedig-web",
    storageBucket: "farmfeedig-web.firebasestorage.app",
    messagingSenderId: "937550255713",
    appId: "1:937550255713:web:0942ed63b9f5cb8f0b7c20"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
