import React, { useContext, useEffect, useState } from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from './logo2.jpg';
import AuthContext from '../../context/AuthContext';

export default function Menu({ MovieName, setMovieName }) {
  const { isLoggedIn, logUserId, logout } = useContext(AuthContext);

  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchName() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/name/${logUserId}`
        );
        setUserName(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchName();
  }, [logUserId]);

  function searchFunction(event) {
    var searchText = event.target.value;
    var searchIcon = document.getElementById('search-icon');

    if (searchText === '') {
      // Afficher le texte et l'icône par défaut
      event.target.placeholder = 'Rechercher...';
      searchIcon.innerHTML = '&#128269;';
    } else {
      // Afficher le texte saisi et une autre icône
      event.target.placeholder = '';
      searchIcon.innerHTML = 'Texte saisi : ' + searchText;
    }
  }

  return (
    <div className="Menu">
      <div className="container-interm">
        <div className="Tendance">
          <NavLink to="/">
            <img className="logo" src={logo} alt="logo" />
          </NavLink>
          <div className="btn-menu">
            <NavLink to="/foryou" className="home">
              {isLoggedIn ? (
                <>
                  <div className="btn1">For you</div>
                </>
              ) : null}
            </NavLink>
            <div className="btn1">
              <NavLink to="/home" className="home">
                Home
              </NavLink>{' '}
            </div>
          </div>
        </div>
        <div className="Search">
          <NavLink to="/recherche">
            <input
              className="search-bar"
              type="text"
              id="search-bar"
              placeholder="Rechercher..."
              onkeyup="searchFunction()"
              value={MovieName}
              onChange={(event) => setMovieName(event.target.value)}
            />
          </NavLink>
          {isLoggedIn ? (
            <>
              <div className="logout">
                <div className="affiche-username">{userName}</div>
                <button className="out-btn" onClick={logout}>
                  Log out
                </button>
              </div>
            </>
          ) : (
            <NavLink to="/connexion" id="btn-connexion">
              Log in
            </NavLink>
          )}
          <img
            className="avatar"
            src="https://vectorified.com/images/unknown-avatar-icon-7.jpg"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}
