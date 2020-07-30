<template>
  <div class="ranking-wj">
    <div class="ranking-479cba1b23b02eea72d4bdc9f59e8122">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="areaModel"
          :options="playerOptions"
          @change="onPlayerOptionsChange"
        />
        <van-dropdown-item ref="item" title="筛选">
          <van-switch-cell v-model="switchModel" title="隐藏战绩" />
          <van-button type="info" block @click="onDropdownConfirmClick">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <div class="ranking-7d87a4288bd07b77fe09098939795c8c">
      <vxe-grid
        ref="wanjia"
        auto-resize
        :loading="isLoading"
        :data="tableData.result"
        :height="clientHeight"
        :sort-config="{ trigger: 'cell' }"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="玩家" field="userId" fixed="left" width="75">
          <template v-slot="{ row }">
            <van-tag
              v-if="row.tag"
              :color="row.tag.color"
              mark
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
            >{{ row.tag.text }}</van-tag>
            <img
              v-lazy="row.avatar"
              width="50"
              height="50"
              class="hero-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column title="昵称" field="gamePlayerName" :width="listWidth" />

        <vxe-table-column title="分数" field="rankScore" :width="listWidth" sortable />
      </vxe-grid>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="show.actionSheet"
        :title="tableData.row.gamePlayerName + ' 如何操作'"
        :actions="tableData.row.area < 3 ? actions : []"
        :close-on-click-action="true"
        safe-area-inset-bottom
        @select="onActionSheetSelect"
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
      areaModel: 0,
      switchModel: false,
      qq: "",
      copyData: "",
      playerOptions: [
        { text: "全部大区", value: 0 },
        { text: "手Q 安卓", value: 1 },
        { text: "手Q 苹果", value: 2 },
        { text: "微信安卓", value: 3 },
        { text: "微信苹果", value: 4 },
      ],
      tableData: {
        result: [],
        row: {
          area: 0,
          gamePlayerName: "加载中",
        },
      },
      show: {
        actionSheet: false,
      },
      actions: [{ name: "查看QQ", value: 0 }],
      clientHeight: 0,
      isLoading: true,
    };
  },
  created() {
    this.appInitTable();
  },
  mounted() {
    this.getPlayerRanking(0, 0);
  },
  methods: {
    getPlayerRanking: function (aid, bid) {
      this.axios
        .get(this.apiList.pvp.getPlayerRanking + "&aid=" + aid + "&bid=" + bid)
        .then((res) => {
          this.tableData = res.data.data;
          this.tableData.row = {
            area: 0,
            gamePlayerName: "加载中",
          };
          this.isLoading = false;
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

          this.qq = data.qq;
          this.copyData =
            row.gamePlayerName +
            "\rQQ:" +
            this.qq +
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
    onPlayerOptionsChange: function (e) {
      this.getPlayerRanking(e, this.playerShield);
    },
    onDropdownConfirmClick: function () {
      this.$refs.item.toggle();

      this.playerShield = Number(this.switchModel);
      this.getPlayerRanking(this.areaModel, this.playerShield);
    },
    onCellClick: function ({ row }) {
      this.getPlayerInfo(row);
    },
    onActionSheetSelect: function (item) {
      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }
    },
  },
};
</script>