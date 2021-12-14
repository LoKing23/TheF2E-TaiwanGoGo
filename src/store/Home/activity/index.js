import { useGetApiByTimes } from "@/composition-api";
import { apiGetRandomActivityByCity } from "@/api";
export default {
  namespaced: true,
  state: {
    title: "近期活動",
    linkMessage: "查看更多活動",
    swiperName: "activity",
    arr: [],
  },
  actions: {
    async loadApi({ commit, state }) {
      let result = await useGetApiByTimes(apiGetRandomActivityByCity);
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
