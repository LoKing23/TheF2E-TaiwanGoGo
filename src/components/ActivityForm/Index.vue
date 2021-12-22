<script>
  import SearchBar from "@/components/FormComponent/SearchBar.vue";
  import DateBar from "@/components/FormComponent/DateBar.vue";
  import TextBar from "@/components/FormComponent/TextBar.vue";
  import SelectBar from "@/components/FormComponent/SelectBar.vue";
  export default {
    components: {
      SearchBar,
      DateBar,
      TextBar,
      SelectBar,
    },
    props: {
      data: {
        type: Object,
        default: () => ({
          //select
          city: {
            citySelected: "all",
            allCity,
          },
          //date
          date: new Date(),
          //input:text
          keyWord: "",
        }),
      },
      HandClick: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div class="container-ActivityForm">
    <SelectBar :form="props.data" />
    <!-- <DateBar :form="props.data" /> -->
    <TextBar :form="props.data" />
    <SearchBar :HandClick="props.HandClick" />
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
        flex-grow: 1;
      }
    }
    > .search {
      @media (min-width: 1200px) {
        width: 18.5%;
        // width: 16%;
      }
    }
  }
</style>
