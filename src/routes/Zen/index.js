import { injectReducer } from '../../store/reducers'
import store from '../../store/createStore'

import reducer from './modules/zen'
import Zen from './containers/ZenContainer'

injectReducer(store, { key: 'zen', reducer })

export default Zen
