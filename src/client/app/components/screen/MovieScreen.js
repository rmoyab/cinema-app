import { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Navigation from '../ui/Navigation'
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

  return (
    <>
      <div>
        {!isLoaded ? (
          <div>Loading...</div>
        ) : (
          <div className="content__wrapper">
            <nav className="nav">
              <Navigation />
            </nav>
            <header className="header">
              <Header upcomingMovies={upcoming} isLoaded={isLoaded} />
            </header>

            <section className="movies__section">
              <MovieList movies={popular} isLoaded={isLoaded} />
            </section>
          </div>
        )}
      </div>
    </>
  )
}

export default MovieScreen
