import { types } from '../types/types'

import {
  getUpcomingMoviesUrl,
  requestMovieDetailScreen,
  requestMovieScreen,
  requestSearchMovie,
} from '../../api/url'

export const getMovieList =
  (type, page = 1) =>
  async dispatch => {
    dispatch(getMovies())
    const res = await requestMovieScreen(page)
      .then(([{ data: popular }, { data: toprated }, { data: mustwatch }]) => {
        if (type === 'Popular') {
          return dispatch(getMoviesSuccess(popular))
        }
        if (type === 'Top Rated') {
          return dispatch(getMoviesSuccess(toprated))
        }
        if (type === 'Must Watch') {
          return dispatch(getMoviesSuccess(mustwatch))
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(getMoviesFail({ err }))
      })
  }

export const getMoreMovies = type => async (dispatch, getState) => {
  const { page } = getState().movieList

  const res = requestMovieScreen(page)
    .then(([{ data: popular }, { data: toprated }, { data: mustwatch }]) => {
      if (type === 'Popular') {
        return dispatch(getMoreSuccess(popular))
      }
      if (type === 'Top Rated') {
        return dispatch(getMoreSuccess(toprated))
      }
      if (type === 'Must Watch') {
        return dispatch(getMoreSuccess(mustwatch))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getMoreSearchMovies = keyword => async (dispatch, getState) => {
  const { page, keyword } = getState().movieList

  const res = await requestSearchMovie(keyword, page)
    .then(({ data }) => dispatch(getMoreSearchSuccess(data)))
    .catch(err => {
      console.log(err)
    })
}

export const getMovieBanner = () => async dispatch => {
  dispatch(getBanner())
  const res = await getUpcomingMoviesUrl()
    .then(({ data }) => dispatch(getBannerSuccess(data)))
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

export const searchMovies =
  (keyword, page = 1) =>
  async dispatch => {
    const res = await requestSearchMovie(keyword, page)
      .then(({ data }) => dispatch(changeSearchField({ data, keyword })))
      .catch(err => {
        console.log(err)
      })
  }

const getMoreSuccess = data => ({
  type: types.moreMoviesRequestSuccess,
  payload: data,
})

const getMoreSearchSuccess = data => ({
  type: types.moreMoviesSearchField,
  payload: data,
})

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
