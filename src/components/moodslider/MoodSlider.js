import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import './MoodSlider.css';

const MoodSlider = () => {
  const { setMood } = useContext(SettingsContext);

  const handleMoodChange = (event) => {
    const moodValue = event.target.value;
    if (moodValue === '0') {
      setMood('Sad');
    } else if (moodValue === '1') {
      setMood('Neutral');
    } else {
      setMood('Happy');
    }
  };

  return (
    <div className="mood-slider-container">
      <label htmlFor="mood">Mood:</label>
      <input
        type="range"
        id="mood"
        min="0"
        max="2"
        step="1"
        defaultValue="1"
        onChange={handleMoodChange}
      />
      <div className="mood-labels">
        <span>Sad</span>
        <span>Neutral</span>
        <span>Happy</span>
      </div>
    </div>
  );
};

export default MoodSlider;
