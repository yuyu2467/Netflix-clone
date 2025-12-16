import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import './TimeSelector.css';

const TimeSelector = () => {
  const { setTime } = useContext(SettingsContext);

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div className="time-selector-container">
      <label htmlFor="time">Time Available:</label>
      <select id="time" onChange={handleTimeChange} defaultValue="Free Time">
        <option value="30m">30 Minutes</option>
        <option value="1h">1 Hour</option>
        <option value="Free Time">Free Time</option>
      </select>
    </div>
  );
};

export default TimeSelector;
