<script>
  import TitleBar from "./TitleBar.vue";
  import NoResult from "./NoResult.vue";
  import Result from "./Result.vue";
  import { computed } from "@vue/reactivity";
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
    },
    setup(props) {
      //取得資料數量
      const totalResult = computed(() => {
        return props.search.searchResult.length;
      });
      return { props, totalResult };
    },
  };
</script>
<template>
  <!-- 按下搜尋才會顯示 -->
  <div v-if="props.search.isSearch" class="searchResult-container">
    <TitleBar :totalResult="totalResult" />
    <Result
      :isSearch="props.search.isSearch"
      :searchResult="props.search.searchResult"
    />
    <NoResult
      :isSearch="props.search.isSearch"
      :searchResult="props.search.searchResult"
    />
  </div>
</template>

<style lang="scss" scoped></style>
