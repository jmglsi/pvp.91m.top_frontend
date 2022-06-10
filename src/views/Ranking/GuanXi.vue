<template>
  <div class="ranking-gx app-gx">
    <div class="ranking-78117a02d15f1dffe5263f47a220c56b">
      <vxe-table
        ref="refGuanXi"
        :cell-class-name="cellClassName"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        @cell-click="onCellClick"
      >
        <vxe-table-colgroup
          fixed="left"
          :title="heroName ? heroName : '推荐'"
          :title-help="{ content: $appMsg.tips[1009] }"
        >
          <vxe-table-column
            field="hero_1"
            :title="heroName ? '和' : '1'"
            :filters="[
              { data: 1, label: '对抗路' },
              { data: 2, label: '中路' },
              //{ data: 3, label: '对抗路 (坦克)' },
              { data: 4, label: '打野' },
              { data: 5, label: '发育路' },
              { data: 6, label: '游走' },
            ]"
            :filter-method="filterMethod"
            width="75"
          >
            <template #default="{ row }">
              <div
                :style="{ position: 'relative' }"
                :class="
                  isSmallMode
                    ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-5d308b6a0da77ffb33c63fc542f58746'
                    : null
                "
              >
                <img
                  v-lazy="row.hero_1.img"
                  width="50"
                  height="50"
                  class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
                />
                <span
                  class="
                    app-0fc3cfbc27e91ea60a787de13dae3e3c
                    app-5f19eaf71f40d74d66be84db52b3ad87
                    ranking-f58cc48f5b942c91e57eff48accc5151
                  "
                >
                  {{ row.hero_1.adaptationRate }}
                </span>
              </div>
            </template>
          </vxe-table-column>

          <vxe-table-column
            field="hero_2"
            :title="heroName ? '↓' : '2'"
            :filters="[
              { data: 1, label: '对抗路' },
              { data: 2, label: '中路' },
              //{ data: 3, label: '对抗路 (坦克)' },
              { data: 4, label: '打野' },
              { data: 5, label: '发育路' },
              { data: 6, label: '游走' },
            ]"
            :filter-method="filterMethod"
            width="75"
          >
            <template #default="{ row }">
              <div
                :style="{ position: 'relative' }"
                :class="
                  isSmallMode
                    ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-5d308b6a0da77ffb33c63fc542f58746'
                    : null
                "
              >
                <img
                  v-lazy="row.hero_2.img"
                  width="50"
                  height="50"
                  class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
                />
                <span
                  class="
                    app-0fc3cfbc27e91ea60a787de13dae3e3c
                    app-5f19eaf71f40d74d66be84db52b3ad87
                    ranking-f58cc48f5b942c91e57eff48accc5151
                  "
                >
                  {{ row.hero_2.adaptationRate }}
                </span>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>

        <vxe-table-column title="#" type="seq" width="50" />

        <vxe-table-colgroup
          title="队友 (%)"
          :title-help="{ content: $appMsg.tips[1005] }"
        >
          <vxe-table-column
            title="出场"
            field="teammatePickRate"
            :filters="[{ data: 0.25, checked: true }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
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
            <template #filter="{ $panel, column }">
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
        </vxe-table-colgroup>

        <vxe-table-column
          title="适配"
          field="adaptation"
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
              :key="'hero-37fbc8af6b6e2b2129d0a5462d2fe2dd-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.data, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
          </template>
        </vxe-table-column>

        <vxe-table-colgroup
          title="对手 (%)"
          :title-help="{
            content:
              '两个英雄不同队伍时，【' +
              (heroName ? heroName : '1') +
              '】的数据',
          }"
        >
          <vxe-table-column
            title="出场"
            field="opponentPickRate"
            :filters="[{ data: 0.25, checked: true }]"
            :filter-method="filterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
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
            <template #filter="{ $panel, column }">
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
        </vxe-table-colgroup>
      </vxe-table>
    </div>

    <div class="ranking-a803bd2018728bd6e689e0f9dc5e483c">
      <van-action-sheet
        v-model="showInfo.heroMenu"
        :title="
          tableDataRow.hero_1.name +
          ' 和 ' +
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
  props: {
    isSmallMode: {
      type: Boolean,
      default: false,
    },
    heroName: {
      type: String,
      default: "",
    },
    refresh: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { isSmallMode, heroName, refresh } = this;
      return { isSmallMode, heroName, refresh };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        let agree = this.$cookie.get("agree");

        if (agree == 1 || (agree == 1 && newValue.refresh == 1)) {
          this.getRanking(1, 0, 0, 0, newValue.heroName);
        }
      },
    },
  },
  data() {
    return {
      copyData: null,
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
        color: {},
      },
      tableDataRow: {
        hero_1: {
          name: "加载中...",
        },
        hero_2: {
          name: "加载中...",
        },
      },
      actions: [
        { name: "复制链接", value: 0 },
        { name: "对局回顾", value: 1 },
      ],
      clientHeight: 0,
      listWidth: 0,
      showInfo: {
        heroMenu: false,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(750);

    /*
      if (this.$cookie.get("agree") == 1) {
        this.getRanking(1, 0, 0, 0, this.heroName);
      }
    */
  },
  methods: {
    getRanking: function (aid = 1, bid = 0, cid = 0, did = 0, heroName = null) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroName
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.tableData = ls);
      }

      this.tableData.loading = true;

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
            did +
            "&heroName=" +
            encodeURIComponent(heroName)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                heroName,
              this.tableData
            );

            if (heroName) {
              document.title = heroName + " | " + appConfigInfo.appInfo.name;
            }

            this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getHeroInfo: function (row) {
      this.tableDataRow = row;

      this.showInfo.heroMenu = true;
    },
    onGuanXiCopy: function () {
      let row = this.tableDataRow,
        heroName = row.hero_1.name,
        url = location,
        longUrl =
          url.origin +
          url.pathname +
          "?type=1&heroName=" +
          encodeURIComponent(heroName) +
          "&heroId1=" +
          row.hero_1.id +
          "&heroId2=" +
          row.hero_2.id;

      this.$axios
        .post(this.$appApi.pvp.getShortUrl, {
          url: longUrl,
        })
        .then((res) => {
          let shortUrl = res.data.data.url;

          this.copyData =
            "英雄:" +
            row.hero_1.name +
            " 和 " +
            row.hero_2.name +
            "\n-\n队友 时 一起 的胜率:" +
            row.teammateWinRate +
            "%\n对手 时 " +
            row.hero_1.name +
            " 的胜率:" +
            row.opponentWinRate +
            "%\n适配:" +
            row.adaptation +
            "\n-\n" +
            shortUrl;

          this.$appCopyData(this.copyData);
        });
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "hero_1") {
        return row.hero_1.type === option.data;
      }

      if (column.property == "hero_2") {
        return row.hero_2.type === option.data;
      }

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
          return "app-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property == "teammateWinRate") {
        if (
          row.teammatePickRate >= color.pick &&
          row.teammateWinRate >= color.win
        ) {
          return "app-9f27410725ab8cc8854a2769c7a516b8";
        }
      }

      if (column.property == "opponentWinRate") {
        if (
          row.opponentPickRate >= color.pick &&
          row.opponentWinRate >= color.win
        ) {
          return "app-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onCellClick: function ({ row }) {
      this.getHeroInfo(row);
    },
    onActionSheetSelect: function (item) {
      let heroInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onGuanXiCopy();
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
            title: heroInfo.hero_1.name + " 和 " + heroInfo.hero_2.name,
            teammate: "1",
          },
        });
      }
    },
  },
};
</script>