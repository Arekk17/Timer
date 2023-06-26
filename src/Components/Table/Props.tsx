import React from 'react';
import { deleteRecord } from '../../MyServices/crudServices';

interface PropsProps {
  record: any;
  onConfirmation: (confirmed: boolean) => void;
}

const Props: React.FC<PropsProps> = ({ record, onConfirmation }) => {
  const handleDeleteClick = () => {
    deleteRecord(record)
    onConfirmation(true);
  };

  const handleCancelClick = () => {
    onConfirmation(false);
  };

  return (
    <div className="bg-white w-1/2 h-1/2 absolute top-1/4 left-1/4 border-black border-solid border-2 p-4">
      <p>Na pewno chcesz usunąć {record.taskName}?</p>
      <button className="p-3 bg-red-500" onClick={handleDeleteClick}>
        Tak
      </button>
      <button className="p-3 bg-green-500" onClick={handleCancelClick}>
        Nie
      </button>
    </div>
  );
};

export default Props;
