import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import Slider from 'react-slick'

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

import defaultCast from '../../../assets/images/default-cast.png'

let settings = (castItems) => ({
  slidesToScroll: castItems < 10 ? castItems : 10,
  slidesToShow: castItems < 10 ? castItems : 10,
  arrows: false,

  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
})

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
  const posterImage = getImageUrl(movieData.poster_path, 'w500')
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
              <div className="movie__detail__wrapper">
                <div className="row gap-1 justify-center">
                  {/* Movie Poster */}
                  <div className="col-12-xs col-6-md  col-4-xl">
                    <div className="movie__detail__image">
                      <img src={posterImage} alt={movieData.original_title} />

                      {/* <img src={backdropImage} alt={movieData.original_title} /> */}
                    </div>
                  </div>
                  {/* Movie Data */}
                  <div className="col-12-xs col-6-md col-5-xl">
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
                    </div>

                    <div className="movie__detail__overview">
                      <h4 className="h4">{movieData.tagline}</h4>
                      <p>{movieData.overview}</p>
                    </div>

                    <TrailerModal videos={videos} />

                    <div className="movie__detail__credits">
                      <div className="credit">
                        <div className="credit--director">
                          <p>
                            Director <span> {credits.director.name}</span>
                          </p>
                        </div>
                        <div className="credit--writer">
                          {credits.writers[0]?.name && (
                            <p>
                              Writer <span>{credits.writers[0]?.name}</span>
                            </p>
                          )}
                          {/* <ul>
                          {credits.writers.map((w) => (
                            <li key={w.id}>{w.name}</li>
                          ))}
                        </ul> */}
                        </div>
                        <div className="credit--studio">
                          {movieCompaniesInfo[0]?.name && (
                            <p>
                              Studio <span>{movieCompaniesInfo[0]?.name}</span>
                            </p>
                          )}

                          {/* {movieCompaniesInfo.map((e) => (
                          <ul>
                            <li key={e.id}>{e.name}</li>
                          </ul>
                        ))} */}
                        </div>
                      </div>
                    </div>

                    <div className="movie__detail__links">
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
                  {/* Movie Logo */}
                  <div className="col-12-xs col-6-md col-3-xl">
                    {movieLogo(images) && (
                      <div className="movie__detail__logo">
                        <img src={movieLogo(images)} alt={movieData.title} />
                      </div>
                    )}
                  </div>
                </div>
                {/* Movie Cast */}
                <div className="row gap-1 justify-center">
                  <div className="col-12-xs">
                    <div className="movie__detail__cast">
                      <div className="cast">
                        <p className="cast__title">Cast</p>
                        <ul>
                          <Slider {...settings(credits.cast.length)}>
                            {credits.cast.map((c) => (
                              <li className="cast__element" key={c.id}>
                                <div className="cast__image">
                                  {c.profile_path ? (
                                    <img
                                      src={getImageUrl(c.profile_path, 'w300')}
                                      alt={c.name}
                                    />
                                  ) : (
                                    <img
                                      className="cast__image__default"
                                      src={defaultCast}
                                      alt={c.name}
                                    />
                                  )}
                                </div>
                                <div className="cast__info">
                                  <p className="cast__info__name">
                                    {c.name} <br />
                                  </p>
                                  <div className="cast__info__char">
                                    <small>{c.character}</small>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </Slider>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Movie Bg Image */}
            <div className="movie__detail__bg" style={bgImage}></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MovieDetailScreen
