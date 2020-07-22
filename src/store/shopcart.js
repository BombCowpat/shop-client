import { reqAddOrUpdateShopCart,reqShopCartList,reqUpdateIsChecked,reqDeleteGoods } from "@/api";

//
const state = {
  shopCartList:[]
};

const mutations = {
  RECIEVESHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  }
};

const actions = {
  //改变单个商品数量
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code === 200){
      return '添加购物车成功'
    }else{
      // return '添加购物车失败'
      return Promise.reject(new Error('添加购物车失败'))
    }
  },
  async getShopCartList({commit}){
    const result = await reqShopCartList()
    if(result.code === 200){
      commit('RECIEVESHOPCARTLIST',result.data)
    }
  },
  async updateIsChecked({commit},{skuId,isChecked}){
    let result = await reqUpdateIsChecked(skuId,isChecked)
    if(result.code === 200){
      return '修改选择状态成功'
    }else{
      return Promise.reject(new Error('修改选中状态失败'))
    }
  },
  updateAllIsChecked({commit,state,dispatch},isChecked){
    let promises = []
    state.shopCartList.forEach(item => {
      if(item.isChecked === isChecked) return
      let promise = dispatch('updateIsChecked',{skuId:item.skuId,isChecked:isChecked})
      promises.push(promise)
    })
    return Promise.all(promises)
  },
  async deleteGoods({commit},skuId){
    const result = await reqDeleteGoods(skuId)
    if(result.code === 200){
      return 'delete ok'
    }else{
      return Promise.reject(new Error('delete failed'))
    }
  },
  deleteCheckedGoods({commit,dispatch,state}){
    let promises = []
    state.shopCartList.forEach(item => {
      if(!item.isChecked) return
      let promise = dispatch('deleteGoods',item.skuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  }
  

};

const getters = {

};

export default {
  state,
  mutations,
  actions,
  getters,
};
