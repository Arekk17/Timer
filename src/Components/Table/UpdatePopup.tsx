import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { updateRecord } from '../../api/crudServices';

interface UpdatePopupProps {
  record: any;
  onConfirmation: (confirmed: boolean) => void;
}

export const UpdatePopup: React.FC<UpdatePopupProps> = ({
  record,
  onConfirmation,
}) => {
  const [formData, setFormData] = useState({
    taskName: record.taskName,
    taskType: record.taskType,
    taskTime: record.taskTime,
    startTime: record.startTime,
    endTime: record.endTime,
    taskDate: record.taskDate,
    id: record.id,
  });

  
  const [newTaskTimeStart, setNewTaskTimeStart] = useState(0);
  const [newTaskTimeEnd, setNewTaskTimeEnd] = useState(0);

  const changeToSeconds = () => {
    const separate = formData.startTime.split(':').map(Number);
    const hoursSeconds = separate[0] * 3600;
    const minutesSeconds = separate[1] * 60;
    const seconds = separate[2];
    setNewTaskTimeStart(hoursSeconds + minutesSeconds + seconds);
  };

  const changeToSecondsEnd = () => {
    const separate = formData.endTime.split(':').map(Number);
    const hoursSeconds = separate[0] * 3600;
    const minutesSeconds = separate[1] * 60;
    const seconds = separate[2];
    setNewTaskTimeEnd(hoursSeconds + minutesSeconds + seconds);
  };

  const newTime = () => {
    changeToSeconds();
    changeToSecondsEnd();
    const newTime = (newTaskTimeEnd - newTaskTimeStart)
    setFormData({...formData, taskTime: newTime});
  };

  useEffect(() => {
    newTime();
  }, [newTaskTimeStart, newTaskTimeEnd]);

  const handleCancelClick = () => {
    onConfirmation(false);
  };

  const handleUpdateClick = () => {
    updateRecord(formData);
    onConfirmation(true);
    // console.log(formData)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Edytuj rekord: {record.taskName}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="flex flex-col p-2">
                    <div>
                      <label className="pr-2">Nazwa zadania:</label>
                      <input
                        id="nazwa"
                        name="taskName"
                        value={formData.taskName}
                        onChange={handleChange}
                        type="text"
                        placeholder={record.taskName}
                      />
                    </div>

                    <div>
                      <label className="pr-2">Rodzaj zadania:</label>
                      <input
                        id="nazwa"
                        name="taskType"
                        value={formData.taskType}
                        onChange={handleChange}
                        type="text"
                        placeholder={record.taskType}
                      />
                    </div>

                    <div>
                      <label className="pr-2">Godzina rozpoczęcia:</label>
                      <input
                        id="nazwa"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        type="time"
                        placeholder={record.startTime}
                        step="1"
                      />
                    </div>

                    <div>
                      <label className="pr-2">Godzina zakończenia:</label>
                      <input
                        id="nazwa"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        type="time"
                        placeholder={record.endTime}
                        step="1"
                      />
                    </div>

                    <div>
                      <label className="pr-2">Data:</label>
                      <input
                        id="nazwa"
                        name="taskDate"
                        value={formData.taskDate}
                        onChange={handleChange}
                        type="date"
                        placeholder={record.taskDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-end gap-2 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto border-none"
                    onClick={handleUpdateClick}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-red-400 sm:mt-0 sm:w-auto border-none"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
