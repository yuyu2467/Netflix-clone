import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from "firebase/auth";
import auth from '../../firebase/firebaseConfig';
import styles from './styles/AgeVerificationPage.module.css';

function AgeVerificationPage() {
    const [age, setAge] = useState('');
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const history = useHistory();

    useEffect(() => {
        let logoutTimer;
        if (showDisclaimer) {
            logoutTimer = setTimeout(() => {
                signOut(auth).then(() => {
                    history.push('/');
                });
            }, 30 * 60 * 1000); // 30 minutes
        }
        return () => {
            clearTimeout(logoutTimer);
        };
    }, [showDisclaimer, history]);

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const ageNum = parseInt(age, 10);
        if (ageNum < 18) {
            setShowDisclaimer(true);
            setTimeout(() => {
                history.push('/movies');
            }, 3000); // 3 seconds to read the disclaimer
        } else {
            history.push('/movies');
        }
    };

    return (
        <div className={styles.ageVerificationPage}>
            <div className={styles.ageVerificationBox}>
                <h1>Age Verification</h1>
                <p>Please enter your age to continue.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Your age"
                        value={age}
                        onChange={handleAgeChange}
                        required
                        min="1"
                    />
                    <button type="submit">Submit</button>
                </form>
                {showDisclaimer && (
                    <div className={styles.disclaimer}>
                        <p>You'll be logged in as a minor. The site will be automatically shut down within 30 minutes.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AgeVerificationPage;
