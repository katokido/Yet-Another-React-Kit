import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Input, message } from 'antd'

class UserSearch extends Component {
  static propTypes = {
    form: PropTypes.object,
    onSearch: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch({
          params: {
            uid: values.uid || ''
          }
        })
      } else {
        Object.values(err).map(val => val.errors.map(v => message.warning(v.message, 3)))
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Fragment>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={16} style={{ marginBottom: 8 }}>
            <Col className='gutter-row' span={4}>
              {getFieldDecorator('uid', {
                rules: [{ type: 'string', required: true, message: 'input uid!' }]
              })(
                <Input
                  placeholder='input uid'
                />
              )}
            </Col>
            <Col className='gutter-row' span={2}>
              <Button
                type='primary'
                htmlType='submit'
              >
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </Fragment>
    )
  }
}

export default Form.create({
  onFieldsChange (props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields (props) {
    return {
      uid: Form.createFormField({
        ...props.uid,
        value: props.uid.value
      })
    }
  },
  onValuesChange (_, values) {}
})(UserSearch)
