import request from '@/utils/request'

// 分页查询
export function getScenicListPage(params) {
  return request({
    url: '/scenic/page?',
    method: 'get',
    params
  })
}

// 查询所有
export function getScenicList(params) {
  return request({
    url: '/scenic',
    method: 'get',
    params
  })
}

// 删除
export function deleteScenic(params) {
  return request({
    url: '/scenic/delete',
    method: 'delete',
    params
  })
}

// 新增-修改
export function addScenic(data) {
  return request({
    url: '/scenic',
    method: 'post',
    data
  })
}
