<script>
  import { onMounted, onUnmounted } from "@vue/runtime-core";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const router = useRouter();
      let timer = null;
      onMounted(() => {
        timer = setTimeout(() => {
          router.push({
            path: "/",
          });
        }, 3000);
      });
      onUnmounted(() => {
        clearTimeout(timer);
      });
    },
  };
</script>
<template>
  <div class="wrap">
    <h1>
      不速之客嗎？ <br />
      正當登陸的話，我們非常歡迎 <br />
      使用「排除」
    </h1>
    <div class="img">
      <img src="@/assets/使用排除.jpeg" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wrap {
    min-height: calc(100vh - 144px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px 0;
    .img {
      width: 100%;
      aspect-ratio: 2/3;
      margin: auto;
      @media (min-width: 1200px) {
        width: 500px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  h1 {
    font-size: 28px;
    color: green;
    font-weight: 900;

    margin-bottom: 16px;
    @media (min-width: 1200px) {
      font-size: 80px;
    }
  }
</style>
