const Search = ({ query, handleSearch, onSearchChange }) => {
  return (
    <div className="container-fluid">
      <div className="search">
        <form className="form" onSubmit={handleSearch}>
          <div className="form__group">
            <input
              id="search__movie"
              type="text"
              className="form__group__control"
              placeholder="Search Movies..."
              value={query}
              onChange={onSearchChange}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Search
