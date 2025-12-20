import React, { useState } from 'react';
import styles from './styles/AgeVerificationPage.module.css';

const AgeVerificationPage = ({ onAgeVerified }) => {
  const [age, setAge] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [error, setError] = useState('');

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = () => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      setError('Please enter a valid age.');
      return;
    }
    setError('');
    if (ageNum < 18) {
      setShowDisclaimer(true);
    } else {
      localStorage.setItem('ageVerified', 'adult');
      onAgeVerified();
    }
  };

  const handleMinorSessionStart = () => {
    localStorage.setItem('ageVerified', 'minor');
    localStorage.setItem('sessionStart', Date.now().toString());
    onAgeVerified();
  };

  return (
    <div className={styles.container}>
      {showDisclaimer ? (
        <div className={styles.disclaimer}>
          <h2>Disclaimer</h2>
          <p>Your age is below 18, so you'll be using this site as a minor. The site will be closed automatically in under 30 minutes.</p>
          <button onClick={handleMinorSessionStart}>I Understand</button>
        </div>
      ) : (
        <div className={styles.verification}>
          <h2>Age Verification</h2>
          <p>Please enter your age to continue.</p>
          <input
            type="number"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter your age"
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button onClick={handleSubmit} className={styles.button}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default AgeVerificationPage;
