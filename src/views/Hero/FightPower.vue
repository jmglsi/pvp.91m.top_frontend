<template>
  <div class="hero-fight-power">
    <div class="hero-7204feeb83a23bea01569cd2e3a70b27">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        z-index="99999999"
        class="hero-939242abbf67ecb548dbbf5043b943da"
        @click-left="appPush('/ranking', $options.name)"
      >
        <template #title>
          <span class="info-d5d3db1765287eef77d7927cc956f50a">{{ hero.info.name }}</span>
        </template>
        <van-icon name="arrow-left" slot="left" />
      </van-nav-bar>
    </div>

    <div class="ranking-5b823c5cebcbf113d9d21203a0733fb5">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="areaInfo.model"
          :options="areaInfo.options"
          @change="onDropdownMenuChange"
        />
      </van-dropdown-menu>
    </div>

    <div class="hero-196a8ec07dff525b0d249bb85f636b6e">
      <vxe-grid
        ref="fightpower"
        id="fightpower"
        auto-resize
        :loading="isLoading"
        :data="tableData.result"
        :height="clientHeight"
        :sort-config="{ trigger: 'cell' }"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="玩家" field="gamePlayerName" fixed="left" width="125">
          <template v-slot="{ row }">
            <img
              v-lazy="row.img"
              width="50"
              height="50"
              class="hero-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
            <div class="player-58907c2a2110e1bea63d5c822a7af9d0">{{ row.gamePlayerName }}</div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column title="战力" field="heroFightPower" :width="listWidth" sortable />
        <vxe-table-column title="剩余分" field="points.remaining" :width="listWidth" sortable />
        <vxe-table-column title="胜率" field="winRate" :width="listWidth" sortable />
        <vxe-table-column title="巅峰分" field="rankScore" :width="listWidth" sortable />
        <vxe-table-column title="星星数" field="stars" :width="listWidth" sortable />
      </vxe-grid>
    </div>

    <div class="hero-18327e5b67b8072ab8cf020c4ef15c9c">
      <span style="color: red">剩余分</span>是通过
      <a href="https://ngabbs.com/read.php?tid=22589350" _target="_blank">NGA @沈默</a> 提供的表格反算出来的。
      已知问题:剩余分为负数(信息待更新)。玩家丢失(账号有限,暂时无解)。
    </div>

    <div class="hero-0ec00abb107be61c38c675bba75ecb98">
      <van-action-sheet
        v-model="show.actionSheet"
        :title="tableData.row.gamePlayerName + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        safe-area-inset-bottom
        class="replay-20b01f31acf467175a88429d2aa8eb70"
        @select="onActionSheetSelect"
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
      areaInfo: {
        model: 0,
        options: [
          { text: "全部大区", value: 0 },
          { text: "安卓手 Q", value: 1 },
          { text: "苹果手 Q", value: 2 },
          { text: "安卓微信", value: 3 },
          { text: "苹果微信", value: 4 },
        ],
      },
      collapseModel: ["1"],
      hero: {
        info: {
          id: 0,
        },
      },
      copyData: "",
      tableData: {
        result: [],
        total: 200,
        pageSize: 25,
        row: {
          gamePlayerName: "加载中",
        },
      },
      listWidth: 0,
      show: {
        actionSheet: false,
      },
      actions: [{ name: "查看QQ", value: 0 }],
      isLoading: true,
    };
  },
  created() {
    this.initAppTable();
    this.clientHeight = this.clientHeight - 15;
    this.initListWidth();
  },
  mounted() {
    let heroId = this.$route.params.id;

    this.hero.info.id = heroId;

    this.getHeroInfo(heroId);
    this.getHeroFightPowerRanking(this.hero.info.id, 0);
  },
  methods: {
    initListWidth: function () {
      if (this.appDevice) this.listWidth = 100;
    },
    getHeroInfo: function (heroId) {
      this.axios
        .get(this.apiList.pvp.getHeroInfo + "&heroId=" + heroId)
        .then((res) => {
          this.hero.info = res.data.data.heroInfo;

          document.title = this.hero.info.name + " | 苏苏的荣耀助手";

          if (heroId.indexOf(",") > -1) this.teammate = true;
        });
    },
    getPlayerInfo: function (row) {
      if (row.userId == 0) return;

      this.tableData.row = row;

      this.axios
        .get(this.apiList.pvp.getSmobaHelperUserInfo + "&userId=" + row.userId)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code != 200) {
            this.$message.error("错误:1005,玩家信息异常");
            return;
          }

          this.uin = data.uin;
          this.copyData =
            row.gamePlayerName +
            "\rQQ:" +
            this.uin +
            "\r-\r更多玩家信息 ↓\r" +
            location.origin +
            location.pathname +
            "?type=2&userId=" +
            row.userId +
            "&sign=" +
            this.appSign(this.$options.name);
        });

      this.show.actionSheet = true;
    },
    getHeroFightPowerRanking: function (heroId, aid) {
      this.axios
        .get(
          this.apiList.pvp.getHeroFightPowerRanking +
            "&heroId=" +
            heroId +
            "&aid=" +
            aid
        )
        .then((res) => {
          this.tableData = res.data.data;
          this.tableData.row = {
            gamePlayerName: "加载中",
          };

          this.isLoading = false;
        });
    },
    onCellClick: function ({ row }) {
      this.getPlayerInfo(row);
    },
    onActionSheetSelect: function (item) {
      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }
    },
    onDropdownMenuChange: function () {
      this.getHeroFightPowerRanking(this.hero.info.id, this.areaInfo.model);
    },
  },
};
</script>