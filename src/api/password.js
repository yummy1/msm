import request from '@/utils/request'

export default {
  checkPassword(userId, password){
    return request({
      url: '/user/pwd',
      method: 'post',
      data: {
        userId,
        password
      }
    })
  },
  changePassword(userId, password){
    return request({
      url: '/user/pwd',
      method: 'put',
      data: {
        userId,
        password
      }
    })
  }
}