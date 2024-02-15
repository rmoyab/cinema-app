import axios from 'axios'

export const userAxios = axios.create({
  baseURL: process.env.BASE_URL || process.env.REACT_APP_BASE_URL,
})

export const movieAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

export const axiosWithoutToken = (url, data, method = 'GET') => {
  if (method === 'GET') {
    return userAxios(url)
  } else {
    const options = {
      method,
      url,
      headers: {
        'Content-type': 'application/json',
      },
      data,
    }
    return userAxios(options)
  }
}

export const axiosWithToken = (url, data, method = 'GET') => {
  try {
    const token = localStorage.getItem('token') || ''
    if (method === 'GET') {
      const options = {
        method,
        url,
        headers: {
          'x-auth-token': token,
        },
      }
      return userAxios(options)
    } else {
      const options = {
        method,
        url,
        headers: {
          'Content-type': 'application/json',
          'x-auth-token': token,
        },
        data,
      }
      return userAxios(options)
    }
  } catch (error) {
    console.log(error)
  }
}
