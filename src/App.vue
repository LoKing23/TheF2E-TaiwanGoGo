<script>
  import Header from "@/components/Global/Header/Index.vue";
  import Footer from "@/components/Global/Footer/Index.vue";
  import { onMounted, reactive, ref } from "@vue/runtime-core";
  import DateBar from "@/components/FormComponent/DateBar.vue";
  import Breadcrumb from "@/components/BreadCrumbs/index.vue";
  export default {
    components: {
      Header,
      Footer,
      DateBar,
      Breadcrumb,
    },
    setup() {
      const form = reactive({
        date: new Date(),
      });

      return { form };
    },
  };
</script>
<template>
  <Header />
  <router-view />
  <Footer />
</template>

<style lang="scss"></style>
