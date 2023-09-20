<script>
import TitleBar from '../components/TitleBar.vue';
export default {

  data() {
    return {
      pageTitle: "カテゴリ管理",
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
