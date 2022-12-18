// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtzBdBaJfYTN-aO4LdmKXqUZwdkm0ophY",
  authDomain: "data-room-react.firebaseapp.com",
  projectId: "data-room-react",
  storageBucket: "data-room-react.appspot.com",
  messagingSenderId: "782781380428",
  appId: "1:782781380428:web:08f060378c67f0023d01e9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()