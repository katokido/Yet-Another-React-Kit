import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/blog': {
    component: dynamicWrapper(['blog'], () => import(/* webpackChunkName: "blog" */ './blogs')),
  }
}

export default routes
