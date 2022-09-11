import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const Footer = () => (
  <div className="footer">
    <NavLink to="/" className="footer__elements__logo">
      <Logo />
    </NavLink>
  </div>
)

export default Footer
