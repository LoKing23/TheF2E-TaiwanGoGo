<script>
  import TitleBar from "./TitleBar.vue";
  import NoResult from "./NoResult.vue";
  import Result from "./Result.vue";
  import { computed, ref } from "vue";
  import { useStore } from "vuex";
  import Loading from "@/components/Loading/Index.vue";
  export default {
    components: {
      NoResult,
      Result,
      TitleBar,
      Loading,
    },
    props: {
      search: {
        type: Object,
        default: () => ({}),
      },
      lv2Type: {
        type: String,
        default: "",
      },
      loading: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props) {
      const store = useStore();
      //取得資料數量
      const totalResult = computed(() => {
        return props.search.searchResult.length;
      });
      const currentPageData = computed(() => {
        if (props.lv2Type === "activity") {
          return store.getters[`Lv2Activity/getResultByCurrentPage`];
        } else if (props.lv2Type === "restaurant") {
          return store.getters[`Lv2Restaurant/getResultByCurrentPage`];
        } else if (props.lv2Type === "scientSpot") {
          return store.getters[`Lv2ScientSpot/getResultByCurrentPage`];
        }
      });
      return { props, totalResult, currentPageData };
    },
  };
</script>
<template>
  <!-- 按下搜尋才會顯示 -->
  <div v-if="props.search.isSearch" class="searchResult-container">
    <TitleBar :totalResult="totalResult" />
    <Result
      :isSearch="props.search.isSearch"
      :searchResult="currentPageData"
      :lv2Type="props.lv2Type"
      :loading="props.loading"
    />
    <NoResult
      :isSearch="props.search.isSearch"
      :searchResult="props.search.searchResult"
    />
    <!-- {{ props.loading.imgOk }} -->
    <Loading :imgOk="props.loading.imgOk" />
  </div>
</template>

<style lang="scss" scoped>
  .searchResult-container {
    position: relative;
  }
</style>
