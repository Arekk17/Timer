import React, { useState, useEffect, useRef } from 'react';
import { getData } from '../../api/crudServices';
import SingleRecord from '../Table/SingleRecord';
import { Record } from '../Table/DataTable';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DataTableProps {
  refreshData: boolean;
}

const Data: React.FC<DataTableProps> = ({ refreshData }) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredRecords, setFilteredRecords] = useState<Record[]>([]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (filterApplied && startDate && endDate) {
      const filtered = records.filter((record) => {
        const recordDate = moment(record.taskDate, 'DD.MM.YYYY').toDate();
        const start = moment(startDate).startOf('day').toDate();
        const end = moment(endDate).endOf('day').toDate();

        return recordDate >= start && recordDate <= end;
      });
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  }, [startDate, endDate, records, filterApplied]);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setStartDate(date);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setEndDate(date);
  };
  const handleSetFilter = () => {
    setFilterApplied(true)
  } 
  const handleResetFilter = () => {
    setFilterApplied(false);
    setStartDate(null);
    setEndDate(null);
  };

  const handleDownloadPDF = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('table.pdf');
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200 ">
        <div className="font-bold text-lg">Tabela danych</div>
        <div className="text-sm text-gray-500">Ilość zadań: {filteredRecords.length}</div>
      </div>
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <label htmlFor="startDate" className="mr-2">
            Data początkowa:
          </label>
          <input type="date" id="startDate" value={startDate ? moment(startDate).format('YYYY-MM-DD') : ''} onChange={handleStartDateChange} />
        </div>
        <div>
          <label htmlFor="endDate" className="mr-2">
            Data końcowa:
          </label>
          <input type="date" id="endDate" value={endDate ? moment(endDate).format('YYYY-MM-DD') : ''} onChange={handleEndDateChange} />
        </div>
        <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={handleSetFilter}>
            Filtruj
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={handleResetFilter}>
            Resetuj filtr
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={handleDownloadPDF}>
            Pobierz PDF
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200" ref={tableRef}>
        <div className="flex bg-gray-100 px-6 py-4">
          <div className="flex-grow font-bold w-1/6">Nazwa zadania</div>
          <div className="flex-grow font-bold w-1/6">Czas</div>
          <div className="flex-grow font-bold w-1/6">Rodzaj zadania</div>
          <div className="flex-grow font-bold w-1/6">Godzina rozpoczęcia</div>
          <div className="flex-grow font-bold w-1/6">Godzina zakończenia</div>
          <div className="flex-grow font-bold w-1/6">Data</div>
          <div className="flex-grow font-bold w-1/6"></div>
        </div>
        {filterApplied
          ? filteredRecords.map((record: Record, index: number) => (
              <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} p-4`}>
                <SingleRecord record={record} />
              </div>
            ))
          : records.map((record: Record, index: number) => (
              <div key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} p-4`}>
                <SingleRecord record={record} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Data;