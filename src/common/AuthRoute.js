import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.func.isRequired
}

const PrivateRoute = ({ component: Component, isAuthenticated = false, ...rest }) => {
  // console.log('component: ', Component)
  // console.log('isAuthenticated: ', isAuthenticated)
  // console.log('rest: ', rest)
  return (
    <Route
      {...rest}
      render={_props => isAuthenticated
        ? <Component {..._props} />
        : <Redirect to={{ pathname: '/login', state: { from: _props.location } }} />
      }
    />
  )
}

PrivateRoute.propTypes = propTypes

export default PrivateRoute
