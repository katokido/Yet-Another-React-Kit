import React, { Component, Fragment, createContext } from 'react'
import PropTypes from 'prop-types'

const defaultTheme = {
  background: 'white',
  color: 'black',
}

const fooTheme = {
  background: 'red',
  color: 'green',
}

const ThemeContext = createContext(defaultTheme)

const Banner = ({theme}) => {
  return (<div style={theme}>Welcome!</div>)
}
Banner.propTypes = {
  theme: PropTypes.object
}

const Content = () => (
  <ThemeContext.Consumer>
    {
      context => {
        return <Banner theme={context} />
      }
    }
  </ThemeContext.Consumer>
)

export default class Elapse extends Component {
  static propTypes = {
    elapse: PropTypes.number
  }

  state = {
    theme: defaultTheme
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { elapse } = this.props
    return (
      <Fragment>
        <h1>
          Seconds Elapsed: {elapse}
        </h1>
        <ThemeContext.Provider value={this.state.theme}>
          <Content />
          <div>
            <button onClick={() => {
              this.setState(state => ({
                theme: state.theme === defaultTheme ? fooTheme : defaultTheme
              }))
            }}>
              Toggle Theme
            </button>
          </div>
        </ThemeContext.Provider>
      </Fragment>
    )
  }
}
