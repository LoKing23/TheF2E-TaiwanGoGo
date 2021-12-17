<script>
  import { computed } from "@vue/reactivity";
  import { watch } from "@vue/runtime-core";
  export default {
    props: {
      searchResult: {
        type: Array,
        default: () => [],
      },
      isSearch: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const showNoResult = computed(() => {
        if (props.isSearch && props.searchResult.length === 0) return true;
      });
      return { showNoResult };
    },
  };
</script>
<template>
  <div v-if="showNoResult" class="noResulr-container">
    <div class="img-Wrap">
      <img src="@/assets/Icon/Vector.png" alt="" />
    </div>
    <p>
      目前查無資料 <br />
      請重新查詢
    </p>
  </div>
</template>

<style scoped lang="scss">
  .noResulr-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 0;
    .img-Wrap {
      position: relative;
      margin-bottom: 16px;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: -5px;
        background-color: rgba(127, 151, 123, 0.2);
        border-radius: 50%;
      }
    }
    p {
      font-size: 20px;
      font-weight: 700;
      color: #7f977b;
      text-align: center;
    }
  }
</style>
