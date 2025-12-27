import React, { useState, useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import MoviesPage from "./pages/moviespage/MoviesPage";
import HomePage from "./pages/homepage/HomePage";
import CategoryPage from "./pages/categorypage/CategoryPage";
import SignInPage from "./pages/signinpage/SignInPage";
import { UserContext } from "./contexts/UserContext";
import auth from "./firebase/firebaseConfig";
import Onboarding from "./components/onboarding/Onboarding";

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("ageIsVerified")) &&
      JSON.parse(localStorage.getItem("categoriesAreSelected"))
    );
  });
  let user = useContext(UserContext);

  useEffect(() => {
    const restrictionData = localStorage.getItem("ageRestriction");
    if (restrictionData) {
      const { isMinor, startTime } = JSON.parse(restrictionData);
      if (isMinor) {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - startTime;
        const thirtyMinutes = 30 * 60 * 1000;
        const timeLeft = thirtyMinutes - timeElapsed;

        if (timeLeft <= 0) {
          alert("Your session has ended due to age restriction.");
          localStorage.removeItem("ageRestriction");
          localStorage.removeItem("ageIsVerified");
          localStorage.removeItem("categoriesAreSelected");
          auth.signOut();
        } else {
          const sessionTimeout = setTimeout(() => {
            alert("Your session has ended due to age restriction.");
            localStorage.removeItem("ageRestriction");
            localStorage.removeItem("ageIsVerified");
            localStorage.removeItem("categoriesAreSelected");
            auth.signOut();
          }, timeLeft);
          return () => clearTimeout(sessionTimeout);
        }
      }
    }
  }, []);

  if (!onboardingComplete) {
    return <Onboarding onOnboardingComplete={() => setOnboardingComplete(true)} />;
  }

  return (
    <div>
      <Switch>
        {!user ? (
          <>
            <Route path="/" exact component={HomePage} />
            <Route
              path="/signIn"
              exact
              render={(routeProps) => (
                <SignInPage {...routeProps} method="signIn" />
              )}
            />
            <Route
              path="/signUp"
              exact
              render={(routeProps) => (
                <SignInPage {...routeProps} method="signUp" />
              )}
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
              render={(route_props) => (
                <CategoryPage
                  {...route_props}
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
