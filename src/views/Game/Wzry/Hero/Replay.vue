<template>
  <div class="hero-replay">
    <div class="hero-3717f3cb4a2b2b688e50fb4f63170918">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="$appBack()"
        z-index="2000"
        class="hero-6809da26e032292efff6ec78cdec8de2"
      >
        <template #title>
          <span class="hero-d5d3db1765287eef77d7927cc956f50a">
            对局回顾
            <!-- {{ replay.title }} -->
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
              class="hero-01cac4e332fec6d6ecd331a00412712d hero-e4d23e841d8e8804190027bce3180fa5"
            >
              {{ data.status == "success" ? "胜利" : "失败" }}
            </van-tag>
            <van-tag
              round
              v-if="!replay.teammate"
              color="black"
              class="hero-e4d23e841d8e8804190027bce3180fa5"
            >
              {{ data.equipment.totalPrice }}
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
                :icon="'//camp.qq.com/images/skill/' + data.heroSkill + '.png'"
                :text="data.heroPosition"
                class="hero-0a96464cb313aab9cc51e5aa61b0193f"
              />
              <van-grid-item
                v-for="(data, index) in data.equipment.list"
                :key="'hero-b49d75de8b355a6d857fa2b655f35f7c-' + index"
                :icon="
                  data > 0
                    ? '//game.gtimg.cn/images/yxzj/img201606/itemimg/' +
                      data +
                      '.jpg'
                    : null
                "
                @click="
                  $appOpenUrl(
                    $t('open-url.title'),
                    'NGA @破笼之鸟',
                    {
                      path: 'https://ngabbs.com/read.php?tid=19902976',
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
              round
              v-if="!replay.teammate"
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
                @click="getRanking(10, 1, 0, 0, data.heroId, data.roleId)"
                color="orange"
                size="medium"
                class="hero-ce50a09343724eb82df11390e2c1de18"
              >
                {{ $t("prepare-for-war") }}
              </van-tag>
              <template #overlay>
                <a-menu>
                  <a-menu-item
                    v-for="(data, index) in suitActionSheetActions"
                    :key="'hero-d97e274d2c9aed66c5d724627ae98768-' + index"
                    @click="
                      $appOpenUrl(
                        $t('open-url.title'),
                        '查看英雄备战 (出装、铭文)',
                        { path: data.url },
                        0
                      )
                    "
                  >
                    {{ data.name }}
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item
                    key="ranking-31d3689c01b543a417ec7571237a436d-4"
                    @click="
                      $appPush({
                        path: '/search',
                        query: {
                          q: data.heroId,
                          refresh: 1,
                          show: 'heroSkill',
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
        v-model="showInfo.actionSheet"
        :description="
          (tableDataRow.gamePlayerName || replay.title) +
          ' ' +
          $t('how-to-operate')
        "
        :actions="!replay.gameOpenId ? replayActionSheetActions : []"
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
  name: "heroReplay",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      copyData: "",
      tableData: {
        result: {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
      },
      tableDataRow: {
        gamePlayerName: this.$t("loading"),
      },
      replayActionSheetActions: [
        { name: "复制链接", value: 0 },
        { name: "回顾", value: 1 },
        { name: "详情", subname: "需要安装王者营地", value: 2 },
        //{ name: "铭文", subname: "需要安装王者营地", value: 3 },
      ],
      suitActionSheetActions: [],
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
        actionSheet: false,
      },
    };
  },
  mounted() {
    this.getHeroReplayByHeroId(0);
  },
  methods: {
    getRanking: function (
      aid = 10,
      bid = 1,
      cid = 0,
      did = 0,
      heroId = 0,
      roleId = 0
    ) {
      if (roleId == 0) return;

      this.$message.info(this.$appMsg.info[1029]);

      this.suitActionSheetActions = [];

      this.$axios
        .post(
          this.$appApi.app.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did +
            "&roleId=" +
            roleId +
            "&id=" +
            encodeURIComponent(heroId)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData_suit = data;

            data.result.rows.map((x, i) => {
              this.suitActionSheetActions.push({
                value: i,
                name: x.name,
                subname: "第 " + (i + 1) + " 套备战",
                url: x.url,
              });
            });
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getGameInfo: function (row) {
      this.tableDataRow = row;

      this.showInfo.actionSheet = true;
    },
    getHeroReplayByHeroId: function (page) {
      let replayInfo = this.replay;

      this.$axios
        .post(
          this.$appApi.app.getHeroReplayByHeroId +
            "&id=" +
            encodeURIComponent(replayInfo.id) +
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
            this.$message.error(status.msg);
          }
        });
    },
    onPaginationChange: function (e) {
      this.getHeroReplayByHeroId(e - 1);
    },
    onActionSheetSelect: function (item) {
      let replayInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onCopy(replayInfo);
      }

      if (item.value == 1) {
        this.$appOpenUrl(
          "是否打开对局回顾?",
          null,
          { path: replayInfo.replayUrl },
          0
        );
      }

      if (item.value == 2) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "需要安装王者营地",
          { path: replayInfo.hippyUrl },
          0
        );
      }

      if (item.value == 3) {
        if (replayInfo.inscriptionUrl) {
          this.$appOpenUrl(
            this.$t("open-url.title"),
            "需要安装王者营地",
            { path: replayInfo.inscriptionUrl },
            0
          );
        }
      }
    },
    onCopy: function (row) {
      let longUrl = row.replayUrl;

      this.$axios
        .post(this.$appApi.app.getShortUrl, {
          url: longUrl,
        })
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            let shortUrl = data.url;

            this.copyData = this.replay.title + " 的对局回顾 ↓\n-\n" + shortUrl;

            this.$appCopyData(this.copyData);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>