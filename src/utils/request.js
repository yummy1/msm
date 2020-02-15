import axios from 'axios'
import { Loading } from 'element-ui';

const loading = {
  loadingInstance : null,
  //开始加载
  open: function () {
    if (this.loadingInstance === null){
      this.loadingInstance = Loading.service({
        target:'.main',
        background: 'rgba(255,255,255,0.5)'
      });
    }
  },
  //关闭加载
  close: function () {
    if (this.loadingInstance !== null){
      this.loadingInstance.close();
    }
  }
}

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
  loading.open()
  return config;
},error => {
  loading.close()
  return Promise.reject(error);
})
/*相应拦截器*/
request.interceptors.response.use(response => {
  loading.close()
  return response;
},error => {
  loading.close()
  return Promise.reject(error);
})

export default request