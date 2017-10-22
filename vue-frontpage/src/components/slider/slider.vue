<template>
  <carousel-3d :controls-visible="true" :clickable="false" :width="580" :height="220" :autoplay="true" :autoplay-timeout="5000" :count="sliders"  >
    <slide :index="0">
      <img src="../../../static/images/slider-1.jpg" alt="">
    </slide>
    <slide :index="1">
      <img src="../../../static/images/slider-2.jpg" alt="">
    </slide>
    <slide :index="2">
      <img src="../../../static/images/slider-3.jpg" alt="">
    </slide>
    <slide :index="3">
      <img src="../../../static/images/slider-4.jpg" alt="">
    </slide>
    <slide :index="4">
      <img src="../../../static/images/slider-5.jpg" alt="">
    </slide>
  </carousel-3d>
</template>

<script>
    export default {
        props: {},
        components: {},
        data() {
            return {
              sliders:5
            }
        },
        created() {

        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>
@import "slider.css";
</style>
