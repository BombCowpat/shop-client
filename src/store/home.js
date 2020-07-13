import { reqCategoryList } from "@/api";

//
const state = {
  categoryList: [],
};

const mutations = {
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
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
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
