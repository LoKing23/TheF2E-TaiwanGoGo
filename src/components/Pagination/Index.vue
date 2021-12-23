<script>
  import { ref, watch } from "vue";
  import { useStore } from "vuex";
  export default {
    props: {
      Lv2Type: {
        type: String,
        default: "",
      },
      HandResetLoading: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      const store = useStore();
      console.log(store);
      const search = store.getters[`Lv2${props.Lv2Type}/getSearch`];
      const page = store.getters[`Lv2${props.Lv2Type}/getPagination`];
      let pageArr = ref([]);
      const emptyData = ref(true);
      watch(
        () => store.getters[`Lv2${props.Lv2Type}/getPaginationTotalPage`],
        (newVal) => {
          if (newVal.length == 0) {
            emptyData.value = true;
            return;
          } else {
            emptyData.value = false;
          }
          pageArr.value = [];
          for (let i = 0; i < newVal; i++) {
            pageArr.value.push(i + 1);
          }
          console.log("pageArr:", pageArr.value);
        },
      );
      const HandPagination = (e) => {
        if (e.target.nodeName === "UL") return;
        const value = e.target.dataset.value;
        const total =
          store.getters[`Lv2${props.Lv2Type}/getPaginationTotalPage`];
        let current =
          store.getters[`Lv2${props.Lv2Type}/getPaginationCurrentPage`];
        // 改變後的值
        let setValue = null;
        if (current == value) return;
        if (value === "prev") {
          if (current <= 1) {
            return;
          } else {
            setValue = --current;
          }
        } else if (value === "next") {
          if (current >= total) {
            return;
          } else {
            setValue = ++current;
          }
        } else {
          setValue = value;
        }
        props.HandResetLoading();
        store.dispatch(`Lv2${props.Lv2Type}/HandSetCurrentPage`, setValue);
      };
      return { pageArr, HandPagination, search, page, emptyData };
    },
  };
</script>
<template>
  <div v-if="search.isSearch && !emptyData" class="Pagination-container">
    <ul @click="HandPagination($event)" class="pagination">
      <li
        :class="[
          'pagination-item',
          'arrow',
          { disable: page.currentPage == 1 },
        ]"
        data-value="prev"
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          data-value="prev"
        >
          <path
            d="M7.45542 0.705384C7.84469 1.09466 7.84504 1.72569 7.45619 2.11538L3.58003 6L7.45619 9.88462C7.84504 10.2743 7.84469 10.9053 7.45542 11.2946V11.2946C7.06585 11.6842 6.43422 11.6842 6.04465 11.2946L0.750034 6L6.04465 0.705384C6.43422 0.315811 7.06585 0.315811 7.45542 0.705384V0.705384Z"
            fill="#fff"
          />
        </svg>
      </li>
      <li
        v-for="item in pageArr"
        :key="item"
        :data-value="item"
        :class="['pagination-item', { active: page.currentPage == item }]"
      >
        {{ item }}
      </li>
      <li
        :class="[
          'pagination-item',
          'arrow',
          { disable: page.currentPage == page.totalPage },
        ]"
        data-value="next"
      >
        <svg
          data-value="next"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.544581 0.705384C0.155309 1.09466 0.154965 1.72569 0.543813 2.11538L4.41997 6L0.543812 9.88462C0.154964 10.2743 0.155309 10.9053 0.544581 11.2946V11.2946C0.934154 11.6842 1.56578 11.6842 1.95535 11.2946L7.24997 6L1.95535 0.705384C1.56578 0.315811 0.934154 0.315811 0.544581 0.705384V0.705384Z"
            fill="#fff"
          />
        </svg>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .Pagination-container {
    padding-top: 80px;
    padding-bottom: 50px;
    .pagination {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      &-item {
        width: 32px;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        margin: 4px;
        color: #646464;
        border: 1px solid #e5e5e5;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
      }
      .active {
        color: #65895f;
        border-color: #65895f;
      }
      .arrow {
        background-color: #7f977b;
        &.disable {
          background-color: #e5e5e5;
          path {
            fill: #65895f;
          }
        }
      }
    }
  }
</style>
