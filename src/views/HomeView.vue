<script>
import TitleBar from '../components/TitleBar.vue';
import Carousel from '../components/Carousel.vue';
export default {

  data() {
    return {
      pageTitle: "紹介・サービス",
      carouselImgData: null,
    }
  },
  components: {
    TitleBar,
    Carousel,
  },
  mounted() {
    this.carouselImgData = [
      {
        imgUrl: '/newsHeadImg/news01.png',
        text: 'タイトル1'
      },
      {
        imgUrl: '/newsHeadImg/news02.png',
        text: 'タイトル2'
      },
      {
        imgUrl: '/newsHeadImg/news03.png',
        text: 'タイトル3'
      },
    ]
  },
}


</script>

<template>
  <main>
    <TitleBar :pageTitle="pageTitle" />
    <Carousel :imgData="carouselImgData" />
    <!-- <img src="/newsHeadImg/news01.png" alt=""> -->
  </main>
</template>
