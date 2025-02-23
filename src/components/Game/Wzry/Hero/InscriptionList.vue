<template>
  <div class="hero-inscription app-inscription">
    <vxe-table
      ref="refWzryHeroInscription"
      id="refWzryHeroInscription"
      :custom-config="{ storage: true }"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      @cell-click="onTableCellClick"
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
          { value: 1, label: '安卓QQ' },
          { value: 2, label: '苹果QQ' },
          { value: 3, label: '安卓WX' },
          { value: 4, label: '苹果WX' },
        ]"
        :filter-method="onTableColumnFilterMethod"
        :width="listWidth"
        sortable
      />

      <vxe-table-column
        title="分段"
        field="rankScore"
        :width="listWidth"
        sortable
      >
        <template #default="{ row }">
          <span class="ranking-20b2165cf5e79e58d5e434b7d9370589">
            {{ row.rankScore }}
          </span>
          <br />
          <span class="ranking-20b2165cf5e79e58d5e434b7d9370589">
            {{ row.roleJobName }}
          </span>
        </template>
      </vxe-table-column>

      <vxe-table-column
        title="进度 (%)"
        field="basePoints[1]"
        width="125"
        :title-prefix="{
          content: $appMsg.tips[1023],
        }"
        sortable
      >
        <template #default="{ row }">
          <span
            :style="getBasePointsColor(row.basePoints[1] || 0)"
            class="ranking-94077a6749587738aac37ee4ba7316bf"
          >
            {{ row.basePoints[0] || 0 }} | {{ row.basePoints[1] || 0 }}
          </span>
        </template>
      </vxe-table-column>

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
        v-model="showInfo.actionSheet"
        :title="tableDataRow.gamePlayerName + ' ' + $t('how-to-operate')"
        :actions="actionSheetActions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "heroInscriptionList",
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { extraId } = this;
      return { extraId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.extraId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.getRankingByZhanli(10, 0, 0, 0, newValue.extraId);
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
      tableDataRow: {
        gamePlayerName: this.$t("loading"),
      },
      suitData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      actionSheetActions: [],
      showInfo: {
        actionSheet: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    getRankingByZhanli: function (
      aid = 10,
      bid = 0,
      cid = 0,
      did = 0,
      heroId = 111
    ) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.tableData = ls;

        return;
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
            "&id=" +
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
            this.$message.error(status.msg);
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

      this.actionSheetActions = [];

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
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.suitData = data;

            data.result.rows.map((x, i) => {
              this.actionSheetActions.push({
                value: i,
                name: x.name,
                subname: "第 " + (i + 1) + " 套备战",
                url: x.url,
              });
            });

            this.actionSheetActions.push({
              value: 3,
              name: "查看主页",
              subname: "需要安装王者营地",
            });
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "selareaId") {
        return row.selareaId == option.label;
      }
    },
    onTableCellClick: function ({ row }) {
      this.tableDataRow = row;

      this.getRankingBySuit(row.roleId, this.extraId);

      this.showInfo.actionSheet = true;
    },
    onActionSheetSelect: function (item) {
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
    getBasePointsColor(e) {
      let nowColor = null,
        ret = {};

      if (e == 0) {
        nowColor = null;
      } else if (e < 80) {
        nowColor = "blue";
      } else if (e > 100) {
        nowColor = "red";
      } else {
        nowColor = null;
      }

      if (nowColor) {
        ret = {
          color: nowColor,
        };
      }

      return ret;
    },
  },
};
</script>

<style scoped lang="less">
span.ranking-20b2165cf5e79e58d5e434b7d9370589 {
  font-size: 10px;
  position: absolute;
  text-align: center;
  width: 100%;
  left: 0;
  margin-top: -13px;
}
</style>