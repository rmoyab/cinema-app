import 'regenerator-runtime/runtime'
import { render } from 'react-dom'
import MoviesApp from './app/MoviesApp'

const root = document.getElementById('root')
render(<MoviesApp />, root)
