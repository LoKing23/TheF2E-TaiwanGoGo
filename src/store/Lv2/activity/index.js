import allCity from "@/assets/allCity.js";
import { apiGetActivity, apiGetActivityByCity } from "@/api";
import { useMapLv2Img } from "@/composition-api";
export default {
  namespaced: true,
  state: {
    breadcrumb: ["首頁", "探索景點"],
    hotClass: {
      title: "熱門主題",
      className: [
        "節慶活動",
        "自行車活動",
        "遊憩活動",
        "產業文化活動",
        "年度活動",
        "四季活動",
      ],
      Lv2ImgInfo: {
        className: "Activity",
        totalNum: 6,
      },
      imgArr: [],
    },
    form: {
      city: {
        citySelected: "all",
        allCity,
      },
      date: new Date(),
      keyWord: "",
    },
    search: {
      isSearch: false,
      searchResult: [],
    },
  },
  actions: {
    init({ state, commit }) {
      //1 load熱門圖片
      //useMapLv2Img：根據className 與 照片數量動態取得圖片路徑
      useMapLv2Img(state.hotClass.Lv2ImgInfo).then((res) => {
        //回傳圖片路徑陣列與className作map
        commit("mapImgAndImgName", res);
      });
      //2 重置search狀態
      commit("setSearchState", false);
      commit("setSearchResult", []);
    },
    //api取熱門景點
    apiHotClass({ commit, state }, hotClass) {
      console.log("hotClass:", hotClass);
      apiGetActivity(
        `$filter=Class1 eq '${hotClass}' or Class2 eq '${hotClass}'`,
      ).then((res) => {
        console.log(res.data);
        state.search.searchResult = res.data;
        state.search.isSearch = true;
      });
    },
    // api根據form打
    async apiForm({ commit, getters }) {
      const filters = [getters.getFormDate, getters.getFormKeyWord];
      let filter = filters.map((item) => item).filter((item) => item);
      filter = filter.join(" and ");
      let result = null;
      const city = getters.getFormCitySelected;
      console.log(
        "getters.getFormKeyWord from action:",
        getters.getFormKeyWord,
      );
      if (city === "all") {
        if (filter) {
          result = await apiGetActivity(`$filter=${filter}`);
          console.log("Top");
        } else {
          console.log("bottom");
          result = await apiGetActivity();
          console.log(result);
        }
      } else {
        if (filter) {
          result = await apiGetActivityByCity(city, `$filter=${filter}`);
          console.log("City-Top");
        } else {
          result = await apiGetActivityByCity(city, "");
          console.log("City-bottom");
        }
      }
      commit("setSearchResult", result.data);
      commit("setSearchState", true);
    },
    // api依參數條件
    apiRequest({ commit, getters }, filter) {
      apiGetActivity(`filter=${filter}`).then((res) => {
        console.log(res.data);
        commit("setSearchResult", res.data);
        commit("setSearchState", true);
      });
    },
  },
  mutations: {
    //將傳入的圖片路徑與className作binding
    mapImgAndImgName(state, lv2Img) {
      state.hotClass.imgArr = lv2Img.map((item, index) => {
        return {
          className: state.hotClass.className[index],
          imgUrl: item,
        };
      });
    },
    resetBreadcrumb(state) {
      state.breadcrumb = ["首頁", "探索景點"];
    },
    setSearchResult(state, result) {
      state.search.searchResult = result;
    },
    setSearchState(state, boolean) {
      state.search.isSearch = boolean;
    },
  },
  getters: {
    getBreadcrumb(state) {
      return state.breadcrumb;
    },
    getHotClass(state) {
      return state.hotClass;
    },
    getForm(state) {
      return state.form;
    },
    getSearch(state) {
      return state.search;
    },
    getFormDate(state) {
      return "";

      let filter = "";
      //區間條件式，ge:大於等於,le:小於等於
      const range = ["ge", "le"];
      filter = form.data.date.map((item, index) => {
        // date(StartTime) gt 2021-10-17T00:12:00+08:00
        if (item) {
          return `date(StartTime) ${range[index]} ${item.getFullYear()}-${
            item.getMonth() + 1
          }-${item.getDate()}T${item.getHours()}:${item.getMinutes()}:00+08:00`;
        }
      });
      if (filter[1]) return filter.join(" and ");
      else return filter[0];
    },
    getFormKeyWord(state) {
      if (state.form.keyWord) return `contains(Name, '${state.form.keyWord}')`;
      else return "";
    },
    getFormCitySelected(state) {
      return state.form.city.citySelected;
    },
  },
};
