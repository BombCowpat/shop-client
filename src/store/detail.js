import { reqGoodsDetailInfo } from "@/api";

//
const state = {
  goodsDetailInfo: {},
};

const mutations = {
  RECIEVEGOODSDETAILINFO(state,goodsDetailInfo){
    state.goodsDetailInfo = goodsDetailInfo
  }
};

const actions = {
  //searchParams 请求参数
  async getGoodsDetailInfo({ commit },skuId) {
    try {
      const result = await reqGoodsDetailInfo(skuId);
      if (result.code === 200) {
        commit("RECIEVEGOODSDETAILINFO", result.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const getters = {
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  },
  imgList(state){
    return (state.goodsDetailInfo.skuInfo || {}).skuImageList || []
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
