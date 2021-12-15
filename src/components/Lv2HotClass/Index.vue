<script>
  import Headline from "./Headline.vue";
  import HotClass from "./HotClass.vue";
  export default {
    components: {
      Headline,
      HotClass,
    },
    props: {
      hotClassData: {
        type: Object,
        default: () => ({
          title: "",
          hotClass: [],
        }),
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div class="container-H2HotClass">
    <Headline :title="props.hotClassData.title" />
    <HotClass :hotClass="props.hotClassData.hotClass" />
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: 16px;
    @media (min-width: 1200px) {
      margin-bottom: 12px;
    }
  }
</style>
