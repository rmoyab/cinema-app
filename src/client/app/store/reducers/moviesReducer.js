import { types } from '../types/types'

const initialState = {
  items: [],
  loading: true,
  page: 1,
  error: {},
}

const movieList = (state = initialState, action) => {
  switch (action.type) {
    case types.moviesRequestLoading:
      return {
        ...state,
        loading: true,
      }

    case types.moviesRequestSuccess:
    case types.moviesSearchField:
      return {
        ...state,
        items: action.payload,
        loading: false,
      }

    case types.moviesRequestFailed:
      return {
        ...state,
        error: action.payload.err,
        loading: false,
      }

    default:
      return state
  }
}

const movieBanner = (state = initialState, action) => {
  switch (action.type) {
    case types.bannerRequestLoading:
      return {
        ...state,
        loading: true,
      }

    case types.bannerRequestSuccess:
      return {
        ...state,
        items: action.payload,
        loading: false,
      }

    case types.bannerRequestFailed:
      return {
        ...state,
        error: action.payload.err,
        loading: false,
      }

    default:
      return state
  }
}

const movieDetail = (state = initialState, action) => {
  switch (action.type) {
    case types.movieRequestLoading:
      return {
        ...state,
        loading: true,
      }

    case types.movieRequestSuccess:
      return {
        ...state,
        items: [...action.payload],
        loading: false,
      }

    case types.movieRequestFailed:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    default:
      return state
  }
}

// const movieSearch = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state
//   }
// }

export { movieBanner, movieList, movieDetail }
