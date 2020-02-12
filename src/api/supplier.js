import request from '@/utils/request'

export default {
  supplierList(){
    return request({
      url: '/supplier/list',
      method: 'get'
    })
  },
  //根据条件查询列表
  searchList(page,size,searchMap){
    return request({
      url: `/supplier/list/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  //新增
  add(pojo){
    return request({
      url: '/supplier',
      method: 'post',
      data: pojo
    })
  },
  //根据id查询供应商信息
  getById(id){
    return request({
      url: `/supplier/{id}`,
      method: 'get'
    })
  },
  //修改供应商信息
  edit(pojo){
    return request({
      url: `/supplier/{pojo.id}`,
      method: 'put',
      data: pojo
    })
  },
  delete(id){
    return request({
      url: `/supplier/{id}`,
      method: 'delete'
    })
  },
}