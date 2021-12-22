<script>
  import { ref } from "vue";
  import { watch } from "@vue/runtime-core";
  export default {
    props: {
      lv2Type: {
        type: String,
        default: "",
      },
      apiData: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props) {
      const activityRange = ref(null);
      watch(
        () => props.apiData,
        (newVal) => {
          if (props.apiData.StartTime) {
            let start = props.apiData.StartTime.slice(0, 10).replace("-", "/");
            let end = props.apiData.EndTime.slice(0, 10).replace("-", "/");
            activityRange.value = start + " - " + end;
          }
        },
      );
      return { props, activityRange };
    },
  };
</script>
<template>
  <div class="baseInfo-container">
    <ul v-if="props.lv2Type === 'scientSpot'" class="info">
      <!-- 開放時間
      OpenTime、服務電話Phone、景點地址Address、官方網站WebsiteUrl、票價資訊TicketInfo、注意事項Remarks -->
      <li v-if="props.apiData.OpenTime" class="info-item">
        <b>開放時間：</b>
        {{ props.apiData.OpenTime }}
      </li>
      <li v-if="props.apiData.Phone" class="info-item">
        <b>服務電話：</b>
        {{ props.apiData.Phone }}
      </li>
      <li v-if="props.apiData.Address" class="info-item">
        <b>景點地址：</b>
        {{ props.apiData.Address }}
      </li>
      <li v-if="props.apiData.WebsiteUrl" class="info-item">
        <b>官方網站：</b>
        {{ props.apiData.WebsiteUrl }}
      </li>
      <li v-if="props.apiData.TicketInfo" class="info-item">
        <b>票價資訊：</b>
        {{ props.apiData.TicketInfo }}
      </li>
      <li v-if="props.apiData.Remarks" class="info-item">
        <b>注意事項：</b>
        {{ props.apiData.Remarks }}
      </li>
    </ul>
    <ul v-else-if="props.lv2Type === 'activity'" class="info">
      <li v-if="activityRange" class="info-item">
        <b>活動時間：</b>
        {{ activityRange }}
      </li>
      <li v-if="props.apiData.Phone" class="info-item">
        <b>聯絡電話：</b>
        {{ props.apiData.Phone }}
      </li>
      <li v-if="props.apiData.Organizer" class="info-item">
        <b>主辦單位：</b>
        {{ props.apiData.Organizer }}
      </li>
      <li v-if="props.apiData.Address" class="info-item">
        <b>活動地點：</b> {{ props.apiData.Address }}
      </li>
      <li v-if="props.apiData.WebsiteUrl" class="info-item">
        <b>官方網站：</b>
        <a :href="props.apiData.WebsiteUrl" target="_blank">{{
          props.apiData.WebsiteUrl
        }}</a>
      </li>
      <li v-if="props.apiData.Charge" class="info-item">
        <b>活度費用：</b> {{ props.apiData.Charge }}
      </li>
      <li v-if="props.apiData.Remarks" class="info-item">
        <b>注意事項</b> {{ props.apiData.Remarks }}
      </li>
    </ul>
    <ul v-else-if="props.lv2Type === 'restaurant'" class="info">
      <li v-if="props.apiData.OpenTime" class="info-item">
        <b>營業時間：</b> {{ props.apiData.OpenTime }}
      </li>
      <li v-if="props.apiData.Phone" class="info-item">
        <b>聯絡電話：</b> {{ props.apiData.Phone }}
      </li>
      <li v-if="props.apiData.Address" class="info-item">
        <b>餐廳地址：</b> {{ props.apiData.Address }}
      </li>
      <li v-if="props.apiData.WebsiteUrl" class="info-item">
        <b>官方網站：</b> {{ props.apiData.WebsiteUrl }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .baseInfo-container {
    padding: 30px 0;
    background-color: #f9f9f9;
    @media (min-width: 1200px) {
      padding: 30px;
      padding-bottom: 60px;
      width: 48%;
      float: left;
    }
  }
  .info {
    &-item {
      color: #2f2f2f;
      margin-bottom: 12px;
      text-indent: -6em;
      padding-left: 6em;
      b {
        font-size: 20px;
      }
    }
  }
</style>
