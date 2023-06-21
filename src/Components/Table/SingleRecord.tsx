import React from 'react';
import { Record } from './DataTable';
interface SingleRecordProps {
  record: Record;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ record }) => {
  const category = () => {
    switch (record.taskType) {
      case 'sport':
        return (
          <div className="p-3 flex-grow bg-red-600">{record.taskType}</div>
        );
      case 'praca':
        return (
          <div className="p-3 flex-grow bg-blue-600">{record.taskType}</div>
        );
      case 'czytanie':
        return (
          <div className="p-3 flex-grow bg-green-600">{record.taskType}</div>
        );
      default:
        return (
          <div className="p-3 flex-grow bg-white-600">{record.taskType}</div>
        );
    }
  };

  const time = (taskTime: any) => {
    const totalMinutes = Math.floor(taskTime / 60);    
    const seconds = taskTime % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

   
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  };

  const padNumber = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  console.log(time(record.taskTime));
  return (
    <div className="flex bg-gray-200 rounded-md shadow-md mb-2">
      <div className="p-3 flex-grow">{record.taskName}</div>
      <div className="p-3 flex-grow">{time(record.taskTime)}</div>
      {category()}
      <div className="p-3 flex-grow">{record.startTime}</div>
      <div className="p-3 flex-grow">{record.endTime}</div>
    </div>
  );
};

export default SingleRecord;
