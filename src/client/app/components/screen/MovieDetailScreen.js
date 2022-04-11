import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { requestMovieDetailScreen } from '../../api/api'
import { getImageUrl } from '../../api/url'
import { Children } from 'react/cjs/react.production.min'
import lib from 'react-slick/lib'
import { movieLogo, movieTrailer } from '../../utils/movieUtils'

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

  useEffect(() => {
    requestMovieDetailScreen(id, callbackRequest)
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

  const bgStyles = {
    backgroundImage: `url(${backdropImage})`,
    backgroundColor: `Black`,
    height: '100vh',
    width: '100vw',
    backgroundPosition: 'top center',
    backgroundSize: 'cover',
  }

  const vidRes = {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: '0',
  }

  const vidResFrame = {
    left: '0',
    top: '0',
    height: '100%',
    width: '100%',
    position: 'absolute',
  }

  const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5 }}
    >
      <div style={{ height: '100vh' }}>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div className="movie__detail" style={bgStyles}>
            <h1>{movieData.title}</h1>
            <div
              className="movie__image"
              style={{ width: '300px', height: '400px' }}
            >
              <img
                src={posterImage}
                alt={movieData.original_title}
                style={{ width: '100%', height: '100%' }}
              />

              <div style={vidRes}>
                <iframe
                  style={vidResFrame}
                  width="853"
                  height="480"
                  src={movieTrailer(videos)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
              <div>
                <img src={movieLogo(images)} alt="" width={200} />
              </div>

              <h2>
                {credit.cast.slice(0, 5).map((e) => (
                  <li key={e.id}>
                    {e.name} <br />
                    <small>{e.character}</small>
                  </li>
                ))}
              </h2>
              {/* <img src={backdropImage} alt={movieData.original_title} /> */}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MovieDetailScreen
