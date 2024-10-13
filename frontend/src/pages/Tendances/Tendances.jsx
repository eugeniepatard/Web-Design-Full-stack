import './Tendances.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie.jsx';
import Inscription from '../Inscription/Inscription';

export default function Tendances({ MovieName, setMovieName }) {
  const [page_number, setPageNumber] = useState(1);
  const [id_list, setIdList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/popular/${page_number}`
        );
        setIdList(response.data);
      } catch (error) {
        console.error(error);
        // Gérer les erreurs de requête ici
      }
    }

    fetchData();
  }, [page_number]);

  return (
    <div className="tendance-page">
      {id_list.map((id) => (
        <div>
          <Movie key={id} movie_id={id} />
        </div>
      ))}
    </div>
  );
}
