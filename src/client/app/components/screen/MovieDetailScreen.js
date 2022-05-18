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

import time from '../../../assets/icons/time.svg'
import star from '../../../assets/icons/star.svg'

import link from '../../../assets/icons/link.svg'
import imdb from '../../../assets/icons/imdb.svg'
import fb from '../../../assets/icons/facebook_squared.svg'
import ig from '../../../assets/icons/instagram_squared.svg'
import tw from '../../../assets/icons/witter_squared.svg'
import Navigation from '../ui/Navigation'

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
            <Navigation />
            <div className="container">
              <div className="mt-xxl">
                <div className="row gap-1 justify-center">
                  <div className="col-4-md mt-l">
                    <div className="movie__detail__image">
                      <img src={posterImage} alt={movieData.original_title} />

                      {/* <img src={backdropImage} alt={movieData.original_title} /> */}
                    </div>
                  </div>
                  <div className="col-5-md mt-l">
                    <div className='className="movie__detail__title'>
                      <h1 className="h2">{movieData.title}</h1>
                    </div>

                    <div className="movie__detail__data">
                      <div className="data__genres">
                        <ul>
                          {movieData.genres.slice(0, 3).map((e) => (
                            <li key={e.id}>
                              {e.name} <br />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="data__release mb-s">
                        <p>
                          {movieData.release_date
                            ? moment(movieData.release_date).format('LL')
                            : 'N/A'}
                        </p>
                      </div>
                      <div className="data__group__icons mb-s">
                        <div className="data__duration">
                          <img src={time} alt="" />
                          <p>{getTime(movieData.runtime)}</p>
                        </div>
                        <div className="data__vote__average">
                          <img src={star} alt="" />
                          <p>{movieData.vote_average}</p>
                        </div>
                      </div>

                      {/* <div className="data__imbd">
                        <a
                          href={`https://www.imdb.com/title/${movieData.imdb_id}`}
                        >
                          Imbd
                        </a>
                      </div> */}

                      {/* <div className="data__link">
                        <a href={movieData.homepage}>
                          Homepage: {movieData.homepage}
                        </a>
                      </div> */}
                    </div>

                    <div className="movie__detail__overview">
                      <h4 className="h4">{movieData.tagline}</h4>
                      <p>{movieData.overview}</p>
                    </div>

                    <TrailerModal videos={videos} />

                    <div className="movie__detail__creds mt-l">
                      <div className="credit--director">
                        <p>
                          Director: <span>{credits.director.name}</span>
                        </p>
                      </div>
                      <div className="credit--writter">
                        {credits.writers[0]?.name && (
                          <p>
                            Writer: <span>{credits.writers[0]?.name}</span>
                          </p>
                        )}
                        {/* <ul>
                          {credits.writers.map((w) => (
                            <li key={w.id}>{w.name}</li>
                          ))}
                        </ul> */}
                      </div>
                      <div className="credit--studio">
                        <p>
                          Studio: <span>{movieCompaniesInfo[0].name}</span>
                        </p>
                        {/* {movieCompaniesInfo.map((e) => (
                          <ul>
                            <li key={e.id}>{e.name}</li>
                          </ul>
                        ))} */}
                      </div>
                    </div>

                    <div className="movie__detail__links mt-m">
                      <a href={movieData.homepage}>
                        <img src={link} alt="" />
                      </a>
                      <a
                        href={`https://www.imdb.com/title/${movieData.imdb_id}`}
                      >
                        <img src={imdb} alt="" />
                      </a>

                      <img src={fb} alt="" />
                      <img src={ig} alt="" />
                      <img src={tw} alt="" />
                    </div>
                  </div>

                  <div className="col-3-md mt-l">
                    <div className="movie__detail__logo">
                      <img src={movieLogo(images)} alt="" width={200} />
                    </div>
                  </div>
                </div>

                <div className="row gap-1 justify-center">
                  <div className="col-4-sm col-8-md col-12-xl">
                    <div className="movie__detail__credits">
                      {/* <div className="credit--director">
                        <p>Director: {credits.director.name}</p>
                        <div className="credit__image">
                          <img
                            src={getImageUrl(credits.director.profile_path)}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="credit--writter">
                        <p>Writers:</p>
                        {credits.writers.map((w) => (
                          <li key={w.id}>{w.name}</li>
                        ))}
                      </div> */}
                      <div className="credit--cast">
                        <p>Cast:</p>
                        <ul>
                          {credits.cast.map((c) => (
                            <li key={c.id}>
                              <div className="credit__image">
                                <img
                                  src={getImageUrl(c.profile_path)}
                                  alt={c.name}
                                />
                              </div>
                              <div className="credit__info">
                                <div className="credit__info__name">
                                  {c.name} <br />
                                </div>
                                <div className="credit__info__char">
                                  <small>{c.character}</small>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

                {/* <div className="movie__detail__companies">
                  <p>Companies:</p>
                  {movieCompaniesInfo.map((e) => (
                    <li key={e.id}>
                      <img
                        src={getImageUrl(e.logo_path, 'w300')}
                        alt={e.name}
                      />
                    </li>
                  ))}
                </div> */}
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
