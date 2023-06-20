import React, { useState, useEffect } from 'react';
import { getData } from '../../MyServices/crudServices';
import SingleRecord from './SingleRecord';

export interface Record {
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
  }, [records]);

  return (
    <>
    <tr >
      <th className='p-2 border-b-4 border-solid border-black'>Nazwa zadania</th>
      <th className='p-2 border-b-4 border-solid border-black'>Czas</th>
      <th className='p-2 border-b-4 border-solid border-black'>Rodzaj zadania</th>
      <th className='p-2 border-b-4 border-solid border-black'>Godzina rozpoczecia</th>
      <th className='p-2 border-b-4 border-solid border-black'>Godzina zakonczenia</th>
    </tr>
      {records.map((record: Record, index: number) => {
        return (
          <tr key={index}>
            <SingleRecord
              record={record}            
            />
          </tr>
        );
      })}
    </>
  );
};

export default DataTable;
