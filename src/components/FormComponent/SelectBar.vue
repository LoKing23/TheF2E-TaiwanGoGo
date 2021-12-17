<script>
  export default {
    props: {
      form: {
        type: Object,
        default: () => ({
          city: {
            citySelected: "",
            allCity: [],
          },
        }),
      },
    },
    setup(props) {
      return { props };
    },
  };
</script>
<template>
  <select v-model="props.form.city.citySelected">
    <option value="all" key="all">全部縣市</option>
    <option
      v-for="item in props.form.city.allCity"
      :key="item.cityName"
      :value="item.cityEngName"
    >
      {{ item.cityName }}
    </option>
  </select>
</template>

<style scoped lang="scss">
  select {
    width: 100%;
    border: 1px solid #e6e6e6;
    padding: 12px 30px;
    border-radius: 6px;
  }
</style>
