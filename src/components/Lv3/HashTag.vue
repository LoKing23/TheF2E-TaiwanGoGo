<script>
  export default {
    props: {
      hashTags: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <div v-if="props.hashTags.length" class="HashTag-container">
    <ul class="hashTags">
      <li v-for="item in props.hashTags" :key="item" class="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .hashTags {
    display: flex;
    .item {
      font-size: 14px;
      font-weight: 400;
      color: #bea363;
      border: 1px solid #bea363;
      border-radius: 100px;
      padding: 2px 12px;
    }
  }
</style>
