import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDWBTQY6nYh7BI3kSTMDKC6-yxqO56l6WM",
  authDomain: "topicos-f3ecb.firebaseapp.com",
  projectId: "topicos-f3ecb",
  storageBucket: "topicos-f3ecb.appspot.com",
  messagingSenderId: "557252470745",
  appId: "1:557252470745:web:bd34784382e6078ced5bc8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)
export {db}