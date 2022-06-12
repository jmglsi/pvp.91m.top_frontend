<template>
  <div class="hero-genre app-genre">
    <vxe-table
      ref="refHeroGenre"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      @cell-click="onCellClick"
      height="443"
    >
      <vxe-table-column title="英雄" fixed="left" field="heroId" width="50">
        <template #default="{ row }">
          <div :style="{ position: 'relative' }">
            <img
              v-lazy="
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                row.heroId +
                '/' +
                row.heroId +
                '.jpg'
              "
              width="25"
              height="25"
              class="app-3b9655ab218c7f1a18f5dacd778a52f0"
            />
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-colgroup
        title="流派"
        :title-prefix="{ content: $appMsg.tips[1003] }"
      >
        <vxe-table-column
          title="技能"  
          field="skillId"
          :filters="[
            { value: 80115, label: '闪现' },
            { value: 80104, label: '惩戒' },
            { value: 80105, label: '干扰' },
            { value: 80107, label: '净化' },
            { value: 80121, label: '弱化' },
            { value: 80102, label: '治疗' },
            { value: 80103, label: '眩晕' },
            { value: 80108, label: '斩杀' },
            { value: 80110, label: '狂暴' },
            { value: 80109, label: '疾跑' },
          ]"
          :filter-method="filterMethod"
          width="75"
        >
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <img
                v-lazy="
                  row.skillId == 0
                    ? '//pic.rmb.bdstatic.com/bjh/4765993d83516be82f000a60d2524f7f.png'
                    : '//image.ttwz.qq.com/images/skill/' + row.skillId + '.png'
                "
                width="25"
                height="25"
                class="hero-genre-4dba5f40eab9da71ab3d5db2d3883093"
              />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          title="分路"
          field="positionId"
          :filters="[
            { value: 0, label: '对抗路' },
            { value: 1, label: '中路' },
            { value: 2, label: '发育路' },
            { value: 3, label: '打野' },
            { value: 4, label: '辅助' },
          ]"
          :filter-method="filterMethod"
          width="75"
        >
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
        :title-prefix="{
          content: $appMsg.tips[1004] + '\n' + $appMsg.tips[1011],
        }"
      >
        <vxe-table-column
          title="占比"
          field="pickRate"
          :filters="[{ value: 1, checked: true }]"
          :filter-method="filterMethod"
          :width="listWidth"
          sortable
        >
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-92423e1b31d3e7fdac76d2ac26c45699-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.value, option)"
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
                v-if="row.change.updateValue != 0"
                :style="
                  row.change.updateType == 2
                    ? { color: 'red !important' }
                    : { color: 'blue !important' }
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
        >
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-92423e1b31d3e7fdac76d2ac26c45699-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.value, option)"
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
    genreId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { genreId } = this;
      return { genreId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.genreId) return;

        if (this.$cookie.get("agree") == 1) {
          this.getRanking(newValue.genreId, 14, 0, 0, 0);
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
      genreInfo: {
        type: 0,
      },
      showInfo: {
        checked: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    getRanking: function (genreId = 111, aid = 14, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + genreId
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
            "&id=" +
            genreId
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
                genreId,
              this.tableData
            );
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/my" }, 1);
          }
        });
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "skillId") {
        return row.skillId == option.value;
      }

      if (column.property == "positionId") {
        return row.positionId == option.value;
      }

      if (column.property == "pickRate") {
        return row.pickRate >= option.value;
      }
    },
    onCellClick: function ({ row, column }) {
      if (column.property == "heroId") {
        this.genreInfo.type = 0;
        return this.getRanking(row.heroId, 14, this.genreInfo.type, 0, 0);
      }

      if (column.property == "skillId") {
        this.genreInfo.type = 1;
        return this.getRanking(row.skillId, 14, this.genreInfo.type, 0, 0);
      }

      if (column.property == "positionId") {
        this.genreInfo.type = 2;
        return this.getRanking(row.positionId, 14, this.genreInfo.type, 0, 0);
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

        this.getRanking(this.id, 14, 0, 0, 0);
      }

      this.showInfo.checked = nowChecked;
      this.$cookie.set("agree", nowChecked_int, {
        expires: "1Y",
      });
    },
  },
};
</script>