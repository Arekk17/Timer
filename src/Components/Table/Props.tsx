import React, {useState} from 'react';
import { deleteRecord } from '../../MyServices/crudServices';


const Props = (record: any) => {

  const [newRecord, setNewRecord] = useState(record)

  const deleteClick = () => {
    deleteRecord(newRecord.record)
  }

  return (
    <div className="bg-white w-1/2 h-1/2 absolute top-1/4 left-1/4 border-black border-solid border-2 p-4">
      Na pewno chcesz usunąć? {record.record.taskName}<button className='p-3 bg-red-500' onClick={deleteClick}>Yes</button>
      <button className='p-3 bg-green-500' onClick={() => {console.log(newRecord)}}>No</button>
    </div>
  );
};

export default Props;
