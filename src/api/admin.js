import request from '@/utils/request'

// 管理员登录
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 分页查询
export function getAdminListPage(params) {
  return request({
    url: '/admin/page?',
    method: 'get',
    params
  })
}

// 查询所有
export function getAdminList(params) {
  return request({
    url: '/admin',
    method: 'get',
    params
  })
}

// 删除
export function deleteAdmin(params) {
  return request({
    url: '/admin/delete',
    method: 'delete',
    params
  })
}

// 新增-修改
export function addAdmin(data) {
  return request({
    url: '/admin',
    method: 'post',
    data
  })
}
