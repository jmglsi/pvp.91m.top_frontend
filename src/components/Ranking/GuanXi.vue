<template>
  <div class="ranking-gx">
    <van-search
      v-model="searchValue"
      :placeholder="searchPlaceholder"
      @search="onSearch"
      @clear="onSearchClear"
      shape="round"
      class="app-c1130d301aabe8d6a9d46c322fd6150a"
    />

    <vxe-grid
      ref="gx-ff4a008470319a22d9cf3d14af485977"
      :loading="loading"
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

    <van-action-sheet
      v-model="actionSheetShow"
      :title="heroInfo.name_1 + ' & ' + heroInfo.name_2 + ' 如何打开'"
      :actions="actions"
      :close-on-click-action="true"
      safe-area-inset-bottom
      @select="onActionSheetSelect"
    />
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
  name: "Guanxi",
  data() {
    return {
      searchValue: "",
      searchPlaceholder: "请输入搜索关键词",
      tableData: {
        searchPlaceholder: [],
        color: {},
        result: []
      },
      actionSheetShow: false,
      actions: [
        { name: "复制信息", value: 0 },
        { name: "对局回顾", value: 1 }
      ],
      heroInfo: {},
      clientHeight: 0,
      listWidth: 0,
      copyData: "",
      loading: true
    };
  },
  created() {
    this.appHeightInit(1440);
  },
  mounted() {
    this.combinationInit();
  },
  methods: {
    combinationInit: function() {
      this.searchValue = "";

      let heroName = this.$route.query.heroName;
      if (!heroName) {
        heroName = "";
      } else {
        heroName = decodeURIComponent(heroName);
        this.searchValue = heroName;
      }

      this.getHeroCombination(heroName);

      setInterval(() => {
        let text = this.tableData.searchPlaceholder,
          textNum = text.length,
          index = Math.floor(Math.random() * textNum);

        this.searchPlaceholder = text[index];
      }, 1000 * 5);
    },
    getHeroCombination: function(heroName, type = 0) {
      this.axios
        .get(
          this.appApi.list.getHeroCombination +
            "&heroName=" +
            encodeURIComponent(heroName)
        )
        .then(ret => {
          this.tableData = ret.data.data;

          let from;
          type == 1 ? (from = "search") : (from = this.$route.query.from);

          this.$router.push({
            path: "/ranking",
            query: { type: 1, from: from, heroName: heroName }
          });

          if (heroName) document.title = heroName + " | 苏苏的荣耀助手";

          this.loading = false;
        });
    },
    getHeroInfo: function(row) {
      this.actionSheetShow = true;
      this.heroInfo = row;

      let heroName = this.searchValue;
      if (!heroName) heroName = this.heroInfo.name_1;

      this.axios
        .get(
          "https://s.91m.top/?url=" +
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
      this.searchValue = "";

      this.getHeroCombination("", 1);
    },
    onSearch: function() {
      if (!this.searchValue) return;
      if (this.searchValue.indexOf(",") > -1) {
        this.axios
          .get(
            this.appApi.list.addHeroByCombination +
              "&heroName=" +
              this.searchValue
          )
          .then(ret => {
            let code = ret.data.data.code,
              msg;
            if (code == 1) {
              msg = "添加成功";
              this.$message.success(msg);

              this.getHeroCombination("", 1);
            } else {
              if (code == 0) {
                msg = "已存在";
              }
              if (code == -1) {
                msg = "英雄名字错误";
              }
              if (code == -2) {
                msg = "格式错误,小写逗号【,】";
              }
              this.$message.error(msg);
            }
          });
      } else {
        this.getHeroCombination(this.searchValue, 1);
      }
    },
    onCellClick: function({ row }) {
      this.getHeroInfo(row);
    },
    onActionSheetSelect: function(item) {
      let heroInfo = this.heroInfo;

      if (item.value == 0) {
        this.$copyText(this.copyData);
        this.$message.success("已复制");
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