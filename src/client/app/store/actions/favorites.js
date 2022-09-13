import { axiosWithToken } from '../../api/api'
import { prepareFavs } from '../../utils/prepareFavs'
import { types } from '../types/types'

export const addFavorite = favorite => async (dispatch, getState) => {
  dispatch(favoriteAddNew())
  const { uid, name } = getState().auth

  try {
    const res = await axiosWithToken('favorites/new', favorite, 'POST')
    const body = await res.data

    if (body.ok) {
      favorite.id = body.favorite.id
      favorite.user = {
        _id: uid,
        name: name,
      }
      dispatch(favoriteAddNewSuccess(favorite))
    }
  } catch (err) {
    dispatch(favoriteAddNewFailed(err))
    console.log(err)
  }
}

export const getFavoriteList = () => async dispatch => {
  dispatch(getFavorites())
  try {
    const res = await axiosWithToken('favorites')
    const body = await res.data
    const favorites = prepareFavs(body.favorites)
    dispatch(getFavoriteSuccess(favorites))
  } catch (err) {
    console.log(err)
    getFavoriteFail(err)
  }
}

export const deleteFavorite = id => async (dispatch, getState) => {
  dispatch(favoriteDelete())

  try {
    const res = await axiosWithToken(`favorites/${id}`, {}, 'DELETE')
    const body = await res.data

    if (body.ok) {
      dispatch(favoriteDeleteSuccess(id))
    }
    // else {
    //    Swal.fire('Error', body.msg, 'error')
    // }
  } catch (err) {
    dispatch(favoriteDeleteFailed(err))
    console.log(err)
  }
}

const favoriteAddNew = () => ({
  type: types.favoriteAddNew,
})

const favoriteAddNewSuccess = e => ({
  type: types.favoriteAddNewSuccess,
  payload: e,
})

const favoriteAddNewFailed = err => ({
  type: types.favoriteAddNewFailed,
  payload: { err },
})

const getFavorites = () => ({
  type: types.favoriteRequestLoading,
})

const getFavoriteSuccess = favorites => ({
  type: types.favoriteRequestSuccess,
  payload: favorites,
})

const getFavoriteFail = err => ({
  type: types.favoriteRequestFailed,
  payload: { err },
})

const favoriteDelete = () => ({
  type: types.favoriteDelete,
})
const favoriteDeleteSuccess = id => ({
  type: types.favoriteDeleteSuccess,
  payload: id,
})
const favoriteDeleteFailed = err => ({
  type: types.favoriteDeleteFailed,
  payload: { err },
})
