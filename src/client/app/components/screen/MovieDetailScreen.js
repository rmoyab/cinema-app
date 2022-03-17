import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { requestMovieDetailScreen } from '../../api/api'
import { getImageUrl } from '../../api/url'

const MovieDetailScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [state, setState] = useState({
    movieData: {},
    credit: {},
    images: {},
    videos: {},
    recommendations: {},
    isLoaded: false,
  })

  useEffect(async () => {
    await requestMovieDetailScreen(id, callbackRequest)
  }, [])

  const callbackRequest = (response) => {
    const [movieData, credit, images, videos, recommendations] = response
    setState({
      movieData,
      credit,
      images,
      videos,
      recommendations,
      isLoaded: true,
    })
  }

  const { movieData, credit, isLoaded, images, videos, recommendations } = state

  const backdropImage = getImageUrl(movieData.backdrop_path, 'original')
  const posterImage = getImageUrl(movieData.poster_path, 'w300')

  if (!movieData) {
    return <Navigate to="/" />
  }

  return (
    <div>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div className="movie__detail">
          <h1>{movieData.title}</h1>
          <div className="movie__image">
            <img
              src={posterImage}
              alt={movieData.original_title}
              style={{ width: 300 }}
            />
            <img src={backdropImage} alt={movieData.original_title} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetailScreen
