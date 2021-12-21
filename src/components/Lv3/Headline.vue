<script>
  export default {
    props: {
      title: {
        type: String,
        default: "標題黨",
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div class="headline-container">
    <h1>{{ props.title }}</h1>
  </div>
</template>

<style lang="scss" scoped>
  h1 {
    font-size: 24px;
    font-weight: 300;
    color: #1e1e1e;
  }
</style>
