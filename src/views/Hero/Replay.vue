<template>
  <div class="hero-replay">
    <div class="hero-3717f3cb4a2b2b688e50fb4f63170918">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="appPush({ path: '/ranking' })"
        left-text="排行"
        class="hero-6809da26e032292efff6ec78cdec8de2"
      >
        <template #title>
          <span class="hero-d5d3db1765287eef77d7927cc956f50a">{{
            replay.title
          }}</span>
        </template>
      </van-nav-bar>
    </div>

    <div class="hero-9a7c47049573e03028c2e650b73f6252">
      <van-collapse v-model="collapseModel" :border="false">
        <van-collapse-item
          v-for="(data, index) in tableData.result.rows"
          :key="'hero-1a721faf2df53972bfd0831c64b6146d-' + index"
          :name="index"
          :value="data.time"
          class="hero-90516fea1032f8332d81cb47f06c59f6"
        >
          <div slot="title" class="hero-a78656fbfb5b498e5cb80b5b13076e31">
            <van-tag
              round
              :type="data.status"
              class="hero-01cac4e332fec6d6ecd331a00412712d hero-e4d23e841d8e8804190027bce3180fa5"
              >{{ data.usedtime }}</van-tag
            >
            <van-tag
              v-if="!replay.teammate"
              round
              color="black"
              class="hero-e4d23e841d8e8804190027bce3180fa5"
              >{{ data.equMoney }}</van-tag
            >
            <span class="hero-12d045cdd2c0b9b6bf64ab787d773ae6">{{
              data.gamePlayerName
            }}</span>
          </div>

          <div
            v-show="!replay.teammate"
            class="hero-f01902c0d0136ca30fe1034f339964ba"
          >
            <van-grid
              :border="false"
              :column-num="7"
              class="hero-c906a12df6d50e587b83a727416b5173"
            >
              <van-grid-item
                v-show="data.heroSkill > 0"
                :icon="
                  data.heroSkill > 0
                    ? '//image.ttwz.qq.com/images/skill/' +
                      data.heroSkill +
                      '.png'
                    : null
                "
                :text="data.heroPosition"
                class="hero-0a96464cb313aab9cc51e5aa61b0193f"
              />
              <van-grid-item
                v-show="data > 0"
                v-for="(data, index) in data.equInfo"
                :key="'hero-b49d75de8b355a6d857fa2b655f35f7c-' + index"
                :icon="
                  data > 0
                    ? '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                      data +
                      '.png'
                    : null
                "
                @click="
                  appOpenUrl('是否查看装备更新记录?', 'NGA @破笼之鸟', {
                    path: '//ngabbs.com/read.php?tid=19902976',
                  })
                "
                class="hero-0a96464cb313aab9cc51e5aa61b0193f"
              />
            </van-grid>
          </div>

          <van-tag
            v-if="!replay.teammate"
            round
            disabled
            color="black"
            size="mini"
            class="hero-ce50a09343724eb82df11390e2c1de18"
            >{{ data.heroKda }}</van-tag
          >&nbsp;
          <van-tag
            round
            type="primary"
            size="mini"
            class="hero-ce50a09343724eb82df11390e2c1de18"
            @click="onGameActionSheetClick(data)"
            >对局</van-tag
          >
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="hero-d471f003c8678a7f2f2edc5ad677940f">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :title="tableData.row.gamePlayerName + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
        safe-area-inset-bottom
        class="hero-4bc6fcee674cad1c5910499a6ad199b8"
      />
    </div>

    <div class="hero-face1cbe136c70e1fc08cff038596944">
      <van-pagination
        v-model="paginationModel"
        :total-items="tableData.result.total"
        :items-per-page="tableData.result.pageSize"
        @change="onPaginationChange"
        class="hero-fe7cd4d1bf3fea9a0d921e224b3fa24c"
      />
    </div>

    <AppBottomTabbar />
  </div>
</template>

<script>
export default {
  name: "HeroReplay",
  components: {
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  data() {
    return {
      collapseModel: ["1"],
      hero: {
        info: {
          id: 0,
        },
      },
      copyData: "",
      tableData: {
        result: {},
        total: 200,
        pageSize: 25,
        row: {
          gamePlayerName: "加载中",
        },
      },
      paginationModel: 1,
      showInfo: {
        actionSheet: false,
      },
      actions: [
        { name: "复制链接", value: 0 },
        { name: "详情", subname: "需要安装王者营地", value: 1 },
        { name: "回顾", subname: "需要安装王者营地", value: 2 },
        { name: "铭文", subname: "需要安装王者营地", value: 3 },
      ],
      replay: {
        title: "加载中",
        teammate: false,
      },
    };
  },
  mounted() {
    let heroId = this.$route.params.id,
      replayTitle = this.$route.query.replayTitle,
      teammate = this.$route.query.teammate;

    this.hero.info.id = heroId;
    this.replay.title = replayTitle;
    parseInt(teammate) == 1
      ? (this.replay.teammate = true)
      : (this.replay.teammate = false);

    this.getHeroReplayByHeroId(this.hero.info.id, 1);
  },
  methods: {
    onGameActionSheetClick: function (row) {
      this.tableData.row = row;

      let replayUrl = row.replayUrl,
        replayUrlIndex = replayUrl.indexOf("=");

      this.axios
        .get(
          "//s.91m.top/?url=" +
            replayUrl.substr(replayUrlIndex + 1, replayUrl.length)
        )
        .then((res) => {
          this.copyData =
            this.replay.title + " 的对局回顾 ↓\r-\r" + res.data.data.url;
        });

      this.showInfo.actionSheet = true;
    },
    getHeroReplayByHeroId: function (heroId, page) {
      this.axios
        .post(
          this.apiList.pvp.getHeroReplayByHeroId +
            "&heroId=" +
            heroId +
            "&page=" +
            page
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.row = {
              gamePlayerName: "加载中",
            };
          } else {
            this.$message.error(status.msg);

            this.appPush({ path: "/login" });
          }
        });
    },
    onPaginationChange: function (e) {
      this.getHeroReplayByHeroId(this.hero.info.id, e);
    },
    onActionSheetSelect: function (item) {
      let replayInfo = this.tableData.row;

      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }

      if (item.value == 1) {
        this.appOpenUrl("是否打开对局详情?", "需要安装王者营地", {
          path: replayInfo.hippy,
        });
      }

      if (item.value == 2) {
        this.appOpenUrl("是否打开对局回顾?", "需要安装王者营地", {
          path: replayInfo.url,
        });
      }

      if (item.value == 3) {
        if (replayInfo.inscriptionUrl) {
          this.appOpenUrl("是否查看玩家铭文?", "需要安装王者营地", {
            path: replayInfo.inscriptionUrl,
          });
        } else {
          this.$message.info("提示:1004,未查询到,建议从上方详情进入");
        }
      }
    },
  },
};
</script>
