<script>
  export default {
    props: {
      breadcrumb: {
        type: Array,
        default: () => ["首頁"],
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div class="wrap">
    <ol class="breadcrumb">
      <li v-for="item in props.breadcrumb" :key="item" class="breadcrumb-item">
        {{ item }}
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
  .wrap {
    padding: 16px 0;
    @media (min-width: 1200px) {
      padding: 30px 0;
    }
  }
  .breadcrumb {
    display: flex;
    flex-wrap: wrap;
    &-item:not(:first-child):before {
      content: "/";
      display: inline-block;
      margin: 0 8px;
    }
  }
</style>
