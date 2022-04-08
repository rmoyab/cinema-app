import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" className="navigation__logo">
        <Logo />
      </NavLink>
      <div className="navigation__nav">
        <nav className="navigation__nav__items">
          <NavLink to="/login" className="navigation__nav__items__item">
            Login
          </NavLink>
          <NavLink to="/register" className="navigation__nav__items__item">
            Register
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Navigation
