import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import moment from 'moment'

import { yearMovie, setVoteClass } from '../../utils/movieUtils'
import { getImageUrl } from '../../api/url'
import { addFavorite } from '../../store/actions/favorites'

const MovieCard = ({ movie, favorites }) => {
  const dispatch = useDispatch()
  const releaseFull = yearMovie(movie)

  const movieAverage = vote_avg => {
    const avg = Math.round(vote_avg * 10) / 10
    return avg ? avg : 'NR'
  }

  const { uid } = useSelector(state => state.auth)

  const now = moment().toDate()

  const handleNewFav = e => {
    e.preventDefault()
    const favorite = {
      movieId: movie.id,
      movieTitle: movie.title,
      movieImgPath: movie.poster_path,
      saved_at: now,
    }

    dispatch(addFavorite(favorite))
  }

  const checkFavorite = () =>
    favorites.some(f => parseInt(f.movieId) === movie.id)
  const isFavorite = checkFavorite()

  return (
    <div className="col-6-xs col-4-md col-3-lg col-2-xl ">
      <div className="movie" key={movie.id}>
        <div className="movie__image">
          <Link to={`/movie/${movie.id}`}>
            <img
              src={getImageUrl(movie.poster_path, 'w300')}
              alt={movie.title}
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
            <h4>{movieAverage(movie.vote_average)}</h4>
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
          {uid && (
            <div className="movie__overview__like" onClick={handleNewFav}>
              {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
