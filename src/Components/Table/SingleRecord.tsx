import React, { useState } from 'react';
import { Record } from './DataTable';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Props from './DeletePopup';
import { UpdatePopup } from './UpdatePopup';


interface SingleRecordProps {
  record: Record;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ record }) => {
  const time = (taskTime: number) => {
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
      return '#000000';
    }
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();
    return `#${'00000'.substring(0, 6 - color.length)}${color}`;
  };

  const categoryBackgroundColor = {
    backgroundColor: getCategoryColor(record.taskType),
  };

  const [activeProps, setActiveProps] = useState(false);

  const handleDisplayProps = () => {
    setActiveProps(!activeProps);
  };

  const handlePropsConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log('Record deleted:', record);
    }
    setActiveProps(false);
  };

  // const [activeDeleteProps, setActiveDeleteProps] = useState(false);

  // const handleDisplayDeleteProps = () => {
  //   setActiveDeleteProps(!activeDeleteProps);
  // };

  const [activeUpdateProps, setActiveUpdateProps] = useState(false)

  const handleDisplayUpdateProps = () => {
    setActiveUpdateProps(!activeUpdateProps)
  }

  const handleUpdateConfirmation = ( confirmed: boolean) => {
    if (confirmed){
      console.log('Record updated', record)
    }
    setActiveUpdateProps(false)
  }

  return (
    <div className="flex rounded-md shadow-md">
      <div className="p-3 flex-grow w-2/12">{record.taskName}</div>
      <div className="p-3 flex-grow w-2/12">{time(record.taskTime)}</div>
      <div className="p-3 flex-grow w-2/12" style={categoryBackgroundColor}>
        {record.taskType}
      </div>
      <div className="p-3 flex-grow w-2/12">{record.startTime}</div>
      <div className="p-3 flex-grow w-2/12">{record.endTime}</div>
      <div className="p-3 flex-grow w-2/12">{record.taskDate}</div>
      <div
        className="p-3 flex-grow w-1/12 cursor-pointer"
        onClick={handleDisplayProps}
      >
        <TrashIcon className="h-5 w-5 text-red-500" />
      </div>
      <div
        className="p-3 flex-grow w-1/12 cursor-pointer"
        onClick={handleDisplayUpdateProps}
      >
        <PencilSquareIcon className="h-5 w-5 text-black" />
      </div>

      {activeProps && (
        <Props record={record} onConfirmation={handlePropsConfirmation} />
      )}


      {activeUpdateProps && (
        <UpdatePopup record={record} onConfirmation={handleUpdateConfirmation}/>
      )}
     
    </div>
  );
};

export default SingleRecord;
