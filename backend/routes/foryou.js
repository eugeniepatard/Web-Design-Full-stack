import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import User from '../entities/user.js';

const forYouRouter = express.Router();

forYouRouter.get('/', async function (req, res) {
  const p = req.query.page;
  const user = req.query.user_id;

  
  const movieRepository = appDataSource.getRepository(Movie);
  const userRepository = appDataSource.getRepository(User);

  const allMovies = await movieRepository.find({
    select: ['tmdb_id', 'actors', 'genres', 'keywords'],
  });
  // console.log(allMovies);
  const user_data = await userRepository.findOneBy({
    user_id: user,
  });
  let renvoi = [];

  const ratings = JSON.parse(user_data.ratings);
  if (ratings !== undefined && ratings !== null) {
    //   console.log(ratings);
    // Calculate the mean rate of the user
    const values = Object.values(ratings);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean_rate = sum / values.length;
    //   console.log(mean_rate);

    // Creation of the user profile
    const rated_movies = Object.keys(ratings);
    //   console.log(rated_movies);

    const user_profile = {};
    for (const rated_movie of rated_movies) {
      // console.log(rated_movie);
      const movie_data = await movieRepository
        .createQueryBuilder('movie')
        .select([
          'movie.tmdb_id',
          'movie.genres',
          'movie.actors',
          'movie.keywords',
        ])
        .where('movie.tmdb_id = :tmdb_id', { tmdb_id: rated_movie })
        .getOne();
      // console.log(movie_data);
      const movie_rate = ratings[rated_movie];
      const normalized_rate = movie_rate - mean_rate;

      // console.log(movie_rate);
      const movie_actors = JSON.parse(movie_data.actors); //liste
      // console.log(movie_actors);
      const movie_genres_dico = JSON.parse(movie_data.genres); // liste dico {id: , name: }
      const movie_genres = movie_genres_dico.map((dico) => dico.id); // liste id
      // console.log(movie_genres);
      const movie_keywords_dico = JSON.parse(movie_data.keywords); // liste dico {id: , name: }
      const movie_keywords = movie_keywords_dico.map((dico) => dico.id); // liste id
      // console.log(movie_keywords);

      // Actors part
      if (!user_profile.actors) {
        user_profile.actors = {};
      }
      const user_actors = Object.keys(user_profile.actors);
      // console.log(user_actors);

      for (const actor of movie_actors) {
        //   console.log(actor);
        if (user_actors.includes(actor)) {
          user_profile.actors[actor].push(normalized_rate);
        } else {
          user_profile.actors[actor] = [normalized_rate];
        }
        //   console.log(user_profile);
      }
      // console.log(user_profile);

      // Genres part
      if (!user_profile.genres) {
        user_profile.genres = {};
      }
      const user_genres = Object.keys(user_profile.genres);
      // console.log(user_genres);
      for (const genre of movie_genres) {
        //   console.log(genre);
        //   console.log(user_genres);
        //   console.log(user_genres.includes(genre.toString()));
        if (user_genres.includes(genre.toString())) {
          user_profile.genres[genre].push(normalized_rate);
        } else {
          user_profile.genres[genre] = [normalized_rate];
        }
        //   console.log(user_profile.genres);
      }

      // Keywords part
      if (!user_profile.keywords) {
        user_profile.keywords = {};
      }
      const user_keywords = Object.keys(user_profile.keywords);

      for (const keyword of movie_keywords) {
        if (user_keywords.includes(keyword.toString())) {
          user_profile.keywords[keyword].push(normalized_rate);
        } else {
          user_profile.keywords[keyword] = [normalized_rate];
        }
      }
    }
    //   console.log(user_profile);

    // Calculate the mean rates for actors
    for (const actor of Object.keys(user_profile.actors)) {
      // console.log(actor);
      const values2 = user_profile.actors[actor];
      // console.log(user_profile.actors[actor]);
      const sum2 = values2.reduce((acc, val) => acc + val, 0);
      // console.log(sum2);
      const mean_rate2 = sum2 / values2.length;
      // console.log(mean_rate2);
      user_profile.actors[actor] = mean_rate2;
    }

    // Calculate the mean rates for genres
    for (const genre of Object.keys(user_profile.genres)) {
      const values3 = user_profile.genres[genre];
      const sum3 = values3.reduce((acc, val) => acc + val, 0);
      const mean_rate3 = sum3 / values3.length;
      user_profile.genres[genre] = mean_rate3;
    }

    // Calculate the mean rates for keywords
    for (const keyword of Object.keys(user_profile.keywords)) {
      const values4 = user_profile.keywords[keyword];
      const sum4 = values4.reduce((acc, val) => acc + val, 0);
      const mean_rate4 = sum4 / values4.length;
      user_profile.keywords[keyword] = mean_rate4;
    }

    //   console.log(user_profile);

    // Calculate the scores

    const scores = [];
    for (const movie of allMovies) {
      const id = movie.tmdb_id;
      // console.log(id);
      const movie_actors = JSON.parse(movie.actors);
      const movie_genres_dico = JSON.parse(movie.genres);
      const movie_genres = movie_genres_dico.map((dico) => dico.id);
      const movie_keywords_dico = JSON.parse(movie.keywords);
      const movie_keywords = movie_keywords_dico.map((dico) => dico.id);

      let actors_score = 0;
      let genres_score = 0;
      let keywords_score = 0;

      for (const actor of movie_actors) {
        if (Object.keys(user_profile.actors).includes(actor)) {
          actors_score = actors_score + user_profile.actors[actor];
        }
      }

      for (const genre of movie_genres) {
        if (Object.keys(user_profile.genres).includes(genre.toString())) {
          genres_score = genres_score + user_profile.genres[genre];
        }
      }

      for (const keyword of movie_keywords) {
        if (Object.keys(user_profile.keywords).includes(keyword.toString())) {
          keywords_score = keywords_score + user_profile.keywords[keyword];
        }
      }
      // console.log([actors_score,genres_score,keywords_score]);
      const movie_total_score =
        2 * keywords_score + 3 * genres_score + actors_score;

      scores.push([id, movie_total_score]);
    }
    // console.log(scores);

    // Sorting based on scores

    scores.sort((a, b) => b[1] - a[1]);
    //   console.log(scores);
    const idList = scores.map((tuple) => tuple[0]);
    const filteredIdList = idList.filter(
      (id) => !rated_movies.includes(id.toString())
    );
    //   console.log(idList);
    //   console.log(filteredIdList);
    // console.log(user_profile.genres);
    // Final return
    const start = (p - 1) * 100;
    const end = start + 100;
    renvoi = filteredIdList.slice(start, end);
  }
  res.json(renvoi);
});

export default forYouRouter;
