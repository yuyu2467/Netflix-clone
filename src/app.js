import React, { useState, useEffect, useContext } from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import "./App.css";
import MoviesPage from "./pages/moviespage/MoviesPage";
import HomePage from "./pages/homepage/HomePage";
import CategoryPage from "./pages/categorypage/CategoryPage";
import SignInPage from "./pages/signinpage/SignInPage";
import AgeVerificationPage from "./pages/ageverificationpage/AgeVerificationPage";
import CategorySelectionPage from "./pages/categoryselectionpage/CategorySelectionPage";
import {UserContext} from "./contexts/UserContext";
import { SettingsContext } from "./contexts/SettingsContext";

function App(){
     const [ageVerified, setAgeVerified] = useState(false);
     const [categoriesSelected, setCategoriesSelected] = useState(false);
     let user = useContext(UserContext);
     const { focusMode } = useContext(SettingsContext);

     useEffect(() => {
        const ageStatus = localStorage.getItem('ageVerified');
        const areCategoriesSelected = localStorage.getItem('categoriesSelected') === 'true';

        if (ageStatus === 'minor') {
            const sessionStart = localStorage.getItem('sessionStart');
            if (sessionStart && (Date.now() - parseInt(sessionStart, 10)) > 30 * 60 * 1000) {
                localStorage.removeItem('ageVerified');
                localStorage.removeItem('sessionStart');
                localStorage.removeItem('categoriesSelected');
                setAgeVerified(false);
                setCategoriesSelected(false);
                return;
            }
        }

        if (ageStatus === 'adult' || ageStatus === 'minor') {
            setAgeVerified(true);
        }
        setCategoriesSelected(areCategoriesSelected);
     }, []);

     const handleAgeVerified = () => {
        setAgeVerified(true);
     };

     const handleCategoriesSelected = () => {
        setCategoriesSelected(true);
     };

     if (!ageVerified) {
        return <AgeVerificationPage onAgeVerified={handleAgeVerified} />;
     }

     if (!categoriesSelected) {
        return <CategorySelectionPage onCategoriesSelected={handleCategoriesSelected} />;
     }

  return (
    <div className={focusMode ? 'focus-mode' : ''}>
    <Switch>
      {!user ?
       <>
          <Route path="/" exact component={HomePage}/>
          <Route path="/signIn" exact render={(routeProps) => <SignInPage {...routeProps} method="signIn" />}/>
          <Route path="/signUp" exact render={(routeProps) => <SignInPage {...routeProps} method="signUp" />}/>
          <Redirect to="/"/>
       </>
            :
      <>
          <Route path="/movies" exact component={MoviesPage}/>
          <Route path="/category/action" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchActionMovies" genre="Action Movies"/>}/>
          <Route path="/category/horror" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchHorrorMovies" genre="Horror Movies"/>}/>
          <Route path="/category/comedy" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchComedyMovies" genre="ComedyMovies"/>}/>
          <Route path="/category/top_rated" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchTopRated" genre="Top Rated"/>}/>
          <Route path="/category/netflix_originals" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchNetflixOriginals" genre="Netflix Originals"/>}/>
          <Route path="/category/romance" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchRomanceMovies" genre="Romance Movies"/>}/>
          <Route path="/category/trending" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchTrending" genre="Trending"/>}/>
          <Route path="/category/documentaries" exact render={(routeProps) => <CategoryPage {...routeProps} type="fetchDocumentaries" genre="Documentaries"/>}/>
          <Redirect to="/movies"/>
       </>
      }
    </Switch>
  )
}


export default App;
