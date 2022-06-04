import React from 'react'
import Banner from './Banner'
import Navigation from './Navigation'

const Header = ({ upcomingMovies, isLoaded }) => {
  return (
    <header className="header">
      <Navigation />
      <Banner upcomingMovies={upcomingMovies} isLoaded={isLoaded} />
    </header>
  )
}

export default Header
