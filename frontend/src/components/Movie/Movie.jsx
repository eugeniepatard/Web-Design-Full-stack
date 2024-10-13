import './Movie.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Popup from '../Popup/Popup';

export default function Movie({ movie_id }) {
  const [movie, setMovie] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/${movie_id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [movie_id]);

  const movie_title = movie.title;
  const link_start = 'https://image.tmdb.org/t/p/original';
  const poster_link = link_start + movie.poster;

  return (
    <div className="movie-popup">
      <div className="movie">
        {movie.poster && (
          <img
            src={poster_link}
            role="button"
            className="poster-movie"
            alt={`${movie_title}`}
            onClick={() => setButtonPopup(true)}
          />
        )}
      </div>
      <Popup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        movie_id={movie_id}
      >
        <h3>My popup</h3>
        <div>My pop is popily neat!</div>
      </Popup>
    </div>
  );
}
