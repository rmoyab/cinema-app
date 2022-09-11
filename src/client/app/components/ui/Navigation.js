import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo'

import { FiUser, FiHeart } from 'react-icons/fi'
import { useSelector } from 'react-redux'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { checking, uid } = useSelector(state => state.auth)

  const handleMenu = () => {
    setIsOpen(s => !s)
  }

  return (
    <nav className="nav">
      <div className="nav__elements">
        <div className="container-fluid">
          <div className="row justify-space-between align-center">
            <NavLink to="/" className="nav__elements__logo">
              <Logo />
            </NavLink>
            <div className={`nav__elements__links  ${isOpen ? 'change' : ''}`}>
              {!uid ? (
                <NavLink to="/login" className="nav__links__item">
                  <FiUser /> Login
                </NavLink>
              ) : (
                <NavLink to="/favorites" className="nav__links__item">
                  <FiHeart /> Favs
                </NavLink>
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
