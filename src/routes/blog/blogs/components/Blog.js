import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { Row, Col, Card, Timeline } from 'antd'

import { plus } from '../modules/Module'

const mapDispatchtoProps = {
  plus
}

const mapStateToProps = (state) => ({
  blog: state.blog
})

@connect(mapStateToProps, mapDispatchtoProps)
export default class Blog extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <Row gutter={48}>
          <Col span={16} push={8}>
            <Timeline>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </Timeline.Item>
              <Timeline.Item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </Timeline.Item>
            </Timeline>
          </Col>
          <Col span={8} pull={16}>
            <Card bodyStyle={{
              padding: 0
            }} style={{
              marginBottom: 16
            }}>
              <div className="custom-image">
                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
              </div>
              <div className="custom-card">
                <h3>Europe Street beat</h3>
                <p>www.instagram.com</p>
              </div>
            </Card>

            <Card title="Cards" extra={<a href="#" > More </a>}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <p className="footer">联系方式 | hoolai.com 2003 - 2017 Site Meter</p>
          </Col>
        </Row>
      </div>
    )
  }
}
