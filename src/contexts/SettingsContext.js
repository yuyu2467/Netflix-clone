import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [mood, setMood] = useState('Neutral');
  const [time, setTime] = useState('Free Time');
  const [focusMode, setFocusMode] = useState(false);

  return (
    <SettingsContext.Provider value={{ mood, setMood, time, setTime, focusMode, setFocusMode }}>
      {children}
    </SettingsContext.Provider>
  );
};
