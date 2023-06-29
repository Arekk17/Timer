import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import db from './firebaseServices';

interface TaskData {
  taskName: string;
  taskType: string;
  taskDate: string;
  taskTime: number;
  id?: string;
  startTime?: string;
  endTime?: string;
}

export async function getData() {
  const myCollection = collection(db, 'tasks');
  const myDocuments = await getDocs(myCollection);

  const result = myDocuments.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as TaskData;
  });
  return result;
}

export async function addData(data: TaskData) {
  try {
    const myCollection = collection(db, 'tasks');
    await addDoc(myCollection, data);
  } catch (error) {
    console.error('Wystąpił błąd podczas dodawania danych do Firebase:', error);
  }
}

export async function deleteRecord(record: TaskData) {
  if (record.id) {
    const myCollection = collection(db, 'tasks');
    const docRef = doc(myCollection, record.id);
    await deleteDoc(docRef);
    console.log('Dokument deleted with ID:', record.id);
  }
}

export const fetchExistingTaskTypes = async () => {
  try {
    const myCollection = collection(db, 'tasks');
    const myDocuments = await getDocs(myCollection);

    const taskTypes = myDocuments.docs.map((doc) => doc.data().taskType);
    return taskTypes;
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania istniejących rodzajów zadań:', error);
    return [];
  }
};

export async function updateRecord(record: TaskData) {
  if (record.id) {
    const myCollection = collection(db, 'tasks');
    const docRef = doc(myCollection, record.id);

    const updatedData: Partial<TaskData> = {
      taskName: record.taskName,
      taskType: record.taskType,
      taskTime: record.taskTime,
      taskDate: record.taskDate,
      startTime: record.startTime,
      endTime: record.endTime,
    };

    await updateDoc(docRef, updatedData);
    console.log('Dokument updated with ID:', record.id);
  }
}
