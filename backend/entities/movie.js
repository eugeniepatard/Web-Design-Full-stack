import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    movie_id: {
      primary: true,
      type: Number,
      generated: false,
    },
    title: {
      type: String,
    },
    tmdb_id: { type: Number },
    release_date: { type: String, nullable: true },
    length: { type: Number, nullable: true },
    genres: { type: String, nullable: true },
    background: { type: String, nullable: true },
    poster: { type: String, nullable: true },
    synopsis: { type: String, nullable: true },
    actors: { type: String, nullable: true },
    popularity: { type: Number, nullable: true },
    keywords: { type: String, nullable: true },
    backdrop_title: { type: String, nullable: true },
  },
});

export default Movie;
