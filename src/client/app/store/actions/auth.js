import { axiosWithoutToken, axiosWithToken } from '../../api/api'
import { types } from '../types/types'

export const startLogin = (email, password) => async dispatch => {
  try {
    const res = await axiosWithoutToken('auth', { email, password }, 'POST')

    const body = await res.data

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(login({ uid: body.uid, name: body.name }))
    } else {
      console.log(getErrors(body))
    }
  } catch (error) {
    console.log(error)
  }
}

export const startRegister = (name, email, password) => async dispatch => {
  const res = await axiosWithoutToken(
    'auth/new',
    { email, password, name },
    'POST'
  )
  const body = await res.data

  if (body.ok) {
    localStorage.setItem('token', body.token)
    localStorage.setItem('token-init-date', new Date().getTime())
    dispatch(login({ uid: body.uid, name: body.name }))
  } else {
    console.log(getErrors(body))
  }
}

export const startChecking = () => async dispatch => {
  const token = localStorage.getItem('token')

  if (token) {
    const res = await axiosWithToken('auth/validate')
    const body = await res.data

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(login({ uid: body.uid, name: body.name }))
    }
  } else {
    localStorage.clear()
    dispatch(logout())
    dispatch(checkingFinish())
  }
}

export const startLogout = () => dispatch => {
  localStorage.clear()
  dispatch(logout())
}

const checkingFinish = () => ({
  type: types.authCheckingFinish,
})

const login = user => ({
  type: types.authLogin,
  payload: user,
})

const logout = () => ({
  type: types.authLogout,
})

const getErrors = body => {
  return body.errors ? Object.values(body.errors)[0].msg : body.msg
}
