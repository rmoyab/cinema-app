import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'

import MovieDetailScreen from '../components/screen/MovieDetailScreen'
import MovieScreen from '../components/screen/MovieScreen'
import LoginScreen from '../components/screen/LoginScreen'
// import RegisterScreen from '../components/screen/RegisterScreen'

import { PublicRoute } from './PublicRoute'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <MovieScreen />
            </PublicRoute>
          }
        />
        <Route
          path="movie/:id"
          element={
            <PublicRoute>
              <MovieDetailScreen />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />
        {/* <Route
          path="register"
          element={
            <PublicRoute>
              <RegisterScreen />
            </PublicRoute>
          }
        /> */}
        {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
