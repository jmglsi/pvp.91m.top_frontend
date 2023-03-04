<template>
  <div class="hero-replay">
    <div class="hero-3717f3cb4a2b2b688e50fb4f63170918">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="$appPushBack()"
        :left-text="$t('nav-bar.left-text')"
        class="hero-6809da26e032292efff6ec78cdec8de2"
      >
        <template #title>
          <span class="hero-d5d3db1765287eef77d7927cc956f50a">
            {{ replay.title }}
          </span>
        </template>
      </van-nav-bar>
    </div>

    <div
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
      class="hero-9a7c47049573e03028c2e650b73f6252"
    >
      <van-collapse v-model="collapseInfo.model" :border="false">
        <van-collapse-item
          v-for="(data, index) in tableData.result.rows"
          :key="'hero-1a721faf2df53972bfd0831c64b6146d-' + index"
          :name="index"
          :label="'更新时间:' + data.time"
          :value="data.usedtime"
          class="hero-90516fea1032f8332d81cb47f06c59f6"
        >
          <div slot="title" class="hero-a78656fbfb5b498e5cb80b5b13076e31">
            <van-tag
              round
              :type="data.status"
              class="
                hero-01cac4e332fec6d6ecd331a00412712d
                hero-e4d23e841d8e8804190027bce3180fa5
              "
            >
              {{ data.status == "success" ? "胜利" : "失败" }}
            </van-tag>
            <van-tag
              v-if="!replay.teammate"
              round
              color="black"
              class="hero-e4d23e841d8e8804190027bce3180fa5"
            >
              {{ data.equipment.allMoney }}
            </van-tag>
            <span class="hero-12d045cdd2c0b9b6bf64ab787d773ae6">
              {{ data.gamePlayerName }}
            </span>
          </div>

          <div
            v-if="!replay.teammate"
            class="hero-f01902c0d0136ca30fe1034f339964ba"
          >
            <van-grid
              :border="false"
              :column-num="7"
              class="hero-c906a12df6d50e587b83a727416b5173"
            >
              <van-grid-item
                :icon="
                  '//image.ttwz.qq.com/images/skill/' + data.heroSkill + '.png'
                "
                :text="data.heroPosition"
                class="hero-0a96464cb313aab9cc51e5aa61b0193f"
              />
              <van-grid-item
                v-for="(data, index) in data.equipment.list"
                :key="'hero-b49d75de8b355a6d857fa2b655f35f7c-' + index"
                :icon="
                  data > 0
                    ? '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                      data +
                      '.png'
                    : null
                "
                @click="
                  $appOpenUrl(
                    $t('open-url.title'),
                    'NGA @破笼之鸟',
                    {
                      path: '//ngabbs.com/read.php?tid=19902976',
                    },
                    0
                  )
                "
                class="hero-0a96464cb313aab9cc51e5aa61b0193f"
              />
            </van-grid>
          </div>

          <div class="hero-75c8e1c4a51a48edb54306fb640fdc4f">
            <van-tag
              v-if="!replay.teammate"
              round
              disabled
              color="black"
              size="medium"
              class="hero-ce50a09343724eb82df11390e2c1de18"
            >
              {{ data.heroKda }}
            </van-tag>
            &nbsp;
            <a-dropdown v-if="!replay.teammate" :trigger="['click']">
              <van-tag
                round
                color="red"
                size="medium"
                class="hero-ce50a09343724eb82df11390e2c1de18"
              >
                {{ $t("prepare-for-war") }}
              </van-tag>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    v-for="index in 3"
                    :key="'ranking-31d3689c01b543a417ec7571237a436d-' + index"
                    @click="getHeroInscription(data, data.heroId, index)"
                  >
                    第 {{ index }} 套备战
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item
                    key="ranking-31d3689c01b543a417ec7571237a436d-4"
                    @click="
                      $appPush({
                        path: '/search',
                        query: {
                          q: data.heroId,
                          show: 'heroSkill',
                          refresh: 1,
                        },
                      })
                    "
                  >
                    国服战力排行
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            &nbsp;
            <van-tag
              round
              type="primary"
              size="medium"
              class="hero-ce50a09343724eb82df11390e2c1de18"
              @click="getGameInfo(data)"
            >
              对局
            </van-tag>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="hero-d471f003c8678a7f2f2edc5ad677940f">
      <van-action-sheet
        v-model="showInfo.replayMenu"
        :title="(tableDataRow.gamePlayerName || replay.title) + ' 如何操作'"
        :actions="!replay.gameOpenId ? actions : []"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
        class="hero-4bc6fcee674cad1c5910499a6ad199b8"
      />
    </div>

    <div class="app-face1cbe136c70e1fc08cff038596944">
      <van-pagination
        v-model="paginationInfo.model"
        :total-items="tableData.result.total"
        :items-per-page="tableData.result.pageSize"
        @change="onPaginationChange"
        class="hero-fe7cd4d1bf3fea9a0d921e224b3fa24c"
      />
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
export default {
  name: "HeroReplay",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      copyData: "",
      tableData: {
        result: {
          rows: [],
        },
        total: 200,
        pageSize: 25,
      },
      tableDataRow: {
        gamePlayerName: this.$t("loading"),
      },
      actions: [
        { name: "复制链接", value: 0 },
        { name: "回顾", value: 1 },
        { name: "详情", subname: "需要安装王者营地", value: 2 },
        //{ name: "铭文", subname: "需要安装王者营地", value: 3 },
      ],
      replay: {
        id: this.$route.params.id || 111,
        title: this.$route.query.title || this.$t("loading"),
        userId: this.$route.query.userId || "",
        roleId: this.$route.query.roleId || "",
        gameOpenId: this.$route.query.gameOpenId || "",
        teammate: Boolean(parseInt(this.$route.query.teammate)) || false,
      },
      collapseInfo: {
        model: ["1"],
      },
      paginationInfo: {
        model: 1,
      },
      showInfo: {
        replayMenu: false,
      },
    };
  },
  mounted() {
    this.getHeroReplayByHeroId(0);
  },
  methods: {
    getHeroInscription: function (row, heroId, index) {
      this.$appOpenUrl(
        this.$t("open-url.title"),
        "查看英雄备战 (出装、铭文)",
        {
          path:
            "https://camp.qq.com/h5/webdist/prepare-war-share/index.html?isNavigationBarHidden=1&showLoading=false&gameRoleId=" +
            row.roleId +
            "&shareUserId=" +
            row.userId +
            "&heroId=" +
            heroId +
            "&indexNum=" +
            index,
        },
        0
      );
    },
    getGameInfo: function (row) {
      this.tableDataRow = row;

      this.showInfo.replayMenu = true;
    },
    onReplayCopy: function (row) {
      let replayUrl = row.replayUrl,
        replayUrlIndex = replayUrl.indexOf("="),
        longUrl = decodeURIComponent(
          replayUrl.slice(replayUrlIndex + 1, replayUrl.length)
        );

      this.$axios
        .post(this.$appApi.pvp.getShortUrl, {
          url: longUrl,
        })
        .then((res) => {
          let shortUrl = res.data.data.url;

          this.copyData = this.replay.title + " 的对局回顾 ↓\n-\n" + shortUrl;

          this.$appCopyData(this.copyData);
        });
    },
    getHeroReplayByHeroId: function (page) {
      let replayInfo = this.replay;

      this.$axios
        .post(
          this.$appApi.pvp.getHeroReplayByHeroId +
            "&id=" +
            replayInfo.id +
            "&userId=" +
            replayInfo.userId +
            "&roleId=" +
            replayInfo.roleId +
            "&gameOpenId=" +
            replayInfo.gameOpenId +
            "&page=" +
            page
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/login" }, 1);
          }
        });
    },
    onPaginationChange: function (e) {
      this.getHeroReplayByHeroId(e - 1);
    },
    onActionSheetSelect: function (item) {
      let replayInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onReplayCopy(replayInfo);
      }

      if (item.value == 1) {
        this.$appOpenUrl(
          "是否打开对局回顾?",
          null,
          {
            path: replayInfo.replayUrl,
          },
          0
        );
      }

      if (item.value == 2) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "需要安装王者营地",
          {
            path: replayInfo.hippyUrl,
          },
          0
        );
      }

      if (item.value == 3) {
        if (replayInfo.inscriptionUrl) {
          this.$appOpenUrl(
            this.$t("open-url.title"),
            "需要安装王者营地",
            {
              path: replayInfo.inscriptionUrl,
            },
            0
          );
        }
      }
    },
  },
};
</script>