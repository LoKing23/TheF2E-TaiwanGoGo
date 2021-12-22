<script>
  import { useStore } from "vuex";
  import ScientSpotForm from "@/components/ScientSpotForm/Index.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import Lv2HotClass from "@/components/Lv2HotClass/Index.vue";
  import SearchResult from "@/components/SearchResult/Index.vue";
  export default {
    components: {
      BreadCrumbs,
      Lv2HotClass,
      SearchResult,
      ScientSpotForm,
    },
    setup() {
      const store = useStore();
      //麵包屑路徑
      const breadcrumb = store.getters["Lv2ScientSpot/getBreadcrumb"];
      //渲染熱門主題區域
      const hotClassData = store.getters["Lv2ScientSpot/getHotClass"];
      //form連動
      const form = store.getters["Lv2ScientSpot/getForm"];
      console.log("logHotClassData", hotClassData);
      console.log("form", form.city.citySelected);
      //search
      const search = store.getters["Lv2ScientSpot/getSearch"];
      store.dispatch("Lv2ScientSpot/init");
      function HandFormClick() {
        store.dispatch("Lv2ScientSpot/apiForm");
      }
      const HandHotClassSearch = (className) => {
        store.dispatch("Lv2ScientSpot/apiHotClass", className);
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
  <div class="ScientSpot-container">
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <ScientSpotForm :data="form" :HandClick="HandFormClick" />
    <Lv2HotClass
      :hotClassData="hotClassData"
      :isSearch="search.isSearch"
      :HandHotClassSearch="HandHotClassSearch"
    />
    <SearchResult :search="search" lv2Type="scientSpot" />
  </div>
</template>

<style scoped lang="scss">
  .ScientSpot-container {
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
