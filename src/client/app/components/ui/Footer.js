import { NavLink } from 'react-router-dom'
import LogoFooter from './LogoFooter'

const Footer = () => (
  <div className="footer">
    <NavLink to="/" className="footer__elements__logo">
      <LogoFooter />
    </NavLink>
  </div>
)

export default Footer
