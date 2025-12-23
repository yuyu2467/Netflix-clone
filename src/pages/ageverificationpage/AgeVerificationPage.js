import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles/AgeVerificationPage.module.css';

const AgeVerificationPage = () => {
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [disclaimer, setDisclaimer] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const ageNum = parseInt(age, 10);

        if (isNaN(ageNum) || ageNum <= 0) {
            setError('Please enter a valid age.');
            return;
        }

        setError('');

        if (ageNum < 18) {
            localStorage.setItem('minorSessionStartTime', Date.now());
            localStorage.setItem('isMinor', 'true');
            setDisclaimer("You're age is below 18, So you'll be using this site as a minor, The site will be closed automatically in under 30 min. Redirecting...");
            setTimeout(() => {
                localStorage.setItem('ageVerified', 'true');
                history.push('/category-selection');
            }, 5000);
        } else {
            localStorage.setItem('ageVerified', 'true');
            history.push('/category-selection');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Age Verification</h1>
                <p>Please enter your age to continue.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        placeholder="Your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className={styles.input}
                        disabled={!!disclaimer}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
                    <button type="submit" className={styles.button} disabled={!!disclaimer}>
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AgeVerificationPage;