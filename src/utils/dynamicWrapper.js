import React, { createElement } from 'react'
// import { Spin } from 'antd'
import Loadable from 'react-loadable'
import Loading from './Loading'
import { injectReducer } from '../store/reducers'
import store from '../store/createStore'

export default (models, component) => {
  models.map(
    model => component().then(
      raw => injectReducer(store, { key: model, reducer: raw[model] })
    )
  )

  const raw = (async () => await component())()
  false && console.log(raw)

  return Loadable({
    // loader: () => {
    //   return component().then(raw => {
    //     const Component = raw.default || raw
    //     return props => createElement(Component, { ...props })
    //   })
    // },
    loader: () => component().then(
      raw => props => createElement(raw.default, {...props})
    ),
    loading: Loading,
    // loading: () => {
    //   return <Spin size="large" className="global-spin" />
    // },
    delay: 200,
    timeout: 2000,
  })
}
