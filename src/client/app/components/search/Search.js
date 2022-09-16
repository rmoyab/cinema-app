import { clearConfigCache } from 'prettier'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovies } from '../../store/actions/movies'

const Search = ({ setActive }) => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.movies)

  const [query, setQuery] = useState('')

  const handleSearch = e => {
    e.preventDefault()
    setActive(false)
    dispatch(searchMovies(query))
    setQuery('')
  }

  const onSearchChange = e => {
    setQuery(e.target.value)
  }

  return (
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
  )
}

export default Search
