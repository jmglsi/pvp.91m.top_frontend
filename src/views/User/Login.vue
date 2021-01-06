<template>
  <div class="login-in">
    <div class="login-9ffe6c014e6f06f1c218fde0ca3fc4ef">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="onNavBarLeftClick"
        left-text="返回"
        z-index="99999999"
        class="login-f921d5768e1eb9ca4fe4e6b4692622e6"
      />
    </div>

    <div class="login-2a642626758deefdc2989a73aae823d3">
      <van-cell-group title="" class="login-5e8eee748a3d14d6a380448d6d61a9cf">
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
          class="login-e71832eb64a3978b00a7d37f407b158e app-icon_ex-3079036920f9bee746cf7baffffb950b"
        />
        <van-field
          v-model="loginInfo.data.password"
          type="password"
          left-icon="/img/app-icons/password.png"
          placeholder="请输入密码"
          class="login-e71832eb64a3978b00a7d37f407b158e app-icon_ex-3079036920f9bee746cf7baffffb950b"
        />
        <van-field
          v-model="loginInfo.data.newPassword"
          v-show="loginInfo.type == 2"
          type="password"
          left-icon="/img/app-icons/password.png"
          placeholder="请输入新密码"
          class="login-e71832eb64a3978b00a7d37f407b158e app-icon_ex-3079036920f9bee746cf7baffffb950b"
        />
        <van-field
          v-model="loginInfo.data.uin"
          v-show="loginInfo.type == 0"
          left-icon="/img/app-icons/qq.png"
          placeholder="请输入QQ"
          class="login-e71832eb64a3978b00a7d37f407b158e app-icon_ex-3079036920f9bee746cf7baffffb950b"
        />
      </van-cell-group>
    </div>

    <div class="login-6920626369b1f05844f5e3d6f93b5f6e">
      <van-button
        round
        size="small"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="onLoginClick(loginInfo.type)"
        class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
        >{{ loginInfo.text }}</van-button
      >
    </div>

    <div
      v-show="loginInfo.type == 0"
      class="app-61046f2f5eefe3dc179e52af32241062"
    >
      <span class="app-e4c9479b11955648dad558fe717a4eb2">
        注:
        <br />
        1.信息是加密储存的
        <br />
        2.用户名和QQ将用于扩列、BP界面、找回密码,请不要瞎写
      </span>
    </div>

    <div class="login-ae64b9ce80d3b20870647479c735eeb0">
      <div class="login-402e57c104da1741bd87140cc8e3633f">
        有任何意见建议都可以加群
      </div>
      <div class="login-2707770f6b9a7f3321a020d1bcd5dd9d">
        <a
          target="_blank"
          href="//qm.qq.com/cgi-bin/qm/qr?k=47VZ3jNzGKzf4SYjsYCWiOS4lqljpQww&jump_from=webapi"
          ><img
            border="0"
            src="//pub.idqqimg.com/wpa/images/group.png"
            alt="王者荣耀扯淡游戏1群"
            title="王者荣耀扯淡游戏1群"
            class="login-414c54d9374ac490e9773a8c5f357427" /></a
        >&nbsp;
        <a
          target="_blank"
          href="//qm.qq.com/cgi-bin/qm/qr?k=CEFsriXK1TM2RJa9BioWhfWI4IYrAkJj&jump_from=webapi"
          ><img
            border="0"
            src="//pub.idqqimg.com/wpa/images/group.png"
            alt="奇迹的秘密小窝"
            title="奇迹的秘密小窝"
            class="login-414c54d9374ac490e9773a8c5f357427"
        /></a>
      </div>
    </div>

    <div
      class="login-f01ae8c7f2d058ec6be00db589a32bea login-60ae25445ac62d5ec51c776826888d9f"
    >
      <span @click="onRegisterClick">注册</span>
    </div>

    <div
      class="login-f01ae8c7f2d058ec6be00db589a32bea login-4ae1ffb5939d592986bed21d0913562d"
    >
      <span @click="onUpdateClick">修改密码</span>
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/user-login.css");
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
          uin: null,
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
        this.$appPush({ path: "/my" });
      } else {
        this.loginInfo.type = 1;
        this.loginInfo.text = "登录";
      }
    },
    onUpdateClick: function () {
      this.loginInfo.type = 2;
      this.loginInfo.text = "修改密码";
    },
    onLoginClick: function (loginType) {
      let data = this.loginInfo.data;

      if (!data.email || !data.password) {
        this.$message.error(this.$appMsg.error[1007]);

        return;
      }

      this.$axios
        .post(
          this.$appApi.pvp.loginWebAccount + "&aid=" + loginType,
          this.$qs.stringify({
            name: data.name,
            email: data.email,
            password: this.$md5(data.password),
            newPassword: data.newPassword ? this.$md5(data.newPassword) : null,
            uin: data.uin,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.$message.success(this.$appMsg.success[1000]);

            this.$cookie.set("openId", data.openId, { expires: "1Y" });
            this.$cookie.set("accessToken", data.accessToken, {
              expires: "1Y",
            });

            setTimeout(() => {
              this.$router.go(-1);
            }, 500);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>
