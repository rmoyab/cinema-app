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
import Search from '../search/Search'

const MoviesList = () => {
  const dispatch = useDispatch()

  const {
    results: movies,
    loading,
    searching,
    keyword,
  } = useSelector(state => state.movieList)
  const { favorites } = useSelector(state => state.favs)
  const { uid } = useSelector(state => state.auth)
  const { item } = useSelector(state => state.movieList)

  const moviesRef = useRef()

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
    setActive(false)
    const newType = e.target.innerText
    setType(newType)
    dispatch(getMovieList(newType))
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
    <div className="container" ref={moviesRef}>
      <div className="option-fields">
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
        <Search setActive={setActive} />
      </div>

      <div className="movies-title">
        {searching ? (
          <h3 className="">Movies about: "{keyword}"</h3>
        ) : (
          <h3 className="">{type} Movies</h3>
        )}
      </div>

      <div className="movies-infinite">
        {!loading && (
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMore}
            hasMore={active}
            loader={item.total_results !== movies.length ? <Loader /> : ''}
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
      </div>

      <div className="load-more-btn">
        {item.total_results !== movies.length && (
          <div>
            {!active && (
              <button onClick={loadMore} className="btn btn__icon">
                <FiChevronDown />
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoviesList
