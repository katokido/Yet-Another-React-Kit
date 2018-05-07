import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Elapse extends Component {
  static propTypes = {
    elapse: PropTypes.number
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { elapse } = this.props
    return (
      <h1>
        Seconds Elapsed: {elapse}
      </h1>
    )
  }
}
