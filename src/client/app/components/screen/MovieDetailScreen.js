import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'

import { requestMovieDetailScreen } from '../../api/api'
import { getImageUrl } from '../../api/url'
import { Children } from 'react/cjs/react.production.min'
import lib from 'react-slick/lib'
import {
  getTime,
  movieCompanies,
  movieCredits,
  movieLogo,
  movieTrailer,
} from '../../utils/movieUtils'
import TrailerModal from '../movie/TrailerModal'

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
  const movieCompaniesInfo = movieCompanies(movieData)
  const credits = movieCredits(credit)

  if (!movieData) {
    return <Navigate to="/" />
  }

  const bgImage = {
    backgroundImage: `url(${backdropImage})`,
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
      <div>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div className="movie__detail">
            <div className="">
              <div className="">
                <div className='className="movie__detail__title'>
                  <h1>{movieData.title}</h1>
                  <h3>{movieData.tagline}</h3>
                </div>

                <div className="movie__detail__image">
                  <img src={posterImage} alt={movieData.original_title} />

                  {/* <img src={backdropImage} alt={movieData.original_title} /> */}
                </div>

                <TrailerModal videos={videos} />

                <div className="movie__detail__logo">
                  <img src={movieLogo(images)} alt="" width={200} />
                </div>

                <div className="movie__detail__data">
                  <div className="data__release">
                    <p>
                      Released:{' '}
                      {movieData.release_date
                        ? moment(movieData.release_date).format('LL')
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="data__vote__average">
                    <p>Vote Average:{movieData.vote_average}</p>
                  </div>

                  <div className="data__imbd">
                    <a href={`https://www.imdb.com/title/${movieData.imdb_id}`}>
                      Imbd
                    </a>
                  </div>

                  <div className="data__duration">
                    <p>Duration: {getTime(movieData.runtime)}</p>
                  </div>

                  <div className="data__link">
                    <a href={movieData.homepage}>
                      Homepage: {movieData.homepage}
                    </a>
                  </div>

                  <div className="data__genres">
                    <p>Genres:</p>
                    {movieData.genres.slice(0, 4).map((e) => (
                      <li key={e.id}>
                        {e.name} <br />
                      </li>
                    ))}
                  </div>
                </div>

                <div className="movie__detail__overview">
                  <p>Overview: {movieData.overview}</p>
                </div>

                <div className="movie__detail__credits">
                  <div>
                    <p>Director: {credits.director.name}</p>
                    <img
                      src={getImageUrl(credits.director.profile_path)}
                      alt=""
                    />
                  </div>
                  <div>
                    <p>Writers:</p>
                    {credits.writers.map((w) => (
                      <li key={w.id}>{w.name}</li>
                    ))}
                  </div>
                  <div>
                    <p>Cast:</p>
                    {credits.cast.map((c) => (
                      <li key={c.id}>
                        {c.name} <br />
                        <small>{c.character}</small>
                        <img src={getImageUrl(c.profile_path)} alt={c.name} />
                      </li>
                    ))}
                  </div>
                </div>

                {/* <div className="movie__detail__video">
                  <iframe
                    width="853"
                    height="480"
                    src={movieTrailer(videos)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div> */}

                <div className="movie__detail__companies">
                  <p>Companies:</p>
                  {movieCompaniesInfo.map((e) => (
                    <li key={e.id}>
                      <img
                        src={getImageUrl(e.logo_path, 'w300')}
                        alt={e.name}
                      />
                    </li>
                  ))}
                </div>
              </div>
            </div>

            <div className="movie__detail__bg" style={bgImage}></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MovieDetailScreen
