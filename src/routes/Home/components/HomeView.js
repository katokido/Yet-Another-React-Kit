import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createG2 from 'g2-react'
// import { Stat } from 'g2'

import data from '../modules/data.json'
import DuckImage from '../../../static/images/Duck.jpg'
import './HomeView.less'

class HigherChart extends Component {
  static propTypes = {
    shape: PropTypes.string
  }

  constructor(props, ...others) {
    super(props, ...others)
    this.Chart = createG2(chart => {
      this.chart = chart
      chart.line().position('time*price').color('name').shape(props.shape).size(2)
      chart.render()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shape !== this.props.shape) {
      this.chart.clear()
      this.chart.line().position('time*price').color('name').shape(nextProps.shape).size(2)
      this.chart.render()
    }
  }

  render() {
    return (<this.Chart {...this.props} />)
  }
}

class MyComponent extends Component {
  state = {
    shape: 'spline',
    data: data.slice(0, data.length / 2 - 1),
    width: 500,
    height: 250,
    plotCfg: {
      margin: [10, 100, 50, 120]
    }
  }
  changeHandler = () => {
    if (this.state.shape === 'spline') {
      this.setState({shape: 'line'})
    } else {
      this.setState({shape: 'spline'})
    }
  }
  render() {
    return <div>
      <HigherChart
        shape={this.state.shape}
        data={this.state.data}
        width={this.state.width}
        height={this.state.height}
        plotCfg={this.state.plotCfg}
      />
      <button onClick={this.changeHandler}>Change shape</button>
    </div>
  }
}

export default class HomeView extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="HomeView">
        <h4>Welcome to Hello React kit project!</h4>
        <img alt="This is a duck, because Redux!" className="duck" src={DuckImage} />
        <MyComponent />
      </div>
    )
  }
}
