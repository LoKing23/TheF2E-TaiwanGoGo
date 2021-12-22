<script>
  import { onMounted, reactive, watch, ref } from "@vue/runtime-core";
  import Swiper, { Navigation, Pagination } from "swiper";
  import "swiper/swiper-bundle.css";

  export default {
    props: {
      swiperName: {
        type: String,
        default: "mySwiper",
      },
      swiperData: {
        type: Array,
        default: () => [],
      },
      haveData: {
        type: Boolean,
        default: false,
      },
    },

    setup(props) {
      Swiper.use([Navigation, Pagination]);
      let swiper = null;
      const haveImg = ref(false);
      onMounted(() => {
        console.log(props.swiperData);
        swiper = new Swiper(`.${props.swiperName}`, {
          slidesPerView: 1,
          loop: false,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            bulletClass: "swiper-my-bullet",
            bulletActiveClass: "swiper-my-bullet-active",
          },
          navigation: {
            nextEl: ".swiper-my-button-next",
            prevEl: ".swiper-my-button-prev",
            disabledClass: "swiper-my-button-disabled",
          },
        });
      });
      watch(props.swiperData, (newVal) => {
        haveImg.value = true;
        swiper.update();
      });
      watch(props.haveData, () => {
        swiper.update();
      });
      return {
        props,
      };
    },
  };
</script>
<template>
  <div class="swiper-container">
    <div :class="['swiper', props.swiperName]">
      <div class="swiper-wrapper">
        <div v-for="item in props.swiperData" :key="item" class="swiper-slide">
          <div class="img">
            <img :src="item" />
          </div>
        </div>
      </div>
      <div v-if="props.swiperData > 1" class="swiper-my-button-prev">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 25L18 20.5L22 16"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle
            cx="20"
            cy="20"
            r="19"
            transform="rotate(-180 20 20)"
            stroke="#fff"
            stroke-width="2"
          />
        </svg>
      </div>
      <div v-if="props.swiperData > 1" class="swiper-my-button-next">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 15L22 19.5L18 24"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="20" cy="20" r="19" stroke="#fff" stroke-width="2" />
        </svg>
      </div>
      <div v-if="props.haveData" class="swiper-pagination"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .swiper-container {
    margin-bottom: 24px;
    @media (min-width: 1200px) {
      margin-bottom: 36px;
    }
  }
  .img {
    width: 100%;
    height: 185px;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    @media (min-width: 1200px) {
      height: 400px;
    }
  }
</style>
