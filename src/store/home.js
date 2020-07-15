import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

//
const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const mutations = {
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  RECIEVEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  RECIEVEFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const actions = {
  async getCategoryList({ commit }) {
    try {
      const result = await reqCategoryList();
      if (result.code) {
        commit("RECEIVECATEGORYLIST", result.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getBannerList({ commit }) {
    try {
      const result = await reqBannerList();
      if (result.code) {
        commit("RECIEVEBANNERLIST", result.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getFloorList({ commit }) {
    try {
      const result = await reqFloorList();
      if (result.code) {
        commit("RECIEVEFLOORLIST", result.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

const getters = {
  bannerList(state) {
    return state.bannerList;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
