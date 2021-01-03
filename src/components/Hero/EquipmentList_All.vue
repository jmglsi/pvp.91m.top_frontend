<template>
  <div class="hero-equipmentListAll">
    <vxe-grid
      ref="heroEquipmentListAll"
      auto-resize
      :data="tableData.result.rows"
      :sort-config="{ trigger: 'cell' }"
      height="547"
    >
      <vxe-table-column
        title="热度"
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
            class="hero-dd89b1b4d8b06f747929cc86ec6bb94f"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="最终结果,空的就是没出">
        <vxe-table-column
          v-for="(data, index) in 6"
          :key="'hero-equipment-63533b8c27ff8e8051af3dd96ed6e9be-' + index"
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
              class="hero-88473b8c633f40889fe2a0affd773691"
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
        :filter-method="filterMethod"
        width="125"
        sortable
      >
        <template v-slot:filter="{ $panel, column }">
          ≥
          <input
            v-model="option.data"
            v-for="(option, index) in column.filters"
            :key="'hero-equipment-3884d17acbdfbe7dd4921e00606d4e93-' + index"
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
  name: "HeroEquipmentListAll",
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
    filterMethod({ option, row, column }) {
      if (column.property === "winRate") {
        return row.winRate >= option.data;
      }
    },
  },
};
</script>
