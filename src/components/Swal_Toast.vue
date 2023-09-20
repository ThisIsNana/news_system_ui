
<script>
export default {
  // 接收外來的值
  props: {
    popType: String,
    popTitle: String,
  },
  methods: {
    showPop() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        // timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer);
          toast.addEventListener('mouseleave', this.$swal.resumeTimer);
        }
      });
      console.log(this.popType, this.popTitle);
      Toast.fire({
        icon: this.popType,
        title: this.popTitle,
      })

    }
  }
}
</script>
<template>
  <div>

  </div>
</template>
<style lang="scss" scoped></style>