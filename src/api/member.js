import request from '@/utils/request'

export default {
  getList(){
    return request({
      url: 'member/list',
      method: 'get'
    })
  },
  searchList(currentPage,size,searchMap){
    return request({
      url: `member/list/search/${currentPage}/${size}`,
      method: 'post',
      data: {
        searchMap
      }
    })
  }
}