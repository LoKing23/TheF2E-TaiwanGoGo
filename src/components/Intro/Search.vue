<script>
  import {
    apiGetActivity,
    apiGetScenicSpot,
    apiGetRestaurantRequest,
  } from "@/api";
  import { computed, ref } from "vue";
  export default {
    setup() {
      const selectValue = ref("scenicSpot");
      const api = computed(() => {
        switch (selectValue.value) {
          case "scenicSpot":
            return apiGetScenicSpot;
          case "activity":
            return apiGetActivity;
          case "restaurant":
            return apiGetRestaurantRequest;
        }
      });

      return { selectValue, api };
    },
  };
</script>
<template>
  <div class="input-group">
    {{ selectValue }}
    {{ api }}
    <select v-model="selectValue">
      <option value="scenicSpot">探索景點</option>
      <option value="activity">節慶活動</option>
      <option value="restaurant">品嚐美食</option>
    </select>
    <input type="text" placeholder="你想去哪裡？請輸入關鍵字" />
    <a href="javascript:;" class="search">
      <img src="@/assets/Icon/search30.svg" alt="" />
      <span>搜尋</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
  .input-group {
    width: 345px;
    display: flex;
    flex-direction: column;
    > :not(:first-child) {
      margin-top: 8px;
    }
    > * {
      width: 100%;
      padding: 12px 30px;
      border-radius: 6px;
    }
    select,
    input {
      border: 1px solid #e6e6e6;
    }
    input {
      background: #f9f9f9;
      &::placeholder {
        color: #9e9e9e;
      }
    }
    @media (min-width: 1200px) {
      width: 350px;
    }
    .search {
      color: #fff;
      font-weight: bold;
      background-color: #7f977b;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-right: 8px;
      }
      &:hover {
        background-color: #65895f;
      }
    }
  }
</style>
