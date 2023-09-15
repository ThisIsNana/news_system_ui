<script>
import TitleBar from '../components/TitleBar.vue';
export default {

  data() {
    return {
      pageTitle: "最新消息",
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
