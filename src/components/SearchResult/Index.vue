<script>
  import TitleBar from "./TitleBar.vue";
  import NoResult from "./NoResult.vue";
  import Result from "./Result.vue";
  import { computed } from "@vue/reactivity";
  import { useStore } from "vuex";
  export default {
    components: {
      NoResult,
      Result,
      TitleBar,
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
    />
    <NoResult
      :isSearch="props.search.isSearch"
      :searchResult="props.search.searchResult"
    />
  </div>
</template>

<style lang="scss" scoped></style>
