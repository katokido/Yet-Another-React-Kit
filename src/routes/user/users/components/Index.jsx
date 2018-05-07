import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Filter from './Filter'
import List from './List'

import {
  fetchUsers
} from '../../Module'

const mapDispatchToProps = {
  fetchUsers
}

const mapStateToProps = (state) => ({
  permission: state.permission
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Users extends Component {
  static propTypes = {
    permission: PropTypes.object,
    fetchUsers: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      fields: {
        uid: {
          value: ''
        }
      },
      initials: {}
    }
  }

  componentWillMount() {
    this.props.fetchUsers()
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  onCreate = (values) => {
  }

  onUpdate = (values) => {
  }

  onDelete = (values) => {
  }

  onSearch = (values) => {
    this.props.fetchUsers()
  }

  render() {
    const { permission } = this.props
    const dataFlow = {
      initials: this.state.initials,
      options: {
        permission
      },
      params: {
        uid: this.state.fields.uid.value
      }
    }

    return (
      <Fragment>
        <Filter
          dataFlow={dataFlow}
          {...this.state.fields}
          onChange={this.onChange}
          onSearch={this.onSearch}
        />
        <List
          dataFlow={dataFlow}
        />
      </Fragment>
    )
  }
}
