<template>
  <div class="replay">
    <van-nav-bar
      :title="heroInfo.name"
      :border="false"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="chart-trending-o" slot="left" />
      <van-icon name="question-o" slot="right" />
    </van-nav-bar>

    <van-collapse v-model="activeNames">
      <van-collapse-item
        v-for="(data, index) in tableData.list"
        :key="index + '-collapse'"
        :name="index"
        :value="data.time"
      >
        <div slot="title" class="replay-title">
          <van-tag round :type="data.status" class="replay-usedtime replay-tag">{{data.usedtime}}</van-tag>
          <van-tag round color="black" class="replay-tag" v-show="!duiyou">{{ data.equMoney }}</van-tag>
          <span class="replay-playername">{{ data.gamePlayerName }}</span>
        </div>

        <div class="replay-item-data" v-show="!duiyou">
          <van-grid :border="false" :column-num="7">
            <van-grid-item
              v-show="data.heroSkill > 0"
              :icon="'https://image.ttwz.qq.com/images/skill/' + data.heroSkill + '.png'"
              :text="data.heroPosition"
            />
            <van-grid-item
              v-for="(data, index) in data.equInfo"
              :key="index + '-equ'"
              v-show="data > 0"
              :icon="'https://image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' + data + '.png'"
              @click="equUpdate"
            />
          </van-grid>
        </div>

        <van-button
          round
          disabled
          color="#000000"
          size="mini"
          class="replay-button"
          v-show="!duiyou"
        >{{ data.heroKda }}</van-button>

        <van-button
          round
          type="info"
          size="mini"
          @click="getActionSheet(data)"
          class="replay-button"
        >对局</van-button>
      </van-collapse-item>
    </van-collapse>

    <van-action-sheet
      v-model="actionSheetShow"
      :title="nowData.gamePlayerName + ' 如何打开'"
      safe-area-inset-bottom
      :actions="actions"
      :close-on-click-action="true"
      @select="onSelect"
      class="app-action-sheet"
    />

    <van-pagination
      v-model="currentPage"
      :total-items="tableData.num"
      :items-per-page="tableData.page"
      @change="onChange"
      class="replay-pagination"
    />

    <AppBottomTabbar />
  </div>
</template>

<style scoped>
div.van-collapse {
  margin-top: 3px;
}

.hero-info {
  font-size: 20px;
}

.replay-button {
  margin-right: 3px;
}

.replay-title {
  text-align: left;
}

.replay-tag {
  margin-right: 3px;
}

.replay-playername {
  margin-top: 2px;
  position: absolute;
}

.replay-item-data {
  margin-bottom: 10px;
}

.replay-pagination {
  margin-top: 25px;
}
</style>

<script>
export default {
  name: "HeroReplay",
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data() {
    return {
      duiyou: false,
      activeNames: ["1"],
      nowHeroId: 0,
      heroInfo: {},
      copyData: "",
      tableData: {
        list: [],
        num: 200,
        page: 5
      },
      currentPage: 1,
      nowData: {},
      actionSheetShow: false,
      actions: [
        { name: "复制链接", value: 0 },
        { name: "详情", subname: "需要安装王者营地", value: 1 },
        { name: "回顾", subname: "需要安装王者营地", value: 2 }
      ]
    };
  },
  mounted() {
    let heroId = this.$route.params.id;
    this.nowHeroId = heroId;

    setTimeout(() => {
      this.getHeroInfo(heroId);
    }, 100);

    setTimeout(() => {
      this.getHeroReplayByHeroId(this.nowHeroId, 1);
    }, 100);
  },
  methods: {
    getHeroInfo: function(heroId) {
      this.axios
        .get(this.appApi.list.getHeroInfo + "&heroId=" + heroId)
        .then(ret => {
          this.heroInfo = ret.data.data.heroInfo;

          document.title = this.heroInfo.name + " | 苏苏的荣耀助手";

          if (heroId.indexOf(",") > -1) this.duiyou = true;
        });
    },
    getActionSheet: function(row) {
      this.nowData = row;
      this.actionSheetShow = true;

      let url = row.url,
        urlIndex = url.indexOf("=");

      this.axios
        .get("https://s.91m.top/?url=" + url.substr(urlIndex + 1, url.length))
        .then(ret => {
          this.copyData =
            this.heroInfo.name + " 的对局回顾 ↓\r-\r" + ret.data.data.url;
        });
    },
    getHeroReplayByHeroId: function(heroId, page) {
      this.axios
        .get(
          this.appApi.list.getHeroReplayByHeroId +
            "&heroId=" +
            heroId +
            "&page=" +
            page
        )
        .then(ret => {
          this.tableData = ret.data.data;
        });
    },
    equUpdate: function() {
      this.$dialog
        .confirm({
          title: "是否打开装备更新记录?",
          message: "NGA @破笼之鸟"
        })
        .then(() => {
          // on confirm
          window.open("https://ngabbs.com/read.php?tid=19902976");
        });
    },
    onChange: function(e) {
      this.getHeroReplayByHeroId(this.nowHeroId, e);
    },
    onClickLeft: function() {
      this.$router.push({
        path: "/hero/" + this.heroInfo.id + "/info"
      });
    },
    onClickRight: function() {
      this.$message.info("红色为失败,绿色为胜利,数字为时长,黑色为保底经济");
    },
    onSelect: function(item) {
      let nowData = this.nowData;

      if (item.value == 0) {
        this.$copyText(this.copyData);
        this.$message.success("已复制");
      }

      if (item.value == 1) {
        window.open(nowData.hippy);
      }

      if (item.value == 2) {
        window.open(nowData.url);
      }
    }
  }
};
</script>