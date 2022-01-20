<template>
  <div class="hero-position app-position">
    <vxe-table
      ref="refHeroPosition"
      :loading="tableData.loading"
      :data="tableData.result.rows"
      height="543"
    >
      <vxe-table-column title="分路" field="id" fixed="left" width="75">
        <template #default="{ row }">
          {{ positionInfo[row.id] }}
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-colgroup title="比率 (%)">
        <vxe-table-column
          title="占比"
          field="pickRate"
          :width="listWidth"
          sortable
        >
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <div class="app-9ec86c2c7ff0fcaa177028a0b2d091b8">
                {{ row.pickRate }}
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
                v-lazy="'/img/app-icons/hot_' + row.change.updateType + '.png'"
                width="15"
                height="15"
                class="
                  app-db21bca782a535e91eb87f56b8abdc45
                  app-32595defa680e058a9db0aaae36d6f46
                "
              />
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          title="胜率"
          field="winRate"
          :width="listWidth"
          sortable
        />
      </vxe-table-colgroup>

      <vxe-table-colgroup title="MVP (%)">
        <vxe-table-column
          title="净胜"
          field="mvpRate"
          :width="listWidth"
          sortable
        />
      </vxe-table-colgroup>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: "HeroPosition",
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId } = this;
      return { heroId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.heroId) return;

        if (this.$cookie.get("agree") == 1) {
          this.getRanking(newValue.heroId, 13, 0, 0, 0);
        }
      },
    },
  },
  data() {
    return {
      listWidth: 0,
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      positionInfo: ["对抗路", "中路", "发育路", "打野", "游走"],
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(350);
  },
  methods: {
    getRanking: function (heroId = 111, aid = 13, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
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
            "&heroId=" +
            heroId
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
                heroId,
              this.tableData
            );
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/my" }, 1);
          }
        });
    },
  },
};
</script>