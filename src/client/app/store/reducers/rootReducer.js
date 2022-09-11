import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { movieList, movieBanner, movieDetail } from './moviesReducer'

export const rootReducer = combineReducers({
  auth: authReducer,
  movieList: movieList,
  movieBanner: movieBanner,
  movieDetail: movieDetail,
})
