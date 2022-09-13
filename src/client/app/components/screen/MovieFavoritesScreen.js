import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../api/url'
import { deleteFavorite, getFavoriteList } from '../../store/actions/favorites'
import Navigation from '../ui/Navigation'
import { FiTrash2 } from 'react-icons/fi'

const MovieFavoritesScreen = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { favorites, loading } = useSelector(state => state.favs)

  useEffect(() => {
    dispatch(getFavoriteList())
  }, [])

  const animationConfiguration = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const handleDeleteFav = id => {
    dispatch(deleteFavorite(id))
  }

  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5 }}
    >
      <Navigation />
      <div className="container">
        <div className="row gap-1 justify-flex-start">
          <div className="col-12-xs col-6-md  col-4-xl">
            <div className="back-section">
              <button className="btn btn__back" onClick={() => navigate('/')}>
                {' '}
                <FiChevronLeft />
              </button>
            </div>
          </div>
        </div>
        <div className="favorite">
          <div className="favorite__wrapper">
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
    </motion.div>
  )
}
export default MovieFavoritesScreen
