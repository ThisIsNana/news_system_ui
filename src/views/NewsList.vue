<script>
import TitleBar from '../components/TitleBar.vue';
export default {

  data() {
    return {
      pageTitle: "ニュース",
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

    <FooterView />
  </main>
</template>
