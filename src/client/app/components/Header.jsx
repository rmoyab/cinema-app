import React from 'react'
import Banner from './Banner'
import Search from './Search'

const Header = ({
  bannerMovies,
  backdropUrl,
  posterUrl,
  query,
  onSearchChange,
}) => {
  return (
    <div className="header__wrapper">
      <Banner
        bannerMovies={bannerMovies}
        backdropUrl={backdropUrl}
        posterUrl={posterUrl}
      />
      <Search query={query} onSearchChange={onSearchChange} />
    </div>
  )
}

export default Header
