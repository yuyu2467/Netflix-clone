import React from 'react'
import SignIn from "../../components/signin/SignIn";
import styles from "./styles/SignInPage.module.css";

function SignInPage(props) {
    return (
        <div className={styles.signInPage}>
            <img src="https://i.pinimg.com/1200x/97/2d/f9/972df9476f2edd2878ee4cd4db3e8dc9.jpg" alt="Netflix Logo" className={styles.netflix_logo} onClick={() => props.history.push("/")}/>
        
             <SignIn {...props}/>

        </div>
    )
}

export default SignInPage;