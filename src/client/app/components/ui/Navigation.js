import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import LogoNav from './LogoNav'

import { FiUser, FiHeart, FiLogOut } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../store/actions/auth'

const Navigation = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const { checking, uid } = useSelector(state => state.auth)
  const location = useLocation()

  const handleMenu = () => {
    setIsOpen(s => !s)
  }

  const handleLogout = e => {
    e.preventDefault()
    dispatch(startLogout())
  }

  return (
    <nav className="nav">
      <div className="nav__elements">
        <div className="container">
          <div className="row justify-space-between align-center">
            <NavLink to="/" className="nav__elements__logo">
              <LogoNav />
            </NavLink>
            <div className={`nav__elements__links  ${isOpen ? 'change' : ''}`}>
              {!uid ? (
                <NavLink to="/login" className="nav__links__item">
                  <FiUser /> Login
                </NavLink>
              ) : (
                <>
                  {location.pathname !== '/favorites' ? (
                    <NavLink to="/favorites" className="nav__links__item">
                      <FiHeart /> Favs
                    </NavLink>
                  ) : (
                    ''
                  )}

                  <button onClick={handleLogout} className="nav__links__item">
                    <FiLogOut /> Logout
                  </button>
                </>
              )}
            </div>
            <div
              className={`nav__elements__box ${isOpen ? 'change' : ''}`}
              onClick={handleMenu}
            >
              <div
                className={`nav__elements__box-btn ${isOpen ? 'change' : ''}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
