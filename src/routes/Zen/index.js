import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/zen': {
    component: dynamicWrapper(['zen'], () => import(/* webpackChunkName: "zen" */ './zens'))
  }
}

export default routes
