import { appDataSource } from './datasource.js';
import Movie from './entities/movie.js';

// Options pour le Header de la requête HTTP dont la clé API
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
  },
};

// Création du dictionnaire contenant les infos des films
const movie_dict = {};
await appDataSource.initialize();
const movieRepository = appDataSource.getRepository(Movie);

for (let i = 1; i <= 10; i++) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`,
      options
    );
    const json = await response.json();
    const results = json.results;
    for (let j = 0; j < results.length; j++) {
      const movie = results[j];
      movie_dict[movie.id] = {
        tmdb_id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        background: movie.backdrop_path,
        poster: movie.poster_path,
        popularity: movie.popularity,
      };
      const response2 = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
        options
      );
      const json2 = await response2.json();
      movie_dict[movie.id]['genres'] = JSON.stringify(json2.genres);
      movie_dict[movie.id]['length'] = json2.runtime;
      movie_dict[movie.id]['synopsis'] = json2.overview;

      const response3 = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`,
        options
      );
      const json3 = await response3.json();
      const casting = json3.cast.slice(0, Math.min(3, json3.cast.length));
      const actors_names = casting.map((actor) => actor.name);
      movie_dict[movie.id]['actors'] = JSON.stringify(actors_names);

      const response4 = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/keywords`,
        options
      );
      const json4 = await response4.json();
      movie_dict[movie.id]['keywords'] = JSON.stringify(json4.keywords);

      const response5 = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/images`,
        options
      );
      const json5 = await response5.json();
      const images_list = json5.backdrops;
      let c = 0;
      const len = images_list.length;
      let found = false;
      let backdrop_title = movie.backdrop_path;
      while (!found && c < len) {
        if (images_list[c].iso_639_1 === 'en') {
          backdrop_title = images_list[c].file_path;
          found = true;
        }
        c = c + 1;
      }
      movie_dict[movie.id]['backdrop_title'] = backdrop_title;
    }
  } catch (err) {
    console.error(err);
  }
}
const movies_list = Object.values(movie_dict);
for (const movie of movies_list) {
  if (
    movie.keywords !== '[]' &&
    movie.actors !== '[]' &&
    movie.genres !== '[]' &&
    movie.background != null &&
    movie.backdrop_title != null &&
    movie.synopsis !== '' &&
    movie.release_date !== null &&
    movie.release_date !== '' &&
    movie.length !== 0 &&
    movie.poster !== null
  ) {
    const newMovie = movieRepository.create(movie);
    movieRepository.insert(newMovie);
  }
}
