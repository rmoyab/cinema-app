import { types } from '../types/types'

const initialState = {
  item: {},
  results: [],
  loading: true,
  page: 1,
  searching: false,
  keyword: '',
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
      return {
        ...state,
        item: action.payload,
        results: action.payload.results,
        loading: false,
        page: 2,
        searching: false,
      }

    case types.moreMoviesRequestSuccess:
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        loading: false,
        page: state.page + 1,
        searching: false,
      }

    case types.moviesSearchField:
      return {
        ...state,
        item: action.payload.data,
        results: action.payload.data.results,
        keyword: action.payload.keyword,
        loading: false,
        page: 2,
        searching: true,
      }

    case types.moreMoviesSearchField:
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        loading: false,
        page: state.page + 1,
        searching: true,
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
        results: [...action.payload],
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
