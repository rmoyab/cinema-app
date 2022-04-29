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

const Banner = ({ upcomingMovies, isLoaded }) => {
  const [movies, setMovies] = useState({
    newMovies: [],
    isLoading: true,
  })
  const coverRef = useRef()

  const handleDate = (date) => {
    return moment(date).format('DD-MM-YYYY')
  }

  const getMovies = async () => {
    const res = await movieUnreleased(upcomingMovies)
    if (res) {
      setMovies({
        newMovies: res,
        isLoading: false,
      })
    }
  }
  getMovies()
  const { newMovies, isLoading } = movies

  return (
    <div className="header__banner">
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div className="banner">
          <Slider {...settings}>
            {upcomingMovies.results.map((movie, i) => (
              <div key={movie.id} className="banner__content">
                <div className="banner__content__elements">
                  <div className="banner__elements__info">
                    <div className="info__title">
                      <Link to={`/movie/${movie.id}`}>
                        <h1>
                          {movie.title}
                          <span className="info__title__year">
                            {' '}
                            {`(${moment(movie.release_date).format('YYYY')})`}
                          </span>
                        </h1>
                      </Link>
                    </div>

                    <div className="info__date">
                      <h4>{moment(movie.release_date).format('L')}</h4>
                    </div>

                    <div className="info__overview mt-s">
                      <p>
                        {movie.overview.replace(/^(.{100}[^\s]*).*/, '$1')}
                        <Link to={`/movie/${movie.id}`}> ...more</Link>
                      </p>
                    </div>

                    <div
                      className={`info__vote mt-s info__vote--${setVoteClass(
                        movie.vote_average
                      )}`}
                    >
                      <h3>
                        {movie.vote_average ? `${movie.vote_average}/10` : 'NR'}
                      </h3>
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

                  <div className="banner__elements__cover" ref={coverRef}>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={getImageUrl(movie.poster_path, 'w300')}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div className="banner__content__bg__image">
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
