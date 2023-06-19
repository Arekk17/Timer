import { collection, getDocs } from "firebase/firestore";
import db from './firebaseServices'

export async function getData(){
  const myCollection = collection(db, "tasks");
  const myDocuments = await getDocs(myCollection);

  const result = myDocuments.docs.map((doc:any ) => {
    return {id: doc.id, ...doc.data()}
  });

  return result;
}