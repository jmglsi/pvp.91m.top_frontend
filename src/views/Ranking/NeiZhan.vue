<template>
  <div class="ranking-nz app-nz">
    <div class="ranking-7d87a4288bd07b77fe09098939795c8c">
      <vxe-table
        ref="refNeiZhan"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        @cell-click="onTableCellClick"
      >
        <vxe-table-column
          title="玩家"
          field="userId"
          fixed="left"
          width="75"
          :title-prefix="{ content: $appMsg.tips[1006] }"
        >
          <template #default="{ row, rowIndex }">
            <van-tag
              v-if="row.tag"
              :color="row.tag.color"
              mark
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
            >
              {{ row.tag.text }}
            </van-tag>

            <div
              :style="{ position: 'relative' }"
              :class="
                isSmallMode
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-4a9c5e0aad3727c90e3744aeb04534ba'
                  : null
              "
            >
              <img
                v-lazy="row.avatar"
                width="50"
                height="50"
                class="app-border-radius ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
              <div
                class="app-5f19eaf71f40d74d66be84db52b3ad87 ranking-0e1a8b3f7f6162bf4b88d3d001b88374"
              >
                {{ rowIndex + 1 }}
              </div>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          title="内战分"
          field="rankScore_bo1"
          :width="listWidth"
          sortable
        >
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <div class="app-52b0e5c90604d59d1814f184d58e2033">
                {{ row.rankScore_bo1 }}
              </div>
              <div
                class="app-5f19eaf71f40d74d66be84db52b3ad87 ranking-420e569f7ae439ae256513412631f2f4"
              >
                {{ row.gamePlayerName }}
              </div>
            </div>
          </template>
        </vxe-table-column>

        <vxe-column title="状态" field="status" :width="listWidth" sortable>
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <div v-if="row.status == 0">空闲</div>
              <div
                v-else-if="row.status == 1"
                :style="{ color: 'blue !important' }"
              >
                队列中
              </div>
              <div
                v-else-if="row.status == 2"
                :style="{ color: 'red !important' }"
              >
                对局中
              </div>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.playerActionSheet"
        :title="tableDataRow.gamePlayerName + ' 如何操作'"
        :actions="actionSheetActions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
      />
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.civilwarActionSheet"
        :title="matchInfo.matchStatus + ' - ' + matchInfo.matchWinCamp"
      >
        <template #default>
          <div class="ranking-8747b0956746ca03e56e59d7312efcb1">
            <van-grid :border="false" :column-num="5">
              <van-grid-item
                v-for="(data, index) in matchInfo.matchDetail"
                :key="'ranking-4ca0249904c6806e15f5147a59ae6d26-' + index"
              >
                <div
                  :style="{
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                  }"
                >
                  <img
                    v-lazy="data.avatar"
                    width="35"
                    height="35"
                    class="app-border-radius"
                  />
                  <div
                    :style="
                      index < 5
                        ? { color: 'blue !important' }
                        : { color: 'red !important' }
                    "
                    class="ranking-561f33b3e8f36a8c9cdf1a5a3b099497"
                  >
                    {{ data.gamePlayerName }}
                  </div>
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </template>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingNeiZhan",
  props: {
    isSmallMode: {
      type: Boolean,
      default: false,
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
    refresh: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { isSmallMode, bid, cid, did, refresh } = this;
      return { isSmallMode, bid, cid, did, refresh };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        let agree = this.$appConfigInfo.appInfo.isReadme;

        if (agree == 1 || (agree == 1 && newValue.refresh == 1)) {
          this.getRanking(12, newValue.bid, newValue.cid, 0);
        }
      },
    },
  },
  data() {
    return {
      copyData: "",
      uin: "",
      gc: this.$route.query.gc || "",
      gameLabel: this.$route.query.gameLabel || "",
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        gamePlayerName: this.$t("loading"),
      },
      actionSheetActions: [{ name: "对局回顾", value: 0 }],
      clientHeight: 0,
      listWidth: 0,
      matchInfo: {
        gameLabel: "",
        matchStatus: 0,
        matchAddTime: "",
        matchUpdateTime: "",
        matchWinCamp: 0,
        matchDetail: [],
      },
      showInfo: {
        playerActionSheet: false,
        civilwarActionSheet: false,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(350);

    /*
      if (this.$appConfigInfo.appInfo.isReadme == 1) {
        this.getRanking(12, this.bid, this.cid, 0);
      }
    */

    if (this.gameLabel) {
      this.getCivilwarMatchInfo(this.gameLabel);

      this.showInfo.civilwarActionSheet = true;
    }
  },
  methods: {
    getRanking: function (aid = 12, bid = 0, cid = 0, did = 0) {
      let postData = {
        msgSource: this.gc,
      };

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
            did,
          this.$qs.stringify(postData)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getCivilwarMatchInfo: function (gameLabel) {
      let postData = {
        gameLabel: gameLabel,
      };

      this.$axios
        .post(
          this.$appApi.app.getCivilwarMatchInfo,
          this.$qs.stringify(postData)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.matchInfo = data;

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableCellClick: function ({ row }) {
      if (row.userId == 0) return;

      this.getPlayerInfo(row);
    },
    onActionSheetSelect: function (item) {
      let playerInfo = this.tableDataRow;

      if (item.value == 0) {
        this.$appPush({
          path:
            "/hero/999/replay?title=" +
            playerInfo.gamePlayerName +
            "&gameOpenId=" +
            playerInfo.openId +
            "&teammate=1",
        });
      }

      if (item.value == 1) {
        if (playerInfo.inscriptionUrl) {
          this.$appOpenUrl(
            this.$t("open-url.title"),
            "需要安装王者营地",
            {
              path: playerInfo.profileUrl,
            },
            0
          );
        } else {
          this.$message.info(this.$appMsg.info[1013]);
        }
      }

      if (item.value == 2) {
        if (playerInfo.inscriptionUrl) {
          this.$appOpenUrl(
            this.$t("open-url.title"),
            "需要安装王者营地",
            {
              path: playerInfo.inscriptionUrl,
            },
            0
          );
        } else {
          this.$message.info(this.$appMsg.info[1013]);
        }
      }
    },
    getPlayerInfo: function (row) {
      this.tableDataRow = row;

      this.showInfo.playerActionSheet = true;
    },
  },
};
</script>