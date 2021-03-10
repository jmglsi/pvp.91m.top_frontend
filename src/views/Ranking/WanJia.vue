<template>
  <div class="ranking-wj app-wj">
    <div class="ranking-7d87a4288bd07b77fe09098939795c8c">
      <vxe-grid
        ref="refWanJia"
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :height="clientHeight"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="玩家" field="userId" fixed="left" width="75">
          <template v-slot="{ row }">
            <div
              :class="
                isSmallMobile == 1
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-4a9c5e0aad3727c90e3744aeb04534ba'
                  : null
              "
            >
              <van-tag
                v-if="row.tag"
                :color="row.tag.color"
                mark
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
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column
          title="名字"
          field="gamePlayerName"
          :width="listWidth > 0 ? listWidth + 25 : listWidth"
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
        v-model="showInfo.playerMenu"
        :title="tableDataRow.gamePlayerName + ' 如何操作'"
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
  props: {
    isSmallMobile: {
      type: Number,
      default: 0,
    },
    bid: {
      type: Number,
      default: 0,
    },
    cid: {
      type: Number,
      default: 0,
    },
    did: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { isSmallMobile, bid, cid, did } = this;
      return { isSmallMobile, bid, cid, did };
    },
  },
  watch: {
    listenChange: {
      immediate: false,
      handler(newValue) {
        let refresh = parseInt(this.$route.query.refresh) || 0;

        if (refresh == 1) {
          this.getRanking(2, newValue.bid, newValue.cid, 0);
        }
      },
    },
  },
  data() {
    return {
      copyData: "",
      uin: "",
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        gamePlayerName: "加载中",
      },
      actions: [
        { name: "查看QQ", value: 0 },
        { name: "铭文", subname: "需要安装王者营地", value: 1 },
      ],
      clientHeight: 0,
      listWidth: 0,
      showInfo: {
        playerMenu: false,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(350);
  },
  mounted() {
    this.getRanking(2, this.bid, this.cid, 0);
  },
  methods: {
    getRanking: function (aid = 2, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ranking = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (
        ranking &&
        this.$appTs - appConfigInfo.appInfo.updateTime <
          appConfigInfo.updateInfo.timeout
      ) {
        this.tableData = ranking;

        return;
      }

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
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.tableData
            );

            this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getPlayerInfo: function (row) {
      this.tableDataRow = row;

      this.showInfo.playerMenu = true;
    },
    onWanJiaCopy: function (row) {
      this.$axios
        .post(this.$appApi.pvp.getSmobaHelperUserInfo + "&userId=" + row.userId)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.uin = data.uin;

            let longUrl =
              location.origin +
              location.pathname +
              "?type=2&userId=" +
              row.userId +
              "&gamePlayerName=" +
              encodeURIComponent(row.gamePlayerName);

            this.$axios
              .post(this.$appApi.s.url, {
                url: longUrl,
              })
              .then((res) => {
                let shortUrl = res.data.data.url;

                this.copyData =
                  row.gamePlayerName +
                  "\rQQ:" +
                  this.uin +
                  "\r-\r更多玩家信息 ↓\r" +
                  shortUrl;

                setTimeout(
                  (copyData) => {
                    this.$appCopyData(copyData);
                  },
                  750,
                  this.copyData
                );
              });
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onCellClick: function ({ row }) {
      if (row.userId == 0 || this.bid >= 3) return;

      this.getPlayerInfo(row);
    },
    onActionSheetSelect: function (item) {
      let playerInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onWanJiaCopy(playerInfo);
      }

      if (item.value == 1) {
        if (playerInfo.inscriptionUrl) {
          this.$appOpenUrl("是否查看玩家铭文?", "需要安装王者营地", {
            path: playerInfo.inscriptionUrl,
          });
        } else {
          this.$message.info(this.$appMsg.info[1013]);
        }
      }
    },
  },
};
</script>
