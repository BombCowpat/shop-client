<template>
  <div class="swiper-container" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="banner.id">
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
import "swiper/css/swiper.min.css";
export default {
  name: "SliderLoop",
  props:['bannerList'],
    watch: {
    //数据变化时new swiper
    bannerList: {
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.banner, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay:true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }
          });
        });
      },
      immediate:true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>