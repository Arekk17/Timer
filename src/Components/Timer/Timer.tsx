import React, { useState, useEffect } from 'react';

const TaskTimer: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [taskType, setTaskType] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning]);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  };

  const padNumber = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  const handleTimerToggle = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      setTime(0);
    } else {
      setIsTimerRunning(true);
    }
  };

  return (
    <div className="p-4 flex items-center border-b">
      <label className="block mb-2 font-bold flex-grow" htmlFor="title">
        Tytuł zadania:
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-32 sm:w-48 p-2 border border-gray-300 rounded ml-2"
        />
      </label>
      <label className="block mb-2 font-bold flex-grow" htmlFor="taskType">
        Rodzaj zadania:
        <input
          id="taskType"
          type="text"
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="w-32 sm:w-48 p-2 border border-gray-300 rounded ml-2"
        />
      </label>
      <div className="flex items-center">
        <div className="mr-3">
          <p className="text-xl">Czas: {formatTime(time)}</p>
        </div>
        <div>
          <button
            onClick={handleTimerToggle}
            className={`px-4 py-2 ${
              isTimerRunning ? 'bg-red-500' : 'bg-blue-500'
            } text-white rounded hover:bg-blue-600`}
          >
            {isTimerRunning ? 'Zatrzymaj' : 'Rozpocznij'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTimer;
