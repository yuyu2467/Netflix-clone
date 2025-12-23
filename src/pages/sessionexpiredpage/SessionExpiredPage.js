import React from 'react';
import styles from './styles/SessionExpiredPage.module.css';

const SessionExpiredPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Session Expired</h1>
                <p>Your 30-minute session has ended because you are accessing this site as a minor.</p>
                <p>Please close this window.</p>
            </div>
        </div>
    );
};

export default SessionExpiredPage;
