import moment from 'moment'
import { getImageUrl, getUpcomingMoviesUrl } from '../api/url'

export const yearMovie = movie => {
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4).slice(2, 4)
    : '-'
  const releaseMonth = movie.release_date
    ? movie.release_date.substring(5, 7)
    : '-'

  return `${releaseMonth}/${releaseYear}`
}

export const setVoteClass = vote => {
  if (vote >= 7) {
    return 'good'
  } else if (vote >= 4) {
    return 'medium'
  } else if (vote >= 1) {
    return 'bad'
  } else {
    return 'nr'
  }
}

export const genreMovie = (movie, genres) => {
  const movieGenres = movie.genre_ids
  const namesMovieGenres = []

  for (let i = 0; i < genres.length; i++) {
    for (let j = 0; j < movieGenres.length; j++) {
      if (genres[i].id === movieGenres[j]) {
        namesMovieGenres.push(genres[i].name)
      }
    }
  }

  return namesMovieGenres
}

export const movieTrailer = videos => {
  for (const key in videos.results) {
    const video = videos.results[key]
    if (video.site === 'YouTube' && video.name === 'Official Trailer') {
      return `https://www.youtube.com/embed/${video.key}`
    }
  }
}

export const movieLogo = images => {
  for (const key in images.logos) {
    const logo = images.logos[key]
    if (logo.iso_639_1 === 'en') {
      return getImageUrl(logo.file_path)
    }
  }
}

export const movieCompanies = movieData => {
  if (!!movieData.production_companies) {
    const companies = movieData.production_companies.map(e => e)
    let companiesWithLogo = []
    for (const company of companies) {
      if (company.logo_path !== null) {
        companiesWithLogo.push(company)
      }
    }
    return companiesWithLogo
  }
}

export const movieCredits = credit => {
  let writers = []
  let director = {}
  let cast = []

  if (credit.crew) {
    credit.crew.forEach(e => {
      if (e.job === 'Director') {
        director = e
      }
      if (e.job === 'Screenplay') {
        writers.push(e)
      }
    })
  }

  credit.cast?.slice(0, 15).map(e => {
    cast.push(e)
  })

  return { writers, director, cast }
}

export const movieUnreleased = async upcomingMovies => {
  let allMovies = []
  let movies = []
  let isLoading = true

  for (let i = 0; i < upcomingMovies.total_pages; i++) {
    upcomingMovies.page += 1
    const response = await getUpcomingMoviesUrl(upcomingMovies.page)
    if (response) {
      allMovies = [...response.results, ...allMovies]
    }
  }

  if (allMovies.length) {
    allMovies.forEach(e => {
      const releaseDate = moment(e.release_date)
      const date = moment()
      if (releaseDate.isAfter(date)) {
        movies.push(e)
      }
      isLoading = false
    })

    return movies
  }
}

export const getTime = time => {
  return (
    Math.floor(time / 60) + 'h ' + ('0' + Math.floor(time % 60)).slice(-2) + 'm'
  )
}
