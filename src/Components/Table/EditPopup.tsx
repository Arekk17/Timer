import React, { useState, Fragment, useEffect } from 'react';
import { deleteRecord } from '../../api/crudServices';
import { Dialog, Transition } from '@headlessui/react';
import TimerInput from '../Timer/TimerInput';

interface EditPopupProps {
  record: any;
  onConfirmation: (confirmed: boolean) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ record, onConfirmation }) => {
  const handleDeleteClick = () => {
    deleteRecord(record);
    onConfirmation(true);
  };

  const handleCancelClick = () => {
    onConfirmation(false);
  };

  const handleTitleChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, title: value }));
  };

  const [open, setOpen] = useState(true);

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
             {record.map((record: any, index: any) => (
                <Dialog.Panel key={index} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                     
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {record.taskName}
                      </Dialog.Title>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-end gap-2 sm:px-6">
                  <TimerInput
                    label="Tytuł zadania"
                    value={record.taskName}
                    onChange={handleTitleChange}
                    error={formData.titleError}
                  />
                </div>
              </Dialog.Panel>
             ))}
              
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditPopup;