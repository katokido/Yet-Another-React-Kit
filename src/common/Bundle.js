import React from 'react'
import PropTypes from 'prop-types'

class Bundle extends React.Component {
  static propTypes = {
    dataProps: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { Component: null }
    props.load().then(Component => this.setState({ Component: Component.default }))
  }

  render() {
    const { dataProps } = this.props
    const Component = this.state.Component
    return Component ? <Component {...dataProps} /> : null
  }
}

export default Bundle
