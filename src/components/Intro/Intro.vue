<script>
  export default {};
</script>
<template>
  <div class="container">
    <h1>
      探索 <strong>台灣之美</strong> <br />
      讓我們更親近這片土地
    </h1>
    <div class="text">
      <img src="@/assets/Icon/Vector.svg" alt="" />
      <p>台灣旅遊景點導覽<span class="english">Taiwan Travel Guide</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    text-align: center;
    @media (min-width: 1200px) {
      text-align: left;
    }
    h1 {
      font-size: 28px;
      font-weight: 300;
      color: #1e1e1e;
      @media (min-width: 1200px) {
        font-size: 48px;
        margin-bottom: 16px;
      }
      strong {
        border-bottom: 2px solid #e0da48;
        margin-left: -8px;
      }
    }
    .text {
      display: flex;
      p {
        color: #646464;
        padding-left: 5px;
        @media (min-width: 1200px) {
          font-size: 20px;
        }
        span {
          margin-left: 4px;
        }
      }
    }
  }
</style>
