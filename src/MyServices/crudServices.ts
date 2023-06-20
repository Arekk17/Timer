import { addDoc, collection, getDocs } from "firebase/firestore";
import db from './firebaseServices'

interface Data {
  taskName: string;
  taskType: string;
  taskTime: number;
}

export async function getData() {
  const myCollection = collection(db, "tasks");
  const myDocuments = await getDocs(myCollection)

  const result = myDocuments.docs.map((doc) =>{
    return {id: doc.id, ...doc.data()}
  })
  return result
}

export async function addData(data: Data) {
  try {
    const myCollection = collection(db, "tasks");
    await addDoc(myCollection, data);
  } catch (error) {
    console.error("Wystąpił błąd podczas dodawania danych do Firebase:", error);
  }
}

