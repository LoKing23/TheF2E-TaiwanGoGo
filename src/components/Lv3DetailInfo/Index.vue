<script>
  import BaseInfo from "./BaseInfo.vue";
  import MapIframe from "./MapIframe.vue";
  import AroundInfo from "./AroundInfo.vue";
  import { computed } from "@vue/reactivity";

  export default {
    components: {
      BaseInfo,
      MapIframe,
      AroundInfo,
    },
    props: {
      apiData: {
        type: Object,
        default: () => ({}),
      },
      lv2Type: {
        type: String,
        default: "",
      },
    },
    setup(props) {
      const position = computed(() => {
        if (Object.keys(props.apiData).length > 1) {
          return [
            props.apiData.Position.PositionLon,
            props.apiData.Position.PositionLat,
          ];
        }
      });
      return { props, position };
    },
  };
</script>
<template>
  <div class="Lv3DetailInfo-container">
    <BaseInfo :apiData="props.apiData" :lv2Type="props.lv2Type" />
    <MapIframe :position="position" />
    <AroundInfo />
  </div>
</template>

<style lang="scss" scoped>
  .Lv3DetailInfo-container {
    padding: 30px 15px;
    margin: 0 -15px;
    background-color: #f9f9f9;
    @media (min-width: 1200px) {
      padding: 60px 45px;
      background: #fff;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
