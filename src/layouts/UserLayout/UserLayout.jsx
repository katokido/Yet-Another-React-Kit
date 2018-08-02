import React, { Fragment } from 'react'
import { Link, Redirect, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { Icon } from 'antd'
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter'
import './UserLayout.less'
import logo from '../../static/images/logo.svg'
import { getRoutes } from '../../utils/utils'

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
]

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
)

class UserLayout extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    routerData: PropTypes.object,
    match: PropTypes.object
  }

  getPageTitle() {
    const { routerData, location } = this.props
    const { pathname } = location
    let title = 'Ant Design Pro'
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Design Pro`
    }
    return title
  }

  render() {
    const { routerData, match } = this.props
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className="container">
          <div className="content">
            <div className="top">
              <div className="header">
                <Link to="/">
                  <img alt="logo" className="logo" src={logo} />
                  <span className="title">Ant Design</span>
                </Link>
              </div>
              <div className="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect from="/account" to="/account/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    )
  }
}

export default UserLayout
