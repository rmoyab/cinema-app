import MovieCard from './MovieCard'

const Movies = ({ movies, posterUrl, genres }) => {
  return (
    <div className="movies__wrapper">
      <div className="movies grid-auto-xl grid-gap-lg">
        {movies.map((movie, id) =>
          movie.poster_path ? (
            <MovieCard
              movie={movie}
              posterUrl={posterUrl}
              key={id}
              genres={genres}
            />
          ) : (
            ''
          )
        )}
      </div>
    </div>
  )
}

export default Movies
