<script>
  export default {
    props: {
      totalResult: {
        type: Number,
        default: 0,
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div class="titleBar-container">
    <h2>搜尋結果</h2>
    <p>
      共有<span class="totalResult">{{ props.totalResult }}</span
      >筆資料
    </p>
  </div>
</template>

<style scoped lang="scss">
  .titleBar-container {
    display: flex;
    align-items: flex-end;
    line-height: 1;
    h2 {
      font-size: 24px;
      font-weight: 300;
      color: #1e1e1e;
      margin-right: 8px;
      @media (min-width: 1200px) {
        font-size: 36px;
      }
    }
    p {
      font-size: 14px;
      color: #646464;
      @media (min-width: 1200px) {
        font-size: 18px;
      }
    }
    .totalResult {
      color: #fa0;
    }
  }
</style>
