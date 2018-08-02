import React from 'react'
import PropTypes from 'prop-types'

const Counter = (props) => (
  <div style={{
    margin: '0 auto'
  }}>
    <h2>Counter num: {props.counter}</h2>
    <button className="btn btn-default" onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className="btn btn-default" onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Counter.propTypes = {
  counter: PropTypes.number,
  doubleAsync: PropTypes.func,
  increment: PropTypes.func
}

export default Counter
