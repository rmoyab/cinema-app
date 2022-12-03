import { Provider } from 'react-redux'
import { store } from './store/store'
import AppRouter from './router/AppRouter'
import ReactGA from 'react-ga4'

ReactGA.initialize('G-T8Q5PCJ55K')

const MoviesApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default MoviesApp
