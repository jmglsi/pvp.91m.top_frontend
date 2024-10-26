<template>
  <div class="ranking-wj app-wj">
    <div class="ranking-7d87a4288bd07b77fe09098939795c8c">
      <vxe-table
        ref="refWanJia"
        id="refWanJia"
        :custom-config="{ storage: true }"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        @cell-click="onTableCellClick"
      >
        <vxe-table-column
          title="玩家"
          field="userId"
          fixed="left"
          :filters="[
            { value: 0, label: '普通' },
            { value: 1, label: '职业' },
            { value: 2, label: '主播' },
          ]"
          :filter-method="onTableColumnFilterMethod"
          width="75"
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
              :style="{
                position: 'relative',
              }"
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
                crossorigin="anonymous"
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
          title="巅峰分"
          field="rankScore"
          :width="$appIsMobile ? 100 : 0"
          sortable
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
                  :color="
                    $appConfigInfo.positionInfo[row.positionList[0] || 0][1] ||
                    'black'
                  "
                >
                  {{
                    $appConfigInfo.positionInfo[row.positionList[0] || 0][0] ||
                    $t("unknown")
                  }}
                </van-tag>
              </div>

              <div class="app-52b0e5c90604d59d1814f184d58e2033">
                {{ row.rankScore }}
              </div>
              <div
                class="app-5f19eaf71f40d74d66be84db52b3ad87 ranking-420e569f7ae439ae256513412631f2f4"
              >
                {{ row.gamePlayerName }}
              </div>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          title="常用 | 点击可同步备战 (出装、铭文)"
          field="commonlyUsed"
          width="325"
          align="left"
        >
          <template #default="{ row }">
            <div
              :class="
                isSmallMode
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-4a9c5e0aad3727c90e3744aeb04534ba'
                  : null
              "
            >
              <ul class="ranking-f138efce9d200665110c7c47b8a57811">
                <li
                  v-for="(data, index) in row.heroList.slice(0, 5)"
                  :key="'ranking-124611e2f7ddd568c28b5cb512b89be0-' + index"
                  @click="getRankingBySuit(row, data.heroId)"
                  class="ranking-80ef788ee63a7ce63e7ad1403967bf11"
                >
                  <a-dropdown :trigger="['click']">
                    <div
                      :style="{
                        position: 'relative',
                      }"
                    >
                      <img
                        v-if="data.index <= 100"
                        v-lazy="data.fightPowerIcon"
                        width="30"
                        height="20"
                        crossorigin="anonymous"
                        class="ranking-be66eb32605e1f12853a2ad4ac9ccddc"
                      />
                      <span
                        v-if="data.index <= 100"
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
                        class="app-5f19eaf71f40d74d66be84db52b3ad87 ranking-7de1b8678bf87a631bd5f2c2b70a1214"
                      >
                        {{ data.fightPower }}
                      </span>
                      <img
                        v-lazy="{
                          //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data.heroId + '/' + data.heroId + '.jpg',
                          src:
                            '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                            data.heroId +
                            '/' +
                            data.heroId +
                            '.jpg',
                        }"
                        width="35"
                        height="35"
                        crossorigin="anonymous"
                        class="app-border-radius ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
                      />
                    </div>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item
                          v-for="(data, index) in suitActionSheetActions"
                          :key="
                            'ranking-31d3689c01b543a417ec7571237a436d-' + index
                          "
                          @click="
                            $appOpenUrl(
                              $t('open-url.title'),
                              '查看英雄备战 (出装、铭文)',
                              { path: data.url },
                              0
                            )
                          "
                        >
                          {{ data.name }}
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item
                          key="ranking-31d3689c01b543a417ec7571237a436d-4"
                          @click="
                            $appPush({
                              path: '/search',
                              query: {
                                q: data.heroId,
                                show: 'heroSkill',
                                refresh: 1,
                              },
                            })
                          "
                        >
                          国服战力排行
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </li>
              </ul>

              <div
                v-if="row.heroList.length == 0"
                class="app-52b0e5c90604d59d1814f184d58e2033 ranking-a6c2fcca8d40c28ed46b93c2c629f0ae"
              >
                待更新，点击查看对局回顾
              </div>
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <div
      class="ranking-abb5cb2b15eb9ccfe416f0ba3da3499e app-52b0e5c90604d59d1814f184d58e2033"
    >
      <van-button
        round
        icon="share"
        size="mini"
        color="linear-gradient(to right, rgb(18, 194, 233), rgb(196, 113, 237))"
        @click="getPlayerList"
      >
        分享图片
      </van-button>
      &nbsp;
      <van-button
        round
        icon="aim"
        size="mini"
        color="linear-gradient(to right, rgb(196, 113, 237), rgb(246, 79, 89))"
        @click="onHeroListActionSheetSelect"
      >
        英雄分布
      </van-button>

      <div class="ranking-2862744e5d7cce9d070aa41172557d78">
        国服数据由
        <span
          :style="{
            color: '#1989fa !important',
          }"
          @click="
            $appPush({
              path: '/friends',
              query: { openId: 'f2abc2e39c22c3879df227abfc8d7d34' },
            })
          "
        >
          @暴走的巅峰赛
        </span>
        提供
      </div>
    </div>

    <div class="ranking-707bf3cdee24b2a21ec613ec27c66a11">
      <van-dialog
        v-model="showInfo.shareImg"
        @confirm="showInfo.shareImg = false"
      >
        <div class="ranking-3ab42c8325a264730406e37e1f731f70" />
      </van-dialog>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.playerActionSheet"
        :title="tableDataRow.gamePlayerName + ' 如何操作'"
        :actions="playerActionSheetActions"
        :close-on-click-action="true"
        @select="onPlayerMenuActionSheetSelect"
      />
    </div>

    <div class="ranking-9ba6e31a929c8c8d48edbc31d01824ad">
      <van-action-sheet
        v-model="showInfo.heroList"
        :title="'大佬们在玩什么 - 出场 ' + allHeroList.length + ' 个英雄'"
        @select="onHeroListActionSheetSelect"
      >
        <template #default>
          <div class="ranking-8747b0956746ca03e56e59d7312efcb1">
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                v-for="(data, index) in allHeroList"
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
                    v-lazy="{
                      //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data[0] + '/' + data[0] + '.jpg',
                      src:
                        '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                        data[0] +
                        '/' +
                        data[0] +
                        '.jpg',
                    }"
                    width="45"
                    height="45"
                    crossorigin="anonymous"
                    class="app-border-radius"
                  />
                  <div class="ranking-51c877f489423eb1c3901dd0e12c03d4">
                    {{ data[1] }}
                    <span class="ranking-004599265c459e7f8f865e2bd40c82fb">
                      人
                    </span>
                    &nbsp; ({{
                      ((data[1] / allHeroList.length) * 100).toFixed(2)
                    }}%)
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
import html2canvas from "html2canvas";

export default {
  name: "rankingWanJia",
  props: {
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
    isSmallMode: {
      type: Boolean,
      default: false,
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
          this.getRanking(2, newValue.bid, newValue.cid, 0);
        }
      },
    },
  },
  data() {
    return {
      allHeroList: [],
      allPositionList: [],
      allHeroNum: 0,
      allPositionNum: 0,
      copyData: "",
      uin: "",
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        gamePlayerName: this.$t("loading"),
      },
      playerActionSheetActions: [
        { name: "对局回顾", value: 0 },
        { name: "查看主页", subname: "需要安装王者营地", value: 1 },
      ],
      suitActionSheetActions: [],
      clientHeight: 0,
      listWidth: 0,
      showInfo: {
        playerActionSheet: false,
        shareImg: false,
        heroList: false,
      },
    };
  },
  created() {
    //this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(750);

    /*
      if (this.$appConfigInfo.appInfo.isReadme == 1) {
        this.getRanking(2, this.bid, this.cid, 0);
      }
    */
  },
  methods: {
    getRanking: function (aid = 2, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.tableData = ls;

        this.getHeroList(ls.result.rows);

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
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.tableData
            );

            this.getHeroList(data.result.rows);

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getRankingBySuit: function (
      e,
      heroId = 111,
      aid = 10,
      bid = 1,
      cid = 0,
      did = 0
    ) {
      if (e.roleId == 0) return;

      this.$message.info(this.$appMsg.info[1029]);

      this.suitActionSheetActions = [];

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
            e.roleId +
            "&heroId=" +
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData_suit = data;

            data.result.rows.map((x, i) => {
              this.suitActionSheetActions.push({
                value: i,
                name: x.name,
                subname: "第 " + (i + 1) + " 套备战",
                url: x.url,
              });
            });
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "userId") {
        return row.tag.type == option.value;
      }
    },
    onTableCellClick: function ({ row, column }) {
      if (row.userId == 0) return;

      this.tableDataRow = row;

      if (column.property == "commonlyUsed") {
        this.showInfo.playerActionSheet = false;
      } else {
        this.showInfo.playerActionSheet = true;
      }
    },
    onPlayerMenuActionSheetSelect: function (item) {
      let playerInfo = this.tableDataRow;

      if (item.value == 0) {
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

      if (item.value == 1) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "需要安装王者营地",
          { path: playerInfo.profileUrl },
          0
        );
      }
    },
    onHeroListActionSheetSelect: function () {
      this.showInfo.heroList = true;
    },
    getHeroList: function (e) {
      let newHeroList = {},
        newPositionList = {},
        heroId = 0,
        o = [],
        g = [];

      e.map((x) => {
        o = x.heroList;
        g = x.positionList;

        this.allHeroNum += o.length;
        this.allPositionNum += g.length;

        o.map((y) => {
          heroId = y.heroId;

          if (heroId in newHeroList) {
            newHeroList[heroId] += 1;
          } else {
            newHeroList[heroId] = 1;
          }
        });

        g.map((k) => {
          if (k in newPositionList) {
            newPositionList[k] += 1;
          } else {
            newPositionList[k] = 1;
          }
        });
      });

      this.allHeroList = Object.entries(newHeroList).sort(
        (a, b) => b[1] - a[1]
      );

      this.allPositionList = Object.entries(newPositionList).sort(
        (a, b) => b[1] - a[1]
      );
      //转数组、降序
    },
    getPlayerList: function () {
      let topNum = this.tableData.result.rows.length;

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.showInfo.shareImg = true;
      this.$message.warning(this.$appMsg.warning[500]);

      html2canvas(
        document.getElementsByClassName(
          "ranking-7d87a4288bd07b77fe09098939795c8c"
        )[0],
        {
          useCORS: true,
          //allowTaint: true,
          scale: 2,
        }
      ).then((canvas) => {
        let shareImg = document.getElementsByClassName(
          "ranking-3ab42c8325a264730406e37e1f731f70"
        )[0];
        shareImg.innerHTML = null;
        shareImg.appendChild(canvas);

        canvas.toBlob(
          function (blob) {
            const eleLink = document.createElement("a");
            eleLink.download = "top" + topNum + ".png";
            eleLink.style.display = "none";
            eleLink.href = URL.createObjectURL(blob);
            //触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            //然后移除
            document.body.removeChild(eleLink);
          },
          "image/png",
          1
        );

        this.$message.success(this.$appMsg.success[1006]);
      });
    },
  },
};
</script>