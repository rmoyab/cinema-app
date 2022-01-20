import { Link } from 'react-router-dom'

import { yearMovie, genreMovie } from '../../utils/movieUtils'

const MovieCard = ({ movie, posterUrl, genres }) => {
  const releaseFull = yearMovie(movie)
  const namesMovieGenres = genreMovie(movie, genres)

  const setVoteClass = (vote) => {
    if (vote >= 7) {
      return 'good'
    } else if (vote >= 4) {
      return 'medium'
    } else if (vote >= 1) {
      return 'bad'
    } else {
      return 'nr'
    }
  }

  return (
    <div className="movie" key={movie.id}>
      <div className="movie__image">
        <img
          src={`${posterUrl}/${movie.poster_path}`}
          alt={movie.original_title}
        />
      </div>
      <div className="movie__info"></div>
      <div className="movie__overview">
        <h4 className="txt-c mb-s">{movie.title}</h4>
        <Link to={`/movie/${movie.id}`} className="card-link">
          More...
        </Link>
        <div
          className={`movie__overview__vote movie__overview__vote--${setVoteClass(
            movie.vote_average
          )}`}
        >
          <h4>{movie.vote_average ? movie.vote_average : 'NR'}</h4>
        </div>
        <div>
          <p>{movie.original_language}</p>
        </div>
        <div>
          <h4>{releaseFull}</h4>
          <ul className="movie__overview__genres">
            {namesMovieGenres.slice(0, 2).map((genre, i) => (
              <li key={i} className="movie__overview__genres__genre">
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
