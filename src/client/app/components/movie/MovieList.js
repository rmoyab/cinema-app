import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect } from 'react'

import { request } from '../../api/api'
import { getPopularMoviesUrl } from '../../api/url'

import Loader from '../ui/Loader'

const MoviesList = ({ movies, isLoaded }) => {
  const [movieList, setMovieList] = useState({
    page: 1,
    movies: movies.results,
  })

  useEffect(() => {
    setMovieList({
      page: 1,
      movies: movies.results,
    })
  }, [movies])

  const onReachEnd = async () => {
    const page = { page: movieList.page + 1 }
    const response = await request(getPopularMoviesUrl(page))

    if (response) {
      setMovieList((prev) => ({
        page: prev.page + 1,
        movies: [...prev.movies, ...response.results],
      }))
    }
  }

  return (
    <InfiniteScroll
      dataLength={movieList.movies.length}
      next={onReachEnd}
      hasMore={true}
      loader={<Loader />}
    >
      {isLoaded && (
        <div className="row gap-1 justify-center">
          {movieList.movies.map((movie, id) =>
            movie.poster_path ? <MovieCard movie={movie} key={id} /> : ''
          )}
        </div>
      )}
    </InfiniteScroll>
  )
}

export default MoviesList
