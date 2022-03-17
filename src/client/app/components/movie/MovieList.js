import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'

import { request } from '../../api/api'
import { getPopularMoviesUrl } from '../../api/url'

import Loader from '../ui/Loader'

const MoviesList = ({ movies, isLoaded }) => {
  const [state, setState] = useState({
    page: 1,
    movies: movies.results,
  })

  const onReachEnd = async () => {
    const page = { page: state.page + 1 }
    const response = await request(getPopularMoviesUrl(page))

    if (response) {
      setState((prev) => ({
        page: prev.page + 1,
        movies: [...prev.movies, ...response.results],
      }))
    }
  }

  return (
    <InfiniteScroll
      dataLength={state.movies.length}
      next={onReachEnd}
      hasMore={true}
      loader={<Loader />}
    >
      <div className="movies__wrapper">
        {isLoaded && (
          <div className="movies grid-auto-xl grid-gap-lg">
            {state.movies.map((movie, id) =>
              movie.poster_path ? <MovieCard movie={movie} key={id} /> : ''
            )}
          </div>
        )}
      </div>
    </InfiniteScroll>
  )
}

export default MoviesList
