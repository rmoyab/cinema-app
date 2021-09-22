export const apiUrl = 'https://api.themoviedb.org/3'
// export const posterUrl =  'https://image.tmdb.org/t/p/w500'
// export const backdropUrl = 'https://image.tmdb.org/t/p/w1280'
export const posterUrl = 'https://www.themoviedb.org/t/p/w500'
export const backdropUrl = 'https://www.themoviedb.org/t/p/w1280'
export const keyUrl = `api_key=${process.env.TMDB_API_KEY}`
export const genreUrl = `${apiUrl}/genre/movie/list?${keyUrl}&language=en-US`

const sortBy = ['release_date.desc']

let today = new Date()
let date = ''
const timeLapse = (months) =>
  (date = 'Y-m-d'
    .replace('Y', today.getFullYear())
    .replace('m', today.getMonth() + months)
    .replace('d', today.getDate()))

export const newMonthMoviesUrl = `&primary_release_date.gte=${timeLapse(
  1
)}&primary_release_date.lte=${timeLapse(2)}`
