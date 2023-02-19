<template>
  <div class="friends-home">
    <div class="friends-4b0f87c869518b7632257a1d66b8f9b8">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="$appPushBack()"
        :left-text="$t('nav-bar.left-text')"
        class="friends-5d0a052a1d6ec891c70280ed2aad1d2a"
      >
        <template #title>
          <span
            class="
              friends-d64cb5ed2250938cb89d25beef75f604
              friends-2a0906894c02a2995ccddcda771afab7
            "
            >&lt;{{ $appColumnsInfo.areaType[friendsInfo.areaType] }}&gt;</span
          >
          <span
            class="
              friends-d64cb5ed2250938cb89d25beef75f604
              friends-2a0906894c02a2995ccddcda771afab7
            "
          >
            {{ friendsInfo.name }}
          </span>
          <span
            class="
              friends-d64cb5ed2250938cb89d25beef75f604
              friends-0a862f895f636cb1313fefe4eb09810f
            "
          >
            <van-tag
              round
              :color="friendsInfo.certification.color"
              class="friends-e14d426045f0bd910a6606a7a11122eb"
              @click="$message.info($appMsg.info[1003])"
            >
              {{ friendsInfo.certification.text }}
            </van-tag>
          </span>
        </template>
      </van-nav-bar>
    </div>

    <div
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-10px' }
          : { marginTop: '40px' }
      "
    >
      <img
        v-lazy="friendsInfo.img"
        width="100"
        height="100"
        class="app-3b9655ab218c7f1a18f5dacd778a52f0"
      />
      <div class="app-88bf7a95736562190270d51dc2cb3f42">
        {{ friendsInfo.description || "这个人很懒，什么都没有留下" }}
      </div>
    </div>

    <div class="friends-452abde170a4d98ca1ada465cac0eed5">
      <van-cell-group
        :border="false"
        class="friends-7cb42f1ecb1c02ca1d3e65083e3c4f8f"
      >
        <van-cell
          v-if="friendsInfo"
          title="王者荣耀"
          icon="/img/game-icons/king.png"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        >
          <template #right-icon>
            <span class="friends-012c09cef7751ec30c771ff22eafb10a">
              <img v-lazy="friendsInfo.rank.starIcon" width="50" height="50" />
              <span class="app-dac41b9450b77c3eb0ab7d8428d004f5">|</span>
              <span class="friends-df5aabe3c98f0d4b148fc34c3aab05a8">
                {{ friendsInfo.rank.score }}
              </span>
            </span>
          </template>
        </van-cell>
        <van-collapse v-model="collapseInfo.model" :border="false">
          <van-collapse-item
            icon="/img/app-icons/hero_black.png"
            title="关注列表"
            value="快速访问"
            icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
            name="1"
          >
            <div
              v-if="friendsInfo.heroList.length > 0"
              class="app-c1351782c9c93025d72864180d0cf28c"
            >
              <ul
                class="
                  app-d865b50ce307751bdeb9a6ab16e7baf9
                  app-9e60d3ee1e1574cae90960f940c0a821
                "
              >
                <li
                  v-for="(data, index) in friendsInfo.heroList"
                  :key="'app-56bc526c61d7296b48276b2203da4c49-' + index"
                  class="app-1951b6e7c82938dd7446a41e829b247b"
                  @click="$appPush({ path: '/hero/' + data.id + '/info' })"
                >
                  <div :style="{ position: 'relative' }">
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
                      width="50"
                      height="35"
                      class="app-d31cb1c15b091f41248935d88a8d0a45"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-else
              @click="$message.info($appMsg.info[1015])"
              class="app-5ddd8715c99cbf00677a622145b3c163"
            >
              未设置
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </div>

    <div
      class="
        friends-6a9bb439b8da049564b7efb8aa9060d1
        app-52b0e5c90604d59d1814f184d58e2033
      "
    >
      <van-button
        round
        icon="replay"
        color="#000000"
        size="mini"
        @click="getWebAccountInfo(1, 1)"
      >
        {{ $t("refresh") }}
      </van-button>
      &nbsp;
      <van-button
        round
        icon="chat-o"
        type="info"
        size="mini"
        @click="onFriendsCopy(friendsInfo.name, friendsInfo.uin)"
      >
        CPDD
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendsHome",
  data() {
    return {
      copyData: "",
      friendsInfo: {
        name: "苏苏",
        uin: 50371140,
        img: "//q.qlogo.cn/headimg_dl?dst_uin=50371140&spec=640",
        certification: {
          color: "",
          text: "",
        },
        heroList: [],
        areaType: 1,
        rank: {
          starType: 7,
          starIcon: "//camp.qq.com/battle/profile/roleJobV2/1.png",
          score: 1200,
        },
      },
      collapseInfo: {
        model: ["1"],
      },
    };
  },
  mounted() {
    this.getWebAccountInfo(0, 1);
  },
  methods: {
    getWebAccountInfo: function (tipsType, aid = 1) {
      let postData = {},
        q = this.$route.query,
        openId = q.openId || "";

      tipsType == 0 ? (postData = { friendsOpenId: openId }) : (postData = {});

      this.$axios
        .post(
          this.$appApi.pvp.getWebAccountInfo + "&aid=" + aid,
          this.$qs.stringify(postData)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.friendsInfo = data;

            if (postData != {} && data.openId != openId) {
              this.$appPush({
                query: { openId: data.openId },
              });
            }
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onFriendsCopy: function (name, uin) {
      this.copyData = "用户名:" + name + "\nQQ:" + uin + "\n-\n" + location;

      this.$appCopyData(this.copyData);
    },
  },
};
</script>

<style lang="less">
span.friends-d64cb5ed2250938cb89d25beef75f604 {
  margin: 0 3px;
}

span.friends-2a0906894c02a2995ccddcda771afab7 {
  font-size: 12px;
}

span.friends-012c09cef7751ec30c771ff22eafb10a {
  position: absolute;
  right: 30px;
  top: -5px;
}

div.friends-6a9bb439b8da049564b7efb8aa9060d1 {
  margin-top: 25px;
}

div.friends-452abde170a4d98ca1ada465cac0eed5 {
  text-align: @app-text-align;
}
</style>