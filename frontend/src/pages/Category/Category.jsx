import './Category.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from '../../components/Movie/Movie.jsx';

export default function Category({ MovieName, setMovieName, category_id }) {
  const [page_number, setPageNumber] = useState(1);
  const [id_list, setIdList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/categories?category_id=${category_id}&page=${page_number}`
        );
        setIdList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [page_number]);

  return (
    <div className="category-page">
      {id_list.map((id) => (
        <div>
          <Movie key={id} movie_id={id} />
        </div>
      ))}
    </div>
  );
}
