import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import store from './store/createStore'
import history from './store/history'
import App from './components/App'
import '../config/configure.js'

const MOUNT_NODE = document.getElementById('root')

const render = () => {

  ReactDOM.render(
    <AppContainer warnings={false}>
      <Provider store={store}>
        <Router history={history}>
          <Route component={App} />
        </Router>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  )
}

if (module.hot) {
  module.hot.accept('./components/App', render)
}

render()
