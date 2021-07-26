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
          <template v-slot="{ row, rowIndex }">
            <van-tag
              v-if="row.tag"
              :color="row.tag.color"
              mark
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
              >{{ row.tag.text }}</van-tag
            >
            <div
              :style="{ position: 'relative' }"
              :class="
                isSmallMobile == 1
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-4a9c5e0aad3727c90e3744aeb04534ba'
                  : null
              "
            >
              <img
                v-lazy="row.avatar"
                width="50"
                height="50"
                class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
              <div class="ranking-0e1a8b3f7f6162bf4b88d3d001b88374">
                {{ rowIndex + 1 }}
              </div>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          title="巅峰分"
          field="rankScore"
          :width="$appIsMobile ? 100 : 0"
          sortable
        >
          <template v-slot="{ row }">
            <div>
              <div class="app-52b0e5c90604d59d1814f184d58e2033">
                {{ row.rankScore }}
              </div>
              <div class="ranking-420e569f7ae439ae256513412631f2f4">
                {{ row.gamePlayerName }}
              </div>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          title="常用英雄 (数据来源互联网)"
          field="commonlyUsed"
          width="325"
          align="left"
        >
          <template v-slot="{ row }">
            <div
              :class="
                isSmallMobile == 1
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-4a9c5e0aad3727c90e3744aeb04534ba'
                  : null
              "
            >
              <ul class="ranking-f138efce9d200665110c7c47b8a57811">
                <li
                  v-for="(data, index) in row.heroList.slice(0, 5)"
                  :key="'ranking-124611e2f7ddd568c28b5cb512b89be0-' + index"
                  class="ranking-80ef788ee63a7ce63e7ad1403967bf11"
                >
                  <div :style="{ position: 'relative' }">
                    <img
                      v-if="data.index <= 10"
                      width="30"
                      height="20"
                      v-lazy="'//pic.iask.cn/fimg/681882549745.jpg'"
                      class="ranking-be66eb32605e1f12853a2ad4ac9ccddc"
                    />
                    <span
                      v-if="data.index <= 10"
                      class="ranking-5cb6f4cb579d8c69b973e0fec7239056"
                    >
                      {{ data.index }}
                    </span>
                    <span
                      :style="
                        data.fightPower < 10000
                          ? { marginLeft: '3px' }
                          : { marginLeft: '-1px' }
                      "
                      class="ranking-7de1b8678bf87a631bd5f2c2b70a1214"
                    >
                      {{ data.fightPower }}
                    </span>
                    <img
                      v-lazy="
                        '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                        data.heroId +
                        '/' +
                        data.heroId +
                        '.jpg'
                      "
                      width="35"
                      height="35"
                      class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
                    />
                  </div>
                </li>
              </ul>

              <div
                v-if="row.heroList.length == 0"
                class="
                  app-52b0e5c90604d59d1814f184d58e2033
                  ranking-a6c2fcca8d40c28ed46b93c2c629f0ae
                "
              >
                待更新,点击查看对局回顾 ;(
              </div>
            </div>
          </template>
        </vxe-table-column>
      </vxe-grid>
    </div>

    <div
      class="
        ranking-abb5cb2b15eb9ccfe416f0ba3da3499e
        app-52b0e5c90604d59d1814f184d58e2033
      "
    >
      <van-button
        round
        icon="share"
        size="small"
        color="linear-gradient(to right, #fd6585, #0d25b9)"
        @click="getImg"
      >
        分享图片
      </van-button>
    </div>

    <div>
      <van-dialog
        v-model="showInfo.shareImg"
        @confirm="showInfo.shareImg = false"
      >
        <div class="ranking-3ab42c8325a264730406e37e1f731f70"></div>
      </van-dialog>
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
import html2canvas from "html2canvas";

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
        { name: "查看 QQ", value: 0 },
        { name: "对局回顾", value: 1 },
        { name: "铭文", subname: "需要安装王者营地", value: 2 },
      ],
      clientHeight: 0,
      listWidth: 0,
      showInfo: {
        shareImg: false,
        playerMenu: false,
      },
    };
  },
  created() {
    //this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(750);
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
        return (this.tableData = ranking);
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
    getImg: function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.showInfo.shareImg = true;
      this.$message.warning(this.$appMsg.warning[500]);

      html2canvas(
        document.getElementsByClassName(
          "ranking-7d87a4288bd07b77fe09098939795c8c"
        )[0],
        {
          allowTaint: true,
          scale: 1,
        }
      ).then((canvas) => {
        let shareImg = document.getElementsByClassName(
          "ranking-3ab42c8325a264730406e37e1f731f70"
        )[0];
        shareImg.innerHTML = null;
        shareImg.appendChild(canvas);

        this.$message.success(this.$appMsg.success[1006]);
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
      if (row.userId == 0) return;

      this.getPlayerInfo(row);
    },
    onActionSheetSelect: function (item) {
      let playerInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onWanJiaCopy(playerInfo);
      }

      if (item.value == 1) {
        this.$appPush({
          path:
            "/hero/999/replay?title=" +
            playerInfo.gamePlayerName +
            "&userId=" +
            playerInfo.userId +
            "&roleId=" +
            playerInfo.roleId +
            "&teammate=0",
        });
      }

      if (item.value == 2) {
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