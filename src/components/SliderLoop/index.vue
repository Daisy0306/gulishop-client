<template>
  <!--banner轮播-->
  <div class="swiper-container" id="mySwiper" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "SliderLoop",
  props: ["bannerList"],
  watch: {
    // 简便写法：bannerList(newValue,oldValue){ }
    // 以下是复杂写法，固定写法
    bannerList: {
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          new Swiper(this.$refs.banner, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>
