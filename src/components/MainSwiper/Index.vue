<script>
  import { onMounted, reactive } from "@vue/runtime-core";
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
    },
    setup(props) {
      Swiper.use([Navigation, Pagination]);
      let swiper = null;

      onMounted(() => {
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
        <div
          v-for="item in props.swiperData"
          :key="item.Name"
          class="swiper-slide"
        >
          <router-link :data-city="item.City" :data-area="item.Name" to="/">
            <img :src="item.Picture.PictureUrl1" />
          </router-link>
        </div>
      </div>
      <div class="swiper-my-button-prev">
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
      <div class="swiper-my-button-next">
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
      <div class="swiper-pagination"></div>
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
  //slide 內的 router-link
  a {
    display: block;
    width: 100%;
    height: 185px;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    @media (min-width: 1200px) {
      height: 400px;
    }
  }
  a::after {
    content: attr(data-city) " | " attr(data-area);
    color: #fff;
    font-size: 16px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 1200px) {
      font-size: 28px;
    }
  }
</style>
<style lang="scss">
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  // swiper Navigation
  .swiper-my-button-prev,
  .swiper-my-button-next {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 200;
    cursor: pointer;
    @media (min-width: 1200px) {
      display: block;
    }
    &.swiper-my-button-disabled {
      path,
      circle {
        stroke-opacity: 0.5;
      }
    }
  }
  .swiper-my-button-prev {
    left: 30px;
  }
  .swiper-my-button-next {
    right: 30px;
  }
  // swiper Pagination
  .swiper-pagination {
    display: flex;
    justify-content: flex-end;
    padding-right: 22px;
    @media (min-width: 1200px) {
      padding-right: 42px;
    }
  }
  .swiper-my-bullet {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #c4c4c4;
    @media (min-width: 1200px) {
      width: 16px;
      height: 16px;
    }
    & + & {
      margin-left: 6px;
      @media (min-width: 1200px) {
        margin-left: 14px;
      }
    }
  }
  .swiper-my-bullet-active {
    background-color: #fff;
    transform: scale(1.25);
  }
</style>
