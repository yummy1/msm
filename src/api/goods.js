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
      method: 'put',
      data: pojo
    })
  }
}