import React, { useState, useEffect } from 'react';
import { addData } from '../../MyServices/crudServices';
import TimerInput from './TimerInput';
import TimerDisplay from './TimerDisplay';

const TaskTimer: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    taskType: '',
    time: 0,
    isTimerRunning: false,
    titleError: false,
    taskTypeError: false,
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (formData.isTimerRunning) {
      timer = setInterval(() => {
        setFormData((prevData) => ({ ...prevData, time: prevData.time + 1 }));
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [formData.isTimerRunning]);

  const handleTitleChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, title: value }));
  };

  const handleTaskTypeChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, taskType: value }));
  };

  const handleTimerToggle = () => {
    const isTitleValid = validateField(formData.title, 'title');
    const isTaskTypeValid = validateField(formData.taskType, 'taskType');

    if (!isTitleValid || !isTaskTypeValid) {
      return;
    }

    if (formData.isTimerRunning) {
      setFormData((prevData) => ({
        ...prevData,
        isTimerRunning: false,
        time: 0,
        endTime: new Date().toLocaleTimeString()
      }));

      const currentDate = new Date();
      const dateString = currentDate.toLocaleDateString();

      const data = {
        taskName: formData.title,
        taskType: formData.taskType,
        taskTime: formData.time,
        taskDate: dateString,
        startTime: formData.startTime,
        endTime: new Date().toLocaleTimeString()
      };

      addData(data);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        isTimerRunning: true,
        startTime: new Date().toLocaleTimeString()
      }));
    }
  };

  const validateField = (fieldValue: string, fieldName: string) => {
    const isValid = fieldValue.trim() !== '';
    setFormData((prevData) => ({
      ...prevData,
      [`${fieldName}Error`]: !isValid
    }));
    return isValid;
  };

  return (
    <div className="p-4 flex items-center border-b">
      <TimerInput
        label="Tytuł zadania"
        value={formData.title}
        onChange={handleTitleChange}
        error={formData.titleError}
      />
      <TimerInput
        label="Rodzaj zadania"
        value={formData.taskType}
        onChange={handleTaskTypeChange}
        error={formData.taskTypeError}
      />
      <div className="flex items-center">
        <TimerDisplay timeInSeconds={formData.time} />
        <div>
          <button
            onClick={handleTimerToggle}
            className={`px-4 py-2 ${
              formData.isTimerRunning ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500'
            } text-white rounded hover:bg-blue-600`}
          >
            {formData.isTimerRunning ? 'Zatrzymaj' : 'Rozpocznij'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTimer;
