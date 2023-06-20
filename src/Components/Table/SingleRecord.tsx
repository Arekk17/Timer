import React, { useState } from 'react';
import { Record } from './DataTable';

interface SingleRecordProps {
  record: Record;
}


const SingleRecord: React.FC<SingleRecordProps> = ({ record }) => {

 

  return (
    <>
      <td className='p-2 border-b-2 border-l-2 border-solid border-black'>{record.taskName}</td>
      <td className='p-2 border-b-2 border-l-2 border-solid border-black'>{record.taskTime}</td>
      <td className='p-2 border-b-2 border-l-2 border-solid border-black '>{record.taskType}</td>
      <td className='p-2 border-b-2 border-l-2 border-solid border-black '>{record.startTime}</td>
      <td className='p-2 border-b-2 border-l-2 border-r-2 border-solid border-black '>{record.endTime}</td>
    </>
  );
};

export default SingleRecord;