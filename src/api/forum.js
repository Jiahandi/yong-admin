import request from '@/utils/request'

// 分页查询
export function getForumListPage(params) {
  return request({
    url: '/forum/page?',
    method: 'get',
    params
  })
}

// 查询所有
export function getForumList(params) {
  return request({
    url: '/forum',
    method: 'get',
    params
  })
}

// 删除
export function deleteForum(params) {
  return request({
    url: '/forum/delete',
    method: 'delete',
    params
  })
}

// 新增-修改
export function addForum(data) {
  return request({
    url: '/forum',
    method: 'post',
    data
  })
}
