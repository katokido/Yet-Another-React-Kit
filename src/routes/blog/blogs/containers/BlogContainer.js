import { connect } from 'react-redux'
import { plus } from '../modules/Module'

import Blog from '../components/Blog'

const mapDispatchtoProps = {
  plus
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

export default connect(mapStateToProps, mapDispatchtoProps)(Blog)
