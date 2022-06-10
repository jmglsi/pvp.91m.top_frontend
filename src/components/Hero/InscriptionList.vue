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
        :title-help="{
          content: $appMsg.tips[1014],
        }"
        width="125"
      />

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column
        title="大区"
        field="selareaId"
        :filters="[
          { data: 1, label: '安卓QQ' },
          { data: 2, label: '苹果QQ' },
          { data: 3, label: '安卓WX' },
          { data: 4, label: '苹果WX' },
        ]"
        :filter-method="filterMethod"
        :width="listWidth"
        sortable
      />

      <vxe-table-column
        title="战力"
        field="heroFightPower"
        :title-help="{
          content: '非实时\n' + $appMsg.tips[1013],
        }"
        :width="listWidth"
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
        safe-area-inset-bottom
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroInscription",
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

        if (this.$cookie.get("agree") == 1) {
          this.getRanking(newValue.heroId, 10, 0, 0, 0);
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
        gamePlayerName: "加载中...",
      },
      actions: [
        { name: "第 1 套备战", value: 0 },
        { name: "第 2 套备战", value: 1 },
        { name: "第 3 套备战", value: 2 },
        { name: "查看主页", subname: "需要安装王者营地", value: 3 },
      ],
      showInfo: {
        inscriptionMenu: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(350);
  },
  methods: {
    getRanking: function (heroId = 111, aid = 10, bid = 0, cid = 0, did = 0) {
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
          this.$appApi.pvp.getRanking +
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
            this.$appOpenUrl("温馨提示", status.msg, { path: "/my" }, 1);
          }
        });
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "selareaId") {
        return row.selareaId == option.label;
      }
    },
    onCellClick: function ({ row }) {
      this.tableDataRow = row;

      this.showInfo.inscriptionMenu = true;
    },
    onInscriptionMenuActionSheetSelect: function (item) {
      let playerInfo = this.tableDataRow;

      if (item.value == 3) {
        this.$appOpenUrl(
          "是否查看玩家主页?",
          "需要安装王者营地",
          {
            path: "smobagamehelper://profile?userid=" + playerInfo.userId,
          },
          0
        );
      } else {
        this.$appOpenUrl(
          "是否查看英雄备战 (出装、铭文)?",
          null,
          {
            path:
              "https://camp.qq.com/h5/webdist/prepare-war-share/index.html?isNavigationBarHidden=1&showLoading=false&gameRoleId=" +
              playerInfo.roleId +
              "&shareUserId=" +
              playerInfo.userId +
              "&heroId=" +
              this.heroId +
              "&indexNum=" +
              item.value,
          },
          0
        );
      }
    },
  },
};
</script>