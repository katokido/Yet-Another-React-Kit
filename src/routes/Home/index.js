import dynamicWrapper from '../../utils/dynamicWrapper'

const routes = {
  '/center': {
    component: dynamicWrapper([], () => import(/* webpackChunkName: "home" */ './components/HomeView')),
  }
}

export default routes
