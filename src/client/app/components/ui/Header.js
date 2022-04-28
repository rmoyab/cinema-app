import React from 'react'
import Banner from './Banner'
import Search from '../search/Search'

const Header = ({ upcomingMovies, isLoaded }) => {
  return (
    <header className="header">
      <Banner upcomingMovies={upcomingMovies} isLoaded={isLoaded} />
      {/* <Search query={query} onSearchChange={onSearchChange} /> */}
    </header>
  )
}

export default Header
