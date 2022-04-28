import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const Navigation = () => {
  return (
    <nav className="nav">
      <div className="nav__elements">
        <div className="container">
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
