import React from 'react';

interface TimerInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  suggestions?: string[];
}

const TimerInput: React.FC<TimerInputProps> = ({ value, onChange, error, suggestions }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const uniqueSuggestions = suggestions ? [...new Set(suggestions)] : [];

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        list="taskTypeSuggestions"
        className={`ml-5 rounded-lg border focus:outline-none focus:ring focus:border-blue-300 ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="text-red-500 block text-sm mt-1">Pole jest wymagane.</span>}
      {uniqueSuggestions.length > 0 && (
        <datalist id="taskTypeSuggestions">
          {uniqueSuggestions.map((suggestion) => (
            <option value={suggestion} key={suggestion} />
          ))}
        </datalist>
      )}
    </div>
  );
};

export default TimerInput;
