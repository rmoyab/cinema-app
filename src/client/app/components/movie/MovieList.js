import MovieCard from './MovieCard'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getPopularMoviesUrl } from '../../api/url'

import Loader from '../ui/Loader'
import axios from 'axios'
import { getMovieList } from '../../store/actions/movies'
import Scroll from '../ui/Scroll'

const MoviesList = () => {
  const dispatch = useDispatch()

  const moviesRef = useRef()

  const { items: movies, loading } = useSelector(state => state.movieList)

  const [type, setType] = useState('Popular')
  const [active, setActive] = useState(false)

  useEffect(() => {
    dispatch(getMovieList(type))
  }, [])

  // const onReachEnd = async () => {
  //   const page = movies.page + 1
  //   const res = dispatch(getMovieList(page))
  //   console.log(res)

  //   if (res) {
  //     setTimeout(() => {
  //       setMovieList(prev => ({
  //         page: prev.page + 1,
  //         items: [...prev.items, ...res.data.results],
  //       }))
  //     }, 2000)
  //   }
  // }

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
    const page = movies.page + 1
    setTimeout(() => {
      // dispatch(getMovieList(page))
    }, 2000)
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
      <Scroll>
        {!loading && (
          <InfiniteScroll
            dataLength={movies[0].results.length}
            next={loadMore}
            hasMore={false}
            loader={<Loader />}
          >
            <div className="row gap-1 justify-flex-start">
              {movies[0].results.map((movie, id) =>
                movie.poster_path ? <MovieCard movie={movie} key={id} /> : ''
              )}
            </div>
          </InfiniteScroll>
        )}
      </Scroll>
      {/* <button onClick={loadMore} className="btn">
        LOAD MORE
      </button> */}
    </div>
  )
}

export default MoviesList
