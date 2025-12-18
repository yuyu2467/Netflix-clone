import React, { useState } from "react";
import styles from "./AgeVerificationModal.module.css";

const AgeVerificationModal = ({ onVerified }) => {
  const [age, setAge] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = () => {
    const userAge = parseInt(age, 10);
    if (userAge < 18) {
      setShowDisclaimer(true);
      localStorage.setItem("isMinor", "true");
    } else {
      localStorage.setItem("ageVerified", "true");
      onVerified(true);
    }
  };

  if (showDisclaimer) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Disclaimer</h2>
          <p>
            Your age is below 18, so you'll be using this site as a minor. The
            site will be closed automatically in under 30 minutes.
          </p>
          <button
            onClick={() => {
              localStorage.setItem("ageVerified", "true");
              onVerified(true);
            }}
            className={styles.button}
          >
            I Understand
          </button>
        </div>
      </div>
    );
  }

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
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
