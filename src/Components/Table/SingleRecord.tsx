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

  const [activeUpdateProps, setActiveUpdateProps] = useState(false);

  const handleDisplayUpdateProps = () => {
    setActiveUpdateProps(!activeUpdateProps);
  };

  const handleUpdateConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      console.log('Record updated', record);
    }
    setActiveUpdateProps(false);
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
      <td className="px-6 py-4 whitespace-nowrap">{record.startTime}</td>
      <td className="px-6 py-4 whitespace-nowrap">{record.endTime}</td>
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

      {activeProps && (
        <Props record={record} onConfirmation={handlePropsConfirmation} />
      )}

      {activeUpdateProps && (
        <UpdatePopup
          record={record}
          onConfirmation={handleUpdateConfirmation}
        />
      )}
    </>
  );
};

export default SingleRecord;
