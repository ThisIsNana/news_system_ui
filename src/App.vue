<script>
import HeaderView from './components/HeaderView.vue';
import FooterView from './components/FooterView.vue';
import { RouterLink, RouterView } from 'vue-router'
export default {

  components: {
    HeaderView,
    FooterView,
  }

}

</script>

<template>
  <HeaderView />
  <RouterView />
  <FooterView />
</template>

<style scoped></style>
