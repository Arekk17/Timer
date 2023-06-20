import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRKUcWQCMirs4PwACxOdQCZoXZvWU7DMs",
  authDomain: "timer-6eb09.firebaseapp.com",
  projectId: "timer-6eb09",
  storageBucket: "timer-6eb09.appspot.com",
  messagingSenderId: "812584187698",
  appId: "1:812584187698:web:4fb24e8afca1a115fe492b",
  measurementId: "G-4Y8D49D2RJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;