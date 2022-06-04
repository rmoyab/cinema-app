import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import moment from 'moment'

import {
  genreMovie,
  movieUnreleased,
  setVoteClass,
} from '../../utils/movieUtils'
import { getImageUrl } from '../../api/url'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { requestMovieScreen } from '../../api/api'
import Loader from './Loader'

let settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  autoplay: true,
  speed: 1000,
  pauseOnHover: true,
  fade: true,
  cssEase: 'linear',
  arrows: false,
}

const Banner = () => {
  const [bannerMovies, setBannerMovies] = useState({
    movies: {},
    isLoaded: false,
  })

  const [hover, setHover] = useState(false)
  const coverRef = useRef()

  useEffect(() => {
    fetchBannerMovies()
  }, [])

  const fetchBannerMovies = () => {
    requestMovieScreen(callbackBannerRequest)
  }

  let callbackBannerRequest = (response) => {
    const [upcoming] = response
    setBannerMovies({
      movies: upcoming,
      isLoaded: true,
    })
  }

  const handleHover = () => {
    setHover((s) => !s)
  }

  // const getMovies = async () => {
  //   const res = await movieUnreleased(upcomingMovies)
  //   if (res) {
  //     setMovies({
  //       newMovies: res,
  //       isLoading: false,
  //     })
  //   }
  // }

  const { movies: upcoming, isLoaded } = bannerMovies

  const bgBlur = {
    filter: 'blur(4px)',
  }

  return (
    <div className="header__banner">
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="banner">
          <Slider {...settings}>
            {upcoming.results.map((movie, i) => (
              <div key={movie.id} className="banner__content">
                <div className="banner__content__elements">
                  <div className="banner__elements__info">
                    <div className="info__title">
                      <Link to={`/movie/${movie.id}`}>
                        <h1 className="h1">
                          {movie.title}
                          {/* <span className="info__title__year">
                            {' '}
                            {`(${moment(movie.release_date).format('YYYY')})`}
                          </span> */}
                        </h1>
                      </Link>
                    </div>

                    <div className="info__date">
                      <p>{moment(movie.release_date).format('LL')}</p>
                    </div>

                    <div className="info__overview mt-s">
                      <p>
                        {movie.overview.replace(/^(.{100}[^\s]*).*/, '$1')}
                        <Link to={`/movie/${movie.id}`}>
                          {' '}
                          <span>...more</span>
                        </Link>
                      </p>
                    </div>

                    <div
                      className={`info__vote mt-s info__vote--${setVoteClass(
                        movie.vote_average
                      )}`}
                    >
                      <h4>
                        {movie.vote_average ? `${movie.vote_average}` : 'NR'}
                      </h4>
                    </div>

                    <ul className="banner__genres">
                      {/* {genreMovie(movie, genres)
                        .slice(0, 2)
                        .map((genre, i) => (
                          <li key={i} className="banner__genres__genre">
                            {genre}
                          </li>
                        ))} */}
                    </ul>
                  </div>

                  <div
                    className="banner__elements__cover"
                    ref={coverRef}
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                  >
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={getImageUrl(movie.poster_path, 'w300')}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className="banner__content__bg__image"
                  style={hover ? bgBlur : {}}
                >
                  <img
                    src={getImageUrl(movie.backdrop_path, 'original')}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default Banner
