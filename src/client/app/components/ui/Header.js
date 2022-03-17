import React from 'react'
import Banner from './Banner'
import Search from '../search/Search'

const Header = ({ upcomingMovies, isLoaded }) => {
  return (
    <div className="header__wrapper">
      <Banner upcomingMovies={upcomingMovies} isLoaded={isLoaded} />
      {/* <Search query={query} onSearchChange={onSearchChange} /> */}
    </div>
  )
}

export default Header
