import React from 'react';

interface TimerInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
}

const TimerInput: React.FC<TimerInputProps> = ({ label, value, onChange, error }) => {
  return (
    <label className="block mb-2 font-bold sm:flex-grow" htmlFor={label}>
      <span className="mb-1 sm:mb-0 sm:mr-2">{label}:</span>
      <input
        id={label}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full lg:max-w-xs p-2 border border-gray-300 rounded"
      />
      {error && <span className="text-red-500 text-sm">Uzupełnij pole {label}.</span>}
    </label>
  );
};

export default TimerInput;
