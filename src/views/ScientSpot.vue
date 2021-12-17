<script>
  import { reactive, ref } from "vue";
  import allCity from "@/assets/allCity.js";
  import { apiGetScenicSpot, apiGetSpotByCity } from "@/api";
  import ScientSpotForm from "@/components/ScientSpotForm/Index.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import Lv2HotClass from "@/components/Lv2HotClass/Index.vue";
  import SearchResult from "@/components/SearchResult/Index.vue";
  import { useMapLv2Img } from "@/composition-api";
  export default {
    components: {
      BreadCrumbs,
      Lv2HotClass,
      SearchResult,
      ScientSpotForm,
    },
    setup() {
      //麵包屑路徑
      const breadcrumb = ref(["首頁", "探索景點"]);

      //渲染熱門主題區域
      const hotClassData = reactive({
        title: "熱門主題",
        hotClass: [],
      });
      const className = [
        "自然風景類",
        "觀光工廠類",
        "遊憩類",
        "休閒農場類",
        "生態類",
        "溫泉類",
        "古蹟類",
      ];
      // Assets/Lv-2img 內的資料夾名稱、檔案個數
      const Lv2ImgInfo = {
        className: "ScientSpot",
        totalNum: 7,
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
        let filter = getKeyWordFilter();
        let result = null;
        function getKeyWordFilter() {
          if (form.data.keyWord)
            return `contains(Name, '${form.data.keyWord}')`;
          else return "";
        }
        if (form.data.city.citySelected === "all") {
          if (filter) {
            result = await apiGetScenicSpot(`$filter=${filter}`);
            console.log("Top");
          } else {
            console.log("bottom");
            result = await apiGetScenicSpot();
          }
        } else {
          if (filter) {
            result = await apiGetSpotByCity(
              form.data.city.citySelected,
              `$filter=${filter}`,
            );
            console.log("City-Top");
          } else {
            result = await apiGetSpotByCity(form.data.city.citySelected, "");
            console.log("City-bottom");
          }
        }
        form.search.searchResult = result.data;
        form.search.isSearch = true;
      }
      const HandHotClassSearch = (className) => {
        //map分類1,分類2為className
        apiGetScenicSpot(
          `$filter=Class1 eq '${className}' or Class2 eq '${className}'`,
        ).then((res) => {
          form.search.searchResult = res.data;
          form.search.isSearch = true;
        });
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
  <div class="ScientSpot-container">
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <ScientSpotForm :data="form.data" :HandClick="HandFormClick" />
    <Lv2HotClass
      :hotClassData="hotClassData"
      :isSearch="form.search.isSearch"
      :HandHotClassSearch="HandHotClassSearch"
    />
    <SearchResult :search="form.search" />
  </div>
</template>

<style scoped lang="scss">
  .ScientSpot-container {
    min-height: calc(100vh - 146px);
    padding: 8px 16px;
    @media (min-width: 1200px) {
      min-height: calc(100vh - 143px);
      padding: 20px 50px;
    }
  }
</style>
