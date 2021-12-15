<script>
  export default {
    props: {
      form: {
        type: Object,
        default: () => {
          keyWord: "";
        },
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <input
    type="text"
    v-model="props.form.keyWord"
    placeholder="你想去哪裡？請輸入關鍵字"
  />
</template>
<style lang="scss" scoped>
  input {
    width: 100%;
    border: 1px solid #e6e6e6;
    padding: 12px 30px;
    border-radius: 6px;
  }
  input {
    background: #f9f9f9;
    &::placeholder {
      color: #9e9e9e;
    }
  }
</style>
