import React, { useState, Fragment } from 'react';
import { deleteRecord } from '../../api/crudServices';
import { Dialog, Transition } from '@headlessui/react'

interface DeletePopupProps {
  record: any;
  onConfirmation: (confirmed: boolean) => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  record,
  onConfirmation,
}) => {
  const handleDeleteClick = () => {
    deleteRecord(record);
    onConfirmation(true);
  };

  const handleCancelClick = () => {
    onConfirmation(false);
  };

  const [open, setOpen] = useState(true)

  

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
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Czy chcesz usunąć ten rekord?
                      </Dialog.Title>                      
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-end gap-2 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto border-none"
                    onClick={handleDeleteClick}
                  >
                    Tak
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-400 sm:mt-0 sm:w-auto border-none"
                    onClick={handleCancelClick}
                  >
                    Nie
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
};

export default DeletePopup;
