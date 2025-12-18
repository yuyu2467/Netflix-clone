import React from "react";
import styles from "./SessionTimeoutModal.module.css";

const SessionTimeoutModal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Session Ended</h2>
        <p>Your 30-minute session has ended. Please close the site.</p>
      </div>
    </div>
  );
};

export default SessionTimeoutModal;
