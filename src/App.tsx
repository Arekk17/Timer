import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidenav from './Components/Navigation/SideNav';
import Home from './Pages/Home/Home';
import Diagram from './Pages/Diagram/Diagram';
import Raports from './Pages/Raports/Raports';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col md:flex-row scroll-smooth">
        <Sidenav />
        <div className="flex-grow bg-gray-200 pb-10">
          <Routes>
            {/* Dodaj swoje trasy tutaj */}            
            <Route path="/" element={<Home />} ></Route>
            <Route path="/graph" element={<Diagram />} />
            <Route path="/raport" element={<Raports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
