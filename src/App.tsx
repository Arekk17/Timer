import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidenav from './Components/Navigation/SideNav';
import TaskTimer from './Components/Timer/Timer';
import ChartComponent from './Components/Graph/Graph';
import DataTable from './Components/Table/DataTable';

const App = () => {
  const [refreshData, setRefreshData] = useState(false);

  const handleDataRefresh = () => {
    setRefreshData(!refreshData);
  };

  useEffect(() => {
    handleDataRefresh();
  }, []);

  return (
    <Router>
      <div className="flex">
        <Sidenav />
        <div className="flex-grow bg-gray-200 flex flex-col">
          <Routes>
            {/* Dodaj swoje trasy tutaj */}
            <Route path="/" element={<TaskTimer handleDataRefresh={handleDataRefresh} />} />
            <Route path="/graph" element={<ChartComponent />} />
          </Routes>
          <div className="w-100 p-2">
            <DataTable refreshData={refreshData} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
