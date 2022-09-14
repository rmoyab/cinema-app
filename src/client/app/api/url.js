import axios from 'axios'

import { axiosWithoutToken, movieAxios } from './api'

const IMAGE_URL = 'https://image.tmdb.org/t/p/'
const API_KEY = process.env.TMDB_API_KEY

const defaultQuery = {
  api_key: API_KEY,
  language: 'en-US',
  include_adult: 'false',
  // certification_country: 'US',
  // 'certification.lte': 'PG-13',
}

const queryString = obj => {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&')
}

// const getPopularMoviesUrl = page => {
//   return axiosWithoutToken(
//     `/movie/popular?${queryString({ ...defaultQuery, ...page })}`,
//     {},
//     'GET',
//     'movie'
//   )
// }
const getPopularMoviesUrl = page => {
  return movieAxios.get(
    `/discover/movie?${queryString({
      ...defaultQuery,
      ...{ sort_by: 'popularity.desc' },
      page,
    })}`
  )
  // return movieAxios.get(
  //   `/movie/popular?${queryString({ ...defaultQuery, page })}`
  // )
}

const getTopRatedMoviesUrl = page => {
  return movieAxios.get(
    `/discover/movie?${queryString({
      ...defaultQuery,
      ...{ sort_by: 'vote_count.desc' },
      page,
    })}`
  )
  // movieAxios.get(`/movie/top_rated?${queryString({ ...defaultQuery, page })}`)
}

const getMustWatchMoviesUrl = page => {
  return movieAxios.get(
    `/discover/movie?${queryString({
      ...defaultQuery,
      ...{ sort_by: 'revenue.desc' },
      page,
    })}`
  )
}

export const getUpcomingMoviesUrl = page =>
  movieAxios.get(`/movie/upcoming?${queryString({ ...defaultQuery, page })}`)

const getMovieDetailUrl = id =>
  movieAxios.get(`/movie/${id}?${queryString(defaultQuery)}`)

const getMovieCreditUrl = id =>
  movieAxios.get(`/movie/${id}/credits?${queryString(defaultQuery)}`)

const getMovieImageUrl = id =>
  movieAxios.get(`/movie/${id}/images?${queryString({ api_key: API_KEY })}`)

const getMovieVideoUrl = id =>
  movieAxios.get(`/movie/${id}/videos?${queryString({ api_key: API_KEY })}`)

const getMovieRecommendationsUrl = id =>
  movieAxios.get(`/movie/${id}/recommendations?${queryString(defaultQuery)}`)

const getMovieExternalsIdsUrl = id =>
  movieAxios.get(`/movie/${id}/external_ids?${queryString(defaultQuery)}`)

const getSearchMovieUrl = (keyword, page) =>
  movieAxios.get(
    `/search/movie?${queryString({
      ...defaultQuery,
      ...{ query: keyword },
      page,
    })}`
  )

export const getImageUrl = (path, width = 'w500') => {
  return `${IMAGE_URL}${width}${path}`
}

export const requestMovieScreen = page => {
  return Promise.all([
    getPopularMoviesUrl(page),
    getTopRatedMoviesUrl(page),
    getMustWatchMoviesUrl(page),
    getUpcomingMoviesUrl(page),
  ])
  // .then(
  //   ([
  //     { data: popular },
  //     { data: toprated },
  //     { data: mustwatch },
  //     { data: upcoming },
  //   ]) => callback({ popular, toprated, mustwatch, upcoming })
  // )

  // .then((values) => callback(values))
  // .catch(err)
}

export const requestMovieDetailScreen = id => {
  return Promise.all([
    getMovieDetailUrl(id),
    getMovieCreditUrl(id),
    getMovieImageUrl(id),
    getMovieVideoUrl(id),
    getMovieRecommendationsUrl(id),
    getMovieExternalsIdsUrl(id),
  ])
  // .then(values => callback(values))
  // .catch(error => console.log(error))
}

export const requestSearchMovie = async (keyword, page) => {
  const data = await getSearchMovieUrl(keyword, page)
  if (data) {
    return data
  }
}

// export const getImageUrl = (path, key = "uri", width = "w500") => {
//   return { [key]: `${IMAGE_URL}${width}${path}` };
// };
