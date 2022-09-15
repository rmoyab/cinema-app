import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { motion } from 'framer-motion'

import Header from '../ui/Header'
import MovieList from '../movie/MovieList'
import Loader from '../ui/Loader'

import { requestMovieScreen, requestSearchMovie } from '../../api/api'
import { getImageUrl, getPopularMoviesUrl } from '../../api/url'

import { fetchMovies } from '../../store/actions/movies'
import Banner from '../ui/Banner'
import Footer from '../ui/Footer'

const MovieScreen = () => {
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
      transition={{ duration: 1.2 }}
    >
      <header className="header__section">
        <Header />
      </header>

      <section className="movies__section">
        <MovieList />
      </section>

      <footer className="footer__section">
        <Footer />
      </footer>
    </motion.div>
  )
}

export default MovieScreen
