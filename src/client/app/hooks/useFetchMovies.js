import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { MovieContext } from '../store/MovieContext.js'

import {
  apiUrl,
  posterUrl,
  backdropUrl,
  genreUrl,
  keyUrl,
} from '../utils/apiUrl.js'

export const useFetchMovies = () => {
  const { movies, setMovies } = useContext(MovieContext)
  const [state, setState] = useState({
    data: [],
    loading: true,
  })
  const [page, setPage] = useState(1)
  const [genres, setGenres] = useState([])
  const [bannerMovies, setBannerMovies] = useState([])
  const [query, setQuery] = useState('')

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
      setState({
        data: res,
        loading: false,
      })
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
    const url = `${apiUrl}/discover/movie?${keyUrl}&primary_release_date.gte=2022-01-30&primary_release_date.lte=2022-03-30`
    const { data } = await axios.get(url)
    const { results: res } = data
    setBannerMovies(res)
  }

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

  return { state, fetchMovies, genres, bannerMovies, setPage, query, setQuery }
}
