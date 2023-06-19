import React, { useState, useEffect } from 'react';
import { getData } from '../../api/crudServices';

interface Record {
  taskName: string;
  taskTime: string;
  taskType: string;
}

const DataTable: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    showData();
  }, []);

  const showData = () => {
    getData().then((response: Record[]) => {
      setRecords(response);
    });
  };

  return (
    <>
      {records.map((record: Record, index: number) => {
        return (
          <tr key={index}>
            <td>{record.taskName}</td>
            <td>{record.taskTime}</td>
            <td>{record.taskType}</td>
          </tr>
        );
      })}
    </>
  );
};

export default DataTable;
