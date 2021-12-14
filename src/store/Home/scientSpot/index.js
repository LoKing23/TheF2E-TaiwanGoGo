import { useGetApiByTimes } from "@/composition-api";
import { apiGetRandomSpotByCity } from "@/api";
export default {
  namespaced: true,
  state: {
    title: "熱門打卡景點",
    linkMessage: "查看更多景點",
    swiperName: "attraction",
    arr: [],
  },
  actions: {
    // 將api資訊load到arr
    async loadApi({ commit, state }) {
      let result = await useGetApiByTimes(apiGetRandomSpotByCity);
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
