import request from '@/utils/request'

export default {
  searchList(currentPage, pageSize, searchMap){
    return request({
      url: `/staff/list/search/${currentPage}/${pageSize}`,
      method: 'post',
      data: searchMap
    })
  },
  add(pojo){
    return request({
      url: '/staff',
      method: 'post',
      data: pojo
    })
  },
  getById(id){
    return request({
      url: `/staff/${id}`,
      method: 'get'
    })
  },
  edit(pojo){
    return request({
      url: `/staff/${pojo.id}`,
      method: 'put',
      data: pojo
    })
  },
  delete(id){
    return request({
      url: `/staff/${id}`,
      method: 'delete'
    })
  },

}