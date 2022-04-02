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

    <div class="app-b0b345803bbcaebeb0bd65253594cfc9">
      <a-checkbox :checked="showInfo.checked" @change="onAgreeChange">
        我已经阅读并同意
        <a href="//www.yuque.com/jmglsi/pvp/yyxgbh#NPkLH" target="_blank">
          《隐私和数据声明》
        </a>
      </a-checkbox>
    </div>

    <div class="login-6920626369b1f05844f5e3d6f93b5f6e">
      <van-button
        round
        :disabled="
          (accessToken && loginInfo.type != 2) || !showInfo.checked
            ? true
            : false
        "
        size="small"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="
          loginInfo.data.email && loginInfo.data.password
            ? onLoginClick(loginInfo.type)
            : $message.error($appMsg.error[1007])
        "
        class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
        >{{ loginInfo.text }}</van-button
      >

      <div
        v-if="showInfo.checked && loginInfo.type == 1"
        class="login-411f660a2e7bb1558275b86749667ee9"
      >
        <Oauth
          :openId="openId"
          :accessToken="accessToken"
          :oauthList="loginInfo.oauthList"
        />
      </div>
    </div>

    <div
      v-if="loginInfo.type == 0"
      class="app-61046f2f5eefe3dc179e52af32241062"
    >
      <span class="app-e4c9479b11955648dad558fe717a4eb2">
        注:
        <br />1.信息是加密储存的
        <br />2.用户名和QQ将用于扩列、BP界面、找回密码，请不要瞎写
      </span>
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
import md5 from "js-md5";

export default {
  name: "LoginHome",
  components: {
    Oauth: () => import("@/components/User/Oauth.vue"),
  },
  data() {
    return {
      openId: "",
      accessToken: "",
      loginInfo: {
        type: 1,
        text: "登录",
        oauthList: [],
        data: {
          name: "",
          email: "",
          password: "",
          newPassword: "",
          uin: "",
          openId: "",
          accessToken: "",
        },
      },
      showInfo: {
        checked: false,
      },
    };
  },
  mounted() {
    this.openId = this.$cookie.get("openId") || "";
    this.accessToken = this.$cookie.get("accessToken") || "";

    if (this.$cookie.get("agree") == 1) {
      this.showInfo.checked = true;
    }

    if (this.accessToken) this.getWebAccountInfo(2);
  },
  methods: {
    onNavBarLeftClick: function () {
      if (this.loginInfo.type == 1) {
        this.$appPush({ path: "/my" });
      } else {
        this.loginInfo.type = 1;
        this.loginInfo.text = "登录";

        this.getWebAccountInfo(2);
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
            password: md5(data.password),
            newPassword: data.newPassword ? md5(data.newPassword) : "",
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

            this.$appDelectAllLocalStorage();

            this.$appPush({
              path: "/my",
              query: {
                refresh: 1,
              },
            });

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getWebAccountInfo: function (aid = 0) {
      this.$axios
        .post(this.$appApi.pvp.getWebAccountInfo + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.loginInfo.oauthList = data.oauthList;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onAgreeChange: function () {
      let nowChecked = false,
        nowChecked_int = 0;

      if (this.showInfo.checked == true) {
        nowChecked = false;
        nowChecked_int = 0;
      } else {
        nowChecked = true;
        nowChecked_int = 1;
      }

      this.showInfo.checked = nowChecked;
      this.$cookie.set("agree", nowChecked_int, {
        expires: "1Y",
      });
    },
  },
};
</script>

<style scoped lang="less">
i.my-c1d8fd0f00bccc16b2cf5d07bfc3c96f img.van-icon__image {
  border-radius: unset;
}

div.login-6920626369b1f05844f5e3d6f93b5f6e {
  margin-top: 32px;
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

div.login-411f660a2e7bb1558275b86749667ee9 {
  position: absolute;
  bottom: 150px;
  width: 100%;
}
</style>