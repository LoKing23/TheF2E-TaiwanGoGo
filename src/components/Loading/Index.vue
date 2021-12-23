<script>
  export default {
    props: {
      imgOk: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div v-if="!props.imgOk" class="loading-container">
    <div class="loading-gif">
      <img src="@/assets/loading.gif" alt="" />
    </div>
  </div>
</template>

<style scss lang="scss">
  .loading-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(1px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .loading-gif {
      width: 100%;
      @media (min-width: 1200px) {
        align-items: center;
        width: 500px;
      }
    }
  }
</style>
