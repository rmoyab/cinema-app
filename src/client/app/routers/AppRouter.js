import { Routes, Route, BrowserRouter } from 'react-router-dom'

import MovieDetailScreen from '../components/screen/MovieDetailScreen'
import MovieScreen from '../components/screen/MovieScreen'

import MoviesApp from '../MoviesApp'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieScreen />} />
        <Route path="movie/:id" element={<MovieDetailScreen />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
