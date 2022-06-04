import { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { motion } from 'framer-motion'

import Header from '../ui/Header'
import MovieList from '../movie/MovieList'
import Loader from '../ui/Loader'
import Search from '../search/Search'

import { requestMovieScreen, requestSearchMovie } from '../../api/api'
import { getImageUrl, getPopularMoviesUrl } from '../../api/url'

import { request } from '../../api/api'

const MovieScreen = () => {
  const [contentMovies, setContentMovies] = useState({
    movies: {},
    isLoaded: false,
    page: 1,
  })
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = () => {
    requestMovieScreen(callbackRequest)
  }

  let callbackRequest = (response) => {
    const [popular, topRated, mustWatch, upcoming] = response
    setContentMovies({
      movies: { popular, topRated, mustWatch, upcoming },
      isLoaded: true,
      page: 1,
    })
  }

  const newMovies = async (query) => {
    const otherMovies = await requestSearchMovie(query)
    if (otherMovies) {
      setContentMovies({
        movies: otherMovies,
        isLoaded: true,
        page: 1,
      })
    }
  }

  // console.log('content', contentMovies.movies)

  const {
    movies: { popular },
    isLoaded,
  } = contentMovies

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const onSearchChange = (e) => {
    setQuery(e.target.value)
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
      <div className="">
        <Header />
        <Search
          query={query}
          onSearchChange={onSearchChange}
          handleSearch={handleSearch}
        />
      </div>
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="wrapper">
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
