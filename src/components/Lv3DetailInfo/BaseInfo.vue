<script>
  export default {};
</script>
<template>
  <div class="baseInfo-container">
    <dl class="info">
      <div class="info-item">
        <dt>開放時間：</dt>
        <dd>06:00-19:00</dd>
      </div>
      <div class="info-item">
        <dt>服務電話：</dt>
        <dd>886-3-9545114</dd>
      </div>
      <div class="info-item">
        <dt>票價資訊：</dt>
        <dd>免費</dd>
      </div>
    </dl>
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
      display: flex;
      align-items: center;
      color: #2f2f2f;
      margin-bottom: 12px;
      dt {
        font-size: 20px;
        font-weight: 700;
      }
      dd {
        font-size: 18px;
      }
    }
  }
</style>
