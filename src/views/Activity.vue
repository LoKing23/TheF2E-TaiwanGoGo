<script>
  import ActivityForm from "@/components/ActivityForm/Index.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import Lv2HotClass from "@/components/Lv2HotClass/Index.vue";
  import SearchResult from "@/components/SearchResult/Index.vue";
  import Pagination from "@/components/Pagination/Index.vue";
  import { useStore } from "vuex";

  export default {
    components: {
      ActivityForm,
      BreadCrumbs,
      Lv2HotClass,
      SearchResult,
      Pagination,
    },
    setup() {
      const store = useStore();
      store.dispatch("Lv2Activity/init");
      //麵包屑路徑
      const breadcrumb = store.getters["Lv2Activity/getBreadcrumb"];
      //渲染熱門主題區域
      const hotClassData = store.getters["Lv2Activity/getHotClass"];
      //form連動
      const form = store.getters["Lv2Activity/getForm"];
      console.log("logHotClassData", hotClassData);
      console.log("form", form.city.citySelected);
      //search
      const search = store.getters["Lv2Activity/getSearch"];
      function HandFormClick() {
        store.dispatch("Lv2Activity/apiForm");
      }
      const HandHotClassSearch = (className) => {
        store.dispatch("Lv2Activity/apiHotClass", className);
      };
      return {
        breadcrumb,
        hotClassData,
        form,
        search,
        HandFormClick,
        HandHotClassSearch,
        hotClassData,
      };
    },
  };
</script>
<template>
  <div class="activity-container">
    <!-- 測試store資料需不需要用computed來同步：不需要，直接賦值就會同步(proxy)
    <div>絕對領域開始</div>
    <div>computed: {{ hotClassData }}</div>
    <div>No-compputed: {{ testComputed }}</div>
    <div>絕對領域結束</div> -->
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <ActivityForm :data="form" :HandClick="HandFormClick" />
    <Lv2HotClass
      :hotClassData="hotClassData"
      :isSearch="search.isSearch"
      :HandHotClassSearch="HandHotClassSearch"
    />
    <SearchResult :search="search" lv2Type="activity" />
    <Pagination Lv2Type="Activity" />
  </div>
</template>

<style scoped lang="scss">
  .activity-container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    min-height: calc(100vh - 146px);
    padding: 8px 16px;
    @media (min-width: 1200px) {
      min-height: calc(100vh - 143px);
      padding: 20px 50px;
    }
  }
</style>
