<script>
  import Header from "@/components/Global/Header/Index.vue";
  import Footer from "@/components/Global/Footer/Index.vue";
  import { onMounted, reactive } from "@vue/runtime-core";
  export default {
    components: {
      Header,
      Footer,
    },
    setup() {},
  };
</script>
<template>
  <Header />

  <router-view />
  <!-- <Swiper /> -->
  <Footer />
</template>

<style lang="scss"></style>
