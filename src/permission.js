
import router from './router/index'
import {getUserInfo} from './api/login'


//全局前置守卫,拦截

router.beforeEach((to, from, next) => {
  //是否去登录页面,是的话不管
  if (to.path === '/login'){
    next()
  }else {
    //不是的话,查看是否有token
    const token = localStorage.getItem('msm-token')
    if(token){
      //再看是否有用户信息
      const userInfo = localStorage.getItem('msm-user')
      if(userInfo){
        //有的话,啥也不做
        next()
      }else {
        //没有的话获取用户信息
        getUserInfo(token).then(response => {
          const resp = response.data
          if (resp) {
            localStorage.setItem('msm-user', JSON.stringify(response.data))
            next()
          } else {
            //获取用户信息失败,去登录页
            next({path: '/login'})
          }

        })
      }
    }else {
        //没有token,直接去登录页
        next({path: '/login'})
      }
  }
})