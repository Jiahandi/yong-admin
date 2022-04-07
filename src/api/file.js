import request from '@/utils/request'

// 分页查询
export function getFilesListPage(params) {
  return request({
    url: '/file/page?',
    method: 'get',
    params
  })
}

// 删除
export function deleteFiles(params) {
  return request({
    url: '/file/delete',
    method: 'delete',
    params
  })
}
