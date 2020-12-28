<template>
  <div class="friends-home">
    <div class="friends-4b0f87c869518b7632257a1d66b8f9b8">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="$router.go(-1)"
        left-text="返回"
        z-index="99999999"
        class="friends-5d0a052a1d6ec891c70280ed2aad1d2a"
      >
        <template #title>
          <span
            class="friends-d64cb5ed2250938cb89d25beef75f604 friends-2a0906894c02a2995ccddcda771afab7"
            >{{ friendsInfo.name }}</span
          >
          <span
            class="friends-d64cb5ed2250938cb89d25beef75f604 friends-0a862f895f636cb1313fefe4eb09810f"
          >
            <van-tag
              round
              :color="friendsInfo.certification.color"
              class="friends-e14d426045f0bd910a6606a7a11122eb"
              @click="$message.info('提示:1015,更改称号需联系站长')"
              >{{ friendsInfo.certification.text }}</van-tag
            >
          </span>
        </template>
      </van-nav-bar>
    </div>

    <div class="app-d9833a1bc29f11d9ca39543dc46fcc58">
      <img
        v-lazy="friendsInfo.img"
        width="100"
        height="100"
        class="friends-85e06e092b46386f58023d2ad27a8bb0"
      />
      <div class="app-88bf7a95736562190270d51dc2cb3f42">
        {{ friendsInfo.description || "这个人很懒,什么都没有留下" }}
      </div>
    </div>

    <div class="friends-452abde170a4d98ca1ada465cac0eed5">
      <van-cell-group
        :border="false"
        title=""
        class="friends-7cb42f1ecb1c02ca1d3e65083e3c4f8f"
      >
        <van-cell
          v-if="friendsInfo"
          title="王者荣耀"
          icon="/img/game-icons/king.png"
          class="app-icon_ex-3079036920f9bee746cf7baffffb950b"
        >
          <template #right-icon>
            <span class="friends-012c09cef7751ec30c771ff22eafb10a">
              <img
                v-lazy="
                  friendsInfo.rank.starIcon ||
                  '//camp.qq.com/battle/profile/roleJob/1.png'
                "
                width="50"
                height="50"
              /><span class="app-dac41b9450b77c3eb0ab7d8428d004f5">|</span>
              <span class="friends-df5aabe3c98f0d4b148fc34c3aab05a8">{{
                friendsInfo.rank.score || 1200
              }}</span></span
            >
          </template>
        </van-cell>
        <van-cell
          title="喜欢列表"
          icon="/img/app-icons/hero_black.png"
          class="app-icon_ex-3079036920f9bee746cf7baffffb950b"
        >
          <template #right-icon>
            <ul
              class="app-d865b50ce307751bdeb9a6ab16e7baf9 app-9e60d3ee1e1574cae90960f940c0a821"
              :style="
                friendsInfo.heroList.length <= 3 ? {} : { width: '180px' }
              "
            >
              <li
                v-for="(data, index) in friendsInfo.heroList"
                :key="'app-56bc526c61d7296b48276b2203da4c49-' + index"
                class="app-1951b6e7c82938dd7446a41e829b247b"
                @click="appPush({ path: '/hero/' + data.id + '/info' })"
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
              v-if="friendsInfo.heroList.length == 0"
              class="friends-d1dc130fa38d505fefbe9810d4790c8f"
              >未设置</span
            >
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="friends-6a9bb439b8da049564b7efb8aa9060d1">
      <van-button
        round
        icon="replay"
        type="primary"
        size="small"
        @click="getWebAccountInfo(1)"
        >刷新</van-button
      >
      &nbsp;
      <van-button
        round
        icon="description"
        type="info"
        size="small"
        @click="onCopyInfoClick(friendsInfo.name, friendsInfo.uin)"
        >复制QQ</van-button
      >
    </div>

    <AppBottomTabbar height="100" />
  </div>
</template>

<style>
@import url("/css/app-style/user-friends.css");
</style>

<script>
export default {
  name: "FriendsHome",
  components: {
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  mounted() {
    this.getWebAccountInfo(0);
  },
  data() {
    return {
      friendsInfo: {
        name: "苏苏",
        uin: 50371140,
        img: "//q.qlogo.cn/headimg_dl?dst_uin=50371140&spec=640",
        certification: {
          color: "",
          text: "",
        },
        rank: {
          type: 1,
          score: 0,
        },
        heroList: [],
      },
    };
  },
  methods: {
    getWebAccountInfo: function (tips, aid = 1) {
      let openId = this.$route.query.openId,
        postData;

      tips == 0 ? (postData = { friendsOpenId: openId }) : (postData = {});

      this.axios
        .post(
          this.apiList.pvp.getWebAccountInfo + "&aid=" + aid,
          this.$qs.stringify(postData)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.friendsInfo = data;

            if (tips == 1) this.$message.success("刷新成功");

            if (postData != {} && data.openId != openId) {
              this.appPush({
                path: "/friends",
                query: { openId: data.openId },
              });
            }
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onCopyInfoClick: function (name, uin) {
      this.copyData = "用户名:" + name + "\rQQ:" + uin;
      this.appCopyData(this.copyData);
    },
  },
};
</script>
