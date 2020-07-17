import { reqGoodsList } from "@/api";

//
const state = {
  goodsListInfo: {},
};

const mutations = {
  RECIEVEGOODSLISTINFO(state,goodsListInfo){
    state.goodsListInfo = goodsListInfo
  }
};

const actions = {
  //searchParams 请求参数
  async getGoodsListInfo({ commit },searchParams) {
    try {
      const result = await reqGoodsList(searchParams);
      if (result.code === 200) {
        commit("RECIEVEGOODSLISTINFO", result.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const getters = {
  attrsList(state){
    return state.goodsListInfo.attrsList || []
  },
  goodsList(state){
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state){
    return state.goodsListInfo.trademarkList || []
  }

};

export default {
  state,
  mutations,
  actions,
  getters,
};
