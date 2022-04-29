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
      {isLoaded && (
        <div className="row gap-2 justify-center">
          {state.movies.map((movie, id) =>
            movie.poster_path ? (
              <MovieCard
                movie={movie}
                key={id}
                className="col-12-xs col-6-sm col-4-md col-3-xl col-2-xxl"
              />
            ) : (
              ''
            )
          )}
        </div>
      )}
    </InfiniteScroll>
  )
}

export default MoviesList
