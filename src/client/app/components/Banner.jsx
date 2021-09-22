import React, { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'

import { gsap } from 'gsap'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Banner = ({ bannerMovies, backdropUrl, posterUrl }) => {
  const nextMovies = bannerMovies.slice(0, 10)

  const coverRef = useRef()

  const dateRelease = (movie) => {
    let releaseYear = movie.release_date.substring(0, 4)
    let releaseMonth = movie.release_date.substring(5, 7)
    let releaseDay = movie.release_date.substring(8, 10)

    return `${releaseMonth}/${releaseDay}/${releaseYear}`
  }

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

  return (
    <div className="header__banner">
      <Slider {...settings}>
        {bannerMovies.map((movie, i) =>
          movie.backdrop_path ? (
            <div key={i} className="banner">
              <div className="banner__title">
                <h4 className="mb-s">{`Coming Soon...  ${dateRelease(
                  movie
                )}`}</h4>
                <h1>{movie.title}</h1>
              </div>

              <div className="banner__cover" ref={coverRef}>
                <img src={`${posterUrl}${movie.poster_path}`} alt="" />
              </div>

              <div className="banner__image">
                <img src={`${backdropUrl}${movie.backdrop_path}`} alt="" />
              </div>
            </div>
          ) : (
            ''
          )
        )}
      </Slider>
    </div>
  )
}

export default Banner
