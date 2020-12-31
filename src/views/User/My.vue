<template>
  <div class="login-home">
    <div class="my-8e35828097179076a177cfd25e3713db">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        z-index="99999999"
      >
        <template #title>
          <div v-if="isLogin" class="my-f9c7cabc13f359223ebc3ccf9cc104b8">
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
                @click="$message.info('提示:1015,称号联系站长更改')"
                >{{ loginInfo.certification.text }}</van-tag
              >
            </span>
          </div>
        </template>
      </van-nav-bar>
    </div>

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
              @click="appPush({ path: '/login' })"
              class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
              >注册/登录</van-button
            >
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="app-d9833a1bc29f11d9ca39543dc46fcc58">
      <img
        v-lazy="loginInfo.img"
        width="100"
        height="100"
        class="my-d5ca322453f2986b752e58b11af83d96"
        @click="
          appPush({
            path: '/friends',
            query: { openId: loginInfo.openId },
          })
        "
      />
      <div class="app-88bf7a95736562190270d51dc2cb3f42">
        {{ loginInfo.description || "这个人很懒,什么都没有留下" }}
      </div>
    </div>

    <div v-if="isLogin" class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=""
        class="my-71c2fb64c38e4ee108607ca840607e48"
      >
        <van-cell
          icon="/img/app-icons/game.png"
          title="全局BP模拟器"
          value="使用说明"
          class="app-icon_ex-3079036920f9bee746cf7baffffb950b"
          is-link
          @click="appOpenUrl('是否打开外部链接?', null, { path: url.globalBP })"
        />
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
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=""
        class="my-abf7b3191e2a24c6fc3c008124bcf0d4"
      >
        <van-cell
          title="王者荣耀"
          icon="/img/game-icons/king.png"
          class="app-icon_ex-3079036920f9bee746cf7baffffb950b"
        >
          <template #right-icon>
            <span class="my-af99c9298d1eb69981a035d0a15afa20"
              ><img
                v-lazy="loginInfo.rank.starIcon"
                width="50"
                height="50"
              /><span class="app-dac41b9450b77c3eb0ab7d8428d004f5">|</span>
              <span class="my-7121ba1bc1276c3bb6df96b333a16760">{{
                loginInfo.rank.score
              }}</span></span
            >
          </template>
        </van-cell>
        <van-cell
          icon="/img/app-icons/hero_black.png"
          class="app-icon_ex-3079036920f9bee746cf7baffffb950b"
        >
          <template #title>
            <span
              class="my-1098203f6e0a3a981da7c9a8cd6bc85b"
              @click="
                $message.info('提示:1014,请在英雄详情界面喜欢/取消喜欢。')
              "
              >喜欢列表</span
            >
          </template>
          <template #right-icon>
            <ul
              class="app-d865b50ce307751bdeb9a6ab16e7baf9 app-9e60d3ee1e1574cae90960f940c0a821"
              :style="loginInfo.heroList.length <= 3 ? {} : { width: '180px' }"
            >
              <li
                v-for="(data, index) in loginInfo.heroList"
                :key="'app-56bc526c61d7296b48276b2203da4c49-' + index"
                class="app-1951b6e7c82938dd7446a41e829b247b"
              >
                <img
                  v-lazy="
                    '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                    data.id +
                    '/' +
                    data.id +
                    '.jpg'
                  "
                  width="35"
                  height="35"
                  class="app-4ab161130e76571ab0c31aa23a6238c7"
                  @click="appPush({ path: '/hero/' + data.id + '/info' })"
                />
                <img
                  v-if="data.fightPowerIcon"
                  v-lazy="data.fightPowerIcon"
                  width="25"
                  height="25"
                  class="app-d31cb1c15b091f41248935d88a8d0a45"
                />
              </li>
            </ul>
            <span
              v-show="loginInfo.heroList.length == 0"
              class="my-65d7dd3f74769ce2ba0009e9eb25c675"
              @click="
                $message.info('提示:1014,请在英雄详情界面喜欢/取消喜欢。')
              "
              >未设置</span
            >
          </template>
        </van-cell>
        <van-cell icon="friends">
          <template #title>
            <span class="my-94251204a6d395ca9fccad5eabe50b6c">扩列交友</span>
            <div class="app-2f4ffa86e6dacd562859288aa6f4cad4">
              打开别人就能找到您辣~
            </div>
          </template>
          <template #right-icon>
            <span class="my-b60541e817018d568a58a70d5db7fb65"
              ><van-switch v-model="showInfo.friendsType" /></span></template
        ></van-cell>
        <van-cell
          icon="manager"
          title="扩列链接"
          value="点击复制"
          is-link
          @click="onCopyLinkClick"
        />
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="my-66e3a8a1303fb1fc8ce3249b23dbd268"
      >
        <van-cell
          title="修改密码"
          icon="/img/app-icons/password_edit.png"
          class="app-icon_ex-3079036920f9bee746cf7baffffb950b"
          is-link
          @click="appPush({ path: '/login' })"
        />
      </van-cell-group>
    </div>

    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell
          icon="question-o"
          title="感谢伙伴们"
          value="自豪的使用语雀"
          is-link
          @click="appOpenUrl('是否打开外部链接?', null, { path: url.friends })"
        />
        <van-cell
          icon="comment-o"
          title="意见/建议/咨询/交友"
          value="jmglsi (苏苏)"
          is-link
          @click="appOpenUrl('是否打开外部链接?', null, { path: url.comment })"
        />
      </van-cell-group>
    </div>

    <div v-show="isLogin" class="my-4cf71de630f99f4bf37ea1218fdab416">
      <van-cell-group
        :border="false"
        title=""
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell>
          <template #title>
            <van-button
              round
              size="small"
              color="rgb(245,245,245)"
              @click="onLogoutClick"
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
        title=""
        class="my-b990d992f06c8db21d6b58c25f843529"
      >
        <van-cell
          title="沪ICP备16031287号-2"
          @click="appOpenUrl('是否打开外部链接?', null, { path: url.beian })"
          class="my-c0bdff9ec0fe8c0a83371c4573d7ecf4"
        />
      </van-cell-group>
    </div>

    <AppBottomTabbar height="100" />
  </div>
</template>

<style>
@import url("/css/app-style/user-my.css");
</style>

<script>
export default {
  name: "MyHome",
  components: {
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  data() {
    return {
      loginInfo: {
        certification: {
          color: "",
          text: "",
        },
        heroList: [],
      },
      isLogin: false,
      url: {
        globalBP: "//www.yuque.com/jmglsi/pvp/gbpl91",
        friends: "//doc.91m.top/jmglsi/pvp",
        comment: "//wpa.qq.com/msgrd?v=3&uin=947065098&site=qq&menu=yes",
        beian: "http://beian.miit.gov.cn",
      },
      showInfo: {
        friendsType: true,
      },
    };
  },
  mounted() {
    this.getWebAccountInfo();
  },
  methods: {
    getWebAccountInfo: function (aid = 0) {
      this.axios
        .post(this.apiList.pvp.getWebAccountInfo + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.isLogin = true;
            this.loginInfo = data;

            data.friendsType == 1
              ? (this.showInfo.friendsType = true)
              : (this.showInfo.friendsType = false);
          } else {
            this.isLogin = false;
          }
        });
    },
    onCopyLinkClick: function () {
      this.appCopyData(
        location.origin + "/friends?openId=" + this.loginInfo.openId
      );
    },
    onLogoutClick: function () {
      this.$dialog
        .confirm({
          title: "是否退出登录？",
        })
        .then(() => {
          // on confirm
          this.isLogin = false;

          this.$cookie.delete("openId");
          this.$cookie.delete("accessToken");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
