import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiChevronRight, FiTrash2 } from 'react-icons/fi'

import { getImageUrl } from '../../api/url'
import { deleteFavorite } from '../../store/actions/favorites'

const FavoriteList = () => {
  const { favorites, loading } = useSelector(state => state.favs)
  const { name } = useSelector(state => state.auth)
  const state = useSelector(state => state.auth)

  console.log(favorites)

  const dispatch = useDispatch()

  const handleDeleteFav = id => {
    dispatch(deleteFavorite(id))
  }

  if (favorites.length === 0) {
    return (
      <div className="no-favorite">
        <div className="favorite__wrapper"></div>
        <div className="row gap-1 justify-flex-start">
          <h2>Nothing here...</h2>
          <Link to={`/`}>
            <button className="btn btn__icon">
              Add some movies to favorites <FiChevronRight />
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="favorite">
        <div className="favorite__wrapper">
          <h2>{name}'s Favs</h2>
          <div className="row gap-1 justify-flex-start">
            {!loading &&
              favorites.map(f => (
                <div
                  className="col-6-xs col-4-md col-3-lg col-2-xl "
                  key={f.movieId}
                >
                  <div className="movie">
                    <div className="movie__image">
                      <Link to={`/movie/${f.movieId}`}>
                        <img
                          src={getImageUrl(f.movieImgPath, 'w500')}
                          alt={f.movieTitle}
                        />
                      </Link>
                    </div>
                    <div className="movie__overview">
                      <div
                        className="movie__overview__dislike"
                        onClick={() => handleDeleteFav(f.id)}
                      >
                        <FiTrash2 />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default FavoriteList
