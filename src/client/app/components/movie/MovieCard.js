import { Link } from 'react-router-dom'

import { yearMovie, setVoteClass } from '../../utils/movieUtils'
import { getImageUrl } from '../../api/url'

const MovieCard = ({ movie }) => {
  const releaseFull = yearMovie(movie)

  return (
    <div className="col-6-xs col-4-md col-3-lg col-3-xl ">
      <div className="movie" key={movie.id}>
        <div className="movie__image">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.original_title}
            />
          </Link>
        </div>
        <div className="movie__overview">
          <Link to={`/movie/${movie.id}`}>
            <h4 className="txt-c mb-s">{movie.title}</h4>
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
          <div className="movie__overview__date">
            <h4>{releaseFull}</h4>
            {/* <ul className="movie__overview__genres">
            {namesMovieGenres.slice(0, 2).map((genre, i) => (
              <li key={i} className="movie__overview__genres__genre">
                {genre}
              </li>
            ))}
          </ul> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
