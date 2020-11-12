<template>
  <div class="hero-equipment">
    <vxe-grid
      ref="heroEquipment"
      :data="tableData.result"
      :sort-config="{ trigger: 'cell' }"
      auto-resize
      height="320"
    >
      <vxe-table-column
        title="技能"
        field="score"
        fixed="left"
        width="50"
        sortable
      >
        <template v-slot="{ row }">
          <img
            v-lazy="row.img"
            width="25"
            height="25"
            class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="推荐出装 (最终结果,空的就是没出)">
        <vxe-table-column
          v-for="(data, index) in 6"
          :key="'equipment-7b490eaa5fed310dd15f0dd710dce7cb-' + index"
          :title="(index + 1).toString()"
          :field="'list[' + index + ']'"
          :width="equipmentWidth"
          sortable
        >
          <template v-slot="{ row }">
            <img
              v-if="row.list[index] > 0"
              v-lazy="
                '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                row.list[index] +
                '.png'
              "
              width="25"
              height="25"
              class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
          </template>
        </vxe-table-column>
      </vxe-table-column>

      <vxe-table-column
        title="价格"
        field="money"
        :width="listWidth"
        sortable
      />
      <vxe-table-column
        title="场次"
        field="pickTimes"
        :width="listWidth"
        sortable
      />
      <vxe-table-column title="胜率 (%)" field="winRate" width="100" sortable />
      <vxe-table-column
        title="时长"
        field="usedtime"
        :width="listWidth"
        sortable
      />

      <vxe-table-column title="MVP (%)">
        <vxe-table-column
          title="胜方"
          field="mvpRate"
          :width="listWidth"
          sortable
        />
      </vxe-table-column>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  name: "HeroList",
  props: {
    heroEquipment: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    listenChange() {
      const { heroEquipment } = this;
      return { heroEquipment };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroEquipment == []) return;

        this.getHeroEquipment(newValue.heroEquipment);

        this.loading = false;
      },
    },
  },
  created() {
    if (this.appDevice) {
      this.equipmentWidth = 60;
      this.listWidth = 85;
    } else {
      this.listWidth = 0;
      this.listWidth = 0;
    }
  },
  data() {
    return {
      equipmentWidth: 0,
      listWidth: 0,
      tableData: {
        result: [],
      },
    };
  },
  methods: {
    getHeroEquipment: function (e) {
      this.tableData.result = e;
    },
  },
};
</script>