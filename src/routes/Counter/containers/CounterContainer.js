import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/counter'

import Counter from '../components/Counter'

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    counter: state.counter
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
