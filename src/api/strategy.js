import request from '@/utils/request'

// 分页查询
export function getStrategyListPage(params) {
  return request({
    url: '/strategy/page?',
    method: 'get',
    params
  })
}

// 查询所有
export function getStrategyList(params) {
  return request({
    url: '/strategy',
    method: 'get',
    params
  })
}

// 删除
export function deleteStrategy(params) {
  return request({
    url: '/strategy/delete',
    method: 'delete',
    params
  })
}

// 新增-修改
export function addStrategy(data) {
  return request({
    url: '/strategy',
    method: 'post',
    data
  })
}
