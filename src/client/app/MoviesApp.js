import { useState } from 'react'
import AppRouter from './routers/AppRouter'
import { MovieContext } from './store/MovieContext'

const MoviesApp = () => {
  const [movies, setMovies] = useState([])
  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      <AppRouter />
    </MovieContext.Provider>
  )
}

export default MoviesApp
