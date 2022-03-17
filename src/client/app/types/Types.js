import {
  getPopularMoviesUrl,
  getTopRatedMoviesUrl,
  getMustWatchMoviesUrl,
  getUpcomingMoviesUrl,
} from '../api/url'
import { request } from '../api/api'

export const MovieTypes = ['Popular', 'Top Rated', 'Must Watch', 'Upcoming']

export const fetchFunctionListScreen = (type, title) => movieGet(title)

const movieGet = (title) => {
  switch (title) {
    case 'Popular':
      return (page) => request(getPopularMoviesUrl(page))
    case 'Top Rated':
      return (page) => request(getTopRatedMoviesUrl(page))
    case 'Must Watch':
      return (page) => request(getMustWatchMoviesUrl(page))
    case 'Upcoming':
      return (page) => request(getUpcomingMoviesUrl(page))
  }
}
