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
  }, [refreshData]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200 ">
        <div className="font-bold text-lg">Tabela danych</div>
        <div className="text-sm text-gray-500">Ilość zadań: {records.length}</div>
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