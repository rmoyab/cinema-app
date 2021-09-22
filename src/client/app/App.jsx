import { useEffect, useState } from 'react'
import 'regenerator-runtime/runtime'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

import {
  apiUrl,
  posterUrl,
  backdropUrl,
  genreUrl,
  keyUrl,
} from './utils/apiUrl'

import Loader from './components/Loader'
import Navigation from './components/Navigation'
import Header from './components/Header'
import Movies from './components/Movies'

const App = () => {
  const [username, setUsername] = useState(null)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [genres, setGenres] = useState([])
  const [bannerMovies, setBannerMovies] = useState([])

  const getGenders = async () => {
    const { data } = await axios.get(genreUrl)
    const { genres: res } = data
    setGenres(res)
  }

  useEffect(() => {
    fetchMovies()
    getGenders()
  }, [query])

  useEffect(() => {
    fetchBannerMovies()
  }, [])

  const fetchMovies = async () => {
    let url = ''
    if (query.length) {
      url = `${apiUrl}/search/movie?${keyUrl}&query=${query}&page=${page}`
    } else {
      url = `${apiUrl}/discover/movie?${keyUrl}&page=${page}`
    }
    if (page <= 1) {
      const { data } = await axios.get(url)
      const { results: res } = data
      setMovies(res)
      setPage(2)
    } else {
      const { data } = await axios.get(url)
      const { results: res } = data
      setMovies(movies.concat(res))
      setPage(page + 1)
    }
  }

  const fetchBannerMovies = async () => {
    const url = `${apiUrl}/discover/movie?${keyUrl}&primary_release_date.gte=2021-09-30&primary_release_date.lte=2021-10-30`
    const { data } = await axios.get(url)
    const { results: res } = data
    setBannerMovies(res)
  }

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
            <Movies movies={movies} posterUrl={posterUrl} genres={genres} />
          </InfiniteScroll>
        </section>
      </div>
    </>
  )
}

export default App
