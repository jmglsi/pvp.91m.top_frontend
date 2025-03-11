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
        field="gamePlayerName"
        title="常玩/玩家"
        fixed="left"
        width="125"
        :title-prefix="{
          content: $appMsg.tips[1014],
        }"
      >
        <template #default="{ row }">
          <div
            :style="{
              position: 'relative',
              marginTop: '-15px',
            }"
          >
            <div class="ranking-6d19eb4601bfeac4a56e54d12adcb954">
              <van-tag
                plain
                v-for="(data, index) in row.positionList"
                :key="'ranking-2d20b6873d862bf066a8377c5ba8cc33-' + index"
                :color="$wzryPositionInfo[data || 0][1] || 'black'"
                class="app-b69a71d636ec20584432124284825b1e"
              >
                {{ $wzryPositionInfo[data || 0][0] }}
              </van-tag>
            </div>

            <div
              class="app-5f19eaf71f40d74d66be84db52b3ad87 app-420e569f7ae439ae256513412631f2f4"
            >
              {{ row.gamePlayerName }}
            </div>
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-column
        field="selareaId"
        title="大区"
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
        field="heroFightPower"
        title="战力"
        :title-prefix="{
          content: '非实时\n' + $appMsg.tips[1013],
        }"
        :width="listWidth"
        sortable
      />

      <vxe-table-column
        field="rankScore"
        title="分段"
        :width="listWidth"
        sortable
      >
        <template #default="{ row }">
          <div
            :style="{
              position: 'relative',
              marginTop: '-15px',
            }"
          >
            <div class="app-52b0e5c90604d59d1814f184d58e2033">
              {{ row.rankScore }}
            </div>

            <div
              class="app-5f19eaf71f40d74d66be84db52b3ad87 app-420e569f7ae439ae256513412631f2f4"
            >
              {{ row.roleJobName }}
            </div>
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-column
        field="basePoints[1]"
        title="进度 (%)"
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

      <vxe-table-column title="#" type="seq" width="50" />
    </vxe-table>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :actions="actionSheetActions"
        :close-on-click-action="true"
        :description="tableDataRow.gamePlayerName + ' ' + $t('how-to-operate')"
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
        let agree = this.$appConfigInfo.appInfo.isReadme;

        if (agree == 1) {
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
            encodeURIComponent(heroId)
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
            encodeURIComponent(heroId)
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
        nowColor = "#1680d1";
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