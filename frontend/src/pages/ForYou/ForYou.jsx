import './ForYou.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie.jsx';
import AuthContext from '../../context/AuthContext';

export default function ForYou({ MovieName, setMovieName }) {
  const [page_number, setPageNumber] = useState(1);
  const [id_list, setIdList] = useState([]);
  const { logUserId } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/getforyou?page=${page_number}&user_id=${logUserId}`
        );
        setIdList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [page_number]);

  return (
    <div className="foryou-page">
      {id_list.map((id) => (
        <div>
          <Movie key={id} movie_id={id} />
        </div>
      ))}
    </div>
  );
}
