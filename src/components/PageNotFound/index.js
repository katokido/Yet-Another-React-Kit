import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/404': {
    component: dynamicWrapper([], () => import(/* webpackChunkName: "notfound" */ './components/PageNotFound')),
    name: '404',
  }
}

export default routes
