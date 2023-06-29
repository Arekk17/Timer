import React from 'react';

const DataTableHeader: React.FC = () => {
  return (
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-4 w-1/6">Nazwa zadania</th>
        <th className="px-6 py-4 w-1/6">Czas</th>
        <th className="px-6 py-4 w-1/6">Rodzaj zadania</th>
        <th className="px-6 py-4 w-1/6">Godzina rozpoczęcia</th>
        <th className="px-6 py-4 w-1/6">Godzina zakończenia</th>
        <th className="px-6 py-4 w-1/6">Data</th>
        <th className="px-6 py-4 w-1/12"></th>
        <th className="px-6 py-4 w-1/12"></th>
      </tr>
    </thead>
  );
};

export default DataTableHeader;
