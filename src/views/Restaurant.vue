<script>
  import { reactive, ref } from "vue";
  import allCity from "@/assets/allCity.js";
  import { apiGetRestaurantRequest, apiGetRestaurantByCity } from "@/api";
  import Restaurant from "@/components/Restaurant/Index.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import Lv2HotClass from "@/components/Lv2HotClass/Index.vue";
  import SearchResult from "@/components/SearchResult/Index.vue";
  import { useMapLv2Img } from "@/composition-api";
  export default {
    components: {
      BreadCrumbs,
      Lv2HotClass,
      SearchResult,
      Restaurant,
    },
    setup() {
      //麵包屑路徑
      const breadcrumb = ref(["首頁", "品嚐美食"]);

      //渲染熱門主題區域
      const hotClassData = reactive({
        title: "熱門分類",
        hotClass: [],
      });
      const className = [
        "地方特產",
        "中式美食",
        "甜品冰品",
        "異國料理",
        "伴手禮",
        "素食",
      ];
      // Assets/Lv-2img 內的資料夾名稱、檔案個數
      const Lv2ImgInfo = {
        className: "Restaurant",
        totalNum: 6,
      };
      //useMapLv2Img 合併className和Lv2資料夾底下的圖片路徑
      hotClassData.hotClass = useMapLv2Img(className, Lv2ImgInfo);

      // 表單資訊、點擊事件
      const form = reactive({
        data: {
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
      });

      async function HandFormClick() {
        function getKeyWordFilter() {
          if (form.data.keyWord)
            return `contains(Name, '${form.data.keyWord}')`;
          else return "";
        }
        let filter = getKeyWordFilter();
        let result = null;
        //是否指定縣市
        if (form.data.city.citySelected === "all") {
          // 是否有條件
          if (filter) {
            result = await apiGetRestaurantRequest(`$filter=${filter}`);
            console.log("Top");
          } else {
            console.log("bottom");
            result = await apiGetRestaurantRequest();
          }
        } else {
          if (filter) {
            result = await apiGetRestaurantByCity(
              form.data.city.citySelected,
              `$filter=${filter}`,
            );
            console.log("City-Top");
          } else {
            result = await apiGetRestaurantByCity(
              form.data.city.citySelected,
              "",
            );
            console.log("City-bottom");
          }
        }
        form.search.searchResult = result.data;
        form.search.isSearch = true;
      }
      const HandHotClassSearch = (className) => {
        //map分類1,分類2為className
        apiGetRestaurantRequest(`$filter=Class eq '${className}'`).then(
          (res) => {
            form.search.searchResult = res.data;
            console.log(res.data);
            form.search.isSearch = true;
          },
        );
      };
      return {
        breadcrumb,
        hotClassData,
        form,
        HandFormClick,
        HandHotClassSearch,
      };
    },
  };
</script>
<template>
  <div class="Restaurant-container">
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <Restaurant :data="form.data" :HandClick="HandFormClick" />
    <Lv2HotClass
      :hotClassData="hotClassData"
      :isSearch="form.search.isSearch"
      :HandHotClassSearch="HandHotClassSearch"
    />
    <SearchResult :search="form.search" />
  </div>
</template>

<style scoped lang="scss">
  .Restaurant-container {
    min-height: calc(100vh - 146px);
    padding: 8px 16px;
    @media (min-width: 1200px) {
      min-height: calc(100vh - 143px);
      padding: 20px 50px;
    }
  }
</style>
