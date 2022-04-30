import React from 'react'
import Banner from './Banner'
import Search from '../search/Search'
import Navigation from './Navigation'

const Header = ({ upcomingMovies, isLoaded }) => {
  return (
    <header className="header">
      <Navigation />
      <Banner upcomingMovies={upcomingMovies} isLoaded={isLoaded} />
      {/* <Search query={query} onSearchChange={onSearchChange} /> */}
    </header>
  )
}

export default Header
