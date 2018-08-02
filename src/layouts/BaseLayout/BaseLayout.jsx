import React, { Component, Fragment } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout, Menu, BackTop, Icon, Dropdown, Avatar, Spin, Breadcrumb, message } from 'antd'
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter'
import fp from 'lodash/fp'
import pathToRegexp from 'path-to-regexp'

import Authorized from '../../utils/Authorized'
import { getRoutes } from '../../utils/utils'
import NotFound from '../../components/PageNotFound'
import { getMenuData } from '../../common/menu'
import routes from '../../routes'
import { logoutAction } from '../../store/login'

import logo from '../../static/images/logo.svg'
// import '../../static/styles/core.less'
import './BaseLayout.less'

const { Sider, Header, Content, Footer } = Layout
const { SubMenu } = Menu
const { AuthorizedRoute } = Authorized

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => [path,path2]
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path)
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children))
    }
    return keys
  }, [])

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  )

export function urlToList(url) {
  const urllist = url.split('/').filter(i => i)
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`
  })
}

const getIcon = icon => {
  if (typeof icon === 'string') {
    if (icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={`icon sider-menu-item-img`} />
    }
    return <Icon type={icon} />
  }

  return icon
}

const currentUser = {
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  notifyCount: 12,
}

class BasicLayout extends Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    routerData: PropTypes.object,
    logoutAction: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.flatMenuKeys = getFlatMenuKeys(getMenuData())
    this.state = {
      collapsed: false,
      notices: [],
      openKeys: this.getDefaultCollapsedSubMenus(props),
    }
  }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const {
      location: { pathname },
    } = props || this.props

    if (!pathname) {
      return ['/']
    }
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname))
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

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path)
    const icon = getIcon(item.icon)
    const { target, name } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    const { history } = this.props
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === history.location.pathname}
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children)
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        )
      }
      return null
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
    }
  }

  getNavMenuItems = menusData => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item)
        return this.checkPermissionItem(item.authority, ItemDom)
      })
      .filter(item => item)
  }

  getSelectedMenuKeys = () => {
    const {
      history: { location },
    } = this.props
    if (!location.pathname) {
      return ['/']
    }
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(location.pathname))
  }

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/')
    }
  }

  checkPermissionItem = (authority, ItemDom) => {
    if (Authorized && Authorized.check) {
      const { check } = Authorized
      return check(authority, ItemDom)
    }
    return ItemDom
  }

  itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1
    return last ? <span>{route.name}</span> : <Link to={paths.join('/')}>{route.name}</Link>
  }

  handleMenuCollapse = collapsed => {
    this.setState({
      collapsed: collapsed
    })
  }

  handleNoticeClear = type => {
    message.success(`清空了${type}`)
    this.setState({
      notices: []
    })
  }

  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      return
    }
    if (key === 'logout') {
      this.props.logoutAction()
    }
  }

  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.setState({
        notices: []
      })
    }
  }

  render() {
    const { routerData, match, history } = this.props
    const paths = history.location.pathname.split('/').slice(1)
    // const menus = []
    // const comps = []
    const bread = []

    paths.map(path => {
      bread.push({
        path: path || '/',
        name: path || 'Home'
      })
    })

    // routes.map((route, index) => {
    //   menus.push(
    //     <Menu.Item key={route.path}>
    //       <Link to={{ pathname: `/${route.path}` }}>
    //         <Icon type="user" />
    //         <span>{route.name}</span>
    //       </Link>
    //     </Menu.Item>
    //   )
    //   comps.push(
    //     <Route key={index} path={`/${route.path}`} component={route.main} />
    //   )
    // })

    const { collapsed, openKeys } = this.state
    let selectedKeys = this.getSelectedMenuKeys()
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    console.log('BaseLayout: ', this.props)

    const menuProps = collapsed ? {} : { openKeys }

    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <Fragment>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            width={256}
            className="sider"
          >
            <div className="sider-logo" key="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <h1>Ant Design</h1>
              </Link>
            </div>
            <Menu
              key="Menu"
              theme="dark"
              mode="inline"
              {...menuProps}
              onOpenChange={this.handleOpenChange}
              selectedKeys={selectedKeys}
            >
              {this.getNavMenuItems(getMenuData())}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className="right">
                {currentUser.name ? (
                  <Dropdown overlay={menu}>
                    <span className={`action account`}>
                      <Avatar size="small" className="avatar" src={currentUser.avatar} />
                      <span className="name">{currentUser.name}</span>
                    </span>
                  </Dropdown>
                ) : (
                  <Spin size="small" style={{ marginLeft: 8 }} />
                )}
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                itemRender={this.itemRender}
                routes={bread}
              />
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Switch>
                  {getRoutes(match.path, routerData).map(item => (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={item.authority}
                      redirectPath="/404"
                    />
                  ))}
                  <Redirect exact from="/" to="/center" />
                  <Route path="/404" render={(props) => <NotFound {...props} />} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ padding: 0 }}>
              <GlobalFooter
                links={[
                  {
                    key: 'Pro 首页',
                    title: 'Pro 首页',
                    href: 'http://pro.ant.design',
                    blankTarget: true,
                  },
                  {
                    key: 'github',
                    title: <Icon type="github" />,
                    href: 'https://github.com/ant-design/ant-design-pro',
                    blankTarget: true,
                  },
                  {
                    key: 'Ant Design',
                    title: 'Ant Design',
                    href: 'http://ant.design',
                    blankTarget: true,
                  },
                ]}
                copyright={
                  <Fragment>
                    Copyright <Icon type="copyright" /> 2018 Yet Another React Kit
                  </Fragment>
                }
              />
            </Footer>
          </Layout>
        </Layout>

        <BackTop />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  // location: state.location,
  login: state.login
})

const mapDispatchToProps = {
  logoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout)
