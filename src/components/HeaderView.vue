<script>
import axios from 'axios';
export default {
  data() {
    return {
      isLogin: null,
      categories: null,

      showAllCategoryAPI: import.meta.env.VITE_SHOW_ALL_CATEGORY,
    }
  },
  created() {
    if (sessionStorage.getItem('isLogin') === true) {
      this.isLogin = true;
      console.log(this.isLogin);
    } else {
      this.isLogin = false
      console.log(this.isLogin);
    }
    this.getCategories();
  },
  methods: {
    clearLoginSession() {
      sessionStorage.removeItem('loginData');
    },
    getCategories() {

      axios({
        method: 'GET',
        url: this.showAllCategoryAPI,
      })
        .then(response => {
          const data = response.data;
          console.log(data);
        })
        .catch((err) => {
          console.log("錯誤", err);
        })

    }
  },
}

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <i class="fa-solid fa-house-chimney fa-sm"></i> ホームページ
      </RouterLink> |

      <!-- 尚未登入 -->
      <RouterLink to="/login" v-if="!isLogin">
        <i class="fa-solid fa-user fa-sm"></i> ログイン
      </RouterLink>

      <!-- 已登入 -->
      <RouterLink to="/" v-else @click="clearLoginSession">
        <i class="fa-solid fa-user fa-sm"></i> ログアウト
      </RouterLink>
    </nav>

    <!-- 選單 -->
    <div class="header">
      <img src="../assets/img/logo2.png" alt="">
      <div>
        <ol class="navBar">
          <li>
            <RouterLink to="/">紹介</RouterLink>
          </li>
          <li>
            <RouterLink to="/news">カテゴリ</RouterLink>
          </li>
          <li>
            <RouterLink to="/">サービス</RouterLink>
          </li>
          <!-- v-if="isLogin" -->
          <li class="isLogin" v-if="isLogin">
            <RouterLink to="/login_category">[ カテゴリ管理 ]</RouterLink>
          </li>
          <li class="isLogin" v-if="isLogin">
            <RouterLink to="/login_news">[ ニュース編集・追加 ]</RouterLink>
          </li>
        </ol>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  nav {
    background-color: #ffffff;
    display: flex;
    justify-content: end;
    align-items: center;

    a {
      padding: 5px;
      margin: 3px 5px;
      color: #857777;
      transition: 0.5s;
      border-radius: 10px;

      &:hover {
        color: #FFFFFF;
        background-color: #857777;
      }
    }
  }
}



.header {
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #ffffff;
  height: 100px;
  box-shadow: 0px 5px 5px #e0d5d5;

  img {
    margin: 50px;
    height: 60px;
  }

  .navBar {
    display: flex;

    li {
      color: #443c3c;
      margin: 10px 10px;
      font-size: 20px;
      padding: 5px;

      a {
        color: #443c3c;

        &:hover {
          color: #857777;
        }

      }

    }

    .isLogin {
      background-color: #beaeae;
      padding: 5px;
    }

  }
}
</style>
