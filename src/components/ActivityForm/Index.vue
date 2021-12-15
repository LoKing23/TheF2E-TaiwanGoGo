<script>
  import allCity from "@/assets/allCity.js";
  import SearchBar from "@/components/FormComponent/SearchBar.vue";
  import DateBar from "@/components/FormComponent/DateBar.vue";
  import TextBar from "@/components/FormComponent/TextBar.vue";
  import SelectBar from "@/components/FormComponent/SelectBar.vue";
  import { reactive } from "@vue/reactivity";
  export default {
    components: {
      SearchBar,
      DateBar,
      TextBar,
      SelectBar,
    },
    setup() {
      const form = reactive({
        city: {
          citySelected: "",
          allCity,
        },
        date: new Date(),
        keyWord: "",
      });
      const HandClick = () => {};
      return { form, HandClick };
    },
  };
</script>
<template>
  <div class="container-ActivityForm">
    <SelectBar :form="form" />
    <DateBar :form="form" />
    <TextBar :form="form" />
    <SearchBar @click.prevent="HandClick" />
  </div>
</template>

<style lang="scss" scoped>
  .container-ActivityForm > :not(:first-child) {
    margin-top: 8px;
    @media (min-width: 1200px) {
      margin-top: unset;
    }
  }
  .container-ActivityForm {
    margin-bottom: 24px;
    @media (min-width: 1200px) {
      display: flex;
    }
    > * {
      margin-left: 1%;
    }
    select {
      @media (min-width: 1200px) {
        width: 22%;
      }
    }
    .dp__main {
      height: 100%;
      @media (min-width: 1200px) {
        width: 22%;
      }
    }
    > input[type="text"] {
      @media (min-width: 1200px) {
        width: 34.25%;
      }
    }
    > .search {
      @media (min-width: 1200px) {
        width: 16%;
      }
    }
  }
</style>
