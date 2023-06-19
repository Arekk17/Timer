import { collection, getDocs } from "firebase/firestore";
import db from '../MyServices/firebaseServices'

//Read data
export async function getData(){
  const myCollection = collection(db, "tasks");
  const myDocuments = await getDocs(myCollection);

  const result = myDocuments.docs.map((doc) => {
    return {id: doc.id, ...doc.data()}
  });

  return result;
}