<template>
  <div class="login-home">
    <div class="login-9ffe6c014e6f06f1c218fde0ca3fc4ef">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="onNavBarLeftClick"
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
      <van-cell-group
        :border="false"
        class="login-5e8eee748a3d14d6a380448d6d61a9cf"
      >
        <van-field
          v-model="loginInfo.data.name"
          v-if="loginInfo.type == 0"
          left-icon="/img/icons-app/user.png"
          placeholder="请输入用户名 (仅支持中英文数字)"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-field
          v-model="loginInfo.data.email"
          left-icon="/img/icons-app/email.png"
          placeholder="请输入邮箱"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-field
          v-model="loginInfo.data.code"
          v-if="loginInfo.type == 3"
          left-icon="/img/icons-app/captcha.png"
          placeholder="请输入验证码"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        >
          <template #button>
            <div class="login-0864d16c299765901bd0de98e61b5039">
              <van-button
                round
                :disabled="loginInfo.code.disable"
                size="small"
                type="primary"
                @click="onSendCode"
              >
                {{ loginInfo.code.text }}
              </van-button>
            </div>
          </template>
        </van-field>
        <van-field
          v-model="loginInfo.data.password"
          v-if="loginInfo.type < 2"
          type="password"
          left-icon="/img/icons-app/password_lock.png"
          placeholder="请输入密码"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-field
          v-model="loginInfo.data.newPassword"
          v-if="loginInfo.type == 3"
          type="password"
          left-icon="/img/icons-app/password_lock.png"
          placeholder="请输入新密码"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-field
          v-model="loginInfo.data.uin"
          v-if="loginInfo.type == 0"
          left-icon="/img/icons-app/qq.png"
          placeholder="联系 QQ"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
      </van-cell-group>
    </div>

    <div class="login-6920626369b1f05844f5e3d6f93b5f6e">
      <van-button
        round
        :disabled="
          (loginInfo.type == 3 && loginInfo.data.code.length != 6) ||
          (accessToken && loginInfo.type < 2) ||
          !$appConfigInfo.appInfo.isReadme ||
          !showInfo.loginButton
            ? true
            : false
        "
        size="small"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="
          loginInfo.data.email
            ? onLoginClick(loginInfo.type)
            : $message.error($appMsg.error[1007])
        "
        class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
      >
        {{ loginInfo.text }}
      </van-button>

      <div
        v-if="$appConfigInfo.appInfo.isReadme == 1 && loginInfo.type == 1"
        class="login-411f660a2e7bb1558275b86749667ee9"
      >
        <UserOauth
          :openId="openId"
          :accessToken="accessToken"
          :redirect="redirect"
          :oauthInfo="loginInfo.oauthInfo"
        />
      </div>
    </div>

    <div
      v-if="loginInfo.type == 0"
      class="app-61046f2f5eefe3dc179e52af32241062"
    >
      <span class="app-e4c9479b11955648dad558fe717a4eb2">
        <p>注:</p>
        <p>1.信息是加密储存的</p>
        <p>2.用户名 和 QQ 将用于扩列、BP界面、找回密码，请不要瞎写</p>
      </span>
    </div>

    <div
      class="login-f01ae8c7f2d058ec6be00db589a32bea login-60ae25445ac62d5ec51c776826888d9f"
    >
      <span @click="onRegisterClick">{{ $t("my.register") }}</span>
    </div>

    <div
      class="login-f01ae8c7f2d058ec6be00db589a32bea login-4ae1ffb5939d592986bed21d0913562d"
    >
      <span @click="onUpdateClick">{{ $t("my.forget") }}</span>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  name: "userLogin",
  components: {
    UserOauth: () => import("@/components/User/Oauth.vue"),
  },
  data() {
    return {
      openId: "",
      accessToken: "",
      redirect: "",
      sendCode: "",
      loginInfo: {
        type: 1,
        text: this.$t("my.login"),
        oauthInfo: [],
        code: {
          disable: false,
          text: "发送验证码",
          timeout: 60,
        },
        data: {
          name: "",
          email: "",
          code: "",
          password: "",
          newPassword: "",
          uin: "",
          openId: "",
          accessToken: "",
        },
      },
      showInfo: {
        loginButton: true,
      },
    };
  },
  mounted() {
    let q = this.$route.query;

    this.openId = this.$cookie.get("openId") || "";
    this.accessToken = this.$cookie.get("accessToken") || "";
    this.redirect = q.redirect || "";

    if (this.accessToken) this.getWebAccountInfo(2);
  },
  methods: {
    getWebAccountInfo: function (aid = 0) {
      this.$axios
        .post(this.$appApi.app.getWebAccountInfo + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.loginInfo.oauthInfo = data.oauthInfo;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onNavBarLeftClick: function () {
      if (this.loginInfo.type == 1) {
        this.$appBack();
      } else {
        this.loginInfo.type = 1;
        this.loginInfo.text = this.$t("my.login");

        this.getWebAccountInfo(2);
      }
    },
    onRegisterClick: function () {
      this.loginInfo.type = 0;
      this.loginInfo.text = this.$t("my.register");
    },
    onSendCode: function () {
      let timeout = this.loginInfo.code.timeout,
        data = this.loginInfo.data;

      if (this.sendCode) {
        clearInterval(this.sendCode);
      }

      this.$axios
        .post(
          this.$appApi.app.loginWebAccount + "&aid=2",
          this.$qs.stringify({
            email: data.email,
            code: data.code,
            newPassword: data.newPassword ? md5(data.newPassword) : "",
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success(this.$appMsg.success[1004]);
          } else {
            this.$message.error(status.msg);
          }
        });

      this.loginInfo.code.disable = false;
      this.sendCode = setInterval(() => {
        timeout--;

        this.loginInfo.code.text = timeout;

        if (timeout == 0) {
          clearInterval(this.sendCode);

          this.loginInfo.code.disable = false;
          this.loginInfo.code.text = "发送验证码";

          return;
        }
      }, 1000);

      //this.loginInfo.type = 2;
      this.loginInfo.code.disable = true;
      this.loginInfo.code.text = "正在发送..";
    },
    onUpdateClick: function () {
      this.loginInfo.type = 3;
      this.loginInfo.text = this.$t("my.change");
    },
    onLoginClick: function (loginType) {
      let q = this.$route.query,
        data = this.loginInfo.data;

      this.showInfo.loginButton = false;

      this.$axios
        .post(
          this.$appApi.app.loginWebAccount + "&aid=" + loginType,
          this.$qs.stringify({
            name: data.name,
            email: data.email,
            code: data.code,
            password: data.password ? md5(data.password) : "",
            newPassword: data.newPassword ? md5(data.newPassword) : "",
            uin: data.uin,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.$cookie.set("openId", data.openId, { expires: "1M" });
            this.$cookie.set("accessToken", data.accessToken, {
              expires: "1M",
            });
            this.$cookie.set("name", data.name, { expires: "1M" });

            this.$appDelectAllLocalStorage();

            this.$appPush({
              path: q.redirect || "/my",
              query: {
                refresh: 1,
              },
            });

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }

          setTimeout(() => {
            this.showInfo.loginButton = true;
          }, 1000);
        });
    },
  },
};
</script>

<style scoped lang="less">
i.my-c1d8fd0f00bccc16b2cf5d07bfc3c96f {
  img.van-icon__image {
    border-radius: unset;
  }
}

div.login-6920626369b1f05844f5e3d6f93b5f6e {
  margin-top: 32px;
}

div.login-f01ae8c7f2d058ec6be00db589a32bea {
  bottom: 50px;
  position: absolute;
}

div.login-60ae25445ac62d5ec51c776826888d9f {
  color: #1989fa !important;
  left: 25px;
}

div.login-4ae1ffb5939d592986bed21d0913562d {
  color: red !important;
  right: 25px;
}

div.login-411f660a2e7bb1558275b86749667ee9 {
  bottom: 150px;
  position: absolute;
  width: 100%;
}

div.login-0864d16c299765901bd0de98e61b5039 {
  position: absolute;
  height: 25px;
  right: 0;
  margin-top: -17px;
}
</style>