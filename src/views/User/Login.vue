<template>
  <div class="login-in">
    <div class="login-9ffe6c014e6f06f1c218fde0ca3fc4ef">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        z-index="99999999"
        class="login-f921d5768e1eb9ca4fe4e6b4692622e6"
        @click-left="onNavBarLeftClick"
      >
        <van-icon name="arrow-left" slot="left" />
      </van-nav-bar>
    </div>

    <div class="login-2a642626758deefdc2989a73aae823d3">
      <van-cell-group class="login-5e8eee748a3d14d6a380448d6d61a9cf">
        <van-field
          v-model="loginInfo.data.name"
          v-show="loginInfo.type == 0"
          left-icon="user-o"
          placeholder="请输入用户名 (仅支持中英文数字)"
          class="login-e71832eb64a3978b00a7d37f407b158e"
        />
        <van-field
          v-model="loginInfo.data.email"
          left-icon="/img/app-icons/email.png"
          placeholder="请输入邮箱"
          class="login-e71832eb64a3978b00a7d37f407b158e"
        />
        <van-field
          v-model="loginInfo.data.password"
          type="password"
          left-icon="/img/app-icons/password.png"
          placeholder="请输入密码"
          class="login-e71832eb64a3978b00a7d37f407b158e"
        />
        <van-field
          v-model="loginInfo.data.newPassword"
          v-show="loginInfo.type == 2"
          type="password"
          left-icon="/img/app-icons/password.png"
          placeholder="请输入新密码"
          class="login-e71832eb64a3978b00a7d37f407b158e"
        />
        <van-field
          v-model="loginInfo.data.qq"
          v-show="loginInfo.type == 0"
          left-icon="/img/app-icons/qq.png"
          placeholder="请输入QQ"
          class="login-e71832eb64a3978b00a7d37f407b158e"
        />
      </van-cell-group>
    </div>

    <div v-show="loginInfo.type == 0" class="login-61046f2f5eefe3dc179e52af32241062">
      <span class="login-e4c9479b11955648dad558fe717a4eb2">注:用户名和QQ将用于展示在BP界面以及修改密码,请不要瞎写</span>
    </div>

    <div class="login-6920626369b1f05844f5e3d6f93b5f6e">
      <van-button
        round
        size="small"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="onLoginClick"
        class="my-0162f4b7b2dbdf6aff3a25de02e49a8b"
      >{{ loginInfo.text }}</van-button>
    </div>

    <div class="login-f01ae8c7f2d058ec6be00db589a32bea login-60ae25445ac62d5ec51c776826888d9f">
      <span @click="onRegisterClick">注册</span>
    </div>

    <div class="login-f01ae8c7f2d058ec6be00db589a32bea login-4ae1ffb5939d592986bed21d0913562d">
      <span @click="onUpdateClick">修改密码</span>
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/user.css");
</style>

<script>
export default {
  name: "LoginHome",
  data() {
    return {
      loginInfo: {
        type: 1,
        text: "登录",
        data: {
          name: null,
          email: null,
          password: null,
          newPassword: null,
          qq: null,
          openId: null,
          accessToken: null,
        },
      },
    };
  },
  methods: {
    onRegisterClick: function () {
      this.loginInfo.type = 0;
      this.loginInfo.text = "注册";
    },
    onNavBarLeftClick: function () {
      if (this.loginInfo.type == 1) {
        this.$router.go(-1);
      } else {
        this.loginInfo.type = 1;
        this.loginInfo.text = "登录";
      }
    },
    onLoginClick: function () {
      let type = this.loginInfo.type,
        data = this.loginInfo.data;

      this.axios
        .post(
          this.apiList.pvp.loginWebAccount + "&aid=" + type,
          this.$qs.stringify({
            name: data.name,
            email: data.email,
            password: this.$md5(data.password),
            newPassword: data.newPassword ? this.$md5(data.newPassword) : null,
            qq: data.qq,
            openId: data.openId,
            accessToken: data.accessToken,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            let msg;

            if (type == 0) msg = "注册成功";
            if (type == 1) msg = "登录成功";
            if (type == 2) msg = "修改成功";

            this.$message.success(msg);

            this.$cookie.set("openId", data.openId, { expires: "1Y" });
            this.$cookie.set("accessToken", data.accessToken, {
              expires: "1Y",
            });

            setTimeout(() => {
              location.href = "/my";
            }, 500);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onUpdateClick: function () {
      this.loginInfo.type = 2;
      this.loginInfo.text = "修改密码";
    },
  },
};
</script>