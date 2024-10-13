import './MovieDesc.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import check from './etoiles/checked_checkbox.png';

function genres(movie) {
  if (!movie.genres) {
    return [];
  }
  const genres2 = JSON.parse(movie.genres);
  const list = [];
  for (let i = 0; i < genres2.length; i++) {
    list.push(genres2[i].name);
  }

  return list;
}

function actors(movie) {
  if (!movie.actors) {
    return [];
  }
  const actors2 = JSON.parse(movie.actors);

  return actors2.slice(0, actors2.length);
}

export default function Descritpion({ movie_id }) {
  const [movie, setMovie] = useState({});
  const [rate, setRate] = useState(null);
  const [submit, setSubmit] = useState(false);
  const { isLoggedIn, logUserId } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/${movie_id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
        // Gérer les erreurs de requête ici
      }
    }

    fetchData();
  }, [movie_id]);

  useEffect(() => {
    async function sendData() {
      if (submit) {
        try {
          const formValues = {
            movie_id: movie_id,
            user_id: logUserId,
            rate: rate,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/newrate`,
            formValues
          );
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    sendData();
    setSubmit(false);
  }, [submit]);

  const image_link = 'https://image.tmdb.org/t/p/original' + movie.background;
  const actors_list = actors(movie);
  const genres_list = genres(movie);
  const genresString = genres_list.join(', ');

  return (
    <div className="movie-desc">
      <div className="movie-image-container">
        <div className="container-second">
          {movie.background && (
            <img className="movie-image" src={image_link} alt="backdrop" />
          )}

          <div className="filminfo">
            <div className="movie-title">{movie.title}</div>
            <span className="release_date">
              {movie.release_date} | {movie.length} minutes
            </span>
          </div>
        </div>
        <div className="container-third">
          {isLoggedIn ? (
            <>
              <div className="champ-note">Rate</div>
              <form
                className="form-note"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  className="noteinput"
                  type="number"
                  min="0"
                  max="5"
                  step="0.5"
                  required
                  onChange={(event) => setRate(event.target.value)}
                />
                <button
                  type="submit"
                  className="btn-check"
                  onClick={() => setSubmit(true)}
                >
                  <img src={check} alt="Send" className="checkbox"></img>
                </button>
              </form>
            </>
          ) : null}

          <div className="genre">Genre(s)</div>
          <div className="genrestring">{genresString}</div>
        </div>
        <div className="tt_synopsis">{movie.synopsis}</div>
        <div className="actorsname">
          <div className="actors">
            <div className="act">
              <p>Actor</p>
            </div>
            {actors_list.map((actorname) => (
              <div>
                <p>{actorname}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="espace"></div>
      </div>
    </div>
  );
}
