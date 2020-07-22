import { getUserTempId } from "@/utils/userabout";
import { reqRegister,reqLogin,reqlogout } from "@/api";
const state = {
  userTempId: getUserTempId(),
  //刷新后先从localstorage 拿用户信息 
  userInfo:JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
};
const mutations = {
  RECIEVEUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  RESETUSERINFO(state){
    state.userInfo = {}
  }
};
const actions = {
  async userRegister({ commit }, userInfo) {
    let result = await reqRegister(userInfo)
    if(result.code === 200){
      return 'register ok'
    }else{
      return Promise.reject(new Error('register failed'))
    }
  },
  async userLogin({commit},userInfo){
    const result = await reqLogin(userInfo)
    if(result.code === 200){
      //存储用户信息 自动登录 
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
      commit('RECIEVEUSERINFO',result.data)
    }
  },
  async userLogout({commit}){
    const result = await reqlogout()
    if(result.code === 200){
      //退出成功后，清除state.userInfo 信息  变为{} 顺便清除 localstorage 内信息 
      commit('RESETUSERINFO')
      localStorage.removeItem('USERINFO_KEY')
    }
  }

};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
