import {
  getPopularMoviesUrl,
  getTopRatedMoviesUrl,
  getUpcomingMoviesUrl,
  getMovieDetailUrl,
  getMovieCreditUrl,
  getMovieImageUrl,
  getMovieRecommendationsUrl,
  getSearchMovieUrl,
  getMovieVideoUrl,
  getMustWatchMoviesUrl,
} from './url'

export const request = async (url) => {
  return fetch(url)
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText)
  return response
}

export const requestMovieScreen = (callback, err) => {
  return Promise.all([
    request(getPopularMoviesUrl()),
    request(getTopRatedMoviesUrl()),
    request(getMustWatchMoviesUrl()),
    request(getUpcomingMoviesUrl()),
  ])
    .then((values) => callback(values))
    .catch(err)
}

export const requestMovieDetailScreen = (id, callback) => {
  return Promise.all([
    request(getMovieDetailUrl(id)),
    request(getMovieCreditUrl(id)),
    request(getMovieImageUrl(id)),
    request(getMovieVideoUrl(id)),
    request(getMovieRecommendationsUrl(id)),
  ])
    .then((values) => callback(values))
    .catch((error) => console.log(error))
}

export const requestSearchMovie = async (keyword) => {
  return await request(getSearchMovieUrl(keyword))
}
