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
