import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenu = () => {
    setIsOpen((s) => !s)
  }

  return (
    <nav className="nav">
      <div className="nav__elements">
        <div className="container-fluid">
          <div className="row justify-space-between align-center">
            <NavLink to="/" className="nav__elements__logo">
              <Logo />
            </NavLink>
            <div className="nav__elements__links">
              <NavLink to="/login" className="nav__links__item">
                Login
              </NavLink>
              <NavLink to="/register" className="nav__links__item">
                Register
              </NavLink>
            </div>
            <div
              className={`${
                isOpen ? 'change nav__elements__box' : 'nav__elements__box'
              } `}
              onClick={handleMenu}
            >
              <div
                className={`${
                  isOpen
                    ? 'change nav__elements__box-btn'
                    : 'nav__elements__box-btn'
                } `}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
