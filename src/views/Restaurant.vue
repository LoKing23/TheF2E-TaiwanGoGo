<script>
  import Restaurant from "@/components/Restaurant/Index.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import Lv2HotClass from "@/components/Lv2HotClass/Index.vue";
  import SearchResult from "@/components/SearchResult/Index.vue";
  import { useStore } from "vuex";
  import Pagination from "@/components/Pagination/Index.vue";

  export default {
    components: {
      BreadCrumbs,
      Lv2HotClass,
      SearchResult,
      Restaurant,
      Pagination,
    },
    setup() {
      const store = useStore();
      //麵包屑路徑
      const breadcrumb = store.getters["Lv2Restaurant/getBreadcrumb"];
      //渲染熱門主題區域
      const hotClassData = store.getters["Lv2Restaurant/getHotClass"];
      //form連動
      const form = store.getters["Lv2Restaurant/getForm"];
      console.log("logHotClassData", hotClassData);
      console.log("form", form.city.citySelected);
      //search
      const search = store.getters["Lv2Restaurant/getSearch"];
      store.dispatch("Lv2Restaurant/init");
      function HandFormClick() {
        store.dispatch("Lv2Restaurant/apiForm");
      }
      const HandHotClassSearch = (className) => {
        store.dispatch("Lv2Restaurant/apiHotClass", className);
      };
      return {
        breadcrumb,
        hotClassData,
        form,
        search,
        HandFormClick,
        HandHotClassSearch,
      };
    },
  };
</script>
<template>
  <div class="Restaurant-container">
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <Restaurant :data="form" :HandClick="HandFormClick" />
    <Lv2HotClass
      :hotClassData="hotClassData"
      :isSearch="search.isSearch"
      :HandHotClassSearch="HandHotClassSearch"
    />
    <SearchResult :search="search" lv2Type="restaurant" />
    <Pagination Lv2Type="Restaurant" />
  </div>
</template>

<style scoped lang="scss">
  .Restaurant-container {
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
