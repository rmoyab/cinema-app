import {
  Navigate,
  useParams,
  useNavigate,
  NavLink,
  useLocation,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import Slider from 'react-slick'
import ReactGA from 'react-ga4'

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

import {
  FiClock,
  FiStar,
  FiLink,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiChevronLeft,
} from 'react-icons/fi'

import { SiImdb } from 'react-icons/si'

import imdb from '../../../assets/icons/imdb.svg'

import Navigation from '../ui/Navigation'

import defaultCast from '../../../assets/images/default-cast.png'
import Loader from '../ui/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieDetail } from '../../store/actions/movies'
import Footer from '../ui/Footer'

let settings = castItems => ({
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
  const dispatch = useDispatch()
  let { pathname } = useLocation()

  const { loading, results: items } = useSelector(state => state.movieDetail)

  const [movieData, credit, images, videos, recommendations] = items

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getMovieDetail(id))
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [])

  let movieDetailInfo = {
    backdropImage: {},
    posterImage: {},
    movieCompaniesInfo: {},
    credits: {},
  }

  if (!loading) {
    const [movieData, credit, images, videos, recommendations] = items
    movieDetailInfo = {
      backdropImage: getImageUrl(movieData.data.backdrop_path, 'w1280'),
      posterImage: getImageUrl(movieData.data.poster_path, 'w500'),
      movieCompaniesInfo: movieCompanies(movieData.data),
      credits: movieCredits(credit.data),
    }

    if (!movieData.data) {
      return <Navigate to="/" />
    }
  }

  const bgImage = {
    backgroundImage: `url(${movieDetailInfo.backdropImage})`,
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
      {loading ? (
        <Loader />
      ) : (
        <div className="movie__detail">
          <Navigation />
          <div className="container">
            {/* <NavLink to="/" className="breadcrumbs">
                Back
              </NavLink> */}
            <div className="row gap-1 justify-flex-start">
              <div className="col-12-xs col-6-md  col-4-xl">
                <div className="back-section">
                  <button
                    className="btn btn__back"
                    onClick={() => navigate(-1)}
                  >
                    {' '}
                    <FiChevronLeft />
                  </button>
                </div>
              </div>
            </div>
            <div className="movie__detail__wrapper">
              <div className="row gap-1 justify-center">
                {/* Movie Poster */}
                <div className="col-12-xs col-6-md  col-4-xl">
                  <div className="movie__detail__image">
                    <img
                      src={movieDetailInfo.posterImage}
                      alt={movieData.data.original_title}
                    />

                    {/* <img src={backdropImage} alt={movieData.original_title} /> */}
                  </div>
                </div>
                {/* Movie Data */}
                <div className="col-12-xs col-6-md col-5-xl">
                  <div className='className="movie__detail__title'>
                    <h1 className="h2">{movieData.data.title}</h1>
                  </div>

                  <div className="movie__detail__data">
                    <div className="data__genres">
                      <ul>
                        {movieData.data.genres.slice(0, 3).map(e => (
                          <li key={e.id}>
                            {e.name} <br />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="data__release mb-s">
                      <p>
                        {movieData.data.release_date
                          ? moment(movieData.data.release_date).format('LL')
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="data__group__icons mb-s">
                      <div className="data__duration">
                        <FiClock />
                        <p>{getTime(movieData.data.runtime)}</p>
                      </div>
                      <div className="data__vote__average">
                        <FiStar />
                        <p>{movieData.data.vote_average}</p>
                      </div>
                    </div>
                  </div>

                  <div className="movie__detail__overview">
                    <h4 className="h4">{movieData.data.tagline}</h4>
                    <p>{movieData.data.overview}</p>
                  </div>

                  <TrailerModal videos={videos.data} />

                  <div className="movie__detail__credits">
                    <div className="credit">
                      <div className="credit--director">
                        <p>
                          Director{' '}
                          <span> {movieDetailInfo.credits.director.name}</span>
                        </p>
                      </div>
                      <div className="credit--writer">
                        {movieDetailInfo.credits.writers[0]?.name && (
                          <p>
                            Writer{' '}
                            <span>
                              {movieDetailInfo.credits.writers[0]?.name}
                            </span>
                          </p>
                        )}
                        {/* <ul>
                          {credits.writers.map((w) => (
                            <li key={w.id}>{w.name}</li>
                          ))}
                        </ul> */}
                      </div>
                      <div className="credit--studio">
                        {movieDetailInfo.movieCompaniesInfo[0]?.name && (
                          <p>
                            Studio{' '}
                            <span>
                              {movieDetailInfo.movieCompaniesInfo[0]?.name}
                            </span>
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
                    <a href={movieData.data.homepage}>
                      <FiLink />
                    </a>
                    <a
                      href={`https://www.imdb.com/title/${movieData.data.imdb_id}`}
                    >
                      <SiImdb />
                    </a>

                    <FiFacebook />
                    <FiInstagram />
                    <FiTwitter />
                  </div>
                </div>
                {/* Movie Logo */}
                <div className="col-12-xs col-6-md col-3-xl">
                  {movieLogo(images.data) && (
                    <div className="movie__detail__logo">
                      <img
                        src={movieLogo(images.data)}
                        alt={movieData.data.title}
                      />
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
                        <Slider
                          {...settings(movieDetailInfo.credits.cast.length)}
                        >
                          {movieDetailInfo.credits.cast.map(c => (
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
          <Footer />
        </div>
      )}
    </motion.div>
  )
}

export default MovieDetailScreen
