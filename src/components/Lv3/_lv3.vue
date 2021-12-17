<script>
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import MainSwiper from "@/components/MainSwiper/Index.vue";
  import Headline from "./Headline.vue";
  import HashTag from "./HashTag.vue";
  import Content from "./Content.vue";
  import Lv3DetailInfo from "@/components/Lv3DetailInfo/Index.vue";
  import Headline2 from "@/components/Headline2/Index.vue";
  import CardSwiper from "@/components/CardSwiper/Index.vue";
  import { reactive } from "@vue/reactivity";
  export default {
    components: {
      BreadCrumbs,
      MainSwiper,
      Headline,
      HashTag,
      Content,
      Lv3DetailInfo,
      Headline2,
      CardSwiper,
    },
    setup() {
      const swiper = reactive({
        swiperName: "codingBoy",
      });
      return {
        swiper,
      };
    },
  };
</script>
<template>
  <div class="lv3-container">
    <BreadCrumbs />
    <MainSwiper swiperName="codingBoy" />
    <Headline />
    <HashTag />
    <Content />
  </div>
  <Lv3DetailInfo />
  <div class="lv3-container">
    <Headline2 title="" linkMessage="" />
    <CardSwiper swiperName="" data="" />
  </div>
</template>

<style lang="scss" scoped>
  .lv3-container {
    padding: 24px 15px;
    @media (min-width: 1200px) {
      padding: 60px 45px;
    }
  }
</style>
