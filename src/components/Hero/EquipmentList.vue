<template>
  <div class="hero-equipment">
    <vxe-grid
      ref="heroEquipment"
      :data="tableData.result.rows"
      :sort-config="{ trigger: 'cell' }"
      height="547"
      auto-resize
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
            class="hero-equipment-d8dff643744fd7b25a4558d61e3470f0"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="最终结果,空的就是没出">
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
              class="hero-equipment-22ea16b91b29bfb013f1b649b0c88396"
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
      <vxe-table-column
        title="胜率 (%)"
        field="winRate"
        :filters="[{ data: 0 }]"
        :filter-method="filterWinRateMethod"
        width="125"
        sortable
      >
        <template v-slot:filter="{ $panel, column }">
          ≥
          <input
            v-model="option.data"
            v-for="(option, index) in column.filters"
            :key="'hero-equipment-f0549be9f0aa36c46c0b2f76ed0a4f4f-' + index"
            type="type"
            placeholder="0"
            @input="$panel.changeOption($event, !!option.data, option)"
            class="app-fa42596ed8c1eff3ed8b93bba913bde3"
          />
          %
        </template>
      </vxe-table-column>
      <vxe-table-column
        title="时长"
        field="usedtime"
        :width="listWidth"
        sortable
      />

      <vxe-table-column title="MVP (%)">
        <vxe-table-column
          title="净胜"
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

        this.tableData.result.rows = newValue.heroEquipment;
      },
    },
  },
  data() {
    return {
      equipmentWidth: 0,
      listWidth: 0,
      tableData: {
        result: {
          rows: [],
        },
      },
    };
  },
  created() {
    if (this.isMobile) {
      this.equipmentWidth = 60;
      this.listWidth = 85;
    } else {
      this.equipmentWidth = 0;
      this.listWidth = 0;
    }
  },
  methods: {
    filterWinRateMethod({ option, row }) {
      return row.winRate >= option.data;
    },
  },
};
</script>
