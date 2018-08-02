import React, { createElement } from 'react'
import { Spin } from 'antd'
import pathToRegexp from 'path-to-regexp'
import Loadable from 'react-loadable'
import { injectReducer } from '../store/reducers'
import { getMenuData } from './menu'

import baseLayout from '../layouts/BaseLayout'
import userLayout from '../layouts/UserLayout'
import routes from '../routes'
import notfound from '../components/PageNotFound'

let routerCache
// wrapper of dynamic
export const dynamicWrappers = (store, models, component) => {
  models.map(model => {
    component().then(comp => {
      injectReducer(store, { key: model, reducer: comp[model] })
    })
  })

  return Loadable({
    loader: () => {
      if (!routerCache) {
        routerCache = getRouterData(store)
      }
      return component().then(raw => {
        const Component = raw.default || raw
        return props => createElement(Component, { ...props, routerData: routerCache })
      })
    },
    loading: () => {
      return <Spin size="large" className="global-spin" />
    },
  })
}

function getFlatMenuData(menus) {
  let keys = {}
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item }
      keys = { ...keys, ...getFlatMenuData(item.children) }
    } else {
      keys[item.path] = { ...item }
    }
  })
  return keys
}

export const getRouterData = () => {
  const routerConfig = {
    ...baseLayout,
    ...userLayout,
    ...routes,
    ...notfound,
  }
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData())

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {}
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path)
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`))
    let menuItem = {}
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey]
    }
    let router = routerConfig[path]
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    }
    routerData[path] = router
  })
  return routerData
}
