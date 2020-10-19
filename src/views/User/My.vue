<template>
  <div class="login-home">
    <div v-show="isLogin == false" class="my-3d1d6b29e66d9b4f061e24a2551e2b67">
      <van-cell-group
        :border="false"
        title=" "
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell>
          <template #title>
            <van-button
              round
              size="small"
              color="linear-gradient(to right, #4bb0ff, #6149f6)"
              @click="appPush('/login')"
              class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
              >登录</van-button
            >
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-cd77c40b62763f6adf5598bce7fceede">
      <img
        v-lazy="loginInfo.img"
        width="100"
        height="100"
        class="my-d5ca322453f2986b752e58b11af83d96"
      />
      <div class="my-f9c7cabc13f359223ebc3ccf9cc104b8">
        <span
          class="my-25930e3036f13852cb0b29694bbab611 my-b068931cc450442b63f5b3d276ea4297"
          >{{ loginInfo.name }}</span
        >
        <span
          class="my-25930e3036f13852cb0b29694bbab611 my-293a35164a20c927b0fd61942fbc1cf2"
        >
          <van-tag
            round
            :color="loginInfo.certification.color"
            class="my-7eaa86d23ffacfb49464ee78252aa43a"
            @click="$message.warning('警告:1004,联系站长更改 (lll￢ω￢)')"
            >{{ loginInfo.certification.text }}</van-tag
          >
        </span>
      </div>
    </div>

    <div v-if="isLogin" class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-grid
        :border="false"
        :column-num="2"
        class="my-c3d90961c9bf155d11cbef9c57725aea"
      >
        <van-grid-item
          icon="/img/app-icons/team.png"
          to="/game/team"
          class="my-7409cbd9b549064c9b5ea3ab21ee3ac6"
        >
          <template #text>
            <div class="my-6e8737d4ac83f11c858de8bde0a6c52a">
              <span class="my-4646fa4296a7f5dea261e60e00ecd24b">{{
                loginInfo.statistics.team
              }}</span>
              <span class="my-7a33dbf09bb2e3ed21ecb1adf0cb37b4">支</span>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item
          icon="/img/app-icons/engage.png"
          to="/game/engage"
          class="my-308ffde0dc5bd5718dcf0396fcc2a596"
        >
          <template #text>
            <div class="my-6e8737d4ac83f11c858de8bde0a6c52a">
              <span class="my-4646fa4296a7f5dea261e60e00ecd24b">{{
                loginInfo.statistics.label
              }}</span>
              <span class="my-7a33dbf09bb2e3ed21ecb1adf0cb37b4">局</span>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell
          icon="friends-o"
          title="特别感谢"
          value="互相帮助过的伙伴们"
          is-link
          @click="appOpenUrl('是否打开外部链接?', null, url.friends)"
        />
        <van-cell
          icon="question-o"
          title="常见问题"
          value="自豪的使用语雀"
          is-link
          @click="appOpenUrl('是否打开外部链接?', null, url.question)"
        />
        <van-cell
          icon="comment-o"
          title="意见/建议/咨询/交友"
          value="jmglsi (苏苏)"
          is-link
          @click="appOpenUrl('是否打开外部链接?', null, url.comment)"
        />
      </van-cell-group>
    </div>

    <div v-show="isLogin" class="my-4cf71de630f99f4bf37ea1218fdab416">
      <van-cell-group
        :border="false"
        title=" "
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell>
          <template #title>
            <van-button
              round
              size="small"
              color="rgb(245,245,245)"
              @click="onLogotClick"
              class="app-4236a440a662cc8253d7536e5aa17942"
              >退出登录</van-button
            >
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="my-111fb4d92036323891a140cd49383f86">
      <van-cell-group
        :border="false"
        class="my-b990d992f06c8db21d6b58c25f843529"
      >
        <van-cell
          title="沪ICP备16031287号-2"
          @click="appOpenUrl('是否打开外部链接?', null, url.beian)"
          class="my-c0bdff9ec0fe8c0a83371c4573d7ecf4"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/user.css");
</style>

<script>
export default {
  name: "MyHome",
  data() {
    return {
      loginInfo: {},
      isLogin: false,
      url: {
        friends: "//doc.91m.top",
        question: "//doc.91m.top",
        comment: "//wpa.qq.com/msgrd?v=3&uin=947065098&site=qq&menu=yes",
        beian: "http://beian.miit.gov.cn",
      },
    };
  },
  mounted() {
    let openId = this.$cookie.get("openId"),
      accessToken = this.$cookie.get("accessToken");

    this.onLoginCheck(openId, accessToken);
  },
  methods: {
    onLoginCheck: function (openId, accessToken) {
      if (!openId || !accessToken) return;

      this.axios
        .post(
          this.apiList.pvp.getWebAccountInfo,
          this.$qs.stringify({
            openId: openId,
            accessToken: accessToken,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.isLogin = true;
            this.loginInfo = data;
          } else {
            this.isLogin = false;
            this.$message.error(status.msg);
          }
        });
    },
    onLogotClick: function () {
      this.$dialog
        .confirm({
          title: "是否退出登录？",
        })
        .then(() => {
          // on confirm
          this.$cookie.delete("openId");
          this.$cookie.delete("accessToken");
          this.isLogin = false;
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>