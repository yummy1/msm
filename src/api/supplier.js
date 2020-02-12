import request from '@/utils/request'

export default {
  supplierList(){
    return request({
      url: '/supplier/list',
      method: 'get'
    })
  },
  searchList(page,size,searchMap){
    return request({
      url: `/supplier/list/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
}