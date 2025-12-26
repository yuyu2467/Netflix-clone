import React, { useState } from "react";
import styles from "./styles/AgeVerification.module.css";

const AgeVerification = ({ onAgeVerified }) => {
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = () => {
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    if (ageNum < 18) {
      alert("You're age is below 18, So you'll be using this site as a minor, The site will be closed automatically in under 30 min.");
      const restrictionData = {
        isMinor: true,
        startTime: new Date().getTime(),
      };
      localStorage.setItem("ageRestriction", JSON.stringify(restrictionData));
    } else {
      localStorage.setItem("ageIsVerified", "true");
    }
    onAgeVerified();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
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
        <button onClick={handleSubmit} className={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AgeVerification;