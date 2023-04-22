<template>
  <div class="hero-inscription app-inscription">
    <vxe-table
      ref="refHeroInscription"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      @cell-click="onCellClick"
      height="443"
    >
      <vxe-table-column
        title="玩家"
        field="gamePlayerName"
        fixed="left"
        width="125"
        :title-prefix="{
          content: $appMsg.tips[1014],
        }"
      />

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column
        title="大区"
        field="selareaId"
        :filters="[
          { value: '安卓QQ', label: '安卓QQ' },
          { value: '苹果QQ', label: '苹果QQ' },
          { value: '安卓WX', label: '安卓WX' },
          { value: '苹果WX', label: '苹果WX' },
        ]"
        :filter-method="filterMethod"
        :width="listWidth"
        sortable
      />

      <vxe-table-column
        title="战力"
        field="heroFightPower"
        :width="listWidth"
        :title-prefix="{
          content: '非实时\n' + $appMsg.tips[1013],
        }"
        sortable
      />
    </vxe-table>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.inscriptionMenu"
        :title="tableDataRow.gamePlayerName + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        @select="onInscriptionMenuActionSheetSelect"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroInscriptionList",
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId } = this;
      return { heroId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.heroId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.getRankingByZhanli(newValue.heroId, 10, 0, 0, 0);
        }
      },
    },
  },
  data() {
    return {
      listWidth: 0,
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      tableData_suit: {
        loading: false,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        gamePlayerName: this.$t("loading"),
      },
      actions: [],
      showInfo: {
        inscriptionMenu: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(350);
  },
  methods: {
    getRankingByZhanli: function (
      heroId = 111,
      aid = 10,
      bid = 0,
      cid = 0,
      did = 0
    ) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.tableData = ls);
      }

      this.tableData.loading = true;

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
            "&heroId=" +
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                heroId,
              this.tableData
            );
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/login" }, 1);
          }
        });
    },
    getRankingBySuit: function (
      roleId = 0,
      heroId = 111,
      aid = 10,
      bid = 1,
      cid = 0,
      did = 0
    ) {
      if (roleId == 0) return;

      this.$message.info(this.$appMsg.info[1029]);

      this.actions = [];

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
            "&heroId=" +
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData_suit = data;

            data.result.rows.map((x, i) => {
              this.actions.push({
                value: i,
                name: x.name,
                subname: "第 " + (i + 1) + " 套备战",
                url: x.url,
              });
            });

            this.actions.push({
              value: 3,
              name: "查看主页",
              subname: "需要安装王者营地",
            });
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/login" }, 1);
          }
        });
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "selareaId") {
        return row.selareaId == option.value;
      }
    },
    onCellClick: function ({ row }) {
      this.tableDataRow = row;

      this.getRankingBySuit(row.roleId, this.heroId);

      this.showInfo.inscriptionMenu = true;
    },
    onInscriptionMenuActionSheetSelect: function (item) {
      let playerInfo = this.tableDataRow;

      if (item.value == 3) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "需要安装王者营地",
          {
            path: "smobagamehelper://profile?userid=" + playerInfo.userId,
          },
          0
        );
      } else {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "查看英雄备战 (出装、铭文)",
          { path: item.url },
          0
        );
      }
    },
  },
};
</script>