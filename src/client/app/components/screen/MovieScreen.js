import { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { motion } from 'framer-motion'

import Header from '../ui/Header'
import MovieList from '../movie/MovieList'
import Loader from '../ui/Loader'

import { requestMovieScreen } from '../../api/api'
import { getImageUrl, getPopularMoviesUrl } from '../../api/url'

import { MovieTypes } from '../../types/Types'

import { request } from '../../api/api'

const MovieScreen = () => {
  const [state, setState] = useState({
    moviesData: {},
    isLoaded: false,
    page: 1,
  })

  useEffect(() => {
    requestMovieScreen(callbackRequest)
  }, [])

  let callbackRequest = (response) => {
    const [popular, topRated, mustWatch, upcoming] = response
    setState({
      moviesData: { popular, topRated, mustWatch, upcoming },
      isLoaded: true,
      page: 1,
    })
  }

  const {
    moviesData: { popular, upcoming },
    isLoaded,
  } = state

  const onSearchChange = (e) => {
    setQuery(e.target.value)
    setMovies([])
    setPage(1)
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
      transition={{ duration: 1.2 }}
    >
      {!isLoaded ? (
        <div className="loading">
          <Loader />
        </div>
      ) : (
        <div className="wrapper">
          <Header upcomingMovies={upcoming} isLoaded={isLoaded} />

          <section className="movies__section">
            <div className="container-fluid">
              <MovieList movies={popular} isLoaded={isLoaded} />
            </div>
          </section>
        </div>
      )}
    </motion.div>
  )
}

export default MovieScreen
