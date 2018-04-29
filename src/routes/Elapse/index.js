import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'elapse',
  breadcrumbName: "Elapse",
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Elapse = require('./containers/ElapseContainer').default
      const reducer = require('./modules/elapse').default
      injectReducer(store, { key: 'elapse', reducer })
      cb(null, Elapse)
    })
  }
})
