import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVc0CaKTkJpaNSkqCnvh5VFRc4B2tl8Qo",
  authDomain: "pruebafirebase-54a06.firebaseapp.com",
  projectId: "pruebafirebase-54a06",
  storageBucket: "pruebafirebase-54a06.appspot.com",
  messagingSenderId: "58580326593",
  appId: "1:58580326593:web:d49b4fdd5f2455bdb41c40",
  measurementId: "G-HV5MBLPVRT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
