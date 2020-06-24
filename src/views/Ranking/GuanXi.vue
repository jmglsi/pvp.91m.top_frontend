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
        :loading="isLoading"
        :data="tableData.result"
        :height="clientHeight"
        :cell-class-name="cellClassName"
        :sort-config="{trigger: 'cell'}"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="英雄_1" field="adaptationRate_1" fixed="left" width="75" sortable>
          <template v-slot="{ row }">
            <img v-lazy="row.img_1" width="50" class="hero-b798abe6e1b1318ee36b0dcb3fb9e4d3" />
            <div class="row-8d777f385d3dfec8815d20f7496026dc">
              <span
                class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c row-d57964e1d6adcef4cf486eda0333b596"
              >{{ row.adaptationRate_1 }}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column title="英雄_2" field="adaptationRate_2" fixed="left" width="75" sortable>
          <template v-slot="{ row }">
            <img v-lazy="row.img_2" width="50" class="hero-b798abe6e1b1318ee36b0dcb3fb9e4d3" />
            <div class="row-8d777f385d3dfec8815d20f7496026dc">
              <span
                class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c row-d57964e1d6adcef4cf486eda0333b596"
              >{{ row.adaptationRate_2 }}</span>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column title="队友 (%)">
          <vxe-table-column
            :width="listWidth"
            :formatter="['toFixedString', 2]"
            title="出场"
            field="teammatePickRate"
            sortable
          />
          <vxe-table-column
            :width="listWidth"
            :formatter="['toFixedString', 2]"
            title="胜率"
            field="teammateWinRate"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          title="适配"
          field="adaptation"
          sortable
        />

        <vxe-table-column title="对手 (%)">
          <vxe-table-column
            :width="listWidth"
            :formatter="['toFixedString', 2]"
            title="出场"
            field="opponentPickRate"
            sortable
          />
          <vxe-table-column
            :width="listWidth"
            :formatter="['toFixedString', 2]"
            title="胜率"
            field="opponentWinRate"
            sortable
          />
        </vxe-table-column>
        <template v-slot:empty>暂无数据</template>
      </vxe-grid>
    </div>

    <div class="ranking-a803bd2018728bd6e689e0f9dc5e483c">
      <van-action-sheet
        v-model="show.actionSheet"
        :title="hero.row.name_1 + ' & ' + hero.row.name_2 + ' 如何打开'"
        :actions="actions"
        :close-on-click-action="true"
        safe-area-inset-bottom
        @select="onActionSheetSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.row-d57964e1d6adcef4cf486eda0333b596 {
  margin-left: -25px;
  margin-top: -8px;
}
</style>

<script>
export default {
  name: "RankingGuanXi",
  data() {
    return {
      search: {
        value: "",
        placeholder: "请输入搜索关键词"
      },
      tableData: {
        searchPlaceholder: [],
        color: {},
        result: []
      },
      show: {
        actionSheet: false
      },
      actions: [
        { name: "复制信息", value: 0 },
        { name: "对局回顾", value: 1 }
      ],
      hero: {
        row: {
          name_1: "加载中",
          name_2: "加载中"
        }
      },
      clientHeight: 0,
      listWidth: 0,
      copyData: "",
      isLoading: true
    };
  },
  created() {
    this.appHeightInit(1440);
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
    getHeroCombination: function(heroName) {
      this.axios
        .get(
          this.apiList.pvp.getHeroCombination +
            "&heroName=" +
            encodeURIComponent(heroName)
        )
        .then(ret => {
          this.tableData = ret.data.data;
          this.isLoading = false;

          if (heroName) document.title = heroName + " | 苏苏的荣耀助手";
        });
    },
    getHeroInfo: function(row) {
      this.show.actionSheet = true;
      this.hero.row = row;

      let heroName = this.search.value;
      if (!heroName) heroName = this.hero.row.name_1;

      this.axios
        .get(
          "//s.91m.top/?url=" +
            encodeURIComponent(
              location.origin +
                location.pathname +
                "?type=1&from=copyshare&heroName=" +
                encodeURIComponent(heroName) +
                "&heroId1=" +
                row.id_1 +
                "&heroId2=" +
                row.id_2
            )
        )
        .then(ret => {
          this.copyData =
            "英雄:" +
            row.name_1 +
            " & " +
            row.name_2 +
            "" +
            "\r-\r队友胜率:" +
            row.teammateWinRate +
            "%\r对手胜率:" +
            row.opponentWinRate +
            "%\r适配:" +
            row.adaptation +
            "\r-\r更多英雄关系 ↓\r" +
            ret.data.data.url;
        });
    },
    cellClassName: function({ row, column }) {
      let pick = this.tableData.color.pick,
        win = this.tableData.color.win;

      if (
        column.property === "teammatePickRate" ||
        column.property === "opponentPickRate"
      ) {
        if (row.teammatePickRate >= pick || row.opponentPickRate >= pick) {
          return "col-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property === "teammateWinRate") {
        if (row.teammatePickRate >= pick && row.teammateWinRate >= win) {
          return "col-9f27410725ab8cc8854a2769c7a516b8";
        }
      }

      if (column.property === "opponentWinRate") {
        if (row.opponentPickRate >= pick && row.opponentWinRate >= win) {
          return "col-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onSearchClear: function() {
      this.search.value = "";

      this.getHeroCombination("");
    },
    onSearch: function() {
      let searchValue = this.search.value;

      if (!searchValue) return;
      if (searchValue.indexOf(",") > -1) {
        this.axios
          .get(
            this.apiList.pvp.addHeroByCombination + "&heroName=" + searchValue
          )
          .then(ret => {
            let code = ret.data.data.code,
              msg;
            if (code == 1) {
              this.$message.success("添加成功");

              this.getHeroCombination("");
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
    onCellClick: function({ row }) {
      this.getHeroInfo(row);
    },
    onActionSheetSelect: function(item) {
      let heroInfo = this.hero.row;

      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }

      if (item.value == 1) {
        this.$router.push({
          path: "/hero/" + heroInfo.id_1 + "," + heroInfo.id_2 + "/replay",
          query: { from: "ee240fe51687ee66cca7493aedcc3c24" }
        });
      }
    }
  }
};
</script>