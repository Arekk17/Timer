import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb07oort0xCP9L4GL-M5JlQCdVv5aeuH0",
  authDomain: "timer-b4b61.firebaseapp.com",
  projectId: "timer-b4b61",
  storageBucket: "timer-b4b61.appspot.com",
  messagingSenderId: "125627424224",
  appId: "1:125627424224:web:09d9dbf393650df1485f85",
  measurementId: "G-FPYD8W3901"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;