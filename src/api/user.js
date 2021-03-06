import request from '@/utils/request'

// 分页查询
export function getUserListPage(params) {
  return request({
    url: '/user/page?',
    method: 'get',
    params
  })
}

// 查询所有
export function getUserList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

// 删除
export function deleteUser(params) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params
  })
}

// 新增-修改
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}
