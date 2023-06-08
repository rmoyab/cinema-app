import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MovieDetailScreen from '../components/screen/MovieDetailScreen'
import MovieScreen from '../components/screen/MovieScreen'
import LoginScreen from '../components/screen/LoginScreen'
// import RegisterScreen from '../components/screen/RegisterScreen'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

import { startChecking } from '../store/actions/auth'
import { useEffect } from 'react'
import MovieFavoritesScreen from '../components/screen/MovieFavoritesScreen'

const AppRouter = () => {
  const dispatch = useDispatch()
  const { checking, uid } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) {
    return <h5>Loading...</h5>
  }
  return (
    <Router>
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
        
        {uid ? (
          <Route
            path="login"
            element={
              <PrivateRoute>
                <LoginScreen />
              </PrivateRoute>
            }
          />
        ) : (
          <Route
            path="login"
            element={
              <PublicRoute>
                <LoginScreen />
              </PublicRoute>
            }
          />
        )}

        <Route
          path="favorites"
          element={
            <PrivateRoute isAuth={!!uid}>
              <MovieFavoritesScreen />
            </PrivateRoute>
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
    </Router>
  )
}

export default AppRouter
