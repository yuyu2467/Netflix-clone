import React, { useState } from "react";

const AgeGate = ({ onAgeVerified }) => {
  const [age, setAge] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [error, setError] = useState("");

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      setError("Please enter a valid age.");
      return;
    }

    if (ageNum < 18) {
      setShowDisclaimer(true);
      localStorage.setItem("isMinor", "true");
      localStorage.setItem("minorSessionStartTime", Date.now());
      setTimeout(() => {
        onAgeVerified();
      }, 5000); // Wait 5 seconds before proceeding
    } else {
      localStorage.setItem("isMinor", "false");
      onAgeVerified();
    }
  };

  return (
    <div>
      {showDisclaimer ? (
        <div>
          <h1>Disclaimer</h1>
          <p>
            You have indicated that you are under 18. You will be using this
            site as a minor, and your session will automatically close in 30
            minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Age Verification</h1>
          <p>Please enter your age to continue.</p>
          <input
            type="number"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter your age"
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AgeGate;
