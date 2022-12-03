import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

import { getFavoriteList } from '../../store/actions/favorites'
import Navigation from '../ui/Navigation'

import FavoriteList from '../movie/FavoriteList'
import BackButton from '../ui/BackButton'
import { animationConfiguration } from '../../utils/animationConfig'

const MovieFavoritesScreen = () => {
  const dispatch = useDispatch()
  let { pathname } = useLocation()

  useEffect(() => {
    dispatch(getFavoriteList())
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [])

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
        <BackButton />
        <FavoriteList />
      </div>
    </motion.div>
  )
}
export default MovieFavoritesScreen
