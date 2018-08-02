import { isUrl } from '../utils/utils'

const menuData = [
  {
    name: 'Center',
    icon: 'form',
    path: 'center',
    hideInBreadcrumb: true,
    hideInMenu: true,
  },
  {
    name: '权限管理',
    icon: 'dashboard',
    path: 'user',
    authority: 'admin',
    children: [
      {
        name: '用户列表',
        path: 'users',
      },
      {
        name: '角色列表',
        path: 'roles',
      },
      {
        name: '菜单列表',
        path: 'menus',
        hideInBreadcrumb: false,
        hideInMenu: false,
      },
      {
        name: '权限列表',
        path: 'promits',
        hideInBreadcrumb: true,
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'Blog',
    icon: 'form',
    path: 'blog',
  },
  {
    name: 'Counter',
    icon: 'table',
    path: 'counter',
  },
  {
    name: 'Elapse',
    icon: 'profile',
    path: 'elapse',
  },
  {
    name: 'Zen',
    icon: 'check-circle-o',
    path: 'zen',
  },
  {
    name: '404',
    icon: 'warning',
    path: '404',
  },
]

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    const path = !isUrl(item.path) ? parentPath + item.path : item.path
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
    }
    return result
  })
}

export const getMenuData = (menus = menuData) => formatter(menus)
