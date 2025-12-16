import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import './FocusModeToggle.css';

const FocusModeToggle = () => {
  const { focusMode, setFocusMode } = useContext(SettingsContext);

  const handleToggle = () => {
    setFocusMode(!focusMode);
  };

  return (
    <div className="focus-mode-toggle-container">
      <label htmlFor="focus-mode">Focus Mode:</label>
      <button id="focus-mode" onClick={handleToggle}>
        {focusMode ? 'On' : 'Off'}
      </button>
      {focusMode && <div className="focus-mode-indicator">Focus Mode is On</div>}
    </div>
  );
};

export default FocusModeToggle;
