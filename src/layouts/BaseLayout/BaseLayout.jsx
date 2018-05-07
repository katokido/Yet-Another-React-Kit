import React, { Component } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Breadcrumb, BackTop } from 'antd'
import fp from 'lodash/fp'

import Bundle from '../../common/Bundle'
import routes from '../../routes'

import logo from '../../static/images/logo.svg'
import '../../static/styles/core.less'
import './BaseLayout.less'

const { Header, Sider, Content, Footer } = Layout
const Homes = () => <Bundle load={() => import('../../routes/Home')} />

class CoreLayout extends Component {
  static propTypes = {
    location: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      openKeys: this.getDefaultSelectedKeys(props)
    }
  }

  /**
   * [侧边栏的展开与收起]
   * @return {[type]} [description]
   */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  /**
   * [侧边栏主菜单的展开与收起]
   * @return {[type]} [description]
   */
  handleOpenChange = (openKeys) => {
    const lastKey = openKeys[openKeys.length - 1]
    const isMainMenu = fp.some(item => item.path === lastKey)(routes)

    this.setState({
      openKeys: isMainMenu ? [lastKey] : [...openKeys]
    })
  }

  /**
   * [侧边栏主菜单的默认展开项]
   * @return {[array]} [默认展开项]
   */
  getDefaultSelectedKeys(props) {
    const currentSelectedKeys = [...this.getSelectedKeys(props)]
    currentSelectedKeys.splice(-1, 1)
    if (currentSelectedKeys.length === 0) {
      return ['/']
    }
    return currentSelectedKeys
  }

  /**
   * [侧边栏次级菜单的选中项]
   * @return {[array]} [选中项]
   */
  getSelectedKeys(props) {
    const { location: { pathname } } = props || this.props
    const keys = pathname.split('/').slice(1)
    if (keys.length === 1 && keys[0] === '') {
      return ['/']
    }
    return keys
  }

  itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1
    return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>
  }

  render() {
    const { location } = this.props
    const paths = location.pathname.split('/').slice(1)
    console.log(location.pathname.split('/'))
    console.log(paths)
    const menus = []
    const comps = []
    const bread = []

    paths.map(path => {
      bread.push({
        path: path || '/',
        name: path || 'Home'
      })
    })
    console.log(bread)

    routes.map((route, index) => {
      menus.push(
        <Menu.Item key={route.path}>
          <Link to={{ pathname: `/${route.path}` }}>
            <Icon type='user' />
            <span>{route.name}</span>
          </Link>
        </Menu.Item>
      )
      comps.push(
        <Route key={index} path={`/${route.path}`} component={route.main} />
      )
    })

    const { collapsed } = this.state

    const menuProps = collapsed ? {} : { openKeys: this.state.openKeys }

    return (
      <div>

        <Layout>
          <Sider
            className='sider'
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className='logo'>
              <Link to='/'>
                <img src={logo} alt='logo' />
                <h1>Ant Design</h1>
              </Link>
            </div>
            <Menu
              theme='dark'
              mode='inline'
              {...menuProps}
              onOpenChange={this.handleOpenChange}
              selectedKeys={this.getSelectedKeys()}
            >
              {menus}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className='trigger'
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                itemRender={this.itemRender}
                routes={bread}
              />
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Switch>
                  <Route exact path='/' component={Homes} />
                  {comps}
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Yet Another React Kit ©2018 Created by K.K
            </Footer>
          </Layout>
        </Layout>

        <BackTop />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  logged: state.fakeAuth
})

export default connect(mapStateToProps)(CoreLayout)
