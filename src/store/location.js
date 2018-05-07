// ------------------------------------
// Constants 常量
// ------------------------------------
const LOCATION_CHANGE = 'LOCATION_CHANGE'

// ------------------------------------
// Actions 行为
// ------------------------------------
function locationChange (location = '/') {
  return {
    type: LOCATION_CHANGE,
    payload: location
  }
}

// ------------------------------------
// Specialized Action Creator
// 目前只有测试里用到
// ------------------------------------
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function (state = initialState, action) {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}
