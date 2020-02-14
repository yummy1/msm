import request from '@/utils/request'

export default {
  searchList(currentPage, pageSize, searchMap){
    return request({
      url: `/goods/list/search/${currentPage}/${pageSize}`,
      method: 'post',
      data: searchMap
    })
  },
  add(pojo){
    return request({
      url: '/goods',
      method: 'post',
      data: pojo
    })
  },
  getById(id){
    return request({
      url: `/goods/${id}`,
      method: 'get'
    })
  },
  edit(pojo){
    return request({
      url: `/goods/${id}`,
      method: 'put',
      data: pojo
    })
  },
  delete(id){
    return request({
      url: `/goods/${id}`,
      method: 'delete'
    })
  },

}