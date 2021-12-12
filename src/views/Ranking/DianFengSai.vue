<template>
  <div class="ranking-dfs app-dfs">
    <div class="ranking-e20c0bfa2eeda7a13463d390a5bbfc4f">
      <vxe-toolbar ref="refXToolbar" custom />
    </div>

    <div class="ranking-e10ca73b79369d2183f81ca10fb587af">
      <vxe-table
        ref="refDianFengSai"
        id="refDianFengSai"
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :cell-class-name="cellClassName"
        :custom-config="{ storage: true }"
        :height="clientHeight"
        @cell-click="onCellClick"
        @custom="toolbarCustomEvent"
      >
        <vxe-column
          title="英雄"
          field="allScore"
          fixed="left"
          width="75"
          sortable
        >
          <template #default="{ row }">
            <van-tag
              v-if="row.tag.text"
              :color="row.tag.color"
              mark
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
              >{{ row.tag.text }}</van-tag
            >

            <div
              :style="{ position: 'relative' }"
              :class="
                isSmallMode
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-0b22b207c2b785ceff7a241980f23d14'
                  : null
              "
            >
              <img
                v-lazy="row.img"
                width="50"
                height="50"
                class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
              <img
                v-if="row.trend > 0"
                v-lazy="'/img/app-icons/hot_' + row.trend + '.png'"
                width="15"
                height="15"
                class="ranking-3d5f1ffeadf58eb64ef57aef7e53a31e"
              />
              <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                <img
                  v-lazy="row.skill.preview[0].img"
                  width="15"
                  height="15"
                  class="
                    ranking-95a25d46f98b0ec553d892cc45037d57
                    ranking-35af5e6c0fc290aa4f2e38d4c8296a03
                  "
                />
                <span
                  class="
                    app-0fc3cfbc27e91ea60a787de13dae3e3c
                    app-5f19eaf71f40d74d66be84db52b3ad87
                    ranking-043052eea2d064cab23119e56f4f640e
                  "
                >
                  {{ row.skill.preview[0].pickRate }}%
                </span>
                <img
                  v-lazy="row.skill.preview[1].img"
                  width="15"
                  height="15"
                  class="
                    ranking-95a25d46f98b0ec553d892cc45037d57
                    ranking-fbfe7b256ce6b4df1d03d8022163c6d2
                  "
                />
                <span
                  class="
                    app-0fc3cfbc27e91ea60a787de13dae3e3c
                    app-5f19eaf71f40d74d66be84db52b3ad87
                    ranking-dabb6e25dffefe5b4821b7062afbdaef
                  "
                >
                  {{ row.skill.preview[1].pickRate }}%
                </span>
              </div>
            </div>
          </template>
        </vxe-column>

        <vxe-column title="#" type="seq" width="50" />

        <vxe-table-colgroup title="出场越低，波动越大 (%)">
          <vxe-column
            title="禁用"
            field="allBanRate"
            :filters="[{ data: 0 }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.data"
                v-for="(option, index) in column.filters"
                :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.data, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-column>
          <vxe-column
            title="出场"
            field="allPickRate"
            :filters="[{ data: 0 }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.data"
                v-for="(option, index) in column.filters"
                :key="'hero-f55d5cafb56611ebf0534588e49d4121-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.data, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
            <template #default="{ row }">
              <div :style="{ position: 'relative' }">
                <div class="app-9ec86c2c7ff0fcaa177028a0b2d091b8">
                  {{ row.allPickRate }}
                </div>
                <span
                  v-if="row.change.updateType != 0"
                  :style="
                    row.change.updateType == 2
                      ? { color: 'red' }
                      : { color: 'blue' }
                  "
                  class="app-b0704b59dbf144bfeffb53bdb11d7128"
                >
                  {{
                    (row.change.updateType == 2 ? "+" : "-") +
                    Math.abs(row.change.updateValue)
                  }}
                </span>
                <img
                  v-if="row.change.updateType != 0"
                  v-lazy="
                    '/img/app-icons/hot_' + row.change.updateType + '.png'
                  "
                  width="15"
                  height="15"
                  class="
                    app-db21bca782a535e91eb87f56b8abdc45
                    app-32595defa680e058a9db0aaae36d6f46
                  "
                />
              </div>
            </template>
          </vxe-column>
          <vxe-column
            title="禁选"
            field="allBPRate"
            :filters="[{ data: 1, checked: true }]"
            :filter-method="filterMethod"
            width="100"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.data"
                v-for="(option, index) in column.filters"
                :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.data, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-column>
          <vxe-column
            title="胜率"
            field="allWinRate"
            :filters="[{ data: 0 }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.data"
                v-for="(option, index) in column.filters"
                :key="'hero-6b557157ba74177968c0e2cb78fa87b7-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.data, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-column>
        </vxe-table-colgroup>

        <vxe-table-colgroup title="牌子 (%)">
          <vxe-column
            title="全部"
            field="allBrandRate"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="金牌"
            field="evaluateGoldRate"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="银牌"
            field="evaluateSilverRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="MVP (%)">
          <vxe-column
            title="全部"
            field="allMvpRate"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="胜方"
            field="winMvpRate"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="败方"
            field="loseMvpRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-column
          title="承伤"
          field="totalBeHurtedCntPerMin"
          :width="listWidth"
          sortable
        />

        <vxe-table-colgroup title="伤害">
          <vxe-column
            title="全部"
            field="totalOutputPerMin"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="对人"
            field="totalHurtHeroCntPerMin"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="金币">
          <vxe-column
            title="全部"
            field="equMoneyOverflow"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="分均"
            field="equMoneyMin"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="KDA">
          <vxe-column
            title="击杀"
            field="killCnt"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="死亡"
            field="deadCnt"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="助攻"
            field="assistCnt"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="其他">
          <vxe-column
            title="参团"
            field="joinGamePercent"
            :width="listWidth"
            sortable
          />
          <vxe-column
            title="时长"
            field="usedtime"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>
      </vxe-table>
    </div>

    <div class="ranking-ffab85bb31b6936dee15c689b1581675">
      <van-action-sheet
        v-model="showInfo.skillMenu"
        :title="tableDataRow.name + ' 的其他数据 (近期)'"
        safe-area-inset-bottom
      >
        <van-tabs
          v-model="skillInfo.model"
          v-if="skillInfo.model > -1"
          :ellipsis="false"
          @change="onSkillTabsChange"
        >
          <van-tab title="技能">
            <HeroSkillList
              v-if="cellInfo.index == 0 && skillInfo.model == 0"
              :heroId="tableDataRow.id"
            />
          </van-tab>
          <van-tab title="出装 (推荐)">
            <HeroEquipmentListALL
              v-if="cellInfo.index == 0 && skillInfo.model == 1"
              :heroId="tableDataRow.id"
            />
          </van-tab>
          <van-tab title="装备 (单件)">
            <HeroEquipmentListOne
              v-if="cellInfo.index == 0 && skillInfo.model == 2"
              :equipmentId="tableDataRow.id"
              :equipmentType="1"
            />
          </van-tab>
          <van-tab title="铭文 (推荐)">
            <HeroInscriptionList
              v-if="skillInfo.model == 3"
              :heroId="tableDataRow.id"
            />
          </van-tab>
        </van-tabs>
      </van-action-sheet>
    </div>

    <div class="ranking-2a070514f71e4c264a78b600fc9a8e0d">
      <van-action-sheet
        v-model="showInfo.heroMenu"
        :title="tableDataRow.name + ' (' + tableDataRow.id + ') 如何操作'"
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
  name: "RankingDianFengSai",
  components: {
    HeroSkillList: () => import("@/components/Hero/SkillList.vue"),
    HeroEquipmentListALL: () =>
      import("@/components/Hero/EquipmentList_All.vue"),
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
    HeroInscriptionList: () => import("@/components/Hero/InscriptionList.vue"),
  },
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
      immediate: false,
      handler(newValue) {
        if (newValue.refresh == 1) {
          this.getRanking(0, newValue.bid, newValue.cid, newValue.did);
        }
      },
    },
  },
  data() {
    return {
      tableData: {
        color: {},
        column: [],
        columns: [],
        loading: true,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        id: 0,
        name: "加载中...",
      },
      actions: [
        { name: "趋势", value: 0 },
        { name: "搜一搜", value: 1 },
        { name: "更新记录", subname: "NGA @EndMP", value: 2 },
        { name: "攻速阈值", subname: "NGA @小熊de大熊", value: 3 },
      ],
      listWidth: 0,
      clientHeight: 0,
      showInfo: {
        skillMenu: false,
        heroMenu: false,
      },
      cellInfo: {
        index: 0,
      },
      tabsInfo: {
        model: 0,
      },
      skillInfo: {
        model: 0,
      },
      tipsInfo: [0, 0, 0, 0],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.initTableWidth();

    this.$nextTick(() => {
      this.$refs.refDianFengSai.connect(this.$refs.refXToolbar);
    });
    //手动将表格和工具栏进行关联

    this.getRanking(0, this.bid, this.cid, this.did);
  },
  mounted() {},
  methods: {
    initTableWidth: function () {
      this.listWidth = this.$appInitTableWidth(1450);

      if (localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE == undefined) return;

      let tableColumn = JSON.parse(
        localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE
      );

      if (tableColumn["refDianFengSai"] == undefined) return;

      let visibleColumn = tableColumn.refDianFengSai.split(",");

      !this.$appIsMobile && visibleColumn.length > 6
        ? (this.listWidth = 0)
        : (this.listWidth = 90);
    },
    toolbarCustomEvent: function (params) {
      switch (params.type) {
        case "confirm": {
          //确认
          break;
        }
        case "reset": {
          //重置
          break;
        }
        case "close": {
          //关闭
          break;
        }
      }

      this.initTableWidth();
    },
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.tableData = ls);
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
            this.tableData.updateTime = ts;

            //this.$refs.refDianFengSai.loadData(data.result.rows);

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.tableData
            );

            this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });

      if (bid == 3 && cid == 0) {
        this.$message.info(this.$appMsg.info[1011]);
      }
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "allBanRate") {
        return row.allBanRate >= option.data;
      }

      if (column.property == "allBPRate") {
        return row.allBPRate >= option.data;
      }

      if (column.property == "allPickRate") {
        return row.allPickRate >= option.data;
      }

      if (column.property == "allWinRate") {
        return row.allWinRate >= option.data;
      }
    },
    cellClassName: function ({ row, column }) {
      let color = this.tableData.result.color;

      if (column.property == "allBanRate") {
        if (row.allBanRate >= color.ban) {
          return "app-bda9643ac6601722a28f238714274da4";
        }
      }

      if (column.property == "allPickRate") {
        if (row.allPickRate >= color.pick && row.allWinRate >= color.win) {
          return "app-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property == "allBPRate") {
        if (row.allBPRate >= color.bp) {
          return "app-ee3e4aec9bcaaaf72cd0c59e8a0f477d";
        }
      }

      if (column.property == "allWinRate") {
        if (
          (row.allBanRate >= color.ban || row.allPickRate >= color.pick) &&
          row.allWinRate >= color.win
        ) {
          return "app-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onCellClick: function ({ row, column }) {
      this.tableDataRow = row;

      if (column.property == "allScore") {
        this.cellInfo.index = 0;

        if (row.id == 999) {
          this.showInfo.skillMenu = false;
          this.showInfo.heroMenu = true;
        } else {
          this.showInfo.skillMenu = true;
          this.showInfo.heroMenu = false;
        }
      } else {
        this.cellInfo.index = 1;

        this.showInfo.skillMenu = false;
        this.showInfo.heroMenu = true;
      }
    },
    onSkillTabsChange: function (e) {
      let tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1009];
      } else if (e == 3) {
        tipsText = this.$appMsg.info[1010];
      }

      if (this.tipsInfo[e] == 0) {
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
    onActionSheetSelect: function (item) {
      let heroInfo = this.tableDataRow;

      if (item.value == 0) {
        this.$appPush({ path: "/hero/" + heroInfo.id + "/info" });
      }

      if (item.value == 1) {
        this.$appPush({
          path: "/search?q=" + heroInfo.name,
          query: { refresh: 1 },
        });
      }

      if (item.value == 2) {
        this.$appOpenUrl(
          "是否查看英雄更新记录?",
          "NGA @EndMP",
          {
            path: "//ngabbs.com/read.php?pid=" + heroInfo.updateId,
          },
          0
        );
      }

      if (item.value == 3) {
        this.$appOpenUrl(
          "是否打开外部链接?",
          "NGA @小熊de大熊",
          {
            path: "//ngabbs.com/read.php?tid=12677614",
          },
          0
        );
      }
    },
  },
};
</script>