<script>
import TitleBar from '../components/TitleBar.vue';
export default {

  data() {
    return {
      pageTitle: "紹介 | サービス",
    }
  },
  components: {
    TitleBar,
  }

}


</script>

<template>
  <main>
    <TitleBar :pageTitle="pageTitle" />

  </main>
</template>
