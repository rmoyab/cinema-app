import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPopularMoviesUrl } from '../../api/url'

import Loader from '../ui/Loader'
import axios from 'axios'
import {
  getMoreMovies,
  getMoreSearchMovies,
  getMovieList,
} from '../../store/actions/movies'
import Scroll from '../ui/Scroll'
import { getFavoriteList } from '../../store/actions/favorites'

const MoviesList = () => {
  const dispatch = useDispatch()

  const moviesRef = useRef()

  const {
    results: movies,
    loading,
    searching,
  } = useSelector(state => state.movieList)
  const { favorites } = useSelector(state => state.favs)

  const [type, setType] = useState('Popular')
  const [active, setActive] = useState(false)

  useEffect(() => {
    dispatch(getMovieList(type))
    dispatch(getFavoriteList())
  }, [])

  const handleType = e => {
    e.preventDefault()
    const newType = e.target.innerText
    setType(newType)
    // setActive(true)
    dispatch(getMovieList(newType))
    // let rect = moviesRef.current.getBoundingClientRect()
    // console.log(rect.top)
    // const h = window.scrollY
    // console.log(h)
  }

  const loadMore = () => {
    console.log(searching)
    if (searching) {
      setTimeout(() => {
        dispatch(getMoreSearchMovies())
      }, 1000)
    } else {
      setTimeout(() => {
        dispatch(getMoreMovies(type))
      }, 1000)
    }
  }

  return (
    <div className="" ref={moviesRef}>
      <div className="btn-group">
        <button
          type="button"
          onClick={handleType}
          className="btn btn-group__item btn__small"
        >
          Popular
        </button>
        <button
          type="button"
          onClick={handleType}
          className="btn btn-group__item btn__small"
        >
          Must Watch
        </button>
        <button
          type="button"
          onClick={handleType}
          className="btn btn-group__item btn__small"
        >
          Top Rated
        </button>
        <button
          type="button"
          onClick={handleType}
          className="btn btn-group__item btn__small"
        >
          Upcoming
        </button>
      </div>
      <h3 className="mb-l mt-l">{type} Movies</h3>

      {!loading && (
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMore}
          hasMore={true}
          loader={<Loader />}
        >
          <div className="row gap-1 justify-flex-start">
            {movies.map((movie, id) =>
              movie.poster_path ? (
                <MovieCard movie={movie} favorites={favorites} key={id} />
              ) : (
                ''
              )
            )}
          </div>
        </InfiniteScroll>
      )}

      {/* <button onClick={loadMore} className="btn">
        LOAD MORE
      </button> */}
    </div>
  )
}

export default MoviesList
