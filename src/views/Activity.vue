<script>
  import { reactive, ref } from "vue";
  import ActivityForm from "@/components/ActivityForm/Index.vue";
  import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
  import Lv2HotClass from "@/components/Lv2HotClass/Index.vue";
  import { useMapLv2Img } from "@/composition-api";
  import "@/assets/LV2-img/Activity/bg1.png";
  import "@/assets/LV2-img/Activity/bg2.png";
  export default {
    components: {
      ActivityForm,
      BreadCrumbs,
      Lv2HotClass,
    },
    setup() {
      //麵包屑路徑
      const breadcrumb = ref(["首頁", "節慶活動"]);
      const hotClassData = reactive({
        title: "",
        hotClass: [],
      });
      const className = [
        "節慶活動",
        "自行車活動",
        "遊憩活動",
        "產業文化活動",
        "年度活動",
        "四季活動",
      ];
      // Assets/Lv-2img 內的資料夾名稱、檔案個數
      const Lv2ImgInfo = {
        className: "Activity",
        totalNum: 6,
      };
      hotClassData.hotClass = useMapLv2Img(className, Lv2ImgInfo);
      console.log(hotClassData.hotClass);
      return {
        breadcrumb,
        hotClassData,
      };
    },
  };
</script>
<template>
  <div class="activity-container">
    <BreadCrumbs :breadcrumb="breadcrumb" />
    <ActivityForm />
    <Lv2HotClass :hotClassData="hotClassData" />
  </div>
</template>

<style scoped lang="scss">
  .activity-container {
    min-height: calc(100vh - 146px);
    padding: 8px 16px;
    @media (min-width: 1200px) {
      padding: 20px 50px;
    }
  }
</style>
