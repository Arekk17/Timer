import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import db from './firebaseServices';

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

interface DataUpdate {
  taskName: string;
  taskType: string;
  taskTime: number;
  startTime: string;
  endTime: string;
  taskDate: string;
  id: string;
}

export async function getData() {
  const myCollection = collection(db, 'tasks');
  const myDocuments = await getDocs(myCollection);

  const result = myDocuments.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return result;
}

export async function addData(data: Data) {
  try {
    const myCollection = collection(db, 'tasks');
    await addDoc(myCollection, data);
  } catch (error) {
    console.error('Wystąpił błąd podczas dodawania danych do Firebase:', error);
  }
}

export async function deleteRecord(record: DataDelete) {
  const myCollection = collection(db, 'tasks');
  const docRef = await doc(myCollection, record.id);
  deleteDoc(docRef);
  console.log('Dokument deleted with ID:', docRef.id);
}

export const fetchExistingTaskTypes = async () => {
  try {
    const myCollection = collection(db, "tasks");
    const myDocuments = await getDocs(myCollection);

    const taskTypes = myDocuments.docs.map((doc) => doc.data().taskType);
    return taskTypes;
  } catch (error) {
    console.error("Wystąpił błąd podczas pobierania istniejących rodzajów zadań:", error);
    return [];
  }
};
export async function updateRecord(record: DataUpdate) {
  const myCollection = collection(db, 'tasks');
  const docRef = await doc(myCollection, record.id);

  updateDoc(docRef, {
    taskName: record.taskName,
    taskType: record.taskType,
    taskTime: record.taskTime,
    startTime: record.startTime,
    endTime: record.endTime,
    taskDate: record.taskDate,
  });

  console.log("Dokument updated with ID:", docRef.id);
}
