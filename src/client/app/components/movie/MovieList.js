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
import { FiChevronDown } from 'react-icons/fi'

const MoviesList = () => {
  const dispatch = useDispatch()

  const moviesRef = useRef()

  const {
    results: movies,
    loading,
    searching,
    keyword,
  } = useSelector(state => state.movieList)
  const { favorites } = useSelector(state => state.favs)
  const { uid } = useSelector(state => state.auth)

  const [type, setType] = useState('Popular')
  const [active, setActive] = useState(false)

  useEffect(() => {
    dispatch(getMovieList(type))
    if (uid) {
      dispatch(getFavoriteList())
    }
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
    if (searching) {
      setTimeout(() => {
        dispatch(getMoreSearchMovies())
        setActive(true)
      }, 1000)
    } else {
      setTimeout(() => {
        dispatch(getMoreMovies(type))
        setActive(true)
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
      </div>

      {searching ? (
        <h3 className="mb-l mt-l">Movies about: "{keyword}"</h3>
      ) : (
        <h3 className="mb-l mt-l">{type} Movies</h3>
      )}

      {!loading && (
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMore}
          hasMore={active}
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

      <div className="load-more-btn">
        {!active && (
          <button onClick={loadMore} className="btn btn__icon">
            <FiChevronDown />
            Load More
          </button>
        )}
      </div>
    </div>
  )
}

export default MoviesList
