import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/createStore'
import history from './store/history'
import App from './components/App'
import '../config/configure'
import 'ant-design-pro/dist/ant-design-pro.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
