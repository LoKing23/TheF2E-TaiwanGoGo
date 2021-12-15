<script>
  export default {
    props: {
      hotClass: {
        type: Array,
        default: () => [
          {
            className: "",
            imgUrl: "",
          },
        ],
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div class="cards">
    <!-- 複製v-for其中一個結果，可以顯示 -->
    <div class="card" data-v-2c8c1f57="">
      <div class="imgWrap" data-class="節慶活動" data-v-2c8c1f57="">
        <img
          src="@/assets/LV2-img/Activity/bg1.png"
          alt="節慶活動"
          data-v-2c8c1f57=""
        />
      </div>
    </div>
    <!-- 透過v-for渲染卡片 -->
    <div class="card" v-for="item in props.hotClass" :key="item.imgUrl">
      <div class="imgWrap" :data-class="item.className">
        <img :src="item.imgUrl" :alt="item.className" />
        {{ item.imgUrl }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .cards {
    display: flex;
    flex-flow: wrap;
    .card {
      width: 48%;
      margin-bottom: 10px;
      @media (min-width: 1200px) {
        width: 23%;
        margin-bottom: 12px;
      }
    }
    .card:nth-child(2n) {
      margin-left: 2%;
      @media (min-width: 1200px) {
        margin-left: unset;
      }
    }
    .card:not(:nth-child(4n + 1)) {
      @media (min-width: 1200px) {
        margin-left: 2.5%;
      }
    }
    .imgWrap {
      border-radius: 24px;
      overflow: hidden;
      position: relative;
      &::before {
        content: attr(data-class);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        @media (min-width: 1200px) {
          font-size: 24px;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
