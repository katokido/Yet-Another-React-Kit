import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { hot } from 'react-hot-loader'

import '../static/index.less'
import Login from '../containers/Login'
import BaseLayout from '../layouts/BaseLayout'
import AuthRoute from '../common/AuthRoute'

class App extends Component {
  static propTypes = {
    logged: PropTypes.bool
  }

  render() {
    const { logged } = this.props
    return (
      <Switch>
        <Route exact path='/login' component={Login} />
        <AuthRoute isAuthenticated={logged} component={BaseLayout} />
      </Switch>
    )
  }
}
const mapStateToProps = state => ({
  logged: state.fakeAuth
})

export default connect(mapStateToProps)(App)
