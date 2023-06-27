import React, { useState, useEffect } from 'react';
import { addData, fetchExistingTaskTypes } from '../../api/crudServices';
import TimerInput from './TimerInput';
import TimerDisplay from './TimerDisplay';

interface TaskTimerProps {
  handleDataRefresh: () => void;
}

const TaskTimer: React.FC<TaskTimerProps> = ({ handleDataRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    taskType: '',
    time: 0,
    isTimerRunning: false,
    titleError: false,
    taskTypeError: false,
    startTime: '',
    endTime: '',
  });

  const [existingTaskTypes, setExistingTaskTypes] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (formData.isTimerRunning) {
      timer = setInterval(() => {
        setFormData((prevData) => ({ ...prevData, time: prevData.time + 1 }));
      }, 1000);
    }

    fetchExistingTaskTypes()
      .then((taskTypes) => {
        setExistingTaskTypes(taskTypes);
      })
      .catch((error) => {
        console.error('Error fetching existing task types:', error);
      });

    return () => {
      clearInterval(timer);
    };
  }, [formData.isTimerRunning, handleDataRefresh]);

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
        endTime: new Date().toLocaleTimeString(),
      }));

      const currentDate = new Date();
      const dateString = currentDate.toLocaleDateString();

      const data = {
        taskName: formData.title,
        taskType: formData.taskType,
        taskTime: formData.time,
        taskDate: dateString,
        startTime: formData.startTime,
        endTime: new Date().toLocaleTimeString(),
      };

      addData(data)
        .then(() => {
          handleDataRefresh();
          setFormData((prevData) => ({
            ...prevData,
            title: '',
            taskType: '',
          }));
        })
        .catch((error) => {
          console.error('Error adding data:', error);
        });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        isTimerRunning: true,
        startTime: new Date().toLocaleTimeString(),
      }));
    }
  };

  const validateField = (fieldValue: string, fieldName: string) => {
    const isValid = fieldValue.trim() !== '';
    setFormData((prevData) => ({
      ...prevData,
      [`${fieldName}Error`]: !isValid,
    }));
    return isValid;
  };

  return (
    <div className="p-4 flex flex-col md:flex-row md:items-center md:border-b">
      <div className="md:flex-1">
        <label className='ml-1'>Tytuł zadania</label>
        <input
          type="text"
          className="px-4 rounded-lg "
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        {formData.titleError && <span className="error">Pole jest wymagane.</span>}
      </div>
      <div className="md:flex-1">
        <TimerInput
          label="Rodzaj zadania"
          value={formData.taskType}
          onChange={handleTaskTypeChange}
          error={formData.taskTypeError}
          suggestions={existingTaskTypes}
        />
      </div>
      <div className="flex items-center mt-4 md:mt-0">
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
