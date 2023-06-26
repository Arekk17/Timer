import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidenav from './Components/Navigation/SideNav';
import TaskTimer from './Components/Timer/Timer';
import ChartComponent from './Components/Graph/Graph';
import DataTable from './Components/Table/DataTable';
import Data from './Components/Raports/Raports';

const App = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleDataRefresh = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    handleDataRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="flex flex-col md:flex-row scroll-smooth">
        <Sidenav />
        <div className="flex-grow bg-gray-200 pb-10">
          <Routes>
            {/* Dodaj swoje trasy tutaj */}
            <Route path="/" element={<TaskTimer handleDataRefresh={handleDataRefresh} />} />
            <Route path="/graph" element={<ChartComponent />} />
            <Route path="/raport" element={<Data refreshData={refreshData} />} />
          </Routes>

          <div className="w-full md:w-3/4 lg:w-4/5 p-2 mx-auto h-screen overflow-hidden">
            <DataTable refreshData={refreshData} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
