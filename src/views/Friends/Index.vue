<template>
  <div class="friends-home">
    <div class="friends-4b0f87c869518b7632257a1d66b8f9b8">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
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

    <div class="friends-d9833a1bc29f11d9ca39543dc46fcc58">
      <img
        v-lazy="friendsInfo.img"
        width="100"
        height="100"
        class="friends-85e06e092b46386f58023d2ad27a8bb0"
      />
      <div class="friends-88bf7a95736562190270d51dc2cb3f42">
        {{ friendsInfo.description || "这个人很懒，什么都没有留下。" }}
      </div>
    </div>

    <div class="friends-452abde170a4d98ca1ada465cac0eed5">
      <van-cell-group
        :border="false"
        title=" "
        class="friends-7cb42f1ecb1c02ca1d3e65083e3c4f8f"
      >
        <van-cell
          v-if="friendsInfo"
          icon="/img/game-icons/king.png"
          title="王者荣耀"
        >
          <template #right-icon>
            <span class="friends-012c09cef7751ec30c771ff22eafb10a">
              <img
                width="50"
                height="50"
                v-lazy="
                  '//camp.qq.com/battle/profile/roleJob/' +
                  friendsInfo.rank.type +
                  '.png'
                "
              />&nbsp;<span class="friends-2ba06b14345c9a61cff15b7f4e3c44dd"
                >|</span
              >&nbsp;
              <span class="friends-df5aabe3c98f0d4b148fc34c3aab05a8">{{
                friendsInfo.rank.score
              }}</span></span
            >
          </template>
        </van-cell>
        <van-cell icon="/img/app-icons/hero_black.png" title="常用英雄">
          <template #right-icon>
            <ul
              class="app-d865b50ce307751bdeb9a6ab16e7baf9 user-9e60d3ee1e1574cae90960f940c0a821"
            >
              <li
                v-for="(data, index) in friendsInfo.heroList"
                :key="'app-56bc526c61d7296b48276b2203da4c49-' + index"
                class="app-1951b6e7c82938dd7446a41e829b247b"
                @click="$router.push({ path: '/hero/' + data.id + '/info' })"
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
                  v-show="data.gfzq == 1"
                  width="25"
                  height="25"
                  v-lazy="'/img/app-icons/gfzq.png'"
                  class="app-d31cb1c15b091f41248935d88a8d0a45"
                />
              </li>
            </ul>
            <span
              v-show="friendsInfo.heroList.length == 0"
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

    <div class="friends-ae64b9ce80d3b20870647479c735eeb0">
      <div class="friends-402e57c104da1741bd87140cc8e3633f">
        有任何意见建议都可以加群
      </div>
      <div class="friends-2707770f6b9a7f3321a020d1bcd5dd9d">
        <a
          target="_blank"
          href="//qm.qq.com/cgi-bin/qm/qr?k=47VZ3jNzGKzf4SYjsYCWiOS4lqljpQww&jump_from=webapi"
          ><img
            border="0"
            src="//pub.idqqimg.com/wpa/images/group.png"
            alt="王者荣耀扯淡游戏1群"
            title="王者荣耀扯淡游戏1群"
            class="friends-414c54d9374ac490e9773a8c5f357427" /></a
        >&nbsp;
        <a
          target="_blank"
          href="//qm.qq.com/cgi-bin/qm/qr?k=CEFsriXK1TM2RJa9BioWhfWI4IYrAkJj&jump_from=webapi"
          ><img
            border="0"
            src="//pub.idqqimg.com/wpa/images/group.png"
            alt="奇迹的秘密小窝"
            title="奇迹的秘密小窝"
            class="friends-414c54d9374ac490e9773a8c5f357427"
        /></a>
      </div>
    </div>

    <AppBottomTabbar height="100" />
  </div>
</template>

<style>
@import url("/css/app-style/friends.css");
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
        img: "",
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
    getWebAccountInfo: function (tips) {
      let openId_1 = this.$route.query.openId,
        openId_2 = this.$cookie.get("openId"),
        accessToken = this.$cookie.get("accessToken");

      this.axios
        .post(
          this.apiList.pvp.getWebAccountInfo + "&aid=1",
          this.$qs.stringify({
            openId: openId_2,
            accessToken: accessToken,
            friendsOpenId: openId_1,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.isLogin = true;
            this.friendsInfo = data;

            if (openId_1) this.$router.push({ path: "/friends" });

            if (tips == 1) this.$message.success("刷新成功");
          } else {
            this.isLogin = false;

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