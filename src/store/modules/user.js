import {setToken, getToken, setUser, getUser, removeToken} from "../../utils/auth";
import {login, logout, getUserInfo} from "../../api/login";

const user = {
  state: {
    token: getToken(),
    user: getUser()
  },
  mutations: {
    SET_TOKEN(state, token){
      state.token = token
      setToken(token)
    },
    SET_USER(state, user){
      state.user = user
      setUser(user)
    },
    REMOVE(state){
      state.token = null
      state.user = null
      removeToken()
    }
  },
  actions: {
    Login({commit}, form){
      return new Promise((resolve, reject) => {
        login(form.name, form.password).then(response => {
          const resp = response.data
          if(resp.flag){
            const token = resp.data.token
            commit('SET_TOKEN', token)
          }
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({commit, token}){
      return new Promise((resolve, reject) => {
        getUserInfo(token).then(response => {
          const resp = response.data
          if(resp.flag){
            commit('SET_USER',resp.data)
          }
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({commit}){
      return new Promise((resolve, reject) => {
        logout().then(response => {
          const resp = response.data
          if(resp.flag){
            commit('REMOVE')
          }
          console.log('logout,user js', resp)
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default user