<script>
  import { ref } from "vue";
  import Datepicker from "vue3-date-time-picker";
  import "@/../node_modules/vue3-date-time-picker/dist/main.css";
  export default {
    components: {
      Datepicker,
    },
    props: {
      form: {
        type: Object,
        default: () => ({ date: new Date() }),
      },
    },
    setup(props) {
      const date = ref(new Date());
      const format = () => {
        const day = props.form.date.getDate();
        const month = props.form.date.getMonth() + 1;
        const year = props.form.date.getFullYear();
        // const day = date.value.getDate();
        // const month = date.value.getMonth() + 1;
        // const year = date.value.getFullYear();
        return `Selected date is ${day}/${month}/${year}`;
      };
      return {
        date,
        props,
        format,
      };
    },
  };
</script>
<template>
  <Datepicker
    v-model="props.form.date"
    :range="true"
    :previewFormat="format"
    uid="date"
  ></Datepicker>
</template>

<style></style>
