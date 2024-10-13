import './MovieTopTile.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../Popup/Popup';

export default function MovieTopTile({ movie_id }) {
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

  const link_start = 'https://image.tmdb.org/t/p/original';
  const backdrop_link = link_start + movie.backdrop_title;

  return (
    <div className="movie-tile-popup">
      <div className="movie-top-tile">
        {movie.backdrop_title && (
          <img
            src={backdrop_link}
            role="button"
            className="top-5-poster"
            alt={`${movie.title}`}
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
