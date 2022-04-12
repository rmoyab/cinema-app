import { getImageUrl } from '../api/url'

export const yearMovie = (movie) => {
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4).slice(2, 4)
    : '-'
  const releaseMonth = movie.release_date
    ? movie.release_date.substring(5, 7)
    : '-'

  return `${releaseMonth}/${releaseYear}`
}

export const setVoteClass = (vote) => {
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

export const movieTrailer = (videos) => {
  for (const key in videos.results) {
    const video = videos.results[key]
    if (video.site === 'YouTube' && video.name === 'Official Trailer') {
      return `https://www.youtube.com/embed/${video.key}`
    }
  }
}

export const movieLogo = (images) => {
  for (const key in images.logos) {
    const logo = images.logos[key]
    if (logo.iso_639_1 === 'en') {
      return getImageUrl(logo.file_path)
    }
  }
}

export const movieCompanies = (movieData) => {
  if (!!movieData.production_companies) {
    const companies = movieData.production_companies.map((e) => e)
    let companiesWithLogo = []
    for (const company of companies) {
      if (company.logo_path !== null) {
        companiesWithLogo.push(company)
      }
    }
    return companiesWithLogo
  }
}

export const movieDirector = (credit) => {
  var directors = []
  if (credit.crew) {
    credit.crew.forEach((entry) => {
      if (entry.job === 'Director') {
        directors.push(entry.name)
      }
    })
  }
  return directors.join(', ')
}

export const movieWriters = (credit) => {
  var writers = []
  if (credit.crew) {
    credit.crew.forEach((entry) => {
      if (entry.job === 'Screenplay') {
        writers.push(entry.name)
      }
    })
  }
  return writers.join(', ')
}

export const getTime = (time) => {
  return (
    Math.floor(time / 60) + 'h ' + ('0' + Math.floor(time % 60)).slice(-2) + 'm'
  )
}
