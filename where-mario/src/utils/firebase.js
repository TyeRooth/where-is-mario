// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHN32UW2gEH2C1eBw1y-lORvgJ8QEUa4Q",
  authDomain: "where-s-mario.firebaseapp.com",
  projectId: "where-s-mario",
  storageBucket: "where-s-mario.appspot.com",
  messagingSenderId: "940297149638",
  appId: "1:940297149638:web:5884bd251ee57a70e8cbc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);