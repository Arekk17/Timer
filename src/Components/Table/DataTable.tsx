import React, { useState, useEffect } from 'react';
import { getData } from '../../api/crudServices';
import SingleRecord from './SingleRecord';
import DataTableHeader from './DataTableHeader';

export interface Record {
  [key: string]: any;
}

interface DataTableProps {
  refreshData: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ refreshData }) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData();
        setRecords(result);
        const totalTime = result.reduce((total: number, record: Record) => {
          return total + record.taskTime;
        }, 0);
        setTotalTime(totalTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [refreshData]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = (seconds % 60).toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200">
        <div className="font-bold text-lg">Tabela danych</div>
        <div className="text-sm text-gray-500">
          Ilość zadań: {records.length} | Całkowity czas: {formatTime(totalTime)}
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        <DataTableHeader />
        {records.map((record: Record, index: number) => (
          <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} p-4`}>
            <SingleRecord record={record} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
