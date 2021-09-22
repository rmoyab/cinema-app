import React from 'react'

const Movie = ({ movie, posterUrl, genres }) => {
  let releaseYear = movie.release_date.substring(0, 4).slice(2, 4)
  let releaseMonth = movie.release_date.substring(5, 7)
  let releaseFull = `${releaseMonth}/${releaseYear}`
  let movieGenres = movie.genre_ids
  let namesMovieGenres = []

  for (let i = 0; i < genres.length; i++) {
    for (let j = 0; j < movieGenres.length; j++) {
      if (genres[i].id === movieGenres[j]) {
        namesMovieGenres.push(genres[i].name)
      }
    }
  }

  const setVoteClass = (vote) => {
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

  return (
    <div className="movie" key={movie.id}>
      <div className="movie__image">
        <img
          src={`${posterUrl}/${movie.poster_path}`}
          alt={movie.original_title}
        />
      </div>
      <div className="movie__info"></div>
      <div className="movie__overview">
        <h4 className="txt-c mb-s">{movie.title}</h4>
        <div
          className={`movie__overview__vote movie__overview__vote--${setVoteClass(
            movie.vote_average
          )}`}
        >
          <h4>{movie.vote_average ? movie.vote_average : 'NR'}</h4>
        </div>
        <div>
          <p>{movie.original_language}</p>
        </div>
        <div>
          <h4>{releaseFull}</h4>
          <ul className="movie__overview__genres">
            {namesMovieGenres.slice(0, 2).map((genre, i) => (
              <li key={i} className="movie__overview__genres__genre">
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Movie
