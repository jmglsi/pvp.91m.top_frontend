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

        <vxe-table-column title="巅峰分" field="rankScore" :width="listWidth" sortable />
      </vxe-grid>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="show.actionSheet"
        :title="tableData.row.gamePlayerName + ' 如何操作'"
        :actions="areaModel < 3 ? actions : []"
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
      loginInfo: {
        openId: null,
        accessToken: null,
      },
      playerShield: 0,
      areaModel: 0,
      switchModel: false,
      uin: "",
      copyData: "",
      playerOptions: [
        { text: "全部大区", value: 0 },
        { text: "安卓 手Q", value: 1 },
        { text: "苹果 手Q", value: 2 },
        { text: "安卓微信", value: 3 },
        { text: "苹果微信", value: 4 },
      ],
      tableData: {
        result: [],
        row: {
          gamePlayerName: "加载中",
        },
      },
      show: {
        actionSheet: false,
      },
      actions: [
        { name: "查看QQ", value: 0 },
        { name: "铭文", subname: "需要安装王者营地", value: 1 },
      ],
      clientHeight: 0,
      listWidth: 0,
      isLoading: true,
    };
  },
  created() {
    this.initAppTable();
  },
  mounted() {
    this.loginInfo.openId = this.$cookie.get("openId");
    this.loginInfo.accessToken = this.$cookie.get("accessToken");

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
    getPlayerInfo: function (row, type) {
      if (row.userId == 0) return;

      let loginInfo = this.loginInfo;
      this.tableData.row = row;

      if (type == 1) {
        this.show.actionSheet = true;
        return;
      }

      this.axios
        .post(
          this.apiList.pvp.getSmobaHelperUserInfo + "&userId=" + row.userId,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code != 200) {
            this.$message.error(status.msg);
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

          this.appCopyData(this.copyData);
        });
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
      this.getPlayerInfo(row, 1);
    },
    onActionSheetSelect: function (item) {
      let playerInfo = this.tableData.row;

      if (item.value == 0) {
        this.getPlayerInfo(playerInfo, 2);
      }

      if (item.value == 1) {
        if (playerInfo.inscriptionUrl) {
          this.appOpenUrl(
            "是否查看玩家铭文?",
            "需要安装王者营地",
            playerInfo.inscriptionUrl
          );
        } else {
          this.$message.info("提示:1005,未查询到,待更新");
        }
      }
    },
  },
};
</script>