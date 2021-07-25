<template>
  <div class="login-home">
    <div class="login-9ffe6c014e6f06f1c218fde0ca3fc4ef">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="onNavBarLeftClick"
        left-text="返回"
        z-index="99999999"
        class="login-f921d5768e1eb9ca4fe4e6b4692622e6"
      />
    </div>

    <div
      class="login-2a642626758deefdc2989a73aae823d3"
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
    >
      <van-cell-group class="login-5e8eee748a3d14d6a380448d6d61a9cf">
        <van-field
          v-model="loginInfo.data.name"
          v-if="loginInfo.type == 0"
          left-icon="/img/app-icons/user.png"
          placeholder="请输入用户名 (仅支持中英文数字)"
          icon-prefix="login-e71832eb64a3978b00a7d37f407b158e"
        />
        <van-field
          v-model="loginInfo.data.email"
          left-icon="/img/app-icons/email.png"
          placeholder="请输入邮箱"
          icon-prefix="login-e71832eb64a3978b00a7d37f407b158e app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-field
          v-model="loginInfo.data.password"
          type="password"
          left-icon="/img/app-icons/password_lock.png"
          placeholder="请输入密码"
          icon-prefix="login-e71832eb64a3978b00a7d37f407b158e app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-field
          v-model="loginInfo.data.newPassword"
          v-if="loginInfo.type == 2"
          type="password"
          left-icon="/img/app-icons/password_lock.png"
          placeholder="请输入新密码"
          icon-prefix="login-e71832eb64a3978b00a7d37f407b158e app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-field
          v-model="loginInfo.data.uin"
          v-if="loginInfo.type == 0"
          left-icon="/img/app-icons/qq.png"
          placeholder="请输入QQ"
          icon-prefix="login-e71832eb64a3978b00a7d37f407b158e app-6de102c0bc4dc7f72ce287d6b0828052"
        />
      </van-cell-group>
    </div>

    <div class="login-6920626369b1f05844f5e3d6f93b5f6e">
      <van-button
        round
        size="small"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="
          loginInfo.data.email && loginInfo.data.password
            ? onLoginClick(loginInfo.type)
            : $message.error($appMsg.error[1007])
        "
        class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
      >
        {{ loginInfo.text }}
      </van-button>

      <div>
        <Oauth />
      </div>
    </div>

    <div
      v-if="loginInfo.type == 0"
      class="app-61046f2f5eefe3dc179e52af32241062"
    >
      <span class="app-e4c9479b11955648dad558fe717a4eb2">
        注:
        <br />1.信息是加密储存的
        <br />2.用户名和QQ将用于扩列、BP界面、找回密码,请不要瞎写
      </span>
    </div>

    <div class="login-ae64b9ce80d3b20870647479c735eeb0">
      <div
        @click="
          $appPush({
            path: '/search',
            query: { q: '大佬们快来加群', refresh: 1 },
          })
        "
        class="login-2707770f6b9a7f3321a020d1bcd5dd9d"
      >
        <img
          src="//pub.idqqimg.com/wpa/images/group.png"
          alt="游戏群"
          title="游戏群"
          class="login-414c54d9374ac490e9773a8c5f357427"
        />
      </div>
    </div>

    <div
      class="
        login-f01ae8c7f2d058ec6be00db589a32bea
        login-60ae25445ac62d5ec51c776826888d9f
      "
    >
      <span @click="onRegisterClick">注册</span>
    </div>

    <div
      class="
        login-f01ae8c7f2d058ec6be00db589a32bea
        login-4ae1ffb5939d592986bed21d0913562d
      "
    >
      <span @click="onUpdateClick">修改密码</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginHome",
  components: {
    Oauth: () => import("@/views/User/Oauth.vue"),
  },
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
    onNavBarLeftClick: function () {
      if (this.loginInfo.type == 1) {
        this.$appPush({ path: "/my" });
      } else {
        this.loginInfo.type = 1;
        this.loginInfo.text = "登录";
      }
    },
    onRegisterClick: function () {
      this.loginInfo.type = 0;
      this.loginInfo.text = "注册";
    },
    onUpdateClick: function () {
      this.loginInfo.type = 2;
      this.loginInfo.text = "修改密码";
    },
    onLoginClick: function (loginType) {
      let data = this.loginInfo.data;

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
            this.$cookie.set("openId", data.openId, { expires: "7D" });
            this.$cookie.set("accessToken", data.accessToken, {
              expires: "7D",
            });

            this.$appDelectCache("ranking");
            this.$appDelectCache("heroInfo");
            this.$appDelectCache("charts");

            setTimeout(() => {
              this.$router.go(-1);
            }, 500);

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
img.login-414c54d9374ac490e9773a8c5f357427,
i.my-c1d8fd0f00bccc16b2cf5d07bfc3c96f img.van-icon__image {
  border-radius: unset;
}

div.login-6920626369b1f05844f5e3d6f93b5f6e {
  margin-top: 25px;
}

div.login-ae64b9ce80d3b20870647479c735eeb0 {
  position: absolute;
  bottom: 100px;
  width: 100%;
}

div.login-f01ae8c7f2d058ec6be00db589a32bea {
  bottom: 50px;
  position: absolute;
}

div.login-60ae25445ac62d5ec51c776826888d9f {
  color: #1989fa;
  left: 25px;
}

div.login-4ae1ffb5939d592986bed21d0913562d {
  color: red;
  right: 25px;
}
</style>