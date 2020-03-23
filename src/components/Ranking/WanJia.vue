<template>
  <div class="ranking-wanjia">
    <van-dropdown-menu style="height: 54px;">
      <van-dropdown-item v-model="areaType" :options="playerOptions" @change="onChange" />
      <van-dropdown-item title="筛选" ref="item">
        <van-switch-cell v-model="switchShield" title="隐藏战绩" />
        <van-button block type="info" @click="onConfirm">确认</van-button>
      </van-dropdown-item>
    </van-dropdown-menu>

    <vxe-grid
      ref="ranking-wanjia"
      :loading="loading"
      :data="tableData.list"
      :height="clientHeight"
      :sort-config="{trigger: 'cell'}"
      @cell-click="onCellClick"
    >
      <vxe-table-column title="玩家" field="userId" fixed="left" width="75">
        <template v-slot="{ row }">
          <van-tag
            mark
            type="primary"
            class="wj-tag"
            v-if="row.tag"
            :color="row.tag.color"
          >{{ row.tag.text }}</van-tag>
          <img v-lazy="row.avatar" width="50" class="app-img" />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="75" />

      <vxe-table-column title="昵称" field="gamePlayerName" :width="listWidth" />

      <vxe-table-column title="分数" field="rankScore" :width="listWidth" sortable />
    </vxe-grid>

    <van-action-sheet
      :title="playerInfo.gamePlayerName + ' 如何打开'"
      v-model="actionSheetShow"
      safe-area-inset-bottom
      :actions="playerInfo.area < 3 ? actions : []"
      :close-on-click-action="true"
      @select="onSelect"
      class="app-action-sheet"
    />
  </div>
</template>

<script>
export default {
  name: "WanJia",
  data() {
    return {
      playerShield: 0,
      switchShield: false,
      areaType: 0,
      qq: "",
      copyData: "",
      playerOptions: [
        { text: "全部大区 (显示战绩)", value: 0 },
        { text: "手Q 安卓", value: 1 },
        { text: "手Q 苹果", value: 2 },
        { text: "微信安卓", value: 3 },
        { text: "微信苹果", value: 4 }
      ],
      tableData: {
        list: []
      },
      actionSheetShow: false,
      actions: [{ name: "查看QQ", value: 0 }],
      playerInfo: {},
      clientHeight: 0,
      loading: true
    };
  },
  created() {
    this.appHeightInit(350);
  },
  mounted() {
    this.getPlayerRanking(0, 0);
  },
  methods: {
    getPlayerRanking: function(aid, bid) {
      this.axios
        .get(this.appApi.list.getPlayerRanking + "&aid=" + aid + "&bid=" + bid)
        .then(ret => {
          this.tableData = ret.data.data;
          this.loading = false;
        });
    },
    getPlayerInfo: function(row) {
      if (row.userId == "0") return;

      this.actionSheetShow = true;
      this.playerInfo = row;

      let key = this.$cookie.get("key");
      this.axios
        .get(
          this.appApi.list.getUserInfo + "&aid=" + row.userId + "&bid=" + key
        )
        .then(ret => {
          let data = ret.data.data,
            code = data.code;

          if (code != 1) {
            this.$message.error("未知错误");
            return;
          }

          this.qq = data.qq;
          this.copyData =
            row.gamePlayerName +
            "\rQQ:" +
            this.qq +
            "\r-\r更多玩家信息 ↓\r" +
            location.origin +
            location.pathname +
            "?type=2&from=copyshare&userId=" +
            row.userId;
        });
    },
    onChange: function(e) {
      this.getPlayerRanking(e, this.playerShield);
    },
    onConfirm: function() {
      this.$refs.item.toggle();

      this.playerShield = Number(this.switchShield);
      this.getPlayerRanking(this.areaType, this.playerShield);
    },
    onCellClick: function({ row }) {
      this.getPlayerInfo(row);
    },
    onSelect: function(item) {
      let playerInfo = this.playerInfo;

      if (item.value == 0) {
        this.$copyText(this.copyData);
        this.$dialog.alert({
          title: playerInfo.gamePlayerName,
          message: "QQ:" + this.qq + "\r信息已复制 ;D"
        });
      }
    }
  }
};
</script>