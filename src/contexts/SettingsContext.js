import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [mood, setMood] = useState('Neutral');

  return (
    <SettingsContext.Provider value={{ mood, setMood }}>
      {children}
    </SettingsContext.Provider>
  );
};
