<script>
export default {
  data() {
    return {
      isLogin: false,
      pageTitle: null,
    }
  },
  create() {
    if (sessionStorage.getItem('isLogin')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  methods: {
    clearLoginSession() {
      sessionStorage.removeItem('loginData');
    }
  },
  // 接收外來標題
  props: {
    pageTitle: String,
  }

}

</script>

<template>
  <header>
    <!-- 尚未登入 -->
    <nav v-if="!isLogin">
      <RouterLink to="/">
        <i class="fa-solid fa-house-chimney fa-sm"></i> ホームページ
      </RouterLink> |
      <RouterLink to="/login">
        <i class="fa-solid fa-user fa-sm"></i> ログイン
      </RouterLink>
    </nav>

    <!-- 已登入 -->
    <nav v-else>
      <RouterLink to="/">
        <i class="fa-solid fa-house-chimney fa-sm"></i> ホームページ
      </RouterLink> |
      <RouterLink to="/addNews">
        <i class="fa-solid fa-circle-plus fa-sm"></i> ニュース追加
      </RouterLink> |
      <RouterLink to="/" @click="clearLoginSession">
        <i class="fa-solid fa-user fa-sm"></i> ログアウト
      </RouterLink>
    </nav>

    <!-- 標頭欄 -->
    <div class="header">
      <h2 class="title">{{ pageTitle }}</h2>
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
      color: #90bdb3;
      transition: 0.5s;
      border-radius: 10px;

      &:hover {
        color: #FFFFFF;
        background-color: #90bdb3;
      }
    }

  }
}



.loading {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #90bdb3;
  height: 80px;

  img {
    height: 60px;
  }


  h2 {
    text-align: center;
    font-size: 48px;
  }
}
</style>
