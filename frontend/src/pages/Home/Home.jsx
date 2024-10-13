import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import Categories from '../../components/Categories/Categories';
import Defilement from '../../components/Defilement/Defilement';
import Tendances from '../Tendances/Tendances';
import AuthContext from '../../context/AuthContext';

function Home({ MovieName, setMovieName }) {
  const { isLoggedIn, logUserId } = useContext(AuthContext);

  return (
    <div className="App">
      <div id="container-principal">
        <Categories />
        <div className="container-secondaire">
          {/* <h1>L'état de connexion est : {isLoggedIn.toString()}</h1>

          {isLoggedIn ? (
            <h1>L'utilisateur connecté a l'id : {logUserId.toString()}</h1>
          ) : null} */}
          <Defilement />
          <Tendances MovieName={MovieName} setMovieName={setMovieName} />
        </div>
      </div>
    </div>
  );
}

export default Home;

//aide pour la forme des images : <img src={logo} className="App-logo" alt="logo" />
