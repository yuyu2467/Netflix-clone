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
      <button
        id="focus-mode"
        onClick={handleToggle}
        aria-pressed={focusMode}
      >
        Focus Mode: {focusMode ? 'On' : 'Off'}
      </button>
      {focusMode && <div className="focus-mode-indicator">Focus Mode is On</div>}
    </div>
  );
};

export default FocusModeToggle;
