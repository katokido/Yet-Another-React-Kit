import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/account': {
    component: dynamicWrapper([], () => import(/* webpackChunkName: "account" */ './UserLayout')),
    hideInBreadcrumb: false,
    name: '账户',
  },
  '/account/login': {
    component: dynamicWrapper([], () => import(/* webpackChunkName: "login" */ '../../components/Login/Login')),
    hideInBreadcrumb: false,
    name: '登录',
  },
}

export default routes
