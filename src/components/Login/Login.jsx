import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from 'ant-design-pro/lib/Login'
import { Alert, Checkbox, Icon } from 'antd'
import './Login.less'

import { loginAction } from '../../store/login'
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login

const mapStateToProps = state => ({
  login: state.login
})

const mapDispatchToProps = {
  loginAction
}

@connect(mapStateToProps, mapDispatchToProps)
class LoginAdmin extends React.Component {
  static propTypes = {
    loginAction: PropTypes.func
  }

  state = {
    notice: '',
    type: 'tab1',
    autoLogin: true,
  }

  handleSubmit = (err, values) => {
    if (this.state.type === 'tab1') {
      this.props.loginAction(values)
      this.setState({
        notice: '',
      }, () => {
        if (!err && (values.username !== 'admin' || values.password !== '123456')) {
          setTimeout(() => {
            this.setState({
              notice: 'The combination of username and password is incorrect!',
            })
          }, 500)
        }
      })
    }
  }

  onTabChange = (key) => {
    this.setState({
      type: key,
    })
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    })
  }

  render() {
    return (
      <div className="main">
        <Login
          defaultActiveKey={this.state.type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="tab1" tab="账号登录">
            {
              this.state.notice &&
              <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
            }
            <UserName name="username" />
            <Password name="password" />
          </Tab>
          <Tab key="tab2" tab="手机登录">
            <Mobile name="mobile" />
            <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>记住登录状态</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div>
          <Submit>登录</Submit>
          <div className="other">
            其他登录方式
            <Icon className="icon" type="alipay-circle" />
            <Icon className="icon" type="taobao-circle" />
            <Icon className="icon" type="weibo-circle" />
            <a style={{ float: 'right' }} href="">注册账户</a>
          </div>
        </Login>
      </div>
    )
  }
}

export default LoginAdmin
