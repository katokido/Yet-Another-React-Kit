import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/user/users': {
    component: dynamicWrapper(['permission'], () => import(/* webpackChunkName: "users" */ './users')),
  },
  '/user/roles': {
    component: dynamicWrapper(['permission'], () => import(/* webpackChunkName: "roles" */ './roles')),
  },
  '/user/menus': {
    component: dynamicWrapper(['permission'], () => import(/* webpackChunkName: "menus" */ './menus')),
    hideInBreadcrumb: false,
    name: '菜单',
    authority: 'menus',
  }
}

export default routes
