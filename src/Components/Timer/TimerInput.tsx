import React from 'react';

interface TimerInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  suggestions?: string[];
}

const TimerInput: React.FC<TimerInputProps> = ({ label, value, onChange, error, suggestions }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const uniqueSuggestions = suggestions ? [...new Set(suggestions)] : [];

  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        list="taskTypeSuggestions"
        className="px-4 rounded-lg "
      />
      {error && <span className="error">Pole jest wymagane.</span>}
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
