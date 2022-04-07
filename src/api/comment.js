import request from '@/utils/request'

// 主评论分页查询
export function getMainCommentListPage(params) {
  return request({
    url: '/maincomment/page?',
    method: 'get',
    params
  })
}

// 删除
export function deleteMainComment(params) {
  return request({
    url: '/maincomment/delete',
    method: 'delete',
    params
  })
}

// 主评论分页查询
export function getSubCommentListPage(params) {
  return request({
    url: '/subcomment/page?',
    method: 'get',
    params
  })
}

// 删除
export function deleteSubComment(params) {
  return request({
    url: '/subcomment/delete',
    method: 'delete',
    params
  })
}
