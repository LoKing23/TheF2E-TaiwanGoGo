import allCity from "@/assets/allCity.js";
//new
import { apiGetScenicSpot, apiGetSpotByCity } from "@/api";
import { useMapLv2Img } from "@/composition-api";
export default {
  namespaced: true,
  state: {
    breadcrumb: ["首頁", "探索景點"],
    hotClass: {
      title: "熱門主題",
      className: [
        "自然風景類",
        "觀光工廠類",
        "遊憩類",
        "休閒農場類",
        "生態類",
        "溫泉類",
        "古蹟類",
      ],
      Lv2ImgInfo: {
        className: "ScientSpot",
        totalNum: 7,
      },
      imgArr: [],
    },
    form: {
      city: {
        citySelected: "all",
        allCity,
      },
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
      apiGetScenicSpot(
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
          result = await apiGetScenicSpot(`$filter=${filter}`);
          console.log("Top");
        } else {
          console.log("bottom");
          result = await apiGetScenicSpot();
          console.log(result);
        }
      } else {
        if (filter) {
          result = await apiGetSpotByCity(city, `$filter=${filter}`);
          console.log("City-Top");
        } else {
          result = await apiGetSpotByCity(city, "");
          console.log("City-bottom");
        }
      }
      commit("setSearchResult", result.data);
      commit("setSearchState", true);
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
    getFormKeyWord(state) {
      if (state.form.keyWord) return `contains(Name, '${state.form.keyWord}')`;
      else return "";
    },
    getFormCitySelected(state) {
      return state.form.city.citySelected;
    },
  },
};
