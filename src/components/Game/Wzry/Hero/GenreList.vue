<template>
  <div class="hero-genre app-genre">
    <vxe-table
      ref="refWzryHeroGenre"
      id="refWzryHeroGenre"
      :custom-config="{ storage: true }"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      @cell-click="onTableCellClick"
      height="443"
    >
      <vxe-table-column field="heroId" fixed="left" title="英雄" width="50">
        <template #default="{ row }">
          <div
            :style="{
              position: 'relative',
            }"
          >
            <img
              v-lazy="{
                //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + row.heroId + '/' + row.heroId + '.jpg',
                src: row.heroImg,
              }"
              width="25"
              height="25"
              class="app-border-radius"
            />
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-colgroup
        title="流派"
        :title-prefix="{ content: $appMsg.tips[1003] }"
      >
        <vxe-table-column
          field="skillId"
          title="技能"
          :filters="[
            { value: 80102, label: '治疗' },
            { value: 80103, label: '眩晕' },
            { value: 80104, label: '惩戒' },
            { value: 80105, label: '干扰' },
            { value: 80107, label: '净化' },
            { value: 80108, label: '斩杀' },
            { value: 80109, label: '疾跑' },
            { value: 80110, label: '狂暴' },
            { value: 80115, label: '闪现' },
            { value: 80117, label: '传送' },
            { value: 80121, label: '弱化' },
          ]"
          :filter-method="onTableColumnFilterMethod"
          width="75"
        >
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
            >
              <img
                v-lazy="
                  row.skillId == 0
                    ? $appCache + '/img/icons-app/question.png'
                    : {
                        //error: '//camp.qq.com/images/skill/' + row.skillId + '.png',
                        src: row.skillImg,
                      }
                "
                width="25"
                height="25"
                class="app-border-radius"
              />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="positionId"
          title="分路"
          :filters="[
            { value: 0, label: '对抗路' },
            { value: 1, label: '中路' },
            { value: 2, label: '发育路' },
            { value: 3, label: '打野' },
            { value: 4, label: '游走' },
          ]"
          :filter-method="onTableColumnFilterMethod"
          width="75"
        >
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
            >
              {{ $wzryPositionInfo[row.positionId + 1 || 0][0] }}
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
          field="pickRate"
          title="占比"
          :filters="[{ value: 1, checked: true }]"
          :filter-method="onTableColumnFilterMethod"
          :width="listWidth"
          sortable
        >
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-92423e1b31d3e7fdac76d2ac26c45699-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.value, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
            >
              <span class="app-9ec86c2c7ff0fcaa177028a0b2d091b8">
                {{ row.pickRate }}
              </span>
              <div
                v-if="row.change.updateValue != 0"
                :style="
                  row.change.updateType == 2
                    ? { color: 'red !important' }
                    : { color: '#1680d1 !important' }
                "
                class="app-b0704b59dbf144bfeffb53bdb11d7128"
              >
                <span class="app-b1275ae967fdbd25d1692fa5e2f547e0">
                  {{
                    (row.change.updateType == 2 ? "+" : "-") +
                    Math.abs(row.change.updateValue)
                  }}
                </span>

                <img
                  v-if="row.change.updateType != 0"
                  v-lazy="
                    $appCache +
                    '/img/icons-app/hot_' +
                    row.change.updateType +
                    '.png'
                  "
                  width="15"
                  height="15"
                  class="app-db21bca782a535e91eb87f56b8abdc45"
                />
              </div>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column field="winRate" title="胜率" :width="listWidth">
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-0f61e84a305f2be97898b866a87496c1-' + index"
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
          field="mvpRate"
          title="胜方"
          :width="listWidth"
          sortable
        />
      </vxe-table-colgroup>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: "heroGenreList",
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { extraId } = this;
      return { extraId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.extraId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.getRanking(14, 0, 0, 0, newValue.extraId);
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
      genreInfo: {
        type: 0,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    getRanking: function (aid = 14, bid = 0, cid = 0, did = 0, id = 111) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + id
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.tableData = ls;

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
            did +
            "&id=" +
            encodeURIComponent(id)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + id,
              this.tableData
            );
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
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
    onTableCellClick: function ({ row, column }) {
      if (column.property == "heroId") {
        this.genreInfo.type = 0;
        return this.getRanking(14, this.genreInfo.type, 0, 0, row.heroId);
      }

      if (column.property == "skillId") {
        this.genreInfo.type = 1;
        return this.getRanking(14, this.genreInfo.type, 0, 0, row.skillId);
      }

      if (column.property == "positionId") {
        this.genreInfo.type = 2;
        return this.getRanking(14, this.genreInfo.type, 0, 0, row.positionId);
      }
    },
  },
};
</script>