import { useGetApiByTimes } from "@/composition-api";
import { apiGetRandomRestaurantByCity } from "@/api";
export default {
  namespaced: true,
  state: {
    title: "一再回訪的美食",
    linkMessage: "查看更多美食",
    swiperName: "food",
    arr: [],
  },
  actions: {
    async loadApi({ commit, state }) {
      let result = await useGetApiByTimes(apiGetRandomRestaurantByCity);
      commit("setArr", result);
      return result;
    },
  },
  mutations: {
    setArr(state, array) {
      state.arr = array;
    },
  },
  getters: {
    getArr(state) {
      return state.arr;
    },
    getTitle(state) {
      return state.title;
    },
    getLinkMessage(state) {
      return state.linkMessage;
    },
    getSwiperName(state) {
      return state.swiperName;
    },
  },
};
