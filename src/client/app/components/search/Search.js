import React from 'react'

const Search = ({ query, onSearchChange }) => {
  return (
    <div className="header__search">
      <form className="search">
        {/* <label htmlFor="search__movie" className="search__label">
          Search Movies
        </label> */}
        <input
          id="search__movie"
          type="text"
          className="search__movie"
          placeholder="Search Movies..."
          value={query}
          onChange={onSearchChange}
        />
      </form>
    </div>
  )
}

export default Search
