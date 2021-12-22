<script>
  import { computed } from "@vue/runtime-core";
  export default {
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      swiperName: {
        type: String,
        default: "",
      },
    },
    setup(props) {
      //調整日期格式
      const newTime = computed(() => {
        return props.data.map(
          (item) =>
            `${item.StartTime.substr(0, 10).replace(
              "-",
              "/",
            )} ${item.EndTime.substr(0, 10).replace("-", "/")}`,
        );
      });
      return {
        props,
        newTime,
      };
    },
  };
</script>
<template>
  <div class="container">
    <div class="cardGroup">
      <div v-for="(item, index) in props.data" :key="item.Name" class="card">
        <div class="imgWrap">
          <img :src="item.Picture.PictureUrl1" />
        </div>
        <div class="card-body">
          <div class="title">
            <span>{{ newTime[index] }}</span>
            <h3>{{ item.ActivityName }}</h3>
          </div>
          <div class="another">
            <div class="location">
              <svg
                width="15"
                height="18"
                viewBox="0 0 15 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 7.12818C15.0023 6.03351 14.7383 4.9531 14.2284 3.97105C13.7185 2.98899 12.9766 2.13179 12.0604 1.46617C11.1441 0.800551 10.0783 0.344477 8.94584 0.133444C7.81338 -0.077589 6.64487 -0.0378872 5.53124 0.249465C4.4176 0.536817 3.3889 1.06407 2.52522 1.79016C1.66154 2.51626 0.986167 3.42161 0.551706 4.43576C0.117244 5.4499 -0.0645913 6.54546 0.0203354 7.63716C0.105262 8.72886 0.454656 9.78724 1.04134 10.7299C1.33587 11.1889 1.69352 11.5181 2.09324 12.007L6.47963 17.4944C6.60629 17.6516 6.76944 17.779 6.95643 17.8667C7.14342 17.9544 7.34922 18 7.55782 18C7.76641 18 7.97221 17.9544 8.1592 17.8667C8.34619 17.779 8.50934 17.6516 8.636 17.4944L12.9172 12.1167C13.2917 11.6781 13.6428 11.2219 13.9691 10.7499C14.6486 9.65206 15.0047 8.40121 15 7.12818ZM7.53152 10.2311C6.87826 10.2311 6.23969 10.0473 5.69653 9.70308C5.15336 9.35884 4.73001 8.86957 4.48002 8.29712C4.23003 7.72467 4.16462 7.09477 4.29207 6.48706C4.41951 5.87935 4.73408 5.32114 5.196 4.883C5.65793 4.44487 6.24645 4.1465 6.88716 4.02562C7.52786 3.90474 8.19197 3.96678 8.79551 4.2039C9.39904 4.44101 9.91488 4.84256 10.2778 5.35774C10.6407 5.87293 10.8345 6.47863 10.8345 7.09825C10.8345 7.92912 10.4865 8.72596 9.86704 9.31348C9.24762 9.901 8.40752 10.2311 7.53152 10.2311Z"
                  fill="#E0DA48"
                />
              </svg>
              <span>{{ item.City }}</span>
            </div>
            <router-link class="readMore" :to="`/activity/${item.ID}`">
              <span>詳細介紹</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3.5L10 8L6 12.5"
                  stroke="#7F977B"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .container {
    padding: 0 15px;
    margin-bottom: 36px;
    @media (min-width: 1200px) {
      padding: 0 45px;
    }
  }
  .cardGroup {
    display: flex;
    flex-direction: column;
    @media (min-width: 1200px) {
      flex-flow: wrap;
    }
    .card {
      display: flex;
      align-items: center;
      border-radius: 12px;
      @media (min-width: 1200px) {
        width: 48%;
        margin-bottom: 12px;
      }
      & + & {
        margin-top: 16px;
        @media (min-width: 1200px) {
          margin: unset;
        }
      }
      &:nth-child(2n) {
        @media (min-width: 1200px) {
          margin-left: 2%;
        }
      }
    }
    .imgWrap {
      border-radius: 12px;
      overflow: hidden;
      width: 26%;
      aspect-ratio: 3/2;
      @media (min-width: 1200px) {
        width: 30%;
        aspect-ratio: 1/1;
        border-radius: 12px 0 0 12px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .card-body {
      padding: 0 16px;

      @media (min-width: 1200px) {
        width: 0;
        flex-grow: 1;
        height: 100%;
        padding: 16px 30px;
        background-color: #f9f9f9;
        border: 1px solid #e5e5e5;
        border-left: unset;
        border-radius: 0 12px 12px 0;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .another {
      display: flex;
      justify-content: space-between;
    }
    .title {
      h3 {
        font-size: 15px;
        @media (min-width: 1200px) {
          font-size: 22px;
          font-weight: 700;
        }
      }
      span {
        font-size: 12px;
        color: #646464;
        @media (min-width: 1200px) {
          font-size: 16px;
        }
      }
    }
    .location {
      @media (min-width: 1200px) {
        display: flex;
        align-items: center;
      }
      svg {
        display: none;
        @media (min-width: 1200px) {
          display: inline-block;
          margin-right: 4px;
        }
      }
      span {
        font-size: 11px;
        color: #646464;
        @media (min-width: 1200px) {
          font-size: 16px;
        }
      }
    }
    .readMore {
      color: #7f977b;
      display: none;

      @media (min-width: 1200px) {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
