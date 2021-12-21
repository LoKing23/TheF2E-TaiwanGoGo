<script>
  import { reactive, ref } from "vue";
  import allCity from "@/assets/allCity.js";
  import { apiGetActivity, apiGetActivityByCity } from "@/api";
  import ActivityForm from "@/components/ActivityForm/Index.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import Lv2HotClass from "@/components/Lv2HotClass/Index.vue";
  import SearchResult from "@/components/SearchResult/Index.vue";
  import { useMapLv2Img } from "@/composition-api";

  export default {
    components: {
      ActivityForm,
      BreadCrumbs,
      Lv2HotClass,
      SearchResult,
    },
    setup() {
      //麵包屑路徑
      const breadcrumb = ref(["首頁", "節慶活動"]);

      //渲染熱門主題區域
      const hotClassData = reactive({
        title: "熱門主題",
        hotClass: [],
      });
      const className = [
        "節慶活動",
        "自行車活動",
        "遊憩活動",
        "產業文化活動",
        "年度活動",
        "四季活動",
      ];
      // Assets/Lv-2img 內的資料夾名稱、檔案個數
      const Lv2ImgInfo = {
        className: "Activity",
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
        const filterFns = [getDateFilter, getKeyWordFilter];

        let filter = filterFns.map((item) => item()).filter((item) => item);
        filter = filter.join(" and ");
        let result = null;
        console.log(filter);
        function getDateFilter() {
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
        }
        function getKeyWordFilter() {
          if (form.data.keyWord)
            return `contains(Name, '${form.data.keyWord}')`;
          else return "";
        }
        if (form.data.city.citySelected === "all") {
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
            result = await apiGetActivityByCity(
              form.data.city.citySelected,
              `$filter=${filter}`,
            );
            console.log("City-Top");
          } else {
            result = await apiGetActivityByCity(
              form.data.city.citySelected,
              "",
            );
            console.log("City-bottom");
          }
        }
        form.search.searchResult = result.data;
        form.search.isSearch = true;
        console.log(form.search);
      }
      const HandHotClassSearch = (className) => {
        //map分類1,分類2為className
        apiGetActivity(
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
  <div class="activity-container">
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <ActivityForm :data="form.data" :HandClick="HandFormClick" />
    <Lv2HotClass
      :hotClassData="hotClassData"
      :isSearch="form.search.isSearch"
      :HandHotClassSearch="HandHotClassSearch"
    />
    <SearchResult :search="form.search" />
  </div>
</template>

<style scoped lang="scss">
  .activity-container {
    min-height: calc(100vh - 146px);
    padding: 8px 16px;
    @media (min-width: 1200px) {
      min-height: calc(100vh - 143px);
      padding: 20px 50px;
    }
  }
</style>
