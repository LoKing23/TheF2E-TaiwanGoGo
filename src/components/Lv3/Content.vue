<script>
  export default {
    props: {
      title: {
        type: String,
        default: "標題",
      },
      paragraph: {
        type: String,
        default: "一些文字跟一些文字",
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div class="content-container">
    <b> {{ props.title }} </b>
    <p>
      {{ props.paragraph }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .content-container {
    padding-bottom: 30px;
    @media (min-width: 1200px) {
      padding-bottom: 60px;
    }
    b {
      font-size: 20px;
      font-weight: 700;
      color: #2f2f2f;
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;
      font-weight: 300;
    }
  }
</style>
