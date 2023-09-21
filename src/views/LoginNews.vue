<script>
import TitleBar from '../components/TitleBar.vue';
import axios from 'axios';
export default {

  data() {
    return {
      pageTitle: "ニュース編集・追加",

      //session抓出的資料
      categories: null,
      userAccount: null,

      //存入的資料
      newsTitle: null,
      newsCategory: null,
      newsCreateDate: null,
      newsCreateUser: null,


      // API
      showAllNewsAPI: import.meta.env.VITE_SHOW_ALL_NEWS,
    }
  },
  components: {
    TitleBar,
  },
  created() {
    // 取得分類
    if (sessionStorage.getItem("categories")) {
      this.categories = JSON.parse(sessionStorage.getItem("categories"));
      console.log(this.categories);
    }
    this.userAccount = sessionStorage.getItem("userAccount");
    this.newsCreateUser = sessionStorage.getItem("userName");
  },

}


</script>

<template>
  <main>
    <div class="container">
      <TitleBar :pageTitle="pageTitle" />

      <div class="inputBox">
        <h2>タイトル</h2> <input type="text" placeholder="タイトルを入力してください。" v-model="newsTitle">
      </div>
      <div class="inputBox">
        <h2>カテゴリ</h2>
        <select name="categorySelect" id="" class="categorySelect" v-model="newsCategory">
          <optgroup v-for="category in categories" :label="category.categoryFather" class="cateOptGroup">
            <option v-for="child in category.categoryChild" :value="child" class="cateOpt">
              {{ child }}
            </option>
          </optgroup>
        </select>
        <button type="button" class="addCategoryBtn">
          <i class="fa-solid fa-square-plus fa-sm"></i>
          カテゴリ追加
        </button>
      </div>
      <div class="inputBox">
        <h2>投稿時間</h2>
        <input type="datetime-local" v-model="newsCreateDate">
      </div>
      <div class="inputBox">
        <h2>投稿者</h2>
        <input type="text" v-model="newsCreateUser" disabled>
      </div>

      <!-- to be continue -->

    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  width: 90%;
  margin: 0 auto;
  background-color: #fff;

  .inputBox {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 20px auto;
    text-align: right;

    h2 {
      margin: 0 10px;
      font-size: 20px;
      width: 10%;
    }

    input {
      font-size: 20px;
      padding: 5px;
      height: 20px;
      font-family: 'cht-huninn';
    }

    input[type="text"] {
      width: 80%;
    }

    input[type="datetime-local"] {
      width: 300px;
    }

    .categorySelect {
      font-family: 'cht-huninn';
      font-size: 16px;
      height: 32px;

      .cateOptGroup {
        font-size: 14px;
      }

      .cateOpt {
        font-size: 16px;
      }
    }

    .addCategoryBtn {
      background-color: #880000;
      border: none;
      color: #fff;
      font-size: 16px;
      padding: 5px;
      border-radius: 5px;
      margin: 10px;

      i {
        padding: 5px;
      }

    }
  }


}
</style>