<script>
  export default {
    props: {
      title: {
        type: String,
        default: "",
      },
      linkMessage: {
        type: String,
        default: "",
      },
    },
    setup(props) {
      return {
        props,
      };
    },
  };
</script>
<template>
  <div class="container">
    <h2>{{ props.title }}</h2>
    <router-link to="/">
      {{ props.linkMessage }}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 3.5L10 8L6 12.5"
          stroke="#FF725E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 8px;
    @media (min-width: 1200px) {
      margin-bottom: 12px;
      padding: 0 45px;
    }
  }
  h2 {
    font-size: 24px;
    color: #1e1e1e;
    font-weight: 300;
  }
  a {
    display: flex;
    align-items: center;
    color: #ff725e;
  }
</style>
