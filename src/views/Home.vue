<script>
  import { useStore } from "vuex";
  import { ref, reactive, onMounted, watch, computed } from "vue";
  import Intro from "@/components/Intro/Index.vue";
  import Swiper from "@/components/MainSwiper/Index.vue";
  import Headline2 from "@/components/Headline2/Index.vue";
  import CardDetail from "@/components/CardDetail/Index.vue";
  import CardSwiper from "@/components/CardSwiper/Index.vue";
  import { apiGetRandomActivityByCity } from "@/api";
  export default {
    components: {
      Intro,
      Swiper,
      Headline2,
      CardDetail,
      CardSwiper,
    },
    setup() {
      const information = reactive({
        activity: {},
        scientSpot: {},
        restaurant: {},
      });
      apiGetRandomActivityByCity().then((res) => {
        console.log("activity");
        console.log(res.data);
      });
      const store = useStore();
      //scientSpot 同步
      information.scientSpot = {
        title: store.getters["ScientSpot/getTitle"],
        linkMessage: store.getters["ScientSpot/getLinkMessage"],
        swiperName: store.getters["ScientSpot/getSwiperName"],
      };
      information.restaurant = {
        title: store.getters["Restaurant/getTitle"],
        linkMessage: store.getters["Restaurant/getLinkMessage"],
        swiperName: store.getters["Restaurant/getSwiperName"],
      };
      information.activity = {
        title: store.getters["Activity/getTitle"],
        linkMessage: store.getters["Activity/getLinkMessage"],
        swiperName: store.getters["Activity/getSwiperName"],
      };
      onMounted(() => {
        //Activity 非同步
        store.dispatch("Activity/loadApi").then((res) => {
          information.activity.arr = res;
          console.log(res);
        });
        //scientSpot 非同步
        store.dispatch("ScientSpot/loadApi").then((res) => {
          information.scientSpot.arr = res;
        });
        //restuerant 非同步
        store.dispatch("Restaurant/loadApi").then((res) => {
          information.restaurant.arr = res;
        });
      });

      return {
        information,
      };
    },
  };
</script>
<template>
  <Intro />

  <Swiper />
  <!-- 近期活動 -->
  <Headline2
    :title="information.activity.title"
    :linkMessage="information.activity.linkMessage"
  />
  <CardDetail
    :swiperName="information.activity.swiperName"
    :data="information.activity.arr"
  />

  <!-- 附近景點 -->
  <Headline2
    :title="information.scientSpot.title"
    :linkMessage="information.scientSpot.linkMessage"
  />
  <CardSwiper
    :swiperName="information.scientSpot.swiperName"
    :data="information.scientSpot.arr"
  />

  <!-- 附近美食 -->
  <Headline2
    :title="information.restaurant.title"
    :linkMessage="information.restaurant.linkMessage"
  />
  <CardSwiper
    :swiperName="information.restaurant.swiperName"
    :data="information.restaurant.arr"
  />
</template>

<style></style>
