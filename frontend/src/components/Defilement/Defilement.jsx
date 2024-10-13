import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MovieTopTile from '../MovieTopTile/MovieTopTile';
import './Defilement.css';

export default function Defilement() {
  const scrollMovies = useRef(null);

  const scrollPrevious = () => {
    const scroll = scrollMovies.current.scrollLeft;
    const length = 440;
    const pos = Math.round(scroll / length);
    scrollMovies.current.scrollTo({
      left: (pos - 1) * length,
      behavior: 'smooth',
    });
  };

  const scrollNext = () => {
    const scroll = scrollMovies.current.scrollLeft;
    const length = 440;
    const pos = Math.round(scroll / length);
    scrollMovies.current.scrollTo({
      left: (pos + 1) * length,
      behavior: 'smooth',
    });
  };

  // Fetching the id_list of top popular movies
  const [id_list, setIdList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/popular/top`
        );
        setIdList(response.data);
      } catch (error) {
        console.error(error);
        // Gérer les erreurs de requête ici
      }
    }

    fetchData();
  }, []);

  return (
    <div className="Container">
      <div ref={scrollMovies} className="listmovies">
        <div className="movies">
          {id_list.map((id) => (
            <div>
              <MovieTopTile key={id} movie_id={id} />
            </div>
          ))}
        </div>
      </div>
      <div className="bouton-scroll">
        <button className="avantbtn" onClick={scrollPrevious}>
          <i className="icon-chevron_left"></i>
        </button>
        <button className="apresbtn" onClick={scrollNext}>
          <i className="icon-chevron_right"></i>
        </button>
      </div>
    </div>
  );
}

/*return(
        <div className="defilement-window">
            <button onClick={() => scrollToSection(sectionRef)}></button>
            <div ref={affiche12} className='affichagemovie'>
                <img className="movie" src={dictMovies[1]} />
                <img className="movie" src={dictMovies[2]} />
            </div>
            <div ref={affiche23} className='affichagemovie'>
                <img className="movie" src={dictMovies[1]} />
                <img className="movie" src={dictMovies[2]} />
            </div>

        </div>*/
