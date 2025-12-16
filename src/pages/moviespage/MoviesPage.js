import React, { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { SettingsContext } from '../../contexts/SettingsContext';
import Header from "../../components/header/Header";
import Nav from "../../components/navbar/Nav";

function MoviesPage(){
  const { mood, time } = useContext(SettingsContext);
  return (
    <div className={`movies-page mood-${mood.toLowerCase()}`}>
      <Nav/>
      <Header/>
      <Row type="fetchTrending" genre="Trending" isLarge isHighlighted={mood === 'Happy'} isEmphasized={time === '30m'}/>
      <Row type="fetchNetflixOriginals" genre="Netflix Originals" isHighlighted={mood === 'Neutral'} isEmphasized={time === '1h'}/>
      <Row type="fetchTopRated" genre="Top Rated" isHighlighted={mood === 'Happy'} isEmphasized={time === 'Free Time'}/>
      <Row type="fetchActionMovies" genre="Action Movies" isHighlighted={mood === 'Happy'} isEmphasized={time === '1h'}/>
      <Row type="fetchComedyMovies" genre="Comedy Movies" isHighlighted={mood === 'Happy'} isEmphasized={time === '30m'}/>
      <Row type="fetchHorrorMovies" genre="Horror Movies" isHighlighted={mood === 'Sad'} isEmphasized={time === '1h'}/>
      <Row type="fetchRomanceMovies" genre="Romance Movies" isHighlighted={mood === 'Sad'} isEmphasized={time === 'Free Time'}/>
      <Row type="fetchDocumentaries" genre="Documentaries" isHighlighted={mood === 'Neutral'} isEmphasized={time === '30m'}/>
    </div>
  )
}

export default MoviesPage;