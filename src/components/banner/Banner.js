import React from 'react'
import styles from "./styles/Banner.module.css";
import EmailInput from "../input/EmailInput";

function Banner(props) {

    function redirectToMovies(){
        props.history.push("/signIn");
    }

    return (
        <div className={styles.Banner}>
            <div className={styles.Banner__top}>
            <img src="https://i.pinimg.com/1200x/97/2d/f9/972df9476f2edd2878ee4cd4db3e8dc9.jpg" alt="Netflix Logo"/>
            <button className={styles.Banner__btn} onClick={redirectToMovies}>Sign In</button>
            </div>

            <div className={styles.Banner__main}>
                <h1 className={styles.Banner__heading}>Unlimited movies, TV shows and more.</h1>
                <p>Watch anywhere. Cancel anytime.</p>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                 <EmailInput/>
            </div>
        </div>
    )
}

export default Banner
