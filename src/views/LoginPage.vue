<script>
import TitleBar from '../components/TitleBar.vue';
import axios from 'axios';
import SwalToast from '../components/Swal_Toast.vue';
export default {

  data() {
    return {
      loginPageTitle: "ログイン",
      signUpPageTitle: "サインアップ",

      title: "ログイン / サインアップ",

      inputAcc: null,
      inputPwd: null,
      inputPwd2: null,
      inputName: null,
      checkAccCanUse: false,
      checkPwdCanUse: false,
      checkPwd2CanUse: false,

      // 已註冊狀態
      hadSignUp: true,

      // API(環境變數)
      loginAPI: import.meta.env.VITE_USER_LOGIN,
      signUpAPI: import.meta.env.VITE_USER_SIGH_UP,
      isExistAccAPI: import.meta.env.VITE_IS_EXIST_ACCOUNT,

      // SWAL2提示
      popType: "",
      popTitle: "",
    }
  },
  components: {
    TitleBar,
    SwalToast,
  },
  create() {
    if (sessionStorage.getItem('isLogin') === 'true') {
      this.popType = 'error';
      this.popTitle = 'すでにログインしました。ホームページに自動リダイレクトします';
      this.$nextTick(() => {
        this.$refs.SwalToast.showPop();
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
      })
    };

  },
  watch: {
    inputAcc(newVal) {
      console.log(newVal);
      this.checkAcc();
    },
    inputPwd(newVal) {
      console.log(newVal);
      this.checkPwd();
    },
    inputPwd2(newVal) {
      console.log(newVal);
      this.checkPwd2();
    },
  },
  methods: {
    // 檢查帳號格式+重複
    checkAcc() {
      let request = {
        signup_account: this.inputAcc,
      }

      // 格式
      const AccRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
      if (!AccRegex.test(this.inputAcc)) {
        return this.checkAccCanUse = false;
      }

      // 重複
      axios({
        method: 'POST',
        url: this.isExistAccAPI,
        data: request,
      })
        .then(response => {
          const data = response.data;
          if (data.message.split(" ")[0] === "V") {
            console.log("✔ 此帳號可使用")
            this.checkAccCanUse = true;
            this.hadSignUp = false;
          }
          else {
            console.log("✘ 此帳號格式錯誤，或已存在")
            this.hadSignUp = true;
          }
          console.log(data);
        })
        .catch((err) => {
          console.log("錯誤", err);
        })

    },
    // 檢查密碼格式
    checkPwd() {

      const pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
      if (!pwdRegex.test(this.inputPwd)) {
        return this.checkPwdCanUse = false;
      }
      this.checkPwdCanUse = true;

    },
    // 檢查密碼驗證
    checkPwd2() {
      if (this.inputPwd2 === "" || this.inputPwd !== this.inputPwd2) {
        return this.checkPwd2CanUse = false;
      }
      this.checkPwd2CanUse = true;
    },
    // 登入API
    login() {
      // 防呆空白
      if (this.checkNullOrEmpty(this.inputAcc) === false
        || this.checkNullOrEmpty(this.inputPwd) === false) {
        this.popType = "error";
        this.popTitle = "空いているところや規則に合っていないところがありますので、チェックしてください。";
        this.$nextTick(() => {
          this.$refs.SwalToast.showPop();
        });
      }
      else {
        let request = {
          "user_account": this.inputAcc,
          "user_password": this.inputPwd
        }

        axios({
          method: 'POST',
          url: this.loginAPI,
          data: request,
        })
          .then(response => {
            const data = response.data;
            if (data.message.split(" ")[0] === "X") {
              // 錯誤時
              this.popType = "error";
              this.popTitle = "空いているところや規則に合っていないところがありますので、チェックしてください。";
              this.$nextTick(() => {
                this.$refs.SwalToast.showPop();
              });

            }
            else {
              // 成功時
              this.popType = "success";
              this.popTitle = "ログイン成功。2秒後ホームページに自動リダイレクトします";
              this.$nextTick(() => {
                this.$refs.SwalToast.showPop();
                sessionStorage.setItem("isLogin", true)
                setTimeout(() => {
                  this.$router.go(0);
                  this.$router.push('/');
                }, 2000); // = 2秒
              });
            }
          })
          .catch((err) => {
            console.log("錯誤", err);
            this.showSwalErrorMixin();
          })

      }


    },
    // 註冊API
    signUp() {
      // 防呆空白、不可使用等
      if (this.checkNullOrEmpty(this.inputAcc) === false
        || this.checkNullOrEmpty(this.inputPwd) === false
        || this.checkNullOrEmpty(this.inputPwd2) === false
        || this.checkNullOrEmpty(this.inputName) === false
        || !this.checkAccCanUse
        || !this.checkPwdCanUse
        || !this.checkPwd2CanUse) {

        this.popType = "error";
        this.popTitle = "空いているところや規則に合っていないところがありますので、チェックしてください。";
        this.$nextTick(() => {
          this.$refs.SwalToast.showPop();
        });
      }
      else {
        let request = {
          "signup_account": this.inputAcc,
          "signup_password": this.inputPwd,
          "signup_name": this.inputName
        }

        axios({
          method: 'POST',
          url: this.signUpAPI,
          data: request,
        })
          .then(response => {
            const data = response.data;
            console.log(data);
            this.popType = "success";
            this.popTitle = "サインアップ成功、ログインしてください。3秒後ログインページにします";
            this.$nextTick(() => {
              this.$refs.SwalToast.showPop();
              setTimeout(() => {
                this.$router.go(0);
              }, 3000);
            });
          })
          .catch((err) => {
            console.log("錯誤", err);
            this.popType = "error";
            this.popTitle = "チェックしてください。";
            this.$nextTick(() => {
              this.$refs.SwalToast.showPop();
            });
          })

      }

    },
    // 空白檢查
    checkNullOrEmpty(input) {
      if (input === null || input === "undefined" || input.trim === "") {
        return false;
      }
      return true;
    },
  }

}


</script>

<template>
  <main>
    <TitleBar :pageTitle="title" />
    <div class="main">

      <!-- 彈跳提示視窗 -->
      <SwalToast ref="SwalToast" :popType="popType" :popTitle="popTitle" />

      <div class="box">
        <h1 v-if="hadSignUp">{{ loginPageTitle }}</h1>
        <h1 v-else>{{ signUpPageTitle }}</h1>
      </div>

      <!-- 提示 -->
      <div class="tip_box">
        <i class="fa-regular fa-circle-question fa-xl"></i>
        <h2 class="tips">アカウントを入力すると、<br>登録済みかどうかを検出できます。</h2>
      </div>



      <div class="box">
        <h3>アカウント</h3>
        <input type="account" v-model.lazy="inputAcc" placeholder="6〜12文字、少なくとも1つの数字と英字必要">
      </div>

      <!-- 提示 -->
      <i class="fa-regular fa-circle-check fa-sm" style="color: #00ad23;"
        v-if="!hadSignUp && checkAccCanUse">このアカウントを使用できます</i>
      <i class="fa-regular fa-circle-xmark fa-sm" style="color: #ad0000;"
        v-if="!hadSignUp && !checkAccCanUse">アカウントが規則に合っていません</i>



      <div class="box">
        <h3>パスワード</h3>
        <input type="password" v-model.lazy="inputPwd" placeholder="8～20文字、少なくとも1つの数字と英字必要">
      </div>

      <!-- 提示 -->
      <i class="fa-regular fa-circle-check fa-sm" style="color: #00ad23;"
        v-if="!hadSignUp && checkPwdCanUse">このパスワードを使用できます
      </i>
      <i class="fa-regular fa-circle-xmark fa-sm" style="color: #ad0000;"
        v-if="!hadSignUp && !checkPwdCanUse">パスワードが規則に合っていません
      </i>



      <!-- 只有沒註冊過才顯示 -->
      <div v-if="!hadSignUp">
        <div class="box">
          <h3>パスワード確認</h3>
          <input type="password" v-model.lazy="inputPwd2">
        </div>

        <!-- 提示 -->
        <i class="fa-regular fa-circle-check fa-sm pwd2check" style="color: #00ad23;"
          v-if="checkPwd2CanUse">このパスワードを確認しました</i>
        <i class="fa-regular fa-circle-xmark fa-sm pwd2check" style="color: #ad0000;" v-else>
          前のパスワードに合っていません</i>

        <div class="box">
          <h3>使用者名</h3>
          <input type="text" v-model.lazy="inputName" placeholder="日本語も中国語も使いできます">
        </div>
      </div>

      <div class="box">
        <button v-if="hadSignUp" type="button" @click="login">ログイン</button>
        <button v-else type="button" @click="signUp">サインアップ</button>
      </div>
    </div>


  </main>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid #857777;
  position: relative;
  width: 70%;
  margin: auto;
  text-align: center;
  margin-bottom: 100px;

  .tip_box {
    position: absolute;
    top: 60px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #857777;
    font-size: 12px;

    .tips {
      display: flex;
      padding: 5px;
      margin: 10px;
      opacity: 0;
      transition: 0.3s;
    }

    &:hover {
      .tips {
        opacity: 1;
        transition: 0.3s;
      }
    }
  }


  .box {
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 30px 0 10px 0;

    h1 {
      font-size: 32px;
    }

    h3 {
      font-size: 20px;
      padding: 5px;
      width: 250px;

      // text-align-last: justify;
    }

    input {
      font-size: 16px;
      width: 160%;
      height: 30px;
    }

    a {
      position: relative;
      right: 20px;
    }

    button {
      margin: 50px;
      padding: 10px 20px;
      background-color: #857777;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-weight: bolder;
    }

    .pwd2check {
      margin-top: -10px;
    }
  }
}
</style>