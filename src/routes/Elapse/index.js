import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/elapse': {
    component: dynamicWrapper(['elapse'], () => import(/* webpackChunkName: "elapse" */ './elapses')),
  }
}

export default routes
