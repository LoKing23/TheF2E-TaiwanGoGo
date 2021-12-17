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
      isSearch: {
        type: Boolean,
        default: false,
      },
      HandHotClassSearch: {
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
  <div v-if="!props.isSearch" class="container-H2HotClass">
    <Headline :title="props.hotClassData.title" />
    <HotClass
      :hotClass="props.hotClassData.hotClass"
      :HandHotClassSearch="HandHotClassSearch"
    />
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
