import Logo from './Logo'

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="navigation__logo">
        <Logo />
      </div>
      <div className="navigation__nav">
        <ul className="navigation__nav__items">
          <li className="navigation__nav__items__item">Login</li>
          <li className="navigation__nav__items__item">Register</li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
