import React, { useState, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import MoviesPage from "./pages/moviespage/MoviesPage";
import HomePage from "./pages/homepage/HomePage";
import CategoryPage from "./pages/categorypage/CategoryPage";
import SignInPage from "./pages/signinpage/SignInPage";
import AgeVerification from "./components/ageverification/AgeVerification";
import CategorySelectionPage from "./pages/categoryselectionpage/CategorySelectionPage";
import { UserContext } from "./contexts/UserContext";
import auth from "./firebase/firebaseConfig";

function App() {
  const user = useContext(UserContext);
  const [ageIsVerified, setAgeIsVerified] = useState(() => localStorage.getItem('ageIsVerified') === 'true');
  const [categoriesAreSelected, setCategoriesAreSelected] = useState(() => localStorage.getItem('categoriesAreSelected') === 'true');

  React.useEffect(() => {
    let timeoutId = null;
    const cleanup = () => {
      alert("Your session has ended due to age restriction.");
      localStorage.removeItem("ageRestriction");
      localStorage.removeItem("ageIsVerified");
      localStorage.removeItem("categoriesAreSelected");
      auth.signOut();
      window.location.reload();
    };

    const checkRestriction = () => {
      const restrictionData = localStorage.getItem("ageRestriction");
      if (restrictionData) {
        const { startTime } = JSON.parse(restrictionData);
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - startTime;
        const thirtyMinutes = 30 * 60 * 1000;

        if (timeElapsed >= thirtyMinutes) {
          cleanup();
        } else {
          const timeLeft = thirtyMinutes - timeElapsed;
          timeoutId = setTimeout(cleanup, timeLeft);
        }
      }
    };

    if (ageIsVerified) {
      checkRestriction();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [ageIsVerified]);

  const handleAgeVerified = () => {
    localStorage.setItem('ageIsVerified', 'true');
    setAgeIsVerified(true);
  };

  const handleCategoriesSelected = () => {
    localStorage.setItem('categoriesAreSelected', 'true');
    setCategoriesAreSelected(true);
  };

  if (!ageIsVerified) {
    return <AgeVerification onVerified={handleAgeVerified} />;
  }

  if (!categoriesAreSelected) {
    return <CategorySelectionPage onCategoriesSelected={handleCategoriesSelected} />;
  }

  return (
    <div>
      <Switch>
        {!user ? (
          <>
            <Route path="/" exact component={HomePage} />
            <Route path="/signIn" exact render={(routeProps) => <SignInPage {...routeProps} method="signIn" />} />
            <Route path="/signUp" exact render={(routeProps) => <SignInPage {...routeProps} method="signUp" />} />
            <Redirect to="/" />
          </>
        ) : (
          <>
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/category/action" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchActionMovies" genre="Action Movies" />} />
            <Route path="/category/horror" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchHorrorMovies" genre="Horror Movies" />} />
            <Route path="/category/comedy" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchComedyMovies" genre="ComedyMovies" />} />
            <Route path="/category/top_rated" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchTopRated" genre="Top Rated" />} />
            <Route path="/category/netflix_originals" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchNetflixOriginals" genre="Netflix Originals" />} />
            <Route path="/category/romance" exact render={(routeProps) => <Category.Page {...routeProps} type="fetchRomanceMovies" genre="Romance Movies" />} />
            <Route path="/category/trending" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchTrending" genre="Trending" />} />
            <Route path="/category/documentaries" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchDocumentaries" genre="Documentaries" />} />
            <Redirect to="/movies" />
          </>
        )}
      </Switch>
    </div>
  );
}


export default App;
