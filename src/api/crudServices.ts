import { addDoc, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from './firebaseServices'

interface Data {
  taskName: string;
  taskType: string;
  taskDate: string;
  taskTime: number;  
}

interface DataDelete {
  taskName: string;
  taskType: string;
  taskTime: number; 
  id: string; 
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

export async function deleteRecord(record: DataDelete){  
  const myCollection = collection(db, 'tasks');
  const docRef = await doc(myCollection, record.id);  
  deleteDoc(docRef)
  console.log("Dokument deleted with ID:", docRef.id);
}

