<!-- W3S做好的組件 -->
<!-- 參考資料：https://www.w3schools.com/howto/howto_js_slideshow.asp -->

<script>
export default {
  data() {
    return {
      currentSlideIndex: 0,
      intervalId: null,
      slideIndex: 1,
    };
  },
  props: {
    imgData: {},
  },
  mounted() {
    this.showSlides(this.slideIndex);
  },
  methods: {
    // Next/previous controls
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
      console.dir(this.imgData);
    },
    // Thumbnail image controls
    currentSlide(n) {
      console.dir(this.imgData);
      this.showSlides(this.slideIndex = n);
    },
    showSlides(n) {
      const slides = this.$refs.slides;
      const dots = this.$refs.dot;

      if (!slides || !dots) {
        return;
      }

      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";
    },
  }
};
</script>
<template>
  <!-- Slideshow container -->
  <div class="slideshow-container" ref="slideshowContainer">

    <!-- Full-width images with number and caption text -->
    <div class="mySlides fade">
      <div class="numbertext">1 / 3</div>
      <img src="../../public/newsHeadImg/news01.png" style="width:90%">
      <div class="text">yesss</div>
    </div>
    <div class="mySlides fade" v-for="(img, index) in imgData">
      <div class="numbertext">{{ index + 1 }} / 3</div>
      <img :src="img.imgUrl" style="width:90%">
      <div class="text">{{ img.text }}</div>
    </div>

    <!-- Next and previous buttons -->
    <a class="prev" @click="plusSlides(-1)"><i class="fa-solid fa-chevron-left fa-sm"></i></a>
    <a class="next" @click="plusSlides(1)"><i class="fa-solid fa-chevron-right fa-sm"></i></a>
  </div>
  <br>

  <!-- The dots/circles -->
  <div style="text-align:center">
    <span class="dot" @click="currentSlide(1)"></span>
    <span class="dot" @click="currentSlide(2)"></span>
    <span class="dot" @click="currentSlide(3)"></span>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box
}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: .4
  }

  to {
    opacity: 1
  }
}
</style>