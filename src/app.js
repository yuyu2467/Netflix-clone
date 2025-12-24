import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import MoviesPage from "./pages/moviespage/MoviesPage";
import HomePage from "./pages/homepage/HomePage";
import CategoryPage from "./pages/categorypage/CategoryPage";
import SignInPage from "./pages/signinpage/SignInPage";
import AgeGate from "./pages/agegate/AgeGate";
import CategorySelection from "./pages/categoryselection/CategorySelection";
import { UserContext } from "./contexts/UserContext";
import { SettingsContext } from "./contexts/SettingsContext";

function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [categoriesSelected, setCategoriesSelected] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  let user = useContext(UserContext);
  const { focusMode } = useContext(SettingsContext);

  useEffect(() => {
    const isMinor = localStorage.getItem("isMinor") === "true";
    const startTime = localStorage.getItem("minorSessionStartTime");

    if (isMinor && startTime) {
      const thirtyMinutes = 30 * 60 * 1000;
      const elapsedTime = Date.now() - parseInt(startTime, 10);
      const remainingTime = thirtyMinutes - elapsedTime;

      if (remainingTime <= 0) {
        setSessionExpired(true);
        localStorage.removeItem("isMinor");
        localStorage.removeItem("minorSessionStartTime");
        return;
      }

      const timer = setTimeout(() => {
        setSessionExpired(true);
        localStorage.removeItem("isMinor");
        localStorage.removeItem("minorSessionStartTime");
      }, remainingTime);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const isMinor = localStorage.getItem("isMinor");
    if (isMinor) {
      setAgeVerified(true);
    }
    const selectedCategories = localStorage.getItem("selectedCategories");
    if (selectedCategories) {
      setCategoriesSelected(true);
    }
  }, []);

  const handleAgeVerified = () => {
    setAgeVerified(true);
  };

  const handleCategoriesSelected = () => {
    setCategoriesSelected(true);
  };

  const handleStartOver = () => {
    window.location.reload();
  };

  if (sessionExpired) {
    return (
      <div>
        <h1>Session Expired</h1>
        <p>Your 30-minute session has ended because you are a minor.</p>
        <button onClick={handleStartOver}>Start Over</button>
      </div>
    );
  }

  if (!ageVerified) {
    return <AgeGate onAgeVerified={handleAgeVerified} />;
  }

  if (!categoriesSelected) {
    return <CategorySelection onCategoriesSelected={handleCategoriesSelected} />;
  }

  return (
    <div className={focusMode ? 'focus-mode' : ''}>
      <Switch>
        {!user ? (
          <>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/signIn"
              exact
              render={(routeProps) => <SignInPage {...routeProps} method="signIn" />}
            />
            <Route
              path="/signUp"
              exact
              render={(routeProps) => <SignInPage {...routeProps} method="signUp" />}
            />
            <Redirect to="/" />
          </>
        ) : (
          <>
            <Route path="/movies" exact component={MoviesPage} />
            <Route
              path="/category/action"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchActionMovies"
                  genre="Action Movies"
                />
              )}
            />
            <Route
              path="/category/horror"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchHorrorMovies"
                  genre="Horror Movies"
                />
              )}
            />
            <Route
              path="/category/comedy"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchComedyMovies"
                  genre="ComedyMovies"
                />
              )}
            />
            <Route
              path="/category/top_rated"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchTopRated"
                  genre="Top Rated"
                />
              )}
            />
            <Route
              path="/category/netflix_originals"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchNetflixOriginals"
                  genre="Netflix Originals"
                />
              )}
            />
            <Route
              path="/category/romance"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchRomanceMovies"
                  genre="Romance Movies"
                />
              )}
            />
            <Route
              path="/category/trending"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchTrending"
                  genre="Trending"
                />
              )}
            />
            <Route
              path="/category/documentaries"
              exact
              render={(routeProps) => (
                <CategoryPage
                  {...routeProps}
                  type="fetchDocumentaries"
                  genre="Documentaries"
                />
              )}
            />
            <Redirect to="/movies" />
          </>
        )}
      </Switch>
    </div>
  );
}

export default App;
