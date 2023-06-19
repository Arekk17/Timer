import React, { useState, useEffect } from 'react';
import { getData } from '../../MyServices/crudServices';

interface Record {
  [key: string]: any;
}

const DataTable: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setRecords(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

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
