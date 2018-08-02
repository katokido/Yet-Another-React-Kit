import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/counter': {
    component: dynamicWrapper(['counter'], () => import(/* webpackChunkName: "counter" */ './counters')),
  }
}

export default routes
