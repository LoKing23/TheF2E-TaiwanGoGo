<script>
  import BaseInfo from "./BaseInfo.vue";
  import MapIframe from "./MapIframe.vue";
  import AroundInfo from "./AroundInfo.vue";
  export default {
    components: {
      BaseInfo,
      MapIframe,
      AroundInfo,
    },
  };
</script>
<template>
  <div class="Lv3DetailInfo-container">
    <BaseInfo />
    <MapIframe />
    <AroundInfo />
  </div>
</template>

<style lang="scss" scoped>
  .Lv3DetailInfo-container {
    padding: 30px 15px;
    background-color: #f9f9f9;
    @media (min-width: 1200px) {
      padding: 60px 45px;
      background: #fff;
    }
  }
</style>
