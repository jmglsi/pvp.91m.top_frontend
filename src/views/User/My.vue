<template>
  <div class="my-home">
    <div v-if="isLogin == false" class="my-3d1d6b29e66d9b4f061e24a2551e2b67">
      <van-cell-group :border="false" title=" " class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell template #title>
          <van-button
            v-if="isLogin == false"
            round
            size="small"
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            @click="$router.push({path: '/login', query: { from: 'b1498f85b6e654f37af3901db4c13cc7' }})"
            class="my-0162f4b7b2dbdf6aff3a25de02e49a8b"
          >登录</van-button>
        </van-cell>
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-cd77c40b62763f6adf5598bce7fceede">
      <img
        width="100"
        height="100"
        v-lazy="loginInfo.img"
        class="my-d5ca322453f2986b752e58b11af83d96"
      />
      <div class="my-f9c7cabc13f359223ebc3ccf9cc104b8">
        <span
          class="my-25930e3036f13852cb0b29694bbab611 my-b068931cc450442b63f5b3d276ea4297"
        >{{ loginInfo.name }}</span>
        <span class="my-25930e3036f13852cb0b29694bbab611 my-293a35164a20c927b0fd61942fbc1cf2">
          <van-tag round :color="loginInfo.certification.color">{{ loginInfo.certification.text }}</van-tag>
        </span>
      </div>
    </div>

    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-grid v-if="isLogin" :border="false" :column-num="2">
        <van-grid-item icon="/img/app-icons/team.png" template #text>
          <div class="my-6e8737d4ac83f11c858de8bde0a6c52a">
            <span class="my-4646fa4296a7f5dea261e60e00ecd24b">{{ loginInfo.statistics.teamNum }}</span>
            <span class="my-7a33dbf09bb2e3ed21ecb1adf0cb37b4">支</span>
          </div>
        </van-grid-item>
        <van-grid-item icon="/img/app-icons/bp_data.png" to="/game/new/bp" template #text>
          <div class="my-6e8737d4ac83f11c858de8bde0a6c52a">
            <span class="my-4646fa4296a7f5dea261e60e00ecd24b">{{ loginInfo.statistics.labelNum }}</span>
            <span class="my-7a33dbf09bb2e3ed21ecb1adf0cb37b4">局</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group :border="false" title=" " class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell icon="friends-o" title="特别感谢" value="互相帮助过的伙伴们" is-link url="//doc.91m.top" />
        <van-cell icon="question-o" title="常见问题" value="自豪的使用语雀" is-link url="//doc.91m.top" />
        <van-cell
          icon="comment-o"
          title="意见/建议/咨询/交友"
          value="jmglsi (苏苏)"
          is-link
          url="//wpa.qq.com/msgrd?v=3&uin=947065098&site=qq&menu=yes"
        />
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-4cf71de630f99f4bf37ea1218fdab416">
      <van-cell-group :border="false" title=" " class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell template #title>
          <van-button
            v-if="isLogin"
            round
            size="small"
            color="rgb(245, 245, 245)"
            @click="onLogotClick"
            class="my-4236a440a662cc8253d7536e5aa17942"
          >退出登录</van-button>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="my-111fb4d92036323891a140cd49383f86">
      <van-cell-group :border="false">
        <van-cell
          title="沪ICP备16031287号-2"
          url="http://beian.miit.gov.cn"
          class="my-c0bdff9ec0fe8c0a83371c4573d7ecf4"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style>
div.my-7dc22b2c6a992f0232345df41303f5ea
  div.van-grid
  div.van-grid-item
  div.van-grid-item__content
  span.van-grid-item__text,
.my-4646fa4296a7f5dea261e60e00ecd24b {
  font-size: 20px;
}

button.my-4236a440a662cc8253d7536e5aa17942 span.van-button__text {
  color: red;
}
</style>

<style scoped>
.my-25930e3036f13852cb0b29694bbab611 {
  margin: 0 3px;
}

.my-b068931cc450442b63f5b3d276ea4297 {
  font-size: 10px;
}

.my-cd77c40b62763f6adf5598bce7fceede {
  margin-top: 35px;
  margin-bottom: 10px;
}

.my-d5ca322453f2986b752e58b11af83d96 {
  border-radius: 100%;
}

.my-f9c7cabc13f359223ebc3ccf9cc104b8 {
  margin-top: 20px;
}

.my-7a33dbf09bb2e3ed21ecb1adf0cb37b4 {
  margin-left: 5px;
}

.my-058928a73f2a944d621b028eb9addd36 {
  margin-top: -20px;
}

.my-7dc22b2c6a992f0232345df41303f5ea {
  text-align: left;
}

.my-c0bdff9ec0fe8c0a83371c4573d7ecf4 {
  font-size: 10px;
}
</style>

<script>
export default {
  name: "MyHome",
  data() {
    return {
      isLogin: false,
      loginInfo: {}
    };
  },
  mounted() {
    this.onLoginCheck();
  },
  methods: {
    onLoginCheck: function() {
      let openId = this.$cookie.get("openId");
      let accessToken = this.$cookie.get("accessToken");

      if (!openId || !accessToken) return;

      let postData = {
        openId: openId,
        accessToken: accessToken
      };

      this.axios
        .post(this.apiList.pvp.getWebAccountInfo, this.$qs.stringify(postData))
        .then(ret => {
          let data = ret.data.data;
          let status = ret.data.status;

          if (status.code == 200) {
            this.isLogin = true;
            this.loginInfo = data;
          } else {
            this.isLogin = false;
            this.$message.error(status.msg);
          }
        });
    },
    onLogotClick: function() {
      this.$dialog
        .confirm({
          title: "是否退出登录？"
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
    }
  }
};
</script>