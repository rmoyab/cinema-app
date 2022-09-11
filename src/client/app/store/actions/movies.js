import { types } from '../types/types'

import {
  requestMovieDetailScreen,
  requestMovieScreen,
  requestSearchMovie,
} from '../../api/url'

export const getMovieList = (type, page) => async dispatch => {
  dispatch(getMovies())
  if (page) {
    const res = await requestMovieScreen(page)
      .then(
        ([
          { data: popular },
          { data: toprated },
          { data: mustwatch },
          { data: upcoming },
        ]) => {
          if (type === 'Popular') {
            return dispatch(getMoviesSuccess([popular]))
          }
          if (type === 'Top Rated') {
            return dispatch(getMoviesSuccess([toprated]))
          }
          if (type === 'Must Watch') {
            return dispatch(getMoviesSuccess([mustwatch]))
          }
          if (type === 'Upcoming') {
            return dispatch(getMoviesSuccess([upcoming]))
          }
        }
      )
      .catch(err => {
        console.log(err)
        dispatch(getMoviesFail({ err }))
      })
  } else {
    const res = await requestMovieScreen()
      .then(
        ([
          { data: popular },
          { data: toprated },
          { data: mustwatch },
          { data: upcoming },
        ]) => {
          if (type === 'Popular') {
            return dispatch(getMoviesSuccess([popular]))
          }
          if (type === 'Top Rated') {
            return dispatch(getMoviesSuccess([toprated]))
          }
          if (type === 'Must Watch') {
            return dispatch(getMoviesSuccess([mustwatch]))
          }
          if (type === 'Upcoming') {
            return dispatch(getMoviesSuccess([upcoming]))
          }
        }
      )
      .catch(err => {
        console.log(err)
        dispatch(getMoviesFail({ err }))
      })
  }
}

export const getMovieBanner = () => async dispatch => {
  dispatch(getBanner())
  const res = await requestMovieScreen()
    .then(([{ data: popular }]) => dispatch(getBannerSuccess(popular)))
    .catch(err => {
      dispatch(getBannerFail(err))
    })
}

export const getMovieDetail = id => async dispatch => {
  dispatch(getMovie())
  const res = await requestMovieDetailScreen(id)
    .then(data => dispatch(getMovieSuccess(data)))
    .catch(err => {
      dispatch(getMovieFail(err))
      console.log(err)
    })
}

export const searchMovies = keyword => async dispatch => {
  const res = await requestSearchMovie(keyword)
    .then(data => dispatch(changeSearchField([data.data])))
    .catch(err => {
      console.log(err)
    })
}

const getMovies = () => ({
  type: types.moviesRequestLoading,
})

const getMoviesSuccess = data => ({
  type: types.moviesRequestSuccess,
  payload: data,
})

const getMoviesFail = err => ({
  type: types.moviesRequestFailed,
  payload: { err },
})

const getBanner = () => ({
  type: types.bannerRequestLoading,
})

const getBannerSuccess = data => ({
  type: types.bannerRequestSuccess,
  payload: data,
})

const getBannerFail = err => ({
  type: types.bannerRequestFailed,
  payload: { err },
})

const getMovie = () => ({
  type: types.movieRequestLoading,
})

const getMovieSuccess = data => ({
  type: types.movieRequestSuccess,
  payload: data,
})

const getMovieFail = err => ({
  type: types.movieRequestFailed,
  payload: { err },
})

const changeSearchField = data => ({
  type: types.moviesSearchField,
  payload: data,
})
