<script>
  import Logo from "./Logo.vue";
  import NavBar from "./NavBar.vue";
  import { ref } from "vue";
  export default {
    components: {
      Logo,
      NavBar,
    },
    setup() {
      const isOpen = ref(false);
      const HandIsOpen = () => {
        isOpen.value = !isOpen.value;
      };
      return {
        isOpen,
        HandIsOpen,
      };
    },
  };
</script>
<template>
  <header :class="{ active: isOpen }">
    <div class="container">
      <Logo :isOpen="isOpen" />
      <NavBar :isOpen="isOpen" :HandIsOpen="HandIsOpen" />
    </div>
  </header>
</template>
<style lang="scss" scoped>
  header .container {
    width: 100%;
    padding: 8px;
    background-color: #fff;
    position: fixed;
    z-index: 10;
    top: 0;
    @media (min-width: 1200px) {
      padding: 24px 45px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  header.active {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(4px);
    z-index: 20000;
    background-color: rgba(0, 0, 0, 0.1);
    .container {
      width: 276px;
      right: 0;
      border-radius: 0 0 0 30px;
      background-color: #fff;
    }
  }
</style>
<style lang="scss">
  body {
    padding-top: 80px;
    background-color: #fff;
  }
</style>
