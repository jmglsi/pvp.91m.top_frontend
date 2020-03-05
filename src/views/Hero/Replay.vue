<template>
  <div class="replay">
    <van-nav-bar
      :title="heroInfo.name"
      left-text="英雄信息"
      :border="false"
      @click-left="onClickLeft"
    >
      <van-icon
        name="chart-trending-o"
        slot="left"
      />
    </van-nav-bar>

    <van-collapse v-model="activeNames">
      <van-collapse-item
        v-for="(data, index) in tableData.list"
        :key="index + '-collapse'"
        :name="index"
        :value="data.time"
      >
        <div
          slot="title"
          class="replay-title"
        >
          <van-tag
            round
            :type="data.status"
            class="replay-usedtime replay-tag"
          >
            {{data.usedtime}}
          </van-tag>
          <van-tag
            round
            color="black"
            class="replay-tag"
            v-show="!duiyou"
          >
            {{ data.equMoney }}
          </van-tag>
          <span class="replay-playername">
            {{ data.gamePlayerName }}
          </span>
        </div>

        <div
          class="replay-item-data"
          v-show="!duiyou"
        >
          <van-grid
            :border="false"
            :column-num="7"
          >
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
        >
          {{ data.heroKda }}
        </van-button>

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
      class="app-action-sheet"
    >
      <van-cell
        title="复制链接"
        v-clipboard:copy="copyData"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        is-link
      />
      <van-cell
        title="详情"
        value="需要安装王者营地"
        :url="nowData.hippy"
        is-link
      />
      <van-cell
        title="回顾"
        value="需要安装王者营地"
        :url="nowData.url"
        is-link
      />
    </van-action-sheet>

    <van-pagination
      v-model="currentPage"
      :total-items="tableData.num"
      :items-per-page="tableData.page"
      @change="onChange"
      class="replay-pagination"
    />

    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa' }">红色为失败,绿色为胜利,数字为时长,黑色为保底经济</van-divider>

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
    AppBottomTabbar: resolve => require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data () {
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
      actionSheetShow: false
    };
  },
  mounted () {
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
    getHeroInfo: function (heroId) {
      this.axios
        .get(this.appApi.list.getHeroInfo + "&heroId=" + heroId)
        .then(ret => {
          this.heroInfo = ret.data.data.heroInfo;

          document.title = "对局回顾 (部分) - " + this.heroInfo.name;

          if (heroId.indexOf(",") > -1) this.duiyou = true;
        });
    },
    getActionSheet: function (row) {
      this.nowData = row;
      this.actionSheetShow = true;

      let url = row.url, urlIndex = url.indexOf("=");

      this.axios
        .get("https://s.91m.top/?url=" + url.substr(urlIndex + 1, url.length))
        .then(ret => {
          this.copyData =
            this.heroInfo.name + " 的对局回顾 ↓\r-\r" + ret.data.data.url;
        });
    },
    getHeroReplayByHeroId: function (heroId, page) {
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
    equUpdate: function () {
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
    onChange: function (e) {
      this.getHeroReplayByHeroId(this.nowHeroId, e);
    },
    onCopy: function () {
      this.$message.success("复制成功");
      this.actionSheetShow = false;
    },
    onError: function () {
      this.$message.error("复制失败");
    },
    onClickLeft: function () {
      this.$router.push({
        path: "/heroInfo/" + this.heroInfo.id,
        query: { from: "heroReplay" }
      });
    }
  }
};
</script>