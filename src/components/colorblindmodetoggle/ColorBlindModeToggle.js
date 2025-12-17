import React, { useState, useEffect } from 'react';
import styles from './styles/ColorBlindModeToggle.module.css';

const ColorBlindModeToggle = () => {
    const [isColorBlindMode, setIsColorBlindMode] = useState(false);

    useEffect(() => {
        const isEnabled = localStorage.getItem('colorBlindMode') === 'true';
        setIsColorBlindMode(isEnabled);
        if (isEnabled) {
            document.body.classList.add('color-blind-mode');
        }
    }, []);

    const toggleColorBlindMode = () => {
        const newMode = !isColorBlindMode;
        setIsColorBlindMode(newMode);
        localStorage.setItem('colorBlindMode', newMode);
        if (newMode) {
            document.body.classList.add('color-blind-mode');
        } else {
            document.body.classList.remove('color-blind-mode');
        }
    };

    return (
        <div className={styles.toggleContainer}>
            <label className={styles.switch}>
                <input type="checkbox" checked={isColorBlindMode} onChange={toggleColorBlindMode} />
                <span className={styles.slider}></span>
            </label>
            <span>Color-Blind Mode</span>
        </div>
    );
};

export default ColorBlindModeToggle;
