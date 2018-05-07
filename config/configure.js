// 配置后端API地址前缀
const PREFIX_API = '/admin/api/'
const HOST = {
  LOCAL: 'http://192.168.2.49:8091',
  REMOTE: 'http://192.168.2.49:8091',
  RELEASE: `http://${__HOST__}`
}

const PLATFORM = {
  LOCAL: `${HOST.LOCAL}${PREFIX_API}`,
  REMOTE: `${HOST.REMOTE}${PREFIX_API}`,
  RELEASE: `${HOST.RELEASE}${PREFIX_API}`
}

let HOSTS, API_HOST
if (__DEV__) {
  HOSTS = PLATFORM.LOCAL
  API_HOST = `${HOST.LOCAL}${PREFIX_API}`
  console.info('  -->   sim/dev/本地开发，模拟api环境，【本地】接口. 接口常量：API_HOST; %s/...', HOSTS)
} else if (__HOST__) {
  HOSTS = PLATFORM.RELEASE
  API_HOST = `${HOST.RELEASE}${PREFIX_API}`
  console.info('  -->   release/!!!正式发布环境. 接口常量：API_HOST; %s/...', HOSTS)
} else if (__PROD__) {
  HOSTS = PLATFORM.REMOTE
  API_HOST = `${HOST.REMOTE}${PREFIX_API}`
  console.info('  -->   prod/开发环境，【后台】接口. 接口常量：API_HOST; %s/...', HOSTS)
}

window['API_HOST'] = API_HOST.slice(0, API_HOST.length - 1)

module.exports = {
  HOSTS,
  API_HOST
}
