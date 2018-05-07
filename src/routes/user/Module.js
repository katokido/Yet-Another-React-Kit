import axios from 'axios'

/* action types */
const USERS_REQUEST = 'USERS_REQUEST'
const USERS_RESPONSE = 'USERS_RESPONSE'

const ROLES_REQUEST = 'ROLES_REQUEST'
const ROLES_RESPONSE = 'ROLES_RESPONSE'

const MENUS_REQUEST = 'MENUS_REQUEST'
const MENUS_RESPONSE = 'MENUS_RESPONSE'

/**
 * [生成 action creator Generators]
 * @return {[type]} [description]
 */
export function makeActionCreator(type, ...argKeys) {
  return (...args) => {
    let action = { type }
    argKeys.forEach((arg, index) => {
      action[argKeys[index]] = args[index]
    })
    return action
  }
}

/* action creator */
const requestUsers = makeActionCreator(USERS_REQUEST)
const responseUsers = makeActionCreator(USERS_RESPONSE, 'payload')

function fetchUsers() {
  return async (dispatch) => {

    dispatch(requestUsers())
    const url = ''
    try {
      const payload = await axios.get(url)
      dispatch(responseUsers(payload))
    } catch (e) {
      console.log('Errors', e)
    }
  }
}

const requestRoles = makeActionCreator(ROLES_REQUEST)
const responseRoles = makeActionCreator(ROLES_RESPONSE, 'payload')

function fetchRoles(data = {}) {
  return async (dispatch) => {

    dispatch(requestRoles())
    const url = ''
    try {
      const payload = await axios.get(url, {params: data.params})
      dispatch(responseRoles(payload))
    } catch (e) {
      console.log('Errors', e)
    }
  }
}

const requestMenus = makeActionCreator(MENUS_REQUEST)
const responseMenus = makeActionCreator(MENUS_RESPONSE, 'payload')

function fetchMenus() {
  return async (dispatch) => {

    dispatch(requestMenus())
    const url = ''
    try {
      const payload = await axios.get(url)
      dispatch(responseMenus(payload))
    } catch (e) {
      console.log('Errors', e)
    }
  }
}


export {
  fetchUsers,
  fetchRoles,
  fetchMenus
}

/* initial states */
const INIT_STATES = {
  fetching: false,
  errMsg: {},
  users: [],
  roles: [],
  menus: []
}

/* Action Handlers */
const ACTION_HANDLERS = {
  [USERS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      users: []
    })
  },
  [USERS_RESPONSE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      users: action.payload
    })
  },
  [ROLES_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      roles: []
    })
  },
  [ROLES_RESPONSE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      roles: action.payload
    })
  },
  [MENUS_REQUEST]: (state) => {
    return ({
      ...state,
      fetching: true,
      menus: []
    })
  },
  [MENUS_RESPONSE]: (state, action) => {
    return ({
      ...state,
      fetching: false,
      menus: action.payload
    })
  }
}

/* Reducer */
export default function (state = INIT_STATES, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
