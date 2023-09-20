<script>
import axios from 'axios';
import SwalToast from './Swal_Toast.vue';
import SwalNormal from './SwalNormal.vue';
export default {
  components: {
    SwalToast,
    SwalNormal,

  },
  data() {
    return {
      isLogin: null,
      categories: null,
      categoryFather: null,

      // swal通知
      swalIcon: "",
      swalTitle: "",
      swalText: "",
      swalConfirmButtonText: 'O',
      swalConfirmButtonColor: '#FFFFFF',
      swalShowCancelButton: true,
      swalCancelButtonText: 'X',
      swalCancelButtonColor: '#000000',
      swalIconColor: "#000000",
      pageTo: 0,

      // API
      showAllCategoryAPI: import.meta.env.VITE_SHOW_ALL_CATEGORY,
    }
  },
  created() {
    if (sessionStorage.getItem('isLogin') === 'true') {
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
      this.swalTitle = 'ログアウトしますか';
      this.swalIcon = 'question';
      this.swalText = '未保存のデータは失われます';
      this.swalConfirmButtonText = 'はい';
      this.swalConfirmButtonColor = '#880000';
      this.swalShowCancelButton = true;
      this.swalCancelButtonText = 'いいえ';
      this.swalCancelButtonColor = '#BEAEAE';
      this.swalIconColor = "#880000"
      this.pageTo = 0;

      this.$nextTick(() => {
        this.$refs.SwalNormal.showSwal();
        sessionStorage.removeItem('isLogin');
      });

    },
    // 用API抓分類
    getCategories() {
      axios({
        method: 'GET',
        url: this.showAllCategoryAPI,
      })
        .then(response => {
          const data = response.data;

          if (data.message.split(" ")[0] === "V") {
            // 抓出所有分類
            const categoryList = data.categoryList;

            let categoryObj = {};
            categoryList.forEach((category) => {

              const { categoryFather, categoryChild } = category;

              // 檢查父分類是否存在(這裡用'[]'是因為屬性不一定存在，確定存在的話可以用'.')
              if (!categoryObj[categoryFather]) {
                // 如果不存在就加入父分類+子分類
                categoryObj[categoryFather] = {
                  categoryFather,
                  categoryChild: [categoryChild]
                };
              } else {
                // 父分類存在 => 加入子分類
                categoryObj[categoryFather].categoryChild.push(categoryChild);
              }
            })

            // 將物件轉為陣列
            this.categories = Object.values(organizedCategories);

            console.log(this.categories);
          }
        })
        .catch((err) => {
          console.log("錯誤", err);
        })
    },

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
            <RouterLink to="/">紹介・サービス</RouterLink>
          </li>
          <li>
            <RouterLink to="/news">ニュース</RouterLink>
            <div class="categoryBar">
              <ol v-for="categoryy in categoryFather">
                <li>{{ categoryy }}</li>
              </ol>
            </div>


          </li>
          <!-- v-if="isLogin" -->
          <li class="isLogin" v-if="isLogin">
            <RouterLink to="/login_news"> ニュース編集・追加 </RouterLink>
          </li>
          <li class="isLogin" v-if="isLogin">
            <RouterLink to="/login_category"> カテゴリ管理 </RouterLink>
          </li>
        </ol>
      </div>
    </div>
  </header>
  <!-- 彈跳提示視窗 -->
  <SwalNormal ref="SwalNormal" :swalIcon="swalIcon" :swalTitle="swalTitle" :swalFooter="swalFooter"
    :swalConfirmButtonText="swalConfirmButtonText" :swalConfirmButtonColor="swalConfirmButtonColor"
    :swalShowCancelButton="swalShowCancelButton" :swalCancelButtonText="swalCancelButtonText"
    :swalCancelButtonColor="swalCancelButtonColor" />
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
          color: #695f5f;
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
