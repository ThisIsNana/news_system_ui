<script>
import TitleBar from '../components/TitleBar.vue';
import SearchBar from '../components/SearchBar.vue';
import axios from 'axios';
export default {

  data() {
    return {
      pageTitle: "ニュース",
      categories: null,

      //搜尋欄用
      searchKeyword: "",
      startDate: "",
      endDate: "",

      // API
      showAllNewsAPI: import.meta.env.VITE_SHOW_ALL_NEWS,

    }
  },
  components: {
    TitleBar,
    SearchBar,
  },
  created() {
    // 取得分類
    if (sessionStorage.getItem("categories")) {
      this.categories = JSON.parse(sessionStorage.getItem("categories"));
    }
    // console.log(this.categories);
    this.showAllNews();

  },
  methods: {
    // 搜尋
    clickSearch(searchParams) {
      console.log("Search Params:", searchParams);
    },
    // 顯示所有消息
    showAllNews() {
      axios({
        method: 'GET',
        url: this.showAllNewsAPI,
      })
        .then(response => {
          console.log(response.data.news);
          const news = response.data.news;
        })
        .catch((err) => {
          console.log("錯誤", err);
        })
    },
  },

}


</script>

<template>
  <main>
    <TitleBar :pageTitle="pageTitle" />
    <div class="categoryBox">
      <div class="category" v-for="category in categories">
        <ol>
          <li class="father">{{ category.categoryFather }}</li>
          <hr>
          <div class="child">
            <li v-for="child in category.categoryChild ">{{ child }}</li>
          </div>
        </ol>
      </div>
    </div>
    <SearchBar v-model="searchKeyword" :startDateValue="startDate" :endDateValue="endDate" @search="clickSearch" />

    <FooterView />
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 90%;
  margin: 0 auto;
  background-color: #fff;

  .categoryBox {
    display: flex;
    flex-wrap: wrap;

    .category {
      margin: 10px auto;

      .father {
        font-size: 20px;
        font-weight: bolder;
        margin: 0 20px;
      }

      hr {
        width: 90%;
        border: 2px solid #927777b4;
      }

      .child {
        display: flex;
        font-size: 16px;
        justify-content: space-around;

        li {
          margin: 10px;
        }
      }
    }

  }
}
</style>
