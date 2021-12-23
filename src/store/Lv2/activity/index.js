import allCity from "@/assets/allCity.js";
import { apiGetActivity, apiGetActivityByCity } from "@/api";
import { useMapLv2Img } from "@/composition-api";
export default {
  namespaced: true,
  state: {
    breadcrumb: ["首頁", "節慶活動"],
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
    },
    //api取熱門景點
    apiHotClass({ commit, state }, hotClass) {
      console.log("hotClass:", hotClass);
      apiGetActivity(
        `$filter=Class1 eq '${hotClass}' or Class2 eq '${hotClass}'`,
      ).then((res) => {
        console.log(res.data);
        commit("setSearchResult", res.data);
        commit("setSearchState", true);
        commit("setTotalPage");
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
      commit("setTotalPage");
    },
    // api依參數條件
    apiRequest({ commit, getters }, filter) {
      apiGetActivity(`filter=${filter}`).then((res) => {
        console.log(res.data);
        commit("setSearchResult", res.data);
        commit("setSearchState", true);
        commit("setTotalPage");
      });
    },
    HandSetCurrentPage({ commit }, index) {
      commit("setCurrentPage", index);
      console.log("力宏敢啦");
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
    //初始化breadcrumb
    resetBreadcrumb(state) {
      state.breadcrumb = ["首頁", "探索景點"];
    },
    setSearchResult(state, result) {
      state.search.searchResult = result;
    },
    setSearchState(state, boolean) {
      state.search.isSearch = boolean;
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
