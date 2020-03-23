<template>
  <div class="ranking-dianfengsai">
    <van-dropdown-menu style="height: 54px;">
      <van-dropdown-item v-model="areaType" :options="areaOptions" @change="onChange(1)" />
      <van-dropdown-item v-model="heroType" :options="heroOptions" @change="onChange(2)" />
      <van-dropdown-item v-model="otherType" :options="otherOptions" @change="onChange(3)" />
    </van-dropdown-menu>

    <vxe-grid
      ref="ranking-dianfengsai"
      :loading="loading"
      :data="tableData.list"
      :height="clientHeight"
      :cell-class-name="cellClassName"
      :sort-config="{trigger: 'cell'}"
      @cell-click="onCellClick"
    >
      <vxe-table-column title="英雄" field="score" fixed="left" width="75" sortable>
        <template v-slot="{ row }">
          <van-tag
            mark
            type="primary"
            v-if="row.tag.text"
            :color="row.tag.color"
            class="dfs-tag"
          >{{ row.tag.text }}</van-tag>
          <img v-lazy="row.img" width="50" class="app-img" />
          <img
            v-if="row.trend > 0"
            v-lazy="'/img/app-icons/hot-' + row.trend + '.png'"
            width="15"
            class="dfs-trend"
          />
          <div class="dfs-skill">
            <img width="20" v-lazy="row.skill[0].img" class="dfs-skill-img dfs-skill-1" />
            <span class="bottom-num skill-pick-rate-1">{{row.skill[0].pickRate}}</span>
            <img
              width="20"
              v-if="row.skill[1].id"
              v-lazy="row.skill[1].img"
              class="dfs-skill-img dfs-skill-2"
            />
            <span
              v-if="row.skill[1].id"
              class="bottom-num skill-pick-rate-2"
            >{{row.skill[1].pickRate}}</span>
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="75" />

      <vxe-table-column title="出场越低,波动越大 (%)">
        <vxe-table-column
          title="禁用"
          field="banRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
        <vxe-table-column
          title="出场"
          field="pickRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
        <vxe-table-column
          title="胜率"
          field="winRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
      </vxe-table-column>

      <vxe-table-column title="MVP (%)">
        <vxe-table-column
          title="全部"
          field="allMvpRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
        <vxe-table-column
          title="胜方"
          field="winMvpRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
        <vxe-table-column
          title="败方"
          field="loseMvpRate"
          :width="listWidth"
          :formatter="['toFixedString', 2]"
          sortable
        />
      </vxe-table-column>

      <vxe-table-column
        title="承伤 (分)"
        field="totalBeHurtedCntPerMin"
        :width="listWidth"
        :formatter="['toFixedString', 0]"
        sortable
      />

      <vxe-table-column title="伤害">
        <vxe-table-column
          title="对人 (分)"
          field="totalHurtHeroCntPerMin"
          :width="listWidth"
          :formatter="['toFixedString', 0]"
          sortable
        />
        <vxe-table-column
          title="全部 (场)"
          field="totalOutputPerMin"
          :width="listWidth"
          :formatter="['toFixedString', 0]"
          sortable
        />
      </vxe-table-column>

      <vxe-table-column
        title="金币 (分)"
        field="equMoneyMin"
        :width="listWidth"
        :formatter="['toFixedString', 0]"
        sortable
      />

      <vxe-table-column
        title="经济 (场)"
        field="equMoneyOverflow"
        :width="listWidth"
        :formatter="['toFixedString', 0]"
        sortable
      />

      <vxe-table-column
        title="击杀"
        field="killCnt"
        :width="listWidth"
        :formatter="['toFixedString', 2]"
        sortable
      />
      <vxe-table-column
        title="死亡"
        field="deadCnt"
        :width="listWidth"
        :formatter="['toFixedString', 2]"
        sortable
      />
      <vxe-table-column
        title="助攻"
        field="assistCnt"
        :width="listWidth"
        :formatter="['toFixedString', 2]"
        sortable
      />
      <vxe-table-column
        title="参团"
        field="joinGamePercent"
        :width="listWidth"
        :formatter="['toFixedString', 2]"
        sortable
      />
      <vxe-table-column
        title="时长"
        field="usedtime"
        :width="listWidth"
        :formatter="['toFixedString', 2]"
        sortable
      />
    </vxe-grid>

    <van-action-sheet
      :title="heroInfo.name + ' 如何打开'"
      v-model="actionSheetShow"
      safe-area-inset-bottom
      :actions="actions"
      :close-on-click-action="true"
      @select="onSelect"
      class="app-action-sheet"
    />
  </div>
</template>

<style scoped>
.hero-link {
  position: absolute;
  left: 30px;
  margin-top: 18px;
}

.dfs-skill {
  position: absolute;
}

.dfs-trend {
  position: absolute;
  margin-top: -10px;
  margin-left: -2px;
}

.dfs-skill-img {
  position: absolute;
  margin-top: -21px;
}

.dfs-skill-1 {
  left: -5px;
}

.dfs-skill-2 {
  left: 40px;
}

.skill-pick-rate-1 {
  left: -20px;
}
.skill-pick-rate-2 {
  left: 25px;
}
</style>

<script>
export default {
  name: "DianFengSai",
  data() {
    return {
      areaType: 0,
      areaOptions: [
        { text: "全部大区", value: 0 },
        { text: "手 Q", value: 1 },
        { text: "微信", value: 2 },
        { text: "推荐", value: 3 }
      ],
      heroType: 0,
      heroOptions: [
        { text: "全部分路", value: 0 },
        { text: "对抗 (战士)", value: 1 },
        { text: "中路", value: 2 },
        { text: "对抗 (坦克)", value: 3 },
        { text: "打野", value: 4 },
        { text: "发育", value: 5 },
        { text: "辅助", value: 6 }
      ],
      otherType: 0,
      otherOptions: [
        { text: "٩( 'ω' )و", value: 0 },
        { text: "关于", value: 1 },
        { text: "更新记录 (本站)", value: 2 }
      ],
      listWidth: 0,
      tableData: {
        color: {},
        list: []
      },
      actionSheetShow: false,
      actions: [
        { name: "趋势 & 职业对比", value: 0 },
        { name: "对局回顾", subname: "第一视角", value: 1 },
        { name: "赛事数据", subname: "玩加电竞", value: 2 },
        { name: "更新记录", subname: "NGA @EndMP", value: 3 },
        { name: "攻速阈值", subname: "NGA @小熊de大熊", value: 4 }
      ],
      heroInfo: {
        hero: {
          id: 0,
          name: "加载中",
          updatePid: 0
        }
      },
      clientHeight: 0,
      loading: true
    };
  },
  created() {
    this.appHeightInit(1440);
  },
  mounted() {
    this.getHeroRanking(0, 0);
  },
  methods: {
    getHeroRanking: function(aid, bid) {
      this.axios
        .get(this.appApi.list.getHeroRanking + "&aid=" + aid + "&bid=" + bid)
        .then(ret => {
          this.tableData = ret.data.data;
          this.loading = false;
        });
    },
    getHeroInfo: function(row) {
      this.actionSheetShow = true;
      this.heroInfo = row;
    },
    onChange: function(e) {
      if (e == 1 || e == 2) {
        this.getHeroRanking(this.areaType, this.heroType);
      }

      if (e == 3) {
        if (this.otherType == 1) {
          this.$router.push({
            path: "/about",
            query: { from: "ranking-dropdown-menu" }
          });
        }

        if (this.otherType == 2) {
          this.$router.push({
            path: "/changelog",
            query: { from: "ranking-dropdown-menu" }
          });
        }
        this.otherType = 0;
      }
    },
    onCellClick: function({ row }) {
      this.getHeroInfo(row);
    },
    cellClassName: function({ row, column }) {
      let color = this.tableData.color;

      if (column.property === "banRate") {
        if (row.banRate >= color.ban) {
          return "col-red";
        }
      }

      if (column.property === "pickRate") {
        if (row.pickRate >= color.pick) {
          return "col-blue";
        }
      }

      if (column.property === "winRate") {
        if (
          (row.banRate >= color.ban || row.pickRate >= color.pick) &&
          row.winRate >= color.win
        ) {
          return "col-green";
        }
      }
    },
    onSelect: function(item) {
      let from = "ranking-action-sheet";
      let heroInfo = this.heroInfo;

      if (item.value == 0) {
        this.$router.push({
          path: "/heroInfo/" + heroInfo.id,
          query: { from: from }
        });
      }

      if (item.value == 1) {
        this.$router.push({
          path: "/heroReplay/" + heroInfo.id,
          query: { from: from }
        });
      }

      if (item.value == 2) {
        window.open(
          "https://www.wanplus.com/static/app/community/share.html?header_type=5&id=" +
            heroInfo.id +
            "&tab_type=5&gm=kog&gametype=6&tag_id=0"
        );
      }

      if (item.value == 3) {
        window.open("https://nga.178.com/read.php?pid=" + heroInfo.updatePid);
      }

      if (item.value == 4) {
        window.open("https://bbs.nga.cn/read.php?tid=12677614");
      }
    }
  }
};
</script>