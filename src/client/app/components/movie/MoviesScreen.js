import { useContext, useEffect, useState } from 'react'
import 'regenerator-runtime/runtime'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import Loader from '../../components/ui/Loader'
import Navigation from '../../components/ui/Navigation'
import Header from '../../components/ui/Header'
import MoviesList from '../../components/movie/MoviesList'

import { MovieContext } from '../../store/MovieContext.js'
import { useFetchMovies } from '../../hooks/useFetchMovies.js'

import { posterUrl, backdropUrl } from '../../utils/apiUrl.js'

const MoviesScreen = () => {
  const { movies, setMovies } = useContext(MovieContext)
  const { state, fetchMovies, genres, bannerMovies, setPage, query, setQuery } =
    useFetchMovies('')

  const onSearchChange = (e) => {
    setQuery(e.target.value)
    setMovies([])
    setPage(1)
  }

  return (
    <>
      <div className="content__wrapper">
        <nav className="nav">
          <Navigation />
        </nav>
        <header className="header">
          <Header
            posterUrl={posterUrl}
            bannerMovies={bannerMovies}
            backdropUrl={backdropUrl}
            query={query}
            onSearchChange={onSearchChange}
          />
        </header>

        <section className="movies__section">
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMovies}
            hasMore={true}
            loader={<Loader />}
          >
            <MoviesList movies={movies} posterUrl={posterUrl} genres={genres} />
          </InfiniteScroll>
        </section>
      </div>
    </>
  )
}

export default MoviesScreen
