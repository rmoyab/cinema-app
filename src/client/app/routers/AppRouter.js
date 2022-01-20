import { Routes, Route, BrowserRouter } from 'react-router-dom'

import MovieScreen from '../components/movie/MovieScreen'
import MoviesScreen from '../components/movie/MoviesScreen'

import MoviesApp from '../MoviesApp'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesScreen />} />
        <Route path="movie/:movieId" element={<MovieScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
