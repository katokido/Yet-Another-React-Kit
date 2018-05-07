import { injectReducer } from '../../store/reducers'
import store from '../../store/createStore'

import Blog from './containers/BlogContainer'
import reducer from './modules/Module'

injectReducer(store, { key: 'blog', reducer })

export default Blog
