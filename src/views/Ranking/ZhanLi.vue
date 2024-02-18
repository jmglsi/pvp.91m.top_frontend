<template>
  <div class="hero-fightPower">
    <div class="ranking-e10ca73b79369d2183f81ca10fb587af">
      <vxe-table
        ref="refDianFengSai"
        id="refDianFengSai"
        :custom-config="{ storage: true }"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
      >
        <vxe-column
          title="英雄"
          field="allScore"
          fixed="left"
          width="75"
          sortable
        >
          <template #default="{ row }">
            <div
              :style="{ position: 'relative' }"
              :class="
                isSmallMode
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-0b22b207c2b785ceff7a241980f23d14'
                  : null
              "
            >
              <img
                v-lazy="{
                  //src: '/img/icons-hero/' + row.id + '.jpg',
                  //error: row.img,
                  src:
                    '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                    row.id +
                    '/' +
                    row.id +
                    '.jpg',
                }"
                width="50"
                height="50"
                class="app-border-radius ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
            </div>
          </template>
        </vxe-column>

        <vxe-column title="#" type="seq" width="50" />

        <vxe-table-colgroup
          title="国服分"
          :title-prefix="{
            content: $appMsg.tips[1024],
          }"
        >
          <vxe-column
            title="1"
            field="fightPower[0]"
            :filters="[{ value: 0 }]"
            :filter-method="onColumnFilterMethod"
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
              %
            </template>
          </vxe-column>
          <vxe-column
            title="10"
            field="fightPower[1]"
            :filters="[{ value: 0 }]"
            :filter-method="onColumnFilterMethod"
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
              %
            </template>
          </vxe-column>
          <vxe-column
            title="50"
            field="fightPower[2]"
            :filters="[{ value: 0 }]"
            :filter-method="onColumnFilterMethod"
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
              %
            </template>
          </vxe-column>
          <vxe-column
            title="100"
            field="fightPower[3]"
            :filters="[{ value: 0 }]"
            :filter-method="onColumnFilterMethod"
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
              %
            </template>
          </vxe-column>
        </vxe-table-colgroup>

        <template #empty><div v-html="msg || '暂无数据'" /></template>
      </vxe-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankingDianFengSai",
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
      immediate: true,
      handler(newValue) {
        let agree = this.$appConfigInfo.appInfo.isReadme;

        if (agree == 1 || (agree == 1 && newValue.refresh == 1)) {
          this.getRanking(19, this.bid, this.cid, this.did);
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
      skillInfo: {
        model: 1,
      },
      tipsInfo: [0, 0, 0, 0, 0, 0],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + this.time
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
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                this.time,
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
    onColumnFilterMethod: function ({ option, row, column }) {
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
  },
};
</script>