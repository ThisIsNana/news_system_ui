<script>
export default {
  // 接收外來標題
  props: {
    pageTitle: String,
  }

}
</script>
<template>
  <div>
    <div class="title">
      <i class="fa-solid fa-square fa-sm"></i>
      <h2>{{ pageTitle }}</h2>
      <i class="fa-solid fa-angles-right fa-sm"></i>
    </div>
  </div>
</template>
<style lang="scss">
.title {
  display: flex;
  align-items: baseline;
  margin: 30px 50px;
  font-size: 28px;
  // background-color: #dadada;

  i {
    margin: 5px;
  }

  h2 {
    text-align: center;
    margin: 5px;
  }
}
</style>