import React from 'react';
import {withRouter} from "react-router-dom";
import styles from "./styles/EmailInput.module.css";

function EmailInput(props) {
    return (
        <div className={styles.Email__input}>
            <label htmlFor="email-address" style={{position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: '0', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: '0'}}>
                Email Address
            </label>
            <input id="email-address" type="email" placeholder="Email Address" />
            <button className={styles.Email__input_btn} onClick={() => props.history.push("/signUp")}>
                Get Started
            </button>
        </div>
    );
}

export default withRouter(EmailInput);
