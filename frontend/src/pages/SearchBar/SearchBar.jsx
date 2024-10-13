import './SearchBar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from '../../components/Movie/Movie';

export default function SearchBar({ MovieName }) {
  const [results_search, setResults] = useState([]);
  const MovieQuery = { text: MovieName.replace(/ /g, '%20') };

  useEffect(() => {
    async function fetchData() {
      try {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/api/search`, MovieQuery)
          .then((response) => setResults(response.data));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [MovieName]);

  return (
    <div className="searched-images">
      {results_search.map((id) => (
        <div>
          <Movie key={id} movie_id={id} />
        </div>
      ))}
    </div>
  );
}
