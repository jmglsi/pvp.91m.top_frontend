<template>
  <div class="ranking-dfs">
    <div class="ranking-851095463bdd8ecc4ef18c2b243949ce">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="areaInfo.model"
          :options="areaInfo.options"
          @change="onDropdownMenuChange"
        />
        <van-dropdown-item
          v-model="positionInfo.model"
          :options="positionInfo.options"
          @change="onDropdownMenuChange"
        />
      </van-dropdown-menu>
    </div>

    <div class="ranking-e10ca73b79369d2183f81ca10fb587af">
      <vxe-grid
        ref="dianfengsai"
        :loading="isLoading"
        :data="tableData.result"
        :height="clientHeight"
        :cell-class-name="cellClassName"
        :sort-config="{trigger: 'cell'}"
        auto-resize
        @cell-click="onCellClick"
      >
        <vxe-table-column title="英雄" field="score" fixed="left" width="75" sortable>
          <template v-slot="{ row }">
            <van-tag
              v-show="row.tag.text"
              :color="row.tag.color"
              mark
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
            >{{ row.tag.text }}</van-tag>
            <img
              v-lazy="row.img"
              width="50"
              height="50"
              class="hero-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
            <img
              v-if="row.trend > 0"
              v-lazy="'/img/app-icons/hot-' + row.trend + '.png'"
              width="15"
              height="15"
              class="dfs-3d5f1ffeadf58eb64ef57aef7e53a31e"
            />
            <div class="dfs-713dd4d0b2e842c08da62ddeec872331">
              <img
                v-lazy="row.skill[0].img"
                width="20"
                height="20"
                class="dfs-95a25d46f98b0ec553d892cc45037d57 dfs-35af5e6c0fc290aa4f2e38d4c8296a03"
              />
              <span
                class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c skill-043052eea2d064cab23119e56f4f640e"
              >{{ row.skill[0].pickRate }}</span>
              <img
                v-if="row.skill[1].id"
                v-lazy="row.skill[1].img"
                width="20"
                height="20"
                class="dfs-95a25d46f98b0ec553d892cc45037d57 dfs-fbfe7b256ce6b4df1d03d8022163c6d2"
              />
              <span
                v-if="row.skill[1].id"
                class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c skill-dabb6e25dffefe5b4821b7062afbdaef"
              >{{ row.skill[1].pickRate }}</span>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column title="出场越低,波动越大 (%)">
          <vxe-table-column title="禁用" field="banRate" :width="listWidth" sortable />
          <vxe-table-column title="出场" field="pickRate" :width="listWidth" sortable />
          <vxe-table-column title="胜率" field="winRate" :width="listWidth" sortable />
        </vxe-table-column>

        <vxe-table-column title="MVP (%)">
          <vxe-table-column title="全部" field="allMvpRate" :width="listWidth" sortable />
          <vxe-table-column title="胜方" field="winMvpRate" :width="listWidth" sortable />
          <vxe-table-column title="败方" field="loseMvpRate" :width="listWidth" sortable />
        </vxe-table-column>

        <vxe-table-column
          title="承伤 (分)"
          field="totalBeHurtedCntPerMin"
          :width="listWidth"
          sortable
        />

        <vxe-table-column title="伤害">
          <vxe-table-column
            title="对人 (分)"
            field="totalHurtHeroCntPerMin"
            :width="listWidth"
            sortable
          />
          <vxe-table-column title="全部 (场)" field="totalOutputPerMin" :width="listWidth" sortable />
        </vxe-table-column>

        <vxe-table-column title="金币 (分)" field="equMoneyMin" :width="listWidth" sortable />

        <vxe-table-column sortable title="经济 (场)" field="equMoneyOverflow" :width="listWidth" />

        <vxe-table-column title="击杀" field="killCnt" :width="listWidth" sortable />
        <vxe-table-column title="死亡" field="deadCnt" :width="listWidth" sortable />
        <vxe-table-column title="助攻" field="assistCnt" :width="listWidth" sortable />
        <vxe-table-column title="参团" field="joinGamePercent" :width="listWidth" sortable />
        <vxe-table-column title="时长" field="usedtime" :width="listWidth" sortable />
      </vxe-grid>
    </div>

    <div class="ranking-2a070514f71e4c264a78b600fc9a8e0d">
      <van-action-sheet
        v-model="show.actionSheet"
        :title="tableData.row.name + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        safe-area-inset-bottom
        @select="onActionSheetSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.dfs-3d5f1ffeadf58eb64ef57aef7e53a31e {
  position: absolute;
  margin-top: -10px;
  margin-left: -2px;
}

.dfs-713dd4d0b2e842c08da62ddeec872331 {
  position: absolute;
}

.dfs-95a25d46f98b0ec553d892cc45037d57 {
  position: absolute;
  margin-top: -21px;
}

.dfs-35af5e6c0fc290aa4f2e38d4c8296a03 {
  left: -5px;
}

.dfs-fbfe7b256ce6b4df1d03d8022163c6d2 {
  left: 40px;
}

.skill-043052eea2d064cab23119e56f4f640e {
  left: -20px;
}

.skill-dabb6e25dffefe5b4821b7062afbdaef {
  left: 25px;
}
</style>

<script>
export default {
  name: "RankingDianFengSai",
  data() {
    return {
      areaInfo: {
        model: 0,
        options: [
          { text: "全部大区", value: 0 },
          { text: "手 Q", value: 1 },
          { text: "微信", value: 2 },
          { text: "挨刀", value: 3 }
        ]
      },
      positionInfo: {
        model: 0,
        options: [
          { text: "全部分路", value: 0 },
          { text: "对抗 (战士)", value: 1 },
          { text: "中路", value: 2 },
          { text: "对抗 (坦克)", value: 3 },
          { text: "打野", value: 4 },
          { text: "发育", value: 5 },
          { text: "辅助", value: 6 }
        ]
      },
      tableData: {
        color: {},
        result: [],
        row: {
          id: 0,
          name: "加载中",
          updatePid: 0
        }
      },
      show: {
        actionSheet: false
      },
      actions: [
        { name: "趋势 & 职业对比", value: 0 },
        { name: "对局回顾", subname: "第一视角", value: 1 },
        { name: "赛事数据", subname: "玩加电竞", value: 2 },
        { name: "更新记录", subname: "NGA @EndMP", value: 3 },
        { name: "攻速阈值", subname: "NGA @小熊de大熊", value: 4 }
      ],
      listWidth: 0,
      clientHeight: 0,
      isLoading: true
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
      if (aid == 3 && bid == 0)
        this.$message.info(
          "提示:1006,禁用率越高越容易挨刀,挨过刀的几个月内不会再动 ;D"
        );

      this.axios
        .get(this.apiList.pvp.getHeroRanking + "&aid=" + aid + "&bid=" + bid)
        .then(res => {
          this.tableData = res.data.data;
          this.tableData.row = {
            id: 0,
            name: "加载中",
            updatePid: 0
          };
          this.isLoading = false;
        });
    },
    getHeroInfo: function(row) {
      this.tableData.row = row;

      this.show.actionSheet = true;
    },
    onDropdownMenuChange: function() {
      this.getHeroRanking(this.areaInfo.model, this.positionInfo.model);
    },
    onCellClick: function({ row }) {
      this.getHeroInfo(row);
    },
    cellClassName: function({ row, column }) {
      let color = this.tableData.color;

      if (column.property === "banRate") {
        if (row.banRate >= color.ban) {
          return "col-bda9643ac6601722a28f238714274da4";
        }
      }

      if (column.property === "pickRate") {
        if (row.pickRate >= color.pick) {
          return "col-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property === "winRate") {
        if (
          (row.banRate >= color.ban || row.pickRate >= color.pick) &&
          row.winRate >= color.win
        ) {
          return "col-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onActionSheetSelect: function(item) {
      let name = this.$options.name,
        heroInfo = this.tableData.row;

      if (item.value == 0) {
        this.appPush("/hero/" + heroInfo.id + "/info", name);
      }

      if (item.value == 1) {
        this.appPush("/hero/" + heroInfo.id + "/replay", name);
      }

      if (item.value == 2) {
        this.appOpenUrl(
          "是否查看英雄赛事数据?",
          "玩加电竞",
          "//www.wanplus.com/static/app/community/share.html?header_type=5&id=" +
            heroInfo.id +
            "&tab_type=5&gm=kog&gametype=6&tag_id=0"
        );
      }

      if (item.value == 3) {
        this.appOpenUrl(
          "是否查看英雄更新记录?",
          "NGA @EndMP",
          "//nga.178.com/read.php?pid=" + heroInfo.updatePid
        );
      }

      if (item.value == 4) {
        this.appOpenUrl(
          "是否查看英雄攻速阈值?",
          "NGA @小熊de大熊",
          "//bbs.nga.cn/read.php?tid=12677614"
        );
      }
    }
  }
};
</script>