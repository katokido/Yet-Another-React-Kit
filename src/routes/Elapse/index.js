import { injectReducer } from '../../store/reducers'
import store from '../../store/createStore'

import Elapse from './containers/ElapseContainer'
import reducer from './modules/elapse'

injectReducer(store, { key: 'elapse', reducer })

export default Elapse
