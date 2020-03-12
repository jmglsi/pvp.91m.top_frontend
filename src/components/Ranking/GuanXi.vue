<template>
  <div class="ranking-guanxi">
    <van-search
      v-model="searchValue"
      :placeholder="searchPlaceholder"
      shape="round"
      @search="onSearch"
      @clear="onClear"
      class="app-top-search"
    />

    <vxe-grid
      ref="ranking-guanxi"
      :loading="loading"
      :data="tableData.list"
      :height="clientHeight"
      :cell-class-name="cellClassName"
      :sort-config="{trigger: 'cell'}"
      @cell-click="onCellClick"
    >
      <vxe-table-column
        title="英雄1"
        field="adaptationRate1"
        fixed="left"
        width="75"
        sortable
      >
        <template v-slot="{ row }">
          <img
            v-lazy="row.img1"
            width="50"
            class="app-img"
          />
          <div class="row-rate">
            <span class="bottom-num adaptation-rate">
              {{ row.adaptationRate1 }}
            </span>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column
        title="英雄2"
        field="adaptationRate2"
        fixed="left"
        width="75"
        sortable
      >
        <template v-slot="{ row }">
          <img
            v-lazy="row.img2"
            width="50"
            class="app-img"
          />
          <div class="row-rate">
            <span class="bottom-num adaptation-rate">
              {{ row.adaptationRate2 }}
            </span>
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-column
        title="#"
        type="seq"
        width="75"
      />

      <vxe-table-column title="队友 (%)">
        <vxe-table-column
          title="出场"
          field="teammatePickRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
        <vxe-table-column
          title="胜率"
          field="teammateWinRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
      </vxe-table-column>

      <vxe-table-column
        title="适配"
        field="adaptation"
        :width="listWidth"
        :formatter="['toFixedString', 2]"
        sortable
      />

      <vxe-table-column title="对手 (%)">
        <vxe-table-column
          title="出场"
          field="opponentPickRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
        <vxe-table-column
          title="胜率"
          field="opponentWinRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
      </vxe-table-column>
      <template v-slot:empty>暂无数据</template>
    </vxe-grid>

    <van-action-sheet
      :title="heroInfo.name1 + ' & ' + heroInfo.name2 + ' 的其它数据'"
      v-model="actionSheetShow"
      safe-area-inset-bottom
      class="app-action-sheet"
    >
      <van-cell
        title="复制信息"
        v-clipboard:copy="copyData"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        is-link
      />
      <van-cell
        title="对局回顾"
        :to="'/heroReplay/' + heroInfo.id1 + ',' + heroInfo.id2 + '?from=ranking-action-sheet'"
        is-link
      />
    </van-action-sheet>
  </div>
</template>

<style scoped>
.adaptation-rate {
  margin-left: -25px;
  margin-top: -8px;
}
</style>

<script>
export default {
  name: "Guanxi",
  data () {
    return {
      searchValue: "",
      searchPlaceholder: "请输入搜索关键词",
      tableData: {
        searchPlaceholder: [],
        color: {},
        list: []
      },
      actionSheetShow: false,
      heroInfo: {},
      clientHeight: 0,
      listWidth: 0,
      copyData: "",
      loading: true
    };
  },
  created () {
    this.appHeightInit(1440);
  },
  mounted () {
    this.combinationInit();
  },
  methods: {
    combinationInit: function () {
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
        let text = this.tableData.searchPlaceholder, textNum = text.length, index = Math.floor(Math.random() * textNum);

        this.searchPlaceholder = text[index];
      }, 1000 * 5);
    },
    getHeroCombination: function (heroName, type = 0) {
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
    getHeroInfo: function (row) {
      this.actionSheetShow = true;
      this.heroInfo = row;

      let heroName = this.searchValue;
      if (!heroName) heroName = this.heroInfo.name1;

      this.axios
        .get(
          "https://s.91m.top/?url=" +
          encodeURIComponent(
            location.origin +
            location.pathname +
            "?type=1&from=copyshare&heroName=" +
            encodeURIComponent(heroName) +
            "&heroId1=" +
            row.id1 +
            "&heroId2=" +
            row.id2
          )
        )
        .then(ret => {
          this.copyData =
            "英雄:" +
            row.name1 +
            " & " +
            row.name2 +
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
    cellClassName: function ({ row, column }) {
      let pick = this.tableData.color.pick, win = this.tableData.color.win;

      if (
        column.property === "teammatePickRate" ||
        column.property === "opponentPickRate"
      ) {
        if (row.teammatePickRate >= pick || row.opponentPickRate >= pick) {
          return "col-blue";
        }
      }

      if (column.property === "teammateWinRate") {
        if (row.teammatePickRate >= pick && row.teammateWinRate >= win) {
          return "col-green";
        }
      }

      if (column.property === "opponentWinRate") {
        if (row.opponentPickRate >= pick && row.opponentWinRate >= win) {
          return "col-green";
        }
      }
    },
    onClear: function () {
      this.searchValue = "";

      this.getHeroCombination("", 1);
    },
    onSearch: function () {
      if (!this.searchValue) return;
      if (this.searchValue.indexOf(",") > -1) {
        this.axios
          .get(
            this.appApi.list.addHeroByCombination +
            "&heroName=" +
            this.searchValue
          )
          .then(ret => {
            let code = ret.data.data.code, msg;
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
    onCopy: function () {
      this.$message.success("复制成功");
      this.actionSheetShow = false;
    },
    onError: function () {
      this.$message.error("复制失败");
    },
    onCellClick: function ({ row }) {
      this.getHeroInfo(row);
    }
  }
};
</script>