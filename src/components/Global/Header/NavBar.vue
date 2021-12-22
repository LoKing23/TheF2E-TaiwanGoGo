<script>
  import { useStore } from "vuex";
  export default {
    props: {
      isOpen: {
        type: Boolean,
        default: false,
      },
      HandIsOpen: {
        type: Function,
        default: () => {},
      },
      HandCloseOpen: {
        type: Function,
        default: () => {},
      },
    },
    setup(props) {
      const store = useStore();
      const HandNav = (Lv2Name) => {
        props.HandCloseOpen();
        store.dispatch(`Lv2${Lv2Name}/init`);
      };
      return {
        props,
        HandNav,
      };
    },
  };
</script>
<template>
  <a class="btn" href="javascript:;" @click.prevent="props.HandIsOpen">
    <img v-show="isOpen" src="@/assets/Icon/menu-mobile-close.svg" alt="" />
    <img v-show="!isOpen" src="@/assets/Icon/menu-mobile.svg" alt="" />
  </a>
  <nav :class="{ active: props.isOpen }">
    <ul class="list">
      <li class="list-item">
        <router-link to="/scientSpot" @click.prevent="HandNav('ScientSpot')">
          探索景點
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/activity" @click.prevent="HandNav('Activity')">
          節慶活動
        </router-link>
      </li>
      <li class="list-item">
        <router-link to="/restaurant" @click.prevent="HandNav('Restaurant')">
          品嚐美食
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .btn {
    display: block;
    width: 50px;
    height: 50px;
    position: absolute;
    right: 15px;
    top: 15px;
    @media (min-width: 1200px) {
      display: none;
    }
  }
  a {
    color: #646464;
    text-decoration: none;
  }
  nav {
    display: none;
    .list {
      display: flex;
      .list-item + .list-item {
        margin-left: 20px;
      }
    }
    @media (min-width: 1200px) {
      display: block;
    }
    &.active {
      display: block;
      padding: 0;
      .list {
        flex-direction: column;
        .list-item {
          text-align: center;
          padding: 24px 0;
          border-top: 1px solid #e5e5e5;
          margin: unset;
        }
      }
    }
  }
</style>
