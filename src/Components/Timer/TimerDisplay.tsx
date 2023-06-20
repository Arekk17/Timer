import React from 'react';

interface TimerDisplayProps {
  timeInSeconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeInSeconds }) => {
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  };

  const padNumber = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  return (
    <div className="mr-3">
      <p className="text-lg sm:text-xl md:text-2xl">Czas: {formatTime(timeInSeconds)}</p>
    </div>
  );
};

export default TimerDisplay;
