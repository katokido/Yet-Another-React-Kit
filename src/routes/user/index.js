import React from 'react'

import Bundle from '../../common/Bundle'
import { injectReducer } from '../../store/reducers'
import store from '../../store/createStore'
import reducer from './Module'

injectReducer(store, { key: 'cdkey', reducer })

const routes = [
  {
    path: 'users',
    name: 'Users',
    main: (props) => <Bundle dataProps={props} load={() => import('./users')} />
  },
  {
    path: 'roles',
    name: 'Roles',
    main: (props) => <Bundle dataProps={props} load={() => import('./roles')} />
  },
  {
    path: 'menus',
    name: 'Menus',
    main: (props) => <Bundle dataProps={props} load={() => import('./menus')} />
  }
]

export default routes
