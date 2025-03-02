<template>
  <div class="hero-fightPower">
    <div class="ranking-e10ca73b79369d2183f81ca10fb587af">
      <vxe-table
        ref="refWzryZhanLi"
        id="refWzryZhanLi"
        :custom-config="{ storage: true }"
        :expand-config="{ accordion: true }"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        @cell-click="onTableCellClick"
      >
        <vxe-column
          field="allScore"
          title="#"
          width="75"
          sortable
        >
          <template #default="{ row, rowIndex }">
            <div
              :style="{
                position: 'relative',
              }"
              :class="
                isSmallMode
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-0b22b207c2b785ceff7a241980f23d14'
                  : null
              "
            >
              <img
                v-lazy="{
                  //error: row.img,
                  src: row.img,
                }"
                width="50"
                height="50"
                class="app-border-radius ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
              <div
                class="app-5f19eaf71f40d74d66be84db52b3ad87 app-0e1a8b3f7f6162bf4b88d3d001b88374"
              >
                {{ rowIndex + 1 }}
              </div>
            </div>
          </template>
        </vxe-column>

        <vxe-table-colgroup
          title="国服分"
          :title-prefix="{
            content: $appMsg.tips[1024],
          }"
        >
          <vxe-column
            field="fightPower[0]"
            title="1"
            :filters="[{ value: 0 }]"
            :filter-method="onTableColumnFilterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
            </template>
          </vxe-column>
          <vxe-column
            field="fightPower[1]"
            title="10"
            :filters="[{ value: 0 }]"
            :filter-method="onTableColumnFilterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-f55d5cafb56611ebf0534588e49d4121-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
            </template>
          </vxe-column>
          <vxe-column
            field="fightPower[2]"
            title="50"
            :filters="[{ value: 0 }]"
            :filter-method="onTableColumnFilterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
            </template>
          </vxe-column>
          <vxe-column
            field="fightPower[3]"
            title="100"
            :filters="[{ value: 0 }]"
            :filter-method="onTableColumnFilterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-6b557157ba74177968c0e2cb78fa87b7-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
            </template>
          </vxe-column>
        </vxe-table-colgroup>

        <vxe-column field="more" type="expand" title="更多" width="80">
          <template #content="{ row }">
            <div class="ranking-19c5e5344dbdca6ef8d9ba5d989aea4d">
              <ChartsHeroLine :extraId="row.id" :aid="1" />
            </div>
          </template>
        </vxe-column>

        <!--
        <vxe-column title="#" type="seq" width="50" />
        -->

        <template #empty><div v-html="msg || '暂无数据'" /></template>
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
        @click="onShareButtonClick"
      >
        分享图片
      </van-button>
    </div>

    <div class="ranking-707bf3cdee24b2a21ec613ec27c66a11">
      <van-dialog
        v-model="showInfo.shareImg"
        @confirm="showInfo.shareImg = false"
      >
        <div class="ranking-3ab42c8325a264730406e37e1f731f70" />
      </van-dialog>
    </div>

    <div class="ranking-ffab85bb31b6936dee15c689b1581675">
      <van-action-sheet
        v-model="showInfo.skillActionSheet"
        :description="
          tableDataRow.name +
          ' 的备战 (' +
          $appConfigInfo.appInfo.updateInfo.weekly +
          ' 更新，可能有老数据)'
        "
      >
        <template #default>
          <van-tabs
            v-model="extraInfo.model"
            v-if="extraInfo.model > -1"
            :ellipsis="false"
            @click="onTabsClick"
          >
            <div v-if="$appGameType == 'wzry'">
              <van-tab title="顺位">
                <GameWzryHeroBPIndex
                  v-if="cellInfo.index == 0 && extraInfo.model == 0"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab title="打法">
                <GameWzryHeroGenreList
                  v-if="cellInfo.index == 0 && extraInfo.model == 1"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab title="出装">
                <GameWzryHeroEquipmentListALL
                  v-if="cellInfo.index == 0 && extraInfo.model == 2"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab title="出装 (单件)">
                <GameWzryHeroEquipmentListOne
                  v-if="cellInfo.index == 0 && extraInfo.model == 3"
                  :extraId="tableDataRow.id"
                  :extraType="1"
                />
              </van-tab>
              <van-tab>
                <template #title>
                  <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                    国服 (备战)
                  </span>
                  <img
                    v-lazy="$appCache + '/img/icons-app/hot.png'"
                    width="13"
                    height="13"
                  />
                </template>

                <GameWzryHeroInscriptionList
                  v-if="cellInfo.index == 0 && extraInfo.model == 4"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab
                title="更新调整"
                :to="'/hero/' + tableDataRow.id + '/info?show=heroUpdate'"
              >
                <!--
                <div class="app-0cecd2d48b0c852a513d34eec25042b7">
                  <HeroUpdate
                    v-if="cellInfo.index == 0 && extraInfo.model == 5"
                    :extraId="tableDataRow.id"
                    :updateId="tableDataRow.updateId"
                    :aid="1"
                  />
                </div>
              -->
              </van-tab>
            </div>
          </van-tabs>
        </template>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  name: "rankingZhanLi",
  components: {
    ChartsHeroLine: () => import("@/components/Charts/Wzry/HeroLine.vue"),
    GameWzryHeroBPIndex: () =>
      import("@/components/Game/Wzry/Hero/BPIndex.vue"),
    GameWzryHeroEquipmentListALL: () =>
      import("@/components/Game/Wzry/Hero/EquipmentList_All.vue"),
    GameWzryHeroEquipmentListOne: () =>
      import("@/components/Game/Wzry/Hero/EquipmentList_One.vue"),
    GameWzryHeroGenreList: () =>
      import("@/components/Game/Wzry/Hero/GenreList.vue"),
    GameWzryHeroInscriptionList: () =>
      import("@/components/Game/Wzry/Hero/InscriptionList.vue"),
  },
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
          //if (newValue.refresh == 1) {
          this.getRanking(19, this.bid, this.cid, this.did, this.time);
        }
      },
    },
  },
  data() {
    return {
      msg: "",
      time: this.$route.query.t || "",
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
        color: {},
        column: [],
        columns: [],
      },
      tableDataRow: {
        id: null,
        name: this.$t("loading"),
      },
      actionSheetActions: [
        { name: "趋势", subname: "左下角关注一下", value: 0 },
        { name: "搜一搜", subname: "看看都在聊什么", value: 1 },
        { name: "更新记录", subname: "NGA @EndMP", value: 2 },
        { name: "攻速阈值", subname: "NGA @小熊de大熊", value: 3 },
      ],
      listWidth: 0,
      clientHeight: 0,
      cellInfo: {
        index: 0,
      },
      tabsInfo: {
        model: 0,
      },
      showInfo: {
        shareImg: false,
        skillActionSheet: false,
      },
      extraInfo: {
        model: 1,
      },
      tipsInfo: [0, 0, 0, 0, 0, 0],
    };
  },
  created() {
    //this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0, time = "") {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + time
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        if (aid == 15) {
          this.progressData = ls;
        } else {
          this.tableData = ls;
        }

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
            did,
          this.$qs.stringify({
            t: this.time,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + time,
              this.tableData
            );

            if (aid == 0) {
              //this.$message.success(this.$appMsg.success[1005]);

              if (this.time) {
                this.$message.info(this.$appMsg.info[1030]);
              }
            }
          } else if ([2006, 2015].indexOf(status.code) > -1) {
            this.tableData.loading = false;
            this.msg = status.msg;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "fightPower[0]") {
        return row.fightPower[0] >= option.value;
      }

      if (column.property == "fightPower[1]") {
        return row.fightPower[1] >= option.value;
      }

      if (column.property == "fightPower[2]") {
        return row.fightPower[2] >= option.value;
      }

      if (column.property == "fightPower[3]") {
        return row.fightPower[3] >= option.value;
      }
    },
    onTableCellClick: function ({ row, column }) {
      this.tableDataRow = row;

      if (row.id && row.id < 900 && column.field != "more") {
        this.showInfo.skillActionSheet = true;
      } else {
        this.showInfo.skillActionSheet = false;
      }
    },
    onTabsClick: function (e) {
      let tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1014];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 3) {
        tipsText = this.$appMsg.info[1009];
      } else if (e == 4) {
        tipsText = this.$appMsg.info[1010];
      } else if (e == 5) {
        tipsText = this.$appMsg.info[1028];
      }

      if (tipsText && this.tipsInfo[e] == 0) {
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
    onShareButtonClick: function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.showInfo.shareImg = true;
      this.$message.warning(this.$appMsg.warning[500]);

      html2canvas(
        document.getElementsByClassName(
          "ranking-e10ca73b79369d2183f81ca10fb587af"
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
            eleLink.download = "shareImg.png";
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