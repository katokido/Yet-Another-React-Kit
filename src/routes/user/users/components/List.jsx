import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

export default class List extends Component {
  static propTypes = {
    dataFlow: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: '账号',
        dataIndex: 'name'
      },
      {
        title: '真实姓名',
        dataIndex: 'realName'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '邮件',
        dataIndex: 'email'
      }
    ]

    this.state = {
      data: {
        dataSource: [],
        count: 0
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const permission = nextProps.dataFlow.options.permission
    const dataSource = permission.users.map((elem, index) => ({
      ...elem,
      key: index
    }))
    this.setState({
      data: {
        dataSource: [...dataSource],
        count: dataSource.length
      }
    })
  }

  render() {
    const { params } = this.props.dataFlow
    const pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.data.count,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`
    }
    let arrParams = []
    params.uid && arrParams.push(`UID：${params.uid}`)
    const defaultLocale = {
      emptyText: arrParams.length ? `查询：{ ${arrParams.join('，')} }，暂未查到数据` : '未作查询，暂无数据'
    }

    return (
      <Fragment>
        <Table
          dataSource={this.state.data.dataSource}
          columns={this.columns}
          locale={defaultLocale}
          rowKey='uid'
          pagination={pagination}
        />
      </Fragment>
    )
  }
}
