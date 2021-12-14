<script>
  import { onMounted, onUnmounted } from "@vue/runtime-core";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const router = useRouter();
      const timer = null;
      onMounted(() => {
        timer = setTimeout(() => {
          router.push({
            path: "",
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
      迷有這頁啦 (σ′▽‵)′▽‵)σ <br />
      三秒鐘後，你將被遣返
    </h1>
  </div>
</template>

<style scoped>
  .wrap {
    height: calc(100vh - 144px);
    display: flex;
    justify-content: center;
  }
  h1 {
    font-size: 30px;
    color: green;
    font-weight: 900;
    @media (min-width: 1200px) {
      font-size: 80px;
    }
  }
</style>
