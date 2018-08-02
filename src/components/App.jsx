import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'

import '../static/index.less'
// import store from '../store/createStore'
import Authorized from '../utils/Authorized'
import { getRouterData } from '../common/router'

const { AuthorizedRoute } = Authorized
const routerData = getRouterData()
const BaseLayout = routerData['/'].component
const UserLayout = routerData['/account'].component

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  login: state.login
})

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  static propTypes = {
    login: PropTypes.object
  }

  render() {
    console.log(this.props)
    // const { login } = this.props
    // const authority = []

    return (
      <Switch>
        <Route path="/account" component={props => <UserLayout {...props} routerData={routerData} />} />
        <AuthorizedRoute
          path="/"
          render={props => <BaseLayout {...props} routerData={routerData} />}
          authority={['admin']}
          redirectPath="/account/login"
        />
      </Switch>
    )
  }
}

export default hot(module)(App)
