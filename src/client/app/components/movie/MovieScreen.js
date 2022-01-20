import { useMemo } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { getMovieById } from '../../selectors/getMovieById'

const MovieScreen = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()

  const movie = getMovieById(parseInt(movieId))

  if (!movie) {
    return <Navigate to="/" />
  }

  const { original_title } = movie

  return (
    <div>
      <h1>{original_title}</h1>
    </div>
  )
}

export default MovieScreen
