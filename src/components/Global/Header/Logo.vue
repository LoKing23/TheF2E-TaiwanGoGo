<script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        dafault: false,
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
  <router-link to="/" :class="{ active: props.isOpen }">
    <picture>
      <source
        srcset="@/assets/Icon/Logo-desktop.svg"
        media="(min-width: 1200px)"
      />
      <img src="@/assets/Icon/Logo-mobile.svg" alt="台灣走走" />
    </picture>
  </router-link>
</template>
<style lang="scss" scoped>
  a {
    display: block;
    width: 118px;
    margin-left: auto;
    margin-right: auto;
    height: 66px;
    line-height: 66px;
    &.active {
      margin-left: 30px;
    }
    @media (min-width: 1200px) {
      margin: unset;
      width: 240px;
      height: 30px;
      line-height: 30px;
    }
  }
</style>
