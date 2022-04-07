import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation__logo">
        <Logo />
      </div>
      <div className="navigation__nav">
        <ul className="navigation__nav__items">
          <NavLink to="/login">
            <li className="navigation__nav__items__item">Login</li>
          </NavLink>
          <NavLink to="/register">
            <li className="navigation__nav__items__item">Register</li>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
