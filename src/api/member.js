import request from '@/utils/request'

export default {
  getList(){
    return request({
      url: 'member/list',
      method: 'get'
    })
  },
  //查询
  searchList(currentPage,size,searchMap) {
    return request({
      url: `member/list/search/${currentPage}/${size}`,
      method: 'post',
      data: {
        searchMap
      }
    })
  },
  //新增
  add(pojo) {
    return request({
      url: '/member',
      method: 'post',
      data: {
        pojo
      }
    })
  },
  //编辑
  edit(pojo) {
    return request({
      url: `/member/${pojo.id}`,
      method: 'put',
      data: {
        pojo
      }
    })
  },
  //根据id查询
  searchById(id) {
    return request({
      url: `/member/${id}`,
      method: 'get'
    })
  },
  //根据id删除
  deleteById(id) {
    return request({
      url: `/member/${id}`,
      method: 'delete'
    })
  }
}