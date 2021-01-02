<template>
  <div class="ranking-wj">
    <div class="ranking-479cba1b23b02eea72d4bdc9f59e8122">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="areaInfo.model"
          :options="areaInfo.options"
          @change="onPlayerOptionsChange"
        />
        <van-dropdown-item ref="item" title="筛选">
          <van-cell
            title="隐藏战绩"
            class="ranking-038a25200255054bb358e9839b055f73"
          >
            <template #right-icon>
              <van-switch v-model="showInfo.shield" />
            </template>
          </van-cell>
          <div style="padding: 5px 16px">
            <van-button
              type="danger"
              block
              round
              @click="onDropdownConfirmClick"
            >
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <div class="ranking-7d87a4288bd07b77fe09098939795c8c">
      <vxe-grid
        ref="wanjia"
        auto-resize
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :height="clientHeight"
        :sort-config="{ trigger: 'cell' }"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="玩家" field="userId" fixed="left" width="75">
          <template v-slot="{ row }">
            <van-tag
              mark
              v-if="row.tag"
              :color="row.tag.color"
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
              >{{ row.tag.text }}</van-tag
            >
            <img
              v-lazy="row.avatar"
              width="50"
              height="50"
              class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column
          title="昵称"
          field="gamePlayerName"
          :width="listWidth"
        />

        <vxe-table-column
          title="巅峰分"
          field="rankScore"
          :width="listWidth"
          sortable
        />
      </vxe-grid>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :title="tableData.row.gamePlayerName + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
        safe-area-inset-bottom
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingWanJia",
  data() {
    return {
      playerShield: 0,
      uin: "",
      copyData: "",
      areaInfo: {
        model: 0,
        options: [
          { text: "全部", value: 0 },
          { text: "安卓 手Q", value: 1 },
          { text: "苹果 手Q", value: 2 },
          { text: "安卓微信", value: 3 },
          { text: "苹果微信", value: 4 },
        ],
      },
      tableData: {
        loading: true,
        result: {},
        row: {
          gamePlayerName: "加载中",
        },
      },
      showInfo: {
        shield: false,
        actionSheet: false,
      },
      actions: [
        { name: "查看QQ", value: 0 },
        { name: "铭文", subname: "需要安装王者营地", value: 1 },
      ],
      clientHeight: 0,
      listWidth: 0,
    };
  },
  created() {
    this.appInitTableHeight();
  },
  mounted() {
    this.getRanking(0, 0);
  },
  methods: {
    getRanking: function (bid, cid, aid = 1) {
      this.axios
        .post(
          this.apiList.pvp.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid
        )
        .then((res) => {
          this.tableData = res.data.data;
          this.tableData.loading = false;
          this.tableData.row = {
            area: 0,
            gamePlayerName: "加载中",
          };
        });
    },
    getPlayerInfo: function (row) {
      if (row.userId == 0 || this.areaInfo.model >= 3) return;

      this.tableData.row = row;
      this.showInfo.actionSheet = true;

      this.axios
        .post(this.apiList.pvp.getSmobaHelperUserInfo + "&userId=" + row.userId)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.uin = data.uin;
            this.copyData =
              row.gamePlayerName +
              "\rQQ:" +
              this.uin +
              "\r-\r更多玩家信息 ↓\r" +
              location.origin +
              location.pathname +
              "?type=1&userId=" +
              row.userId;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onPlayerOptionsChange: function (e) {
      this.getRanking(e, this.playerShield);
    },
    onDropdownConfirmClick: function () {
      this.$refs.item.toggle();

      this.playerShield = Number(this.showInfo.shield);
      this.getRanking(this.areaInfo.model, this.playerShield);
    },
    onCellClick: function ({ row }) {
      this.getPlayerInfo(row);
    },
    onActionSheetSelect: function (item) {
      let playerInfo = this.tableData.row;

      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }

      if (item.value == 1) {
        if (playerInfo.inscriptionUrl) {
          this.appOpenUrl("是否查看玩家铭文?", "需要安装王者营地", {
            path: playerInfo.inscriptionUrl,
          });
        } else {
          this.$message.info("提示:1010,未查询到,待更新");
        }
      }
    },
  },
};
</script>
