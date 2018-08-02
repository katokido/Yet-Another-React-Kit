import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './Zen.less'
import { Spin } from 'antd'

export default class Zen extends Component {

  render() {
    const {
      fetchZen,
      clearZen,
      zen = { fetching: false, text: [] }
    } = this.props

    return (
      <div>
        <div className="loading">
          {zen.fetching
            ? <Spin />
            : ''
}
        </div>
        <div>
          <button className="btn btn-default" onClick={fetchZen}>
            {zen.fetching
              ? 'Fetching...'
              : 'Fetch data'}
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-default" onClick={clearZen}>Clear</button>
        </div>
        <div>
          {zen.text.map(item => (
            <h1 key={item.id}>{item.text}</h1>
          ))}
        </div>
      </div>
    )
  }
}

Zen.propTypes = {
  zen: PropTypes.object,
  fetchZen: PropTypes.func,
  clearZen: PropTypes.func
}
