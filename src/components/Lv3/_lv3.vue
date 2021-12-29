<script>
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import L3Swiper from "@/components/Lv3/L3Swiper.vue";
  import Headline from "./Headline.vue";
  import HashTag from "./HashTag.vue";
  import Content from "./Content.vue";
  import Lv3DetailInfo from "@/components/Lv3DetailInfo/Index.vue";
  import Headline2 from "@/components/Headline2/Index.vue";
  import CardSwiper from "@/components/CardSwiper/Index.vue";
  import { reactive, ref, onMounted, computed } from "vue";
  import { useGetApiByTimes, useGoTop } from "@/composition-api";
  import { useRoute, useRouter } from "vue-router";
  import {
    apiGetActivity,
    apiGetScenicSpot,
    apiGetRestaurantRequest,
    apiGetRandomActivityByCity,
    apiGetRandomSpotByCity,
    apiGetRandomRestaurantByCity,
  } from "@/api";
  export default {
    components: {
      BreadCrumbs,
      L3Swiper,
      Headline,
      HashTag,
      Content,
      Lv3DetailInfo,
      Headline2,
      CardSwiper,
    },
    setup() {
      //回到最上
      useGoTop();
      const swiper = reactive({
        swiperName: "swiper-codingBoy",
        swiperData: [],
        haveData: false,
      });
      const apiData = ref({});
      const breadcrumb = reactive(["首頁"]);
      const hashTags = ref([]);
      const subTitle = ref("");
      const route = useRoute();
      const cardSwiper = reactive({});
      const lv2 = ref(route.params.lv2);
      const lv3 = route.params.lv3;
      const apiID = computed(() => {
        switch (lv2.value) {
          case "activity":
            return "ActivityID";
          case "scientSpot":
            return "ScenicSpotID";
          case "restaurant":
            return "RestaurantID";
        }
      });
      const content = computed(() => {
        if (apiData.DescriptionDetail) {
          return apiData.DescriptionDetail;
        } else {
          return apiData.Description;
        }
      });
      const apiName = computed(() => {
        let apiLv2 = null;
        switch (lv2.value) {
          case "activity":
            apiLv2 = "ActivityName";
            console.log(apiLv2);
            break;
          case "scientSpot":
            apiLv2 = "ScenicSpotName";
            console.log(apiLv2);
            break;
          case "restaurant":
            apiLv2 = "RestaurantName";
            console.log(apiLv2);
            break;
        }
        console.log(apiData.value[apiLv2]);
        return apiData.value[apiLv2];
      });
      //main API
      let api = null;
      //cardSwiper API
      let apiCardSwiper = null;
      switch (lv2.value) {
        case "scientSpot":
          api = apiGetScenicSpot;
          //breadcrumb
          breadcrumb.push("探索景點");
          subTitle.value = "景點介紹";
          //cardSwiper api
          apiCardSwiper = apiGetRandomSpotByCity;
          break;
        case "activity":
          api = apiGetActivity;
          breadcrumb.push("節慶活動");
          subTitle.value = "活動介紹";
          apiCardSwiper = apiGetRandomActivityByCity;
          break;
        case "restaurant":
          api = apiGetRestaurantRequest;
          breadcrumb.push("在地美食");
          subTitle.value = "美食介紹";
          apiCardSwiper = apiGetRandomRestaurantByCity;
          break;
        default:
          const router = useRouter();
          router.push({
            path: "/404",
          });
          break;
      }
      async function init() {
        //main content api
        const result = await api(`$filter= contains(${apiID.value}, '${lv3}')`);
        apiData.value = result.data[0];
        console.log(apiData);
        //cardSwiper api
        cardSwiper.data = await useGetApiByTimes(apiCardSwiper);

        // breadcrumb;
        if (apiData.value.City) breadcrumb.push(apiData.value.City);
        breadcrumb.push(apiData.value.Name);

        //swiperData
        const picNum = Math.floor(
          Object.keys(apiData.value.Picture).length / 2,
        );
        if (picNum) {
          swiper.haveData = true;
          for (let i = 1; i <= picNum; i++) {
            swiper.swiperData.push(apiData.value.Picture[`PictureUrl${i}`]);
          }
        }
      }
      onMounted(() => {
        init();
      });
      return {
        swiper,
        apiData,
        breadcrumb,
        subTitle,
        cardSwiper,
        lv2,
        content,
        apiName,
      };
    },
  };
</script>
<template>
  <div class="lv3-container">
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <L3Swiper
      :swiperName="swiper.swiperName"
      :swiperData="swiper.swiperData"
      :haveData="swiper.haveData"
    />
    <Headline :title="apiName" />
    <HashTag />
    <Content
      :title="subTitle"
      :paragraph="apiData.DescriptionDetail || apiData.Description"
    />
    <Lv3DetailInfo :apiData="apiData" :lv2Type="lv2" />
    <Headline2 title="不能錯過" linkMessage="更多景點" />
    <CardSwiper swiperName="lv3" :data="cardSwiper.data" />
  </div>

  <!-- <div class="lv3-container"> -->

  <!-- </div> -->
</template>

<style lang="scss" scoped>
  .lv3-container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 24px 15px;
    @media (min-width: 1200px) {
      padding: 60px 45px;
    }
    .HashTag-container {
      margin-bottom: 16px;
    }
    .headline-container {
      margin-bottom: 8px;
    }
  }
</style>
