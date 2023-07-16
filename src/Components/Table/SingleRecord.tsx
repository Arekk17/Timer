import React, { useEffect, useState } from 'react';
import { Record } from './DataTable';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import Props from './DeletePopup';
import { UpdatePopup } from './UpdatePopup';

interface SingleRecordProps {
  record: Record;
  refresh: Function;
}

const SingleRecord: React.FC<SingleRecordProps> = ({ record, refresh }) => {
  const time = (taskTime: number) => {
    const totalMinutes = Math.floor(taskTime / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${padNumber(hours)}:${padNumber(minutes)}:00`;
  };

const [newStartTime, setNewStartTime] = useState('')
const [newEndTime, setNewEndTime] = useState('')

  const newTime = (recordTime: string, set: Function) => {
    const timewithoutcolon = recordTime.split(":")  
    set((`${timewithoutcolon[0]}:${timewithoutcolon[1]}:00`))       
  }

useEffect(() => {
  newTime(record.startTime, setNewStartTime)  
  newTime(record.endTime, setNewEndTime)
}, [record])


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
    }
    setActiveProps(false);
  };

  const [activeUpdateProps, setActiveUpdateProps] = useState(false);

  const handleDisplayUpdateProps = () => {
    setActiveUpdateProps(!activeUpdateProps);
  };

  const handleUpdateConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      
    }
    setActiveUpdateProps(false);
  };

  const refreshFunction = () => {
    refresh();
  };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap">{record.taskName}</td>
      <td className="px-6 py-4 whitespace-nowrap">{time(record.taskTime)}</td>
      <td
        className="px-6 py-4 whitespace-nowrap"
        style={categoryBackgroundColor}
      >
        {record.taskType}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{newStartTime}</td>
      <td className="px-6 py-4 whitespace-nowrap">{newEndTime}</td>
      <td className="px-6 py-4 whitespace-nowrap">{record.taskDate}</td>
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
        <TrashIcon
          className="h-5 w-5 text-red-500"
          onClick={handleDisplayProps}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
        <PencilSquareIcon
          className="h-5 w-5 text-black"
          onClick={handleDisplayUpdateProps}
        />
      </td>
      <td>
        {activeProps && (
          <Props
            refresh={refreshFunction}
            record={record}
            onConfirmation={handlePropsConfirmation}
          />
        )}
      </td>
      <td>
        {activeUpdateProps && (
          <UpdatePopup
            record={record}
            onConfirmation={handleUpdateConfirmation}
            refresh={refreshFunction}
          />
        )}
      </td>
    </>
  );
};

export default SingleRecord;
