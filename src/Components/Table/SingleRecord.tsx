import React from 'react';
import { Record } from './DataTable';

interface SingleRecordProps {
  record: Record;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ record }) => {
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

  const getCategoryColor = (category: string) => {
    if (!category || category.length === 0) {
      // Handle empty or undefined category
      return '#000000'; // Default color
    }

    // Generate a hash code for the category
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash code to a color
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();
    return `#${'00000'.substring(0, 6 - color.length)}${color}`;
  };

  const categoryBackgroundColor = {
    backgroundColor: getCategoryColor(record.taskType),
  };

  return (
    <div className="flex rounded-md shadow-md mb-2">
      <div className="p-3 flex-grow">{record.taskName}</div>
      <div className="p-3 flex-grow">{time(record.taskTime)}</div>
      <div className="p-3 flex-grow" style={categoryBackgroundColor}>
        {record.taskType}
      </div>
      <div className="p-3 flex-grow">{record.startTime}</div>
      <div className="p-3 flex-grow">{record.endTime}</div>
    </div>
  );
};

export default SingleRecord;
