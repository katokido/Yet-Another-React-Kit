import { combineReducers } from 'redux'
import location from './location'
import login from './login'
// import fakeAuth from './fakeAuth'

/**
|--------------------------------------------------
| Root Reducer
|--------------------------------------------------
*/
// 根Reducer
export const makeRootReducer = (asyncReducers = {}) => combineReducers({
  location,
  login,
  // fakeAuth,
  ...asyncReducers
})

/**
|--------------------------------------------------
| 注入
| replaceReducer(nextReducer)
| 替换 store 当前用来计算 state 的 reducer。
| 这是一个高级 API。只有在你需要实现代码分隔，而且需要立即加载一些 reducer 的时候才可能会用到它。
| 在实现 Redux 热加载机制的时候也可能会用到。
|--------------------------------------------------
*/
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    return
  }

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
