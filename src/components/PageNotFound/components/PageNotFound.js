import React, { Component } from 'react'
import NotFoundImage from '../../../static/images/404.jpg'
import classes from './PageNotFound.less'
import { withRouter } from 'react-router-dom'

class PageNotFound extends Component {
  
  render() {
    const props = this.props
    return (
      <div className={classes.container}>
        <h1>Page not found!!!</h1>
        <h3>
          <a className={classes.link} onClick={props.history.goBack}>Back</a>
        </h3>
        <img src={NotFoundImage} />
      </div>
    )
  }
}

export default withRouter(PageNotFound)
