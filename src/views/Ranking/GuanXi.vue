<template>
  <div class="ranking-gx">
    <div class="ranking-a260d093db7878f26c178fc3d23829c6">
      <van-search
        v-model="search.value"
        :placeholder="search.placeholder"
        @search="onSearch"
        @clear="onSearchClear"
        shape="round"
        class="app-c1130d301aabe8d6a9d46c322fd6150a"
      />
    </div>

    <div class="ranking-78117a02d15f1dffe5263f47a220c56b">
      <vxe-grid
        ref="guanxi"
        auto-resize
        :loading="isLoading"
        :data="tableData.result.rows"
        :height="clientHeight"
        :cell-class-name="cellClassName"
        :sort-config="{ trigger: 'cell' }"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="英雄_1" fixed="left" width="75" sortable>
          <template v-slot="{ row }">
            <img
              v-lazy="row.hero_1.img"
              width="50"
              height="50"
              class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
            <span
              class="app-0fc3cfbc27e91ea60a787de13dae3e3c ranking-f58cc48f5b942c91e57eff48accc5151"
              >{{ row.hero_1.adaptationRate }}</span
            >
          </template>
        </vxe-table-column>
        <vxe-table-column title="英雄_2" fixed="left" width="75" sortable>
          <template v-slot="{ row }">
            <img
              v-lazy="row.hero_2.img"
              width="50"
              height="50"
              class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
            <span
              class="app-0fc3cfbc27e91ea60a787de13dae3e3c ranking-f58cc48f5b942c91e57eff48accc5151"
              >{{ row.hero_2.adaptationRate }}</span
            >
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column title="队友 (%)">
          <vxe-table-column
            title="出场"
            field="teammatePickRate"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="胜率"
            field="teammateWinRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column title="适配" field="adaptation" :width="listWidth" sortable />

        <vxe-table-column title="对手 (%)">
          <vxe-table-column
            title="出场"
            field="opponentPickRate"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="胜率"
            field="opponentWinRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>
        <template v-slot:empty>暂无数据</template>
      </vxe-grid>
    </div>

    <div class="ranking-a803bd2018728bd6e689e0f9dc5e483c">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :title="
          tableData.row.hero_1.name + ' & ' + tableData.row.hero_2.name + ' 如何操作'
        "
        :actions="actions"
        :close-on-click-action="true"
        safe-area-inset-bottom
        @select="onActionSheetSelect"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingGuanXi",
  data() {
    return {
      search: {
        value: "",
        placeholder: "请输入搜索关键词",
      },
      tableData: {
        searchPlaceholder: [],
        color: {},
        result: [],
        row: {
          hero_1: {
            name: "加载中",
          },
          hero_2: {
            name: "加载中",
          },
        },
      },
      showInfo: {
        actionSheet: false,
      },
      actions: [
        { name: "复制信息", value: 0 },
        { name: "对局回顾", value: 1 },
      ],
      clientHeight: 0,
      listWidth: 0,
      copyData: "",
      isLoading: true,
    };
  },
  created() {
    this.initAppTable();
    this.initGuanXiTable();
  },
  mounted() {
    let heroName = this.$route.query.heroName;

    if (!heroName) {
      heroName = "";
    }
    this.getHeroCombination(heroName);

    setInterval(() => {
      let text = this.tableData.searchPlaceholder;

      this.search.placeholder = text[Math.floor(Math.random() * text.length)];
    }, 1000 * 5);
  },
  methods: {
    initGuanXiTable: function () {
      this.appDevice ? (this.listWidth = 100) : (this.listWidth = 0);
    },
    getHeroCombination: function (heroName) {
      this.search.value = heroName;

      this.axios
        .get(
          this.apiList.pvp.getHeroCombination +
            "&heroName=" +
            encodeURIComponent(heroName)
        )
        .then((res) => {
          this.tableData = res.data.data;
          this.tableData.row = {
            hero_1: {
              name: "加载中",
            },
            hero_2: {
              name: "加载中",
            },
          };

          if (heroName) document.title = heroName + " | 苏苏的荣耀助手";

          this.isLoading = false;
        });
    },
    getHeroInfo: function (row) {
      this.tableData.row = row;

      let heroName = this.search.value;

      if (!heroName) heroName = this.tableData.row.hero_1.name;

      this.axios
        .get(
          "//s.91m.top/?url=" +
            encodeURIComponent(
              location.origin +
                location.pathname +
                "?type=1&heroName=" +
                encodeURIComponent(heroName) +
                "&heroId1=" +
                row.hero_1.id +
                "&heroId2=" +
                row.hero_2.id
            )
        )
        .then((res) => {
          this.copyData =
            "英雄:" +
            row.hero_1.name +
            " & " +
            row.hero_2.name +
            "" +
            "\r-\r队友胜率:" +
            row.teammateWinRate +
            "%\r对手胜率:" +
            row.opponentWinRate +
            "%\r适配:" +
            row.adaptation +
            "\r-\r更多英雄关系 ↓\r" +
            res.data.data.url;
        });

      this.showInfo.actionSheet = true;
    },
    cellClassName: function ({ row, column }) {
      let color = this.tableData.result.color;

      if (
        column.property === "teammatePickRate" ||
        column.property === "opponentPickRate"
      ) {
        if (row.teammatePickRate >= color.pick || row.opponentPickRate >= color.pick) {
          return "ranking-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property === "teammateWinRate") {
        if (row.teammatePickRate >= color.pick && row.teammateWinRate >= color.win) {
          return "ranking-9f27410725ab8cc8854a2769c7a516b8";
        }
      }

      if (column.property === "opponentWinRate") {
        if (row.opponentPickRate >= color.pick && row.opponentWinRate >= color.win) {
          return "ranking-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onSearchClear: function () {
      this.search.value = "";

      this.getHeroCombination("");
    },
    onSearch: function () {
      let searchValue = this.search.value;

      if (!searchValue) return;
      if (searchValue.indexOf(",") > -1) {
        this.axios
          .get(this.apiList.pvp.addHeroByCombination + "&heroName=" + searchValue)
          .then((res) => {
            let code = res.data.data.code,
              msg;

            if (code == 1) {
              this.getHeroCombination("");

              this.$message.success("添加成功");
            } else {
              if (code == 0) {
                msg = "关系已存在";
              }
              if (code == -1) {
                msg = "英雄名错误";
              }
              if (code == -2) {
                msg = "格式错误,小写逗号【,】";
              }

              this.$message.error("错误:1004," + msg);
            }
          });
      } else {
        this.getHeroCombination(searchValue);
      }
    },
    onCellClick: function ({ row }) {
      this.getHeroInfo(row);
    },
    onActionSheetSelect: function (item) {
      let heroInfo = this.tableData.row;

      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }

      if (item.value == 1) {
        this.appPush(
          "/hero/" + heroInfo.hero_1.id + "," + heroInfo.hero_2.id + "/replay"
        );
      }
    },
  },
};
</script>
