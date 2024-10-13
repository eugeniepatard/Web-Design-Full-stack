import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Icon from '../entities/icon.js';
import User from '../entities/user.js';

const apiRouter = express.Router();

apiRouter.get('/categories', async function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const allMovies = await movieRepository.find({
    select: ['tmdb_id', 'genres', 'popularity'],
  });
  const p = req.query.page;
  const catego = req.query.category_id;
  const id_list = [];
  for (const movie_element of allMovies) {
    const genres_dict = JSON.parse(movie_element.genres);
    const movie_id = movie_element.tmdb_id;
    const popu = movie_element.popularity;
    for (const unique_genre of Object.values(genres_dict)) {
      // console.log(unique_genre.id === req.params.category);
      if (unique_genre['id'].toString() === catego) {
        id_list.push([movie_id, popu]);
      }
    }
  }

  id_list.sort((a, b) => b[1] - a[1]);
  const sortedIdList = id_list.map((tuple) => tuple[0]);

  const start = (p - 1) * 50;
  const end = start + 50;
  res.json(sortedIdList.slice(start, end));
});

apiRouter.get('/icons/:icon_id', function (req, res) {
  appDataSource
    .getRepository(Icon)
    .findOneBy({ icon_id: req.params.icon_id })
    .then((icon) => res.json(icon))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

apiRouter.get('/popular/:page', async function (req, res) {
  const movieRepository = appDataSource.getRepository(Movie);
  const allMovies = await movieRepository.find({
    select: ['tmdb_id', 'popularity'],
  });
  const tupleList = [];
  for (const element of allMovies) {
    tupleList.push([element.tmdb_id, element.popularity]);
  }
  tupleList.sort((a, b) => b[1] - a[1]);
  const p = req.params.page;
  const idList = tupleList.map((tuple) => tuple[0]);

  if (p === 'top') {
    res.json(idList.slice(0, 5));
  } else {
    const start = (p - 1) * 100 + 5;
    const end = start + 100;
    res.json(idList.slice(start, end));
  }
});

apiRouter.get('/:movie_id', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .findOneBy({ tmdb_id: req.params.movie_id })
    .then((movie) => res.json(movie))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

apiRouter.get('/name/:user_id', function (req, res) {
  appDataSource
    .getRepository(User)
    .findOneBy({ user_id: req.params.user_id })
    .then((user) => res.json(user.firstname))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

apiRouter.post('/search', async function (req, res) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
    },
  };
  const movieRepository = appDataSource.getRepository(Movie);
  const searchText = req.body.text;
  let idListFull = [];
  for (let p = 1; p <= 3; p++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchText}&page=${p}`,
      options
    );
    const response2 = await response.json();
    const response3 = await response2.results;
    const idList = [];
    for (const dico of response3) {
      await movieRepository
        .findOneBy({ tmdb_id: dico.id })
        .then((existingUser) => {
          if (existingUser) {
            idList.push(dico.id);
          }
        });
    }
    idListFull = idListFull.concat(idList);
  }
  res.json(idListFull);
});

apiRouter.post('/newrate', async function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const m_id = req.body.movie_id;
  console.log(m_id);
  const u_id = req.body.user_id;
  console.log(u_id);
  const rate = req.body.rate;
  console.log(rate);

  try {
    const user_data = await userRepository.findOneBy({
      user_id: u_id,
    });
    let ratings = {};
    const rates = JSON.parse(user_data.ratings);
    if (rates !== undefined && rates !== null) {
      ratings = rates;
    }

    ratings[m_id] = rate;

    const new_ratings = JSON.stringify(ratings);

    user_data.ratings = new_ratings;

    await userRepository.save(user_data);
    res.json('Success');
  } catch (error) {
    console.error(
      'Une erreur s\'est produite lors de la modification de la valeur de la colonne "ratings":',
      error
    );
  }
});

export default apiRouter;
