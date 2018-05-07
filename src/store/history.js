// history.js
import qs from 'qs'
import createHistory from 'history/createBrowserHistory'

const history = ((history) => {
  const location = history.location
  history.location = { ...location, query: qs.parse(location.search, { ignoreQueryPrefix: true }) }
  return history
})(createHistory())

export default history
