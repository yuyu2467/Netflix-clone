import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebaseConfig";
import styles from "./styles/SignIn.module.css";

function Login(props) {
  let user = JSON.parse(localStorage.getItem("rememberedUser")) || {};

  let [email, setEmail] = useState(user.email || "");
  let [password, setPassword] = useState(user.password || "");
  let [age, setAge] = useState("");
  let [checked, setChecked] = useState(false);
  let [error, setError] = useState(undefined);

  const showError = (error) => {
    setError(error);
    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let rememberedUser = { email: email, password: password };

    if (checked) {
      localStorage.setItem("rememberedUser", JSON.stringify(rememberedUser));
    } else {
      localStorage.setItem("rememberedUser", JSON.stringify({}));
    }

    if (props.method === "signUp") {
      if (!age) {
        showError("Please enter your age.");
        return;
      }
      if (parseInt(age) < 18) {
        const currentTime = new Date().getTime();
        const restrictionData = {
          restricted: true,
          startTime: currentTime
        };
        localStorage.setItem("ageRestriction", JSON.stringify(restrictionData));
        alert("You will be logged out automatically after 30 mins due to age restriction.");
      } else {
        localStorage.removeItem("ageRestriction");
      }

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => props.history.push("/movies"))
        .catch((err) => showError(err.message));
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => props.history.push("/movies"))
        .catch((err) => showError(err.message));
    }
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <div className={styles.signIn} onSubmit={handleSubmit}>
      <h1>{props.method === "signIn" ? "Sign In" : "Sign Up"}</h1>

      {error && (
        <p className={styles.error}>
          <span onClick={() => setError("")} className={styles.error__close}>
            &#215;
          </span>
          {error}{" "}
        </p>
      )}

      <form className={styles.signIn__form}>
        <label htmlFor="email" className={styles['visually-hidden']}>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className={styles['visually-hidden']}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {props.method === "signUp" && (
          <>
            <label htmlFor="age" className={styles['visually-hidden']}>Age</label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </>
        )}

        <button className={styles.signIn_btn}>
          {props.method === "signIn" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className={styles.rememberMe}>
        <div>
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={handleCheck}
          />
          <span>Remember me</span>
        </div>
        <p>Need help?</p>
      </div>

      {props.method === "signIn" ? (
        <div className={styles.newToNetflix}>
          <span>New to Netflix? </span>
          <Link to="/signUp">Sign up Now</Link>
        </div>
      ) : (
        <div className={styles.newToNetflix}>
          <span>Already have an account? </span>
          <Link to="/signIn">Sign In</Link>
        </div>
      )}

      <div className={styles.info}>
        <p>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
        <button style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Learn More.</button>
      </div>
    </div>
  );
}

export default Login;
