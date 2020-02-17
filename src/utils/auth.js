const TOKEN_KEY = 'msm-token'
const USER_KEY = 'msm-user'

// 保存token
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}
//获取token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
//保存用户信息
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
//获取用户信息
export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}
//移除token和用户信息
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}