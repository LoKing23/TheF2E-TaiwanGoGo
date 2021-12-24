import allCity from "@/assets/allCity.js";
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
    pagination: {
      //每頁顯示筆數
      PER_PAGE_DISPLAY_DATA: 12,
      //目前頁面
      currentPage: 1,
      totalPage: null,
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
      //3 重置 pagination
      commit("setCurrentPage", 1);
    },
    //api取熱門景點
    apiHotClass({ commit, state }, hotClass) {
      console.log("hotClass:", hotClass);
      apiGetScenicSpot(
        `$filter=Class1 eq '${hotClass}' or Class2 eq '${hotClass}'`,
      ).then((res) => {
        console.log(res.data);
        commit("setSearchResult", res.data);
        commit("setSearchState", true);
        commit("setTotalPage");
        commit("setCurrentPage", 1);
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
      commit("setTotalPage");
      commit("setCurrentPage", 1);
    },
    apiRequest({ commit, getters }, filter) {
      apiGetScenicSpot(`filter=${filter}`).then((res) => {
        console.log(res.data);
        commit("setSearchResult", res.data);
        commit("setSearchState", true);
        commit("setTotalPage");
        commit("setCurrentPage", 1);
      });
    },
    HandSetCurrentPage({ commit }, index) {
      commit("setCurrentPage", index);
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
      console.log("in setSearchState");
      console.log(boolean);

      state.search.isSearch = boolean;
      console.log(state.search.isSearch);
    },
    //根據searchResult和PER_PAGE_DISPLAY_DATA計算總夜市
    setTotalPage(state) {
      //有result才計算
      if (state.search.searchResult.length) {
        console.log("有計算啦");
        const totalResult = state.search.searchResult.length;
        const PER_PAGE_DISPLAY_DATA = state.pagination.PER_PAGE_DISPLAY_DATA;
        //沒有整除
        if (totalResult % PER_PAGE_DISPLAY_DATA) {
          state.pagination.totalPage =
            Math.floor(totalResult / PER_PAGE_DISPLAY_DATA) + 1;
          console.log(state.pagination.totalPage);
        } else {
          state.pagination.totalPage = totalResult / PER_PAGE_DISPLAY_DATA;
          console.log(state.pagination.totalPage);
        }
      }
    },
    setCurrentPage(state, index) {
      state.pagination.currentPage = index;
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
    getPagination(state) {
      return state.pagination;
    },
    getPaginationCurrentPage(state) {
      return state.pagination.currentPage;
    },
    getPaginationTotalPage(state) {
      return state.pagination.totalPage;
    },
    //取得每個分頁要秀出的data
    getResultByCurrentPage(state) {
      const currentPage = state.pagination.currentPage;
      const totalPage = state.pagination.totalPage;
      const PER_PAGE_DISPLAY_DATA = state.pagination.PER_PAGE_DISPLAY_DATA;
      const allResult = state.search.searchResult;
      //每頁的初始、末尾（不含最後一頁）
      const start = PER_PAGE_DISPLAY_DATA * (currentPage - 1);
      const end = PER_PAGE_DISPLAY_DATA * currentPage;
      // 最後一頁就第一筆到最後
      if (currentPage === totalPage) {
        return allResult.slice(start);
      } else {
        return allResult.slice(start, end);
      }
    },
  },
};
