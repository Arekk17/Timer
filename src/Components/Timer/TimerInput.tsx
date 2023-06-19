import React from 'react';

interface TimerInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
}

const TimerInput: React.FC<TimerInputProps> = ({ label, value, onChange, error }) => {
  return (
    <label className="block mb-2 font-bold flex-grow" htmlFor={label}>
      {label}:
      <input
        id={label}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-32 sm:w-48 p-2 border border-gray-300 rounded ml-2"
      />
      {error && <span className="text-red-500 text-sm">Uzupełnij pole {label}.</span>}
    </label>
  );
};

export default TimerInput;
