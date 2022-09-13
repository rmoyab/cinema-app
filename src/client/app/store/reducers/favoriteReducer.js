import moment from 'moment'
import { types } from '../types/types'

const initialState = {
  favorites: [],
  loading: true,
  err: {},
}

export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.favoriteAddNew:
      return {
        ...state,
        loading: true,
      }

    case types.favoriteAddNewSuccess:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
        loading: false,
      }

    case types.favoriteAddNewFailed:
      return {
        ...state,
        error: action.payload.err,
        loading: false,
      }

    case types.favoriteRequestSuccess:
      return {
        ...state,
        favorites: [...action.payload],
        loading: false,
      }

    case types.favoriteDeleteSuccess:
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
      }

    default:
      return state
  }
}
