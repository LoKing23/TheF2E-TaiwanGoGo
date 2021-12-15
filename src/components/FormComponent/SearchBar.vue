<script>
  export default {
    props: {
      clickHand: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      return {
        props,
      };
    },
  };
</script>
<template>
  <a href="javascript:;" class="search" @click.prevent="props.clickHand">
    <img src="@/assets/Icon/search30.svg" alt="" />
    <span>搜尋</span>
  </a>
</template>

<style lang="scss" scoped>
  .search {
    color: #fff;
    font-weight: bold;
    background-color: #7f977b;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid #e6e6e6;
    padding: 12px 30px;
    border-radius: 6px;
    img {
      margin-right: 8px;
    }
    &:hover {
      background-color: #65895f;
    }
  }
</style>
