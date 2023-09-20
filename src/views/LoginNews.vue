<script>
import TitleBar from '../components/TitleBar.vue';
export default {

  data() {
    return {
      pageTitle: "ニュース編集・追加",
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
