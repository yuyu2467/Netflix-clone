import React, { useState } from 'react';
import styles from './styles/AgeVerification.module.css';

function AgeVerification({ onVerified }) {
  const [age, setAge] = useState('');
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
    if (ageNum < 18) {
      alert("You're age is below 18, So you'll be using this site as a minor, The site will be closed automatically in under 30 min.");
      const restrictionData = {
        isMinor: true,
        startTime: new Date().getTime(),
      };
      localStorage.setItem('ageRestriction', JSON.stringify(restrictionData));
    } else {
        localStorage.removeItem('ageRestriction');
    }
    onVerified();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Age Verification</h2>
        <p>Please enter your age to continue.</p>
        <input
          type="number"
          value={age}
          onChange={handleAgeChange}
          placeholder="Enter your age"
          className={styles.ageInput}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AgeVerification;
