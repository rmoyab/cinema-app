import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import moment from 'moment'

import { setVoteClass } from '../../utils/movieUtils'
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
  const coverRef = useRef()

  const handleDate = (date) => {
    return moment(date).format('DD-MM-YYYY')
  }

  return (
    <div className="header__banner">
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Slider {...settings}>
            {upcomingMovies.results.map((movie, i) => (
              <div key={movie.id} className="banner">
                <div className="banner__title">
                  <Link to={`/movie/${movie.id}`}>
                    <h1 className="mb-s">{movie.title}</h1>
                  </Link>

                  {/* <h4 className="mb-s">
                    Coming Soon... {handleDate(movie.release_date)}
                  </h4> */}

                  {/* <div className="banner__overview mb-s">
                    <p>{movie.overview}</p>
                  </div> */}

                  {/* <div
                    className={`banner__vote banner__vote--${setVoteClass(
                      movie.vote_average
                    )}`}
                  >
                    <h3>
                      {movie.vote_average ? `${movie.vote_average}/10` : 'NR'}
                    </h3>
                  </div> */}

                  {/* <ul className="banner__genres">
                      {genreMovie(movie, genres)
                        .slice(0, 2)
                        .map((genre, i) => (
                          <li key={i} className="banner__genres__genre">
                            {genre}
                          </li>
                        ))}
                    </ul> */}
                </div>

                <div className="banner__cover" ref={coverRef}>
                  <Link to={`/movie/${movie.id}`}>
                    <img src={getImageUrl(movie.poster_path, 'w300')} alt="" />
                  </Link>
                </div>

                <div className="banner__image">
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
