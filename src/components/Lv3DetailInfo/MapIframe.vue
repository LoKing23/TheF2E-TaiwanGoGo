<script>
  import { computed } from "@vue/reactivity";
  export default {
    props: {
      position: {
        type: Array,
        default: () => [23, 121],
      },
    },
    setup(props) {
      const mapSrc = computed(() => {
        return `https://www.google.com/maps/embed/v1/view?key=AIzaSyAfrjip-GOWFUI7lFY9x0Yq4iFlsVbuQc8&center=${props.position[0]},${props.position[1]}&zoom=15&maptype=roadmap`;
      });
      return { mapSrc };
    },
  };
</script>
<template>
  <div class="mapIframe-container">
    <iframe loading="lazy" allowfullscreen :src="mapSrc"></iframe>
  </div>
</template>

<style lang="scss" scoped>
  .mapIframe-container {
    width: 100%;
    height: 185px;
    border-radius: 12px;
    overflow: hidden;
    background-color: transparent;
    margin-bottom: 20px;
    @media (min-width: 1200px) {
      width: 48%;
      height: unset;
      margin-left: auto;
      aspect-ratio: 540/250;
    }
    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
