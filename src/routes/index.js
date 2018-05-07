// 我们只需要导入初始渲染所需的模块
import React from 'react'

import Bundle from '../common/Bundle'
import Blog from './blog'
import Counter from './Counter'

const routes = [
  {
    path: 'blog',
    name: 'Blog',
    main: () => <Blog />
  },
  {
    path: 'counter',
    name: 'Counter',
    main: () => <Counter />
  },
  {
    path: 'zen',
    name: 'Zen',
    main (props) {
      return <Bundle dataProps={props} load={() => import('./Zen')} />
    }
  },
  {
    path: 'elapse',
    name: 'Elapse',
    main: (props) => <Bundle dataProps={props} load={() => import('./Elapse')} />
  },
  // {
  //   path: 'user/:id',
  //   name: 'User',
  //   main: (props) => <Bundle dataProps={props} load={() => import('./User')} />
  // },
  {
    path: '404',
    name: '404',
    main: (props) => <Bundle dataProps={props} load={() => import('../components/PageNotFound')} />
  }
]

export default routes
