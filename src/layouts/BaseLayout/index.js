import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/': {
    component: dynamicWrapper([], () => import(/* webpackChunkName: "baselayout" */ './BaseLayout.jsx')),
  }
}

export default routes
