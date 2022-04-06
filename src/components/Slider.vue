<template>
  <div class="slider-wrapper">
    <swiper
      :modules="modules"
      :centeredSlides="false"
      navigation
      :space-between="10"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="(item,index) in imgArray" :key="index" class="slide" :style="{'background-image' : 'url('+item.url+')' }"></swiper-slide>
    </swiper>
    
    <swiper
      class="hidden-lg-and-up little-slider"
      :space-between="5"
      :slides-per-view="3.5"
      @swiper="onLittleSwiper"
    >
      <swiper-slide v-for="(item,index) in imgArray" :key="index" class="little-slide" @click="slideTo(index)" :style="{'background-image' : 'url('+item.url+')' }"></swiper-slide>
    </swiper>
  </div>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper } from 'swiper/vue/swiper'
  import { SwiperSlide } from 'swiper/vue/swiper-slide'
  import Navigation from 'swiper/modules/navigation/navigation.js'

  // Import Swiper styles
  import 'swiper/swiper-bundle.css';

  export default {
    name: 'Slider',
    props: ['imgArray'],
    components: {
      Swiper,
      SwiperSlide,
    },

    data() {
      return {
        mainSwiper: null,
        littleSwiper: null
      }
    },

    watch: {
      imgArray() {
        this.slideMainTo(0)
        this.slideLittleTo(0)
      }
    },

    setup() {  
      return {
        modules: [ Navigation ]
      }
    },

    methods: {         
      onSlideChange (s) {
        this.slideLittleTo(s.snapIndex)
      },

      onSwiper (swiper) {
        swiper.params.breakpoints = {
          1: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          1200: {
            slidesPerView: 2.2,
            spaceBetween: 10,
          },
          1920: {
            slidesPerView: 3.2,
            spaceBetween: 10
          }
        }

        this.mainSwiper = swiper
      },

      onLittleSwiper(swiper) {
        this.littleSwiper = swiper
      },

      slideMainTo(i) {
        this.mainSwiper.slideTo(i, 300)
      },

      slideLittleTo(i) {
        this.littleSwiper.slideTo(i, 300)
      },

      slideTo(i) {
        this.mainSwiper.slideTo(i, 300)   
        this.littleSwiper.slideTo(i, 300)     
      },

      alert() {
        alert(1)
      }
    }
  }
</script>

<style lang="sass" scoped>

.slider-wrapper
  width: 100%
  flex-wrap: wrap
  margin-top: 1rem

.slide
  background-color: #eee
  border-radius: 5px
  display: flex
  background-position: center
  background-size: auto 100%
  background-repeat: no-repeat

.little-slide
  margin-top: 5px
  background-color: #eee
  border-radius: 2.5px
  display: flex
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  height: 10vw


</style>