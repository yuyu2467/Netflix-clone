import React, {useEffect, useState} from 'react'
import {NavLink, withRouter} from "react-router-dom";
import { FiGift } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import styles from "./styles/Nav.module.css";
import auth from "../../firebase/firebaseConfig";

function Nav(props) {
    var [showNav, setShowNav] = useState(false);

    const redirectToMovies = () => {
         props.history.push("/movies");
    }

    const eventListenerFn = () => {
        if(window.scrollY > 100){
            setShowNav(true)
        }else{
            setShowNav(false)
        }
    }

     useEffect(() => {
         window.addEventListener("scroll", eventListenerFn);
         return () => {
             window.removeEventListener("scroll", eventListenerFn);
         }
     }, [])


     const handleLogOut = () => {
          auth.signOut()
               .then(() => props.history.push("/"))
               .catch((err) => console.log(err));
     }
    return (
        <nav className={`${styles.Nav} ${showNav && `${styles.Nav_black}`}`}>
            <div className={styles.Nav__1}>
            <img className={styles.Nav_logo} src="https://i.pinimg.com/1200x/97/2d/f9/972df9476f2edd2878ee4cd4db3e8dc9.jpg" 
                  alt="Netflix Logo" onClick={redirectToMovies}/>

            <div className={styles.links}>
              <NavLink className={styles.link} to="/movies" exact activeStyle={{ fontWeight: 'bold' }}>Home</NavLink>
              <NavLink className={styles.link} to="/category/action" exact activeStyle={{ fontWeight: 'bold' }}>Action</NavLink>
              <NavLink className={styles.link} to="/category/horror" exact activeStyle={{ fontWeight: 'bold' }}>Horror</NavLink>
              <NavLink className={styles.link} to="/category/comedy" exact activeStyle={{ fontWeight: 'bold' }}>Comedy</NavLink>
              <NavLink className={styles.link} to="/category/top_rated" exact activeStyle={{ fontWeight: 'bold' }}>Top rated</NavLink>

            </div>
            </div>

            <div className={styles.Nav__2}>
            <FiGift className={styles.icons}/>
            <FaBell className={styles.icons}/>

            <img className={styles.Nav_smiley} src="https://i.pinimg.com/736x/b4/0b/51/b40b51418293936a6e0ad09ffa229cb7.jpg" alt="smiley-logo"/>
             <button className={styles.logout} onClick={handleLogOut}>Logout</button>
            </div>
        </nav>
    )
}

export default withRouter(Nav);
