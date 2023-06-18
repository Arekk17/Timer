import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidenav from './Components/Navigation/Sidenav';
import TaskTimer from './Components/Timer/TaskTimer'

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidenav />
        <div className="flex-grow bg-gray-200">
          <Routes>
            {/* Dodaj swoje trasy tutaj */}
            <Route path="/" element={<TaskTimer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App