import React from 'react';

const DataTableHeader: React.FC = () => {
    return (
        <div className="flex bg-gray-100 px-6 py-4">
            <div className="flex-grow font-bold w-1/6">Nazwa zadania</div>
            <div className="flex-grow font-bold w-1/6">Czas</div>
            <div className="flex-grow font-bold w-1/6">Rodzaj zadania</div>
            <div className="flex-grow font-bold w-1/6">Godzina rozpoczęcia</div>
            <div className="flex-grow font-bold w-1/6">Godzina zakończenia</div>
            <div className="flex-grow font-bold w-1/6">Data</div>
            <div className="flex-grow font-bold w-1/6"></div>
        </div>
    );
};

export default DataTableHeader;
