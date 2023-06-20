import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidenav from './Components/Navigation/SideNav';
import TaskTimer from './Components/Timer/Timer';
import DataTable from './Components/Table/DataTable';
import ChartComponent from './Components/Graph/Graph';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidenav />
        <div className="flex-grow bg-gray-200 flex flex-col">
          <Routes>
            {/* Dodaj swoje trasy tutaj */}
            <Route path="/" element={<TaskTimer />} />   
            <Route path='/graph' element={<ChartComponent />} />         
          </Routes>
          <div className='w-100 p-2'>
           <DataTable/>
          </div>         
        </div>
        
      </div>
    </Router>
  );
};
export default App