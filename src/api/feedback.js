import request from '@/utils/request'

// 分页查询
export function getFeedbackListPage(params) {
  return request({
    url: '/feedback/page?',
    method: 'get',
    params
  })
}

// 查询所有
export function getFeedbackList(params) {
  return request({
    url: '/feedback',
    method: 'get',
    params
  })
}

// 删除
export function deleteFeedback(params) {
  return request({
    url: '/feedback/delete',
    method: 'delete',
    params
  })
}

// 新增-修改
export function addFeedback(data) {
  return request({
    url: '/feedback',
    method: 'post',
    data
  })
}
