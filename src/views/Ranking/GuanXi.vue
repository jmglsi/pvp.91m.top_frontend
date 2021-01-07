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
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :height="clientHeight"
        :cell-class-name="cellClassName"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="英雄" fixed="left">
          <vxe-table-column title="1" field="heroId_1" width="75">
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
          <vxe-table-column title="2" field="heroId_2" width="75">
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
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="50" />

        <vxe-table-column title="队友 (%)">
          <vxe-table-column
            title="出场"
            field="teammatePickRate"
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
                :key="'hero-9fa4d8f5c751c67e15e1b44b680fe5a0-' + index"
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
            field="teammateWinRate"
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
                :key="'hero-39443bf307387782e1d78103a8853493-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.data, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>
        </vxe-table-column>

        <vxe-table-column
          title="适配"
          field="adaptation"
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
              :key="'hero-37fbc8af6b6e2b2129d0a5462d2fe2dd-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.data, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
          </template>
        </vxe-table-column>

        <vxe-table-column title="对手 (%)">
          <vxe-table-column
            title="出场"
            field="opponentPickRate"
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
                :key="'hero-7b5fe4548b7ec10f94494337d3698b67-' + index"
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
            field="opponentWinRate"
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
                :key="'hero-9e27252bc4e939c2253951d3f6692fb2-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.data, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>
        </vxe-table-column>
      </vxe-grid>
    </div>

    <div class="ranking-a803bd2018728bd6e689e0f9dc5e483c">
      <van-action-sheet
        v-model="showInfo.heroMenu"
        :title="
          tableDataRow.hero_1.name +
          ' & ' +
          tableDataRow.hero_2.name +
          ' 如何操作'
        "
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
        loading: true,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        hero_1: {
          name: "加载中",
        },
        hero_2: {
          name: "加载中",
        },
      },
      actions: [
        { name: "复制链接", value: 0 },
        { name: "对局回顾", value: 1 },
      ],
      clientHeight: 0,
      listWidth: 0,
      copyData: "",
      showInfo: {
        heroMenu: false,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight();
    this.listWidth = this.$appInitTableWidth(750);
  },
  mounted() {
    let heroName = this.$route.query.heroName || "";

    this.getRanking(heroName);

    setInterval(() => {
      let text = this.tableData.searchPlaceholder;

      this.search.placeholder = text[Math.floor(Math.random() * text.length)];
    }, 5000);
  },
  methods: {
    getRanking: function (heroName, aid = 2) {
      this.search.value = heroName;

      this.$axios
        .post(
          this.$appApi.pvp.getRanking +
            "&aid=" +
            aid +
            "&heroName=" +
            encodeURIComponent(heroName)
        )
        .then((res) => {
          if (heroName) document.title = heroName + " | " + this.$appInfo.name;

          this.tableData = res.data.data;

          this.tableData.loading = false;
        });
    },
    getHeroInfo: function (row) {
      this.tableDataRow = row;
      this.showInfo.heroMenu = true;
    },
    onCopyHeroInfo: function (row) {
      let heroName = this.search.value || row.hero_1.name,
        longUrl =
          location.origin +
          location.pathname +
          "?type=1&heroName=" +
          encodeURIComponent(heroName) +
          "&heroId1=" +
          row.hero_1.id +
          "&heroId2=" +
          row.hero_2.id;

      this.$appGetShortUrl(
        longUrl,
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
          "\r-\r更多英雄关系 ↓"
      );
    },
    filterMethod({ option, row, column }) {
      if (column.property == "teammatePickRate") {
        return row.teammatePickRate >= option.data;
      }

      if (column.property == "teammateWinRate") {
        return row.teammateWinRate >= option.data;
      }

      if (column.property == "adaptation") {
        return row.adaptation >= option.data;
      }

      if (column.property == "opponentPickRate") {
        return row.opponentPickRate >= option.data;
      }

      if (column.property == "opponentWinRate") {
        return row.opponentWinRate >= option.data;
      }
    },
    cellClassName: function ({ row, column }) {
      let color = this.tableData.result.color;

      if (
        column.property == "teammatePickRate" ||
        column.property == "opponentPickRate"
      ) {
        if (
          row.teammatePickRate >= color.pick ||
          row.opponentPickRate >= color.pick
        ) {
          return "ranking-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property == "teammateWinRate") {
        if (
          row.teammatePickRate >= color.pick &&
          row.teammateWinRate >= color.win
        ) {
          return "ranking-9f27410725ab8cc8854a2769c7a516b8";
        }
      }

      if (column.property == "opponentWinRate") {
        if (
          row.opponentPickRate >= color.pick &&
          row.opponentWinRate >= color.win
        ) {
          return "ranking-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onSearchClear: function () {
      this.search.value = "";

      this.getRanking("");
    },
    onSearch: function () {
      let searchValue = this.search.value || "";

      this.getRanking(searchValue);
    },
    onCellClick: function ({ row }) {
      this.getHeroInfo(row);
    },
    onActionSheetSelect: function (item) {
      let heroInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onCopyHeroInfo(heroInfo);
      }

      if (item.value == 1) {
        this.$appPush({
          path:
            "/hero/" +
            heroInfo.hero_1.id +
            "," +
            heroInfo.hero_2.id +
            "/replay",
          query: {
            replayTitle: heroInfo.hero_1.name + " 和 " + heroInfo.hero_2.name,
            teammate: "1",
          },
        });
      }
    },
  },
};
</script>
