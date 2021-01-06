<template>
  <div class="ranking-dfs">
    <div class="ranking-851095463bdd8ecc4ef18c2b243949ce">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="areaInfo.model"
          :options="areaInfo.options"
          @change="onDropdownMenuChange"
        />
        <van-dropdown-item
          v-model="positionInfo.model"
          :options="positionInfo.options"
          @change="onDropdownMenuChange"
        />
      </van-dropdown-menu>
    </div>

    <div class="ranking-e20c0bfa2eeda7a13463d390a5bbfc4f">
      <vxe-toolbar ref="xToolbar" custom />
    </div>

    <div class="ranking-e10ca73b79369d2183f81ca10fb587af">
      <vxe-grid
        ref="dianfengsai"
        id="dianfengsai"
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :cell-class-name="cellClassName"
        :custom-config="{ storage: true }"
        :sort-config="{ trigger: 'cell' }"
        :height="clientHeight"
        @cell-click="onCellClick"
        @custom="toolbarCustomEvent"
      >
        <vxe-table-column
          title="英雄"
          field="score"
          fixed="left"
          width="75"
          sortable
        >
          <template v-slot="{ row }">
            <van-tag
              v-if="row.tag.text"
              :color="row.tag.color"
              mark
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
              >{{ row.tag.text }}</van-tag
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
                width="20"
                height="20"
                class="ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c ranking-043052eea2d064cab23119e56f4f640e"
                >{{ row.skill.preview[0].pickRate }}</span
              >
              <img
                v-lazy="row.skill.preview[1].img"
                width="20"
                height="20"
                class="ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c ranking-dabb6e25dffefe5b4821b7062afbdaef"
                >{{ row.skill.preview[1].pickRate }}</span
              >
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="50" />

        <vxe-table-column title="BP率越低,波动越大 (%)">
          <vxe-table-column
            title="禁用"
            field="banRate"
            :filters="[{ data: 0 }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template v-slot:filter="{ $panel, column }">
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
          </vxe-table-column>
          <vxe-table-column
            title="出场"
            field="pickRate"
            :filters="[{ data: 0 }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template v-slot:filter="{ $panel, column }">
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
          </vxe-table-column>
          <vxe-table-column
            title="BP率"
            field="bpRate"
            :filters="[{ data: 1, checked: true }]"
            :filter-method="filterMethod"
            width="100"
            sortable
          >
            <template v-slot:filter="{ $panel, column }">
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
          </vxe-table-column>
          <vxe-table-column
            title="胜率"
            field="winRate"
            :filters="[{ data: 0 }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template v-slot:filter="{ $panel, column }">
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
          </vxe-table-column>
        </vxe-table-column>

        <vxe-table-column title="牌子 (%)">
          <vxe-table-column
            title="全部"
            field="allBrandRate"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="金牌"
            field="evaluateGoldRate"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="银牌"
            field="evaluateSilverRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column title="MVP (%)">
          <vxe-table-column
            title="全部"
            field="allMvpRate"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="净胜"
            field="winMvpRate"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="败方"
            field="loseMvpRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column
          title="承伤"
          field="totalBeHurtedCntPerMin"
          :width="listWidth"
          sortable
        />

        <vxe-table-column title="伤害">
          <vxe-table-column
            title="全部"
            field="totalOutputPerMin"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="对人"
            field="totalHurtHeroCntPerMin"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column title="经济">
          <vxe-table-column
            title="全部"
            field="equMoneyOverflow"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="分均"
            field="equMoneyMin"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column title="KDA">
          <vxe-table-column
            title="击杀"
            field="killCnt"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="死亡"
            field="deadCnt"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="助攻"
            field="assistCnt"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column title="其他">
          <vxe-table-column
            title="参团"
            field="joinGamePercent"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="时长"
            field="usedtime"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>
      </vxe-grid>
    </div>

    <div class="ranking-ffab85bb31b6936dee15c689b1581675">
      <van-action-sheet
        v-model="showInfo.heroSkill"
        :title="tableData.row.name + ' 的其他数据 (上周)'"
        safe-area-inset-bottom
      >
        <van-tabs v-model="skillInfo.model" @change="onSkillChange">
          <van-tab title="技能">
            <HeroSkillList
              v-if="cellInfo.index == 0 && skillInfo.model == 0"
              :heroId="tableData.row.id"
          /></van-tab>
          <van-tab title="装备 (推荐)"
            ><HeroEquipmentListALL
              v-if="cellInfo.index == 0 && skillInfo.model == 1"
              :heroId="tableData.row.id"
          /></van-tab>
          <van-tab title="装备 (单件)"
            ><HeroEquipmentListOne
              v-if="cellInfo.index == 0 && skillInfo.model == 2"
              :heroId="tableData.row.id"
          /></van-tab>
        </van-tabs>
      </van-action-sheet>
    </div>

    <div class="ranking-2a070514f71e4c264a78b600fc9a8e0d">
      <van-action-sheet
        v-model="showInfo.heroMenu"
        :title="tableData.row.name + ' (' + tableData.row.id + ') 如何操作'"
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
    HeroSkillList: (resolve) =>
      require(["@/components/Hero/SkillList.vue"], resolve),
    HeroEquipmentListALL: (resolve) =>
      require(["@/components/Hero/EquipmentList_All.vue"], resolve),
    HeroEquipmentListOne: (resolve) =>
      require(["@/components/Hero/EquipmentList_One.vue"], resolve),
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
        clockwise: false,
        row: {
          id: 0,
          name: "加载中",
          skill: [],
          clockwise: false,
          updateId: 0,
        },
      },
      actions: [
        { name: "英雄详情", value: 0 },
        { name: "对局回顾", value: 1 },
        { name: "赛事数据", value: 2 },
        { name: "更新记录", subname: "NGA @EndMP", value: 3 },
        { name: "攻速阈值", subname: "NGA @小熊de大熊", value: 4 },
      ],
      listWidth: 0,
      clientHeight: 0,
      areaInfo: {
        model: 4,
        options: [
          { text: "全部 (昨日)", value: 0 },
          { text: "手 Q (昨日)", value: 1 },
          { text: "微信 (昨日)", value: 2 },
          { text: "推荐 (昨日)", value: 3 },
          { text: "全部 (上周)", value: 4 },
          { text: "全部 (上月)", value: 5 },
        ],
      },
      positionInfo: {
        model: 0,
        options: [
          { text: "全部分路 ω' )و", value: 0 },
          { text: "对抗路 (战士)", value: 1 },
          { text: "中路", value: 2 },
          { text: "对抗路 (坦克)", value: 3 },
          { text: "打野", value: 4 },
          { text: "发育路", value: 5 },
          { text: "游走", value: 6 },
        ],
      },
      showInfo: {
        heroSkill: false,
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
      tipsInfo: [0, 0, 0],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight();
    this.initTableWidth();

    this.$nextTick(() => {
      this.$refs.dianfengsai.connect(this.$refs.xToolbar);
    });
    //手动将表格和工具栏进行关联
  },
  mounted() {
    this.getRanking(this.areaInfo.model, this.positionInfo.model);
  },
  methods: {
    initTableWidth: function () {
      this.listWidth = this.$appInitTableWidth(1450);

      if (localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE == undefined) return;

      let tableColumn = JSON.parse(
        localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE
      );

      if (tableColumn["dianfengsai"] == undefined) return;

      let visibleColumn = tableColumn.dianfengsai.split(",");

      !this.$isMobile && visibleColumn.length > 6
        ? (this.listWidth = 0)
        : (this.listWidth = 90);
    },
    toolbarCustomEvent: function (params) {
      this.initTableWidth();

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
    },
    getRanking: function (bid, cid, aid = 0) {
      this.$axios
        .post(
          this.$appApi.pvp.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid
        )
        .then((res) => {
          let data = res.data.data;

          this.tableData = data;
          this.tableData.loading = false;
          this.tableData.row = {
            id: 0,
            name: "加载中",
            updateId: 0,
          };

          //this.$refs.dianfengsai.loadData(data.result.rows);
        });

      if (bid == 3 && cid == 0) {
        this.$message.info(this.$appMsg.info[1011]);
      }
    },
    filterMethod({ option, row, column }) {
      if (column.property == "bpRate") {
        return row.bpRate >= option.data;
      }

      if (column.property == "banRate") {
        return row.banRate >= option.data;
      }

      if (column.property == "pickRate") {
        return row.pickRate >= option.data;
      }

      if (column.property == "winRate") {
        return row.winRate >= option.data;
      }
    },
    onDropdownMenuChange: function () {
      this.getRanking(this.areaInfo.model, this.positionInfo.model);
    },
    onCellClick: function ({ row, column }) {
      this.tableData.row = row;

      if (column.property == "score") {
        this.showInfo.heroSkill = true;
        this.showInfo.heroMenu = false;
        this.cellInfo.index = 0;
      } else {
        this.showInfo.heroSkill = false;
        this.showInfo.heroMenu = true;
        this.cellInfo.index = 1;
      }
    },
    cellClassName: function ({ row, column }) {
      let color = this.tableData.result.color;

      if (column.property == "banRate") {
        if (row.banRate >= color.ban && row.winRate >= color.win) {
          return "ranking-ee3e4aec9bcaaaf72cd0c59e8a0f477d";
        }
      }

      if (column.property == "pickRate") {
        if (row.pickRate >= color.pick) {
          return "ranking-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property == "bpRate") {
        if (row.bpRate >= color.bp) {
          return "ranking-bda9643ac6601722a28f238714274da4";
        }
      }

      if (column.property == "winRate") {
        if (
          (row.banRate >= color.ban || row.pickRate >= color.pick) &&
          row.winRate >= color.win
        ) {
          return "ranking-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onSkillChange: function () {
      let tipsText,
        e = this.skillInfo.model || 0;

      if (e == 0) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1009];
      }

      if (this.tipsInfo[e] == 0) {
        this.$message.info(tipsText);
        this.tipsInfo[e] = 1;
      }
    },
    onActionSheetSelect: function (item) {
      let heroInfo = this.tableData.row;

      if (item.value == 0) {
        this.$appPush({ path: "/hero/" + heroInfo.id + "/info" });
      }

      if (item.value == 1) {
        this.$appPush({
          path: "/hero/" + heroInfo.id + "/replay",
          query: {
            replayTitle: heroInfo.name,
            teammate: "0",
          },
        });
      }

      if (item.value == 2) {
        this.$appOpenUrl("是否查看英雄赛事数据?", "玩加电竞", {
          path:
            "//www.wanplus.com/static/app/community/share.html?header_type=5&id=" +
            heroInfo.id +
            "&tab_type=5&gm=kog&gametype=6&tag_id=0",
        });
      }

      if (item.value == 3) {
        this.$appOpenUrl("是否查看英雄更新记录?", "NGA @EndMP", {
          path: "//nga.178.com/read.php?pid=" + heroInfo.updateId,
        });
      }

      if (item.value == 4) {
        this.$appOpenUrl("是否查看英雄攻速阈值?", "NGA @小熊de大熊", {
          path: "//bbs.nga.cn/read.php?tid=12677614",
        });
      }
    },
  },
};
</script>
