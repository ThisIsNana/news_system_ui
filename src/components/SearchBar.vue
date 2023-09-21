<script>
export default {
  data() {
    return {
      keyword: this.inputValue,
      startDate: this.startDateValue,
      endDate: this.endDateValue,
    };
  },
  props: {
    inputValue: String,
    startDateValue: String,
    endDateValue: String,
  },
  data() {
    return {
      keyword: this.inputValue || "",
      startDate: this.startDateValue || "",
      endDate: this.endDateValue || "",
    };
  },
  methods: {
    search() {
      this.$emit("update:inputValue", this.keyword);
      this.$emit("update:startDateValue", this.startDate);
      this.$emit("update:endDateValue", this.endDate);
      this.$emit("search", {
        keyword: this.keyword,
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
  },
};
</script>

<template>
  <div class="searchBar">
    <i class="fa-solid fa-magnifying-glass fa-lg"></i>
    <input v-model="keyword" type="text" placeholder="キーワード検索" class="inputKeyword">
    <i class="fa-regular fa-calendar-days fa-lg"></i>
    <input v-model="startDate" type="date" class="inputStartDate"> ~
    <input v-model="endDate" class="inputEndDate" type="date">
    <button @click="search">検索</button>
  </div>
</template>


<style lang="scss" scoped>
.searchBar {
  padding: 10px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #88000027;

  i {
    color: #880000;
  }

  .inputKeyword {
    width: 40%;
    height: 30px;
  }

  .inputStartDate,
  .inputEndDate {
    width: 120px;
    height: 33px;
  }
}
</style>