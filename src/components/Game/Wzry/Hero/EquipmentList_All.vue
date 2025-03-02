<template>
  <div class="hero-equipmentListAll app-equipmentListAll">
    <vxe-table
      ref="refWzryHeroEquipmentListAll"
      id="refWzryHeroEquipmentListAll"
      :custom-config="{ storage: true }"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      height="443"
    >
      <vxe-table-column
        field="skillId"
        fixed="left"
        title="技能"
        width="50"
        sortable
      >
        <template #default="{ row }">
          <div
            :style="{
              position: 'relative',
            }"
          >
            <img
              v-lazy="{
                //error: '//camp.qq.com/images/skill/' + row.skillId + '.png',
                src: row.skillImg,
              }"
              width="25"
              height="25"
              class="app-border-radius"
            />
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-colgroup
        title="最终结果，空的就是没出"
        :title-prefix="{ content: $appMsg.tips[1000] }"
      >
        <vxe-table-column
          v-for="(data, index) in 6"
          :key="'hero-a9265e5b88bd92bd087aeae1073d52cc-' + index"
          :field="'equipment.list[' + index + ']'"
          :title="(index + 1).toString()"
          :width="$appIsMobile ? 60 : 0"
          sortable
        >
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
            >
              <img
                v-if="row.equipment.list[index].id > 0"
                v-lazy="{
                  //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + row.equipment.list[index] + '.jpg',
                  src: row.equipment.list[index].img,
                }"
                width="25"
                height="25"
                class="app-border-radius"
              />
            </div>
          </template>
        </vxe-table-column>
      </vxe-table-colgroup>

      <vxe-table-column
        field="totalPrice"
        title="价格"
        :width="listWidth"
        sortable
      />

      <vxe-table-column
        field="pickTimes"
        title="场次"
        :width="listWidth"
        sortable
      />

      <vxe-table-column field="winRate" title="胜率 (%)" width="125">
        <template #filter="{ $panel, column }">
          ≥
          <input
            v-model="option.value"
            v-for="(option, index) in column.filters"
            :key="'hero-b2a572a087a351dd24557bf6e86afccd-' + index"
            type="type"
            placeholder="0"
            @input="$panel.changeOption($event, !!option.value, option)"
            class="app-fa42596ed8c1eff3ed8b93bba913bde3"
          />
          %
        </template>
      </vxe-table-column>

      <vxe-table-column
        field="usedtime"
        title="时长"
        :width="listWidth"
        sortable
      />

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
  name: "heroEquipmentList_All",
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
          this.getRanking(6, 0, 0, 0, newValue.extraId);
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
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(1450);
  },
  methods: {
    getRanking: function (aid = 6, bid = 0, cid = 0, did = 0, heroId = 111) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
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
            encodeURIComponent(heroId)
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
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>