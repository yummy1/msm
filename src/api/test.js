import request from '@/utils/request'

request({
  method: 'get',
  url: '/db.json'
}).then(response => {
   console.log('get2',response.data)
})

export default {
  getList(){
    const req = request({
      method: 'get',
      url: '/db.json'
    })
    return req
  }
}