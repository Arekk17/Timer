import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB87mlDZQHx4KA6wxwy0GBay6SLJjRHaXg",
  authDomain: "timer-dcdc8.firebaseapp.com",
  projectId: "timer-dcdc8",
  storageBucket: "timer-dcdc8.appspot.com",
  messagingSenderId: "493618537423",
  appId: "1:493618537423:web:e8dbe4572d5a9985be28ba",
  measurementId: "G-8TYN7PK9XV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;