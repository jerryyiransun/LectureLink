import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDUvV2lnxj38TxqSJssTjstcazA81Xwxvc",
  authDomain: "lecturelink-411820.firebaseapp.com",
  projectId: "lecturelink-411820",
  storageBucket: "lecturelink-411820.appspot.com",
  messagingSenderId: "843165885916",
  appId: "1:843165885916:web:bdaea93b15418f9fee9b19",
  measurementId: "G-GCRZSDY29C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
