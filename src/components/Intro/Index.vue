<script>
  import Intro from "./Intro.vue";
  import Search from "./Search.vue";
  export default {
    components: {
      Intro,
      Search,
    },
  };
</script>
<template>
  <div class="index-container">
    <Intro />
    <Search />
  </div>
</template>

<style lang="scss" scoped>
  .index-container {
    max-width: 920px;
    margin-left: auto;
    margin-right: auto;
    padding: 6px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > * {
      margin-bottom: 35px;
    }
    @media (min-width: 1200px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
</style>
