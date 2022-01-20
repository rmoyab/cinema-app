import { useContext } from 'react'
import { MovieContext } from '../store/MovieContext'

export const getMovieById = (id = 0) => {
  const { movies } = useContext(MovieContext)
  return movies.find((m) => m.id === id)
}
