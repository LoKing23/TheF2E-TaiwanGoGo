<script>
  import {
    apiGetActivity,
    apiGetScenicSpot,
    apiGetRestaurantRequest,
  } from "@/api";
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";

  export default {
    setup() {
      const store = useStore();
      const router = useRouter();
      console.log("router:", router);

      const selectValue = ref("scenicSpot");
      const search = computed(() => {
        switch (selectValue.value) {
          case "scenicSpot":
            return { store: "Lv2ScientSpot", router: "/scientSpot" };
          case "activity":
            return { store: "Lv2Activity", router: "/activity" };
          case "restaurant":
            return { store: "Lv2Restaurant", router: "/restaurant" };
        }
      });
      const filter = computed(() => {
        return `$filter=contains(Name, '${selectValue.value}')`;
      });
      const HandSearch = () => {
        store.dispatch(`${search.value.store}/apiRequest`, filter);
        router.push({
          path: search.value.router,
        });
      };
      return { selectValue, search, HandSearch };
    },
  };
</script>
<template>
  <div class="input-group">
    <select v-model="selectValue">
      <option value="scenicSpot">探索景點</option>
      <option value="activity">節慶活動</option>
      <option value="restaurant">品嚐美食</option>
    </select>
    <input type="text" placeholder="你想去哪裡？請輸入關鍵字" />
    <a href="javascript:;" class="search" @click.prevent="HandSearch">
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
