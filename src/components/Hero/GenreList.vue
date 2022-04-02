<template>
  <div class="hero-genre app-genre">
    <vxe-table
      ref="refHeroGenre"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      height="543"
    >
      <vxe-table-colgroup
        title="流派"
        fixed="left"
        :title-help="{ content: $appMsg.tips[1003] }"
      >
        <vxe-table-column title="技能" field="skillId" width="75" sortable>
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <img
                v-lazy="
                  row.skillId == 0
                    ? '//ae03.alicdn.com/kf/H79634bb28539419db2dd990a6131404cF.png'
                    : '//image.ttwz.qq.com/images/skill/' + row.skillId + '.png'
                "
                width="25"
                height="25"
                class="hero-genre-4dba5f40eab9da71ab3d5db2d3883093"
              />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column title="分路" field="positionId" width="75" sortable>
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              {{ positionInfo[row.positionId] }}
            </div>
          </template>
        </vxe-table-column>
      </vxe-table-colgroup>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-colgroup
        title="比率 (%)"
        :title-help="{
          content: $appMsg.tips[1004] + '\n' + $appMsg.tips[1011],
        }"
      >
        <vxe-table-column
          title="占比"
          field="pickRate"
          :filters="[{ data: 2.5, checked: true }]"
          :filter-method="filterMethod"
          :width="listWidth"
          sortable
        >
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.data"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-92423e1b31d3e7fdac76d2ac26c45699-' + index"
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
          :filters="[{ data: 40, checked: true }]"
          :filter-method="filterMethod"
          :width="listWidth"
          sortable
        >
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.data"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-92423e1b31d3e7fdac76d2ac26c45699-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.data, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
        </vxe-table-column>
      </vxe-table-colgroup>

      <vxe-table-colgroup title="MVP (%)">
        <vxe-table-column
          title="胜方"
          field="mvpRate"
          :width="listWidth"
          sortable
        />
      </vxe-table-colgroup>

      <template #empty>
        <div class="app-b0b345803bbcaebeb0bd65253594cfc9">
          <a-checkbox :checked="showInfo.checked" @change="onAgreeChange">
            我已经阅读并同意
            <a href="//www.yuque.com/jmglsi/pvp/yyxgbh#NPkLH" target="_blank">
              《隐私和数据声明》
            </a>
          </a-checkbox>
        </div>
      </template>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: "HeroGenre",
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
          this.getRanking(newValue.heroId, 14, 0, 0, 0);
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
      showInfo: {
        checked: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    getRanking: function (heroId = 111, aid = 14, bid = 0, cid = 0, did = 0) {
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
    filterMethod: function ({ option, row, column }) {
      if (column.property == "pickRate") {
        return row.pickRate >= option.data;
      }

      if (column.property == "winRate") {
        return row.winRate >= option.data;
      }
    },
    onAgreeChange: function () {
      let nowChecked = false,
        nowChecked_int = 0;

      if (this.showInfo.checked == true) {
        nowChecked = false;
        nowChecked_int = 0;
      } else {
        nowChecked = true;
        nowChecked_int = 1;

        this.getRanking(this.heroId, 14, 0, 0, 0);
      }

      this.showInfo.checked = nowChecked;
      this.$cookie.set("agree", nowChecked_int, {
        expires: "1Y",
      });
    },
  },
};
</script>