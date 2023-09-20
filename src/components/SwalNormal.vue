
<script>
export default {
  // 接收外來的值
  props: {
    swalIconColor: String,
    swalIcon: String,
    swalTitle: String,
    swalText: String,
    swalFooter: String,
    // 確定按鈕
    swalConfirmButtonText: String,
    swalConfirmButtonColor: String,
    // 取消按鈕
    swalShowCancelButton: Boolean,
    swalCancelButtonText: String,
    swalCancelButtonColor: String,
    // 計時
    swalTimer: Number,
    swalTimerProgressBar: Boolean,
    pageTo: Number,
  },
  methods: {
    showSwal() {
      this.$swal({
        iconColor: this.swalIconColor,
        icon: this.swalIcon,
        title: this.swalTitle,
        text: this.swalText,
        footer: this.swalFooter,
        showCloseButton: true,

        confirmButtonText: this.swalConfirmButtonText,
        confirmButtonColor: this.swalConfirmButtonColor,

        showCancelButton: this.swalShowCancelButton,
        cancelButtonText: this.swalCancelButtonText,
        cancelButtonColor: this.swalCancelButtonColor,

        timer: this.swalTimer,
        timerProgressBar: this.swalTimerProgressBar,
        reverseButtons: true,
        iconColor: '#1B5400',
      }).then((result) => {
        if (result.isConfirmed === true) {
          this.$router.go(this.pageTo);
        }
      }).catch((err) => {
        console.log("swalNormalError--------", err)
      });

    }
  }
}
</script>
<template>
  <div>

  </div>
</template>
<style lang="scss" scoped></style>