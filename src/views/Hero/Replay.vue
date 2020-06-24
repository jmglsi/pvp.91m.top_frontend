<template>
  <div class="hero-replay">
    <div class="hero-3717f3cb4a2b2b688e50fb4f63170918">
      <van-nav-bar :border="false" @click-left="$router.go(-1)">
        <template #title>
          <span class="info-d5d3db1765287eef77d7927cc956f50a">{{ heroInfo.name }}</span>
        </template>
        <van-icon name="arrow-left" slot="left" />
      </van-nav-bar>
    </div>

    <div class="hero-9a7c47049573e03028c2e650b73f6252">
      <van-collapse v-model="collapseModel" :border="false">
        <van-collapse-item
          v-for="(data, index) in tableData.result"
          :key="'replay-1a721faf2df53972bfd0831c64b6146d-' + index"
          :name="index"
          :value="data.time"
        >
          <div slot="title" class="replay-d5d3db1765287eef77d7927cc956f50a">
            <van-tag
              :type="data.status"
              round
              class="replay-01cac4e332fec6d6ecd331a00412712d replay-e4d23e841d8e8804190027bce3180fa5"
            >{{ data.usedtime }}</van-tag>
            <van-tag
              v-if="!teammate"
              round
              color="black"
              class="replay-e4d23e841d8e8804190027bce3180fa5"
            >{{ data.equMoney }}</van-tag>
            <span class="replay-12d045cdd2c0b9b6bf64ab787d773ae6">{{ data.gamePlayerName }}</span>
          </div>

          <div v-if="!teammate" class="replay-f01902c0d0136ca30fe1034f339964ba">
            <van-grid :border="false" :column-num="7">
              <van-grid-item
                v-show="data.heroSkill > 0"
                :icon="'//image.ttwz.qq.com/images/skill/' + data.heroSkill + '.png'"
                :text="data.heroPosition"
              />
              <van-grid-item
                v-for="(data, index) in data.equInfo"
                :key="'hero-b49d75de8b355a6d857fa2b655f35f7c-' + index"
                v-show="data > 0"
                :icon="'//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' + data + '.png'"
                @click="appOpenUrl('是否查看装备更新记录?', 'NGA @破笼之鸟', '//ngabbs.com/read.php?tid=19902976')"
              />
            </van-grid>
          </div>

          <van-button
            v-if="!teammate"
            round
            disabled
            color="#000000"
            size="mini"
            class="replay-ce50a09343724eb82df11390e2c1de18"
          >{{ data.heroKda }}</van-button>

          <van-button
            round
            type="info"
            size="mini"
            class="replay-ce50a09343724eb82df11390e2c1de18"
            @click="onGameActionSheetClick(data)"
          >对局</van-button>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="hero-d471f003c8678a7f2f2edc5ad677940f">
      <van-action-sheet
        v-model="show.actionSheet"
        :title="nowData.gamePlayerName + ' 如何打开'"
        :actions="actions"
        :close-on-click-action="true"
        safe-area-inset-bottom
        @select="onReplaySelect"
      />
    </div>

    <div class="hero-face1cbe136c70e1fc08cff038596944">
      <van-pagination
        v-model="paginationModel"
        :total-items="tableData.total"
        :items-per-page="tableData.pageSize"
        @change="onPaginationChange"
        class="replay-fe7cd4d1bf3fea9a0d921e224b3fa24c"
      />
    </div>

    <AppBottomTabbar />
  </div>
</template>

<style scoped>
div.van-collapse {
  margin-top: 3px;
}

.info-d5d3db1765287eef77d7927cc956f50a {
  font-size: 20px;
}

.replay-ce50a09343724eb82df11390e2c1de18 {
  margin-right: 3px;
}

.replay-d5d3db1765287eef77d7927cc956f50a {
  text-align: left;
}

.replay-e4d23e841d8e8804190027bce3180fa5 {
  margin-right: 3px;
}

.replay-12d045cdd2c0b9b6bf64ab787d773ae6 {
  margin-top: 2px;
  position: absolute;
}

.replay-f01902c0d0136ca30fe1034f339964ba {
  margin-bottom: 10px;
}

.replay-fe7cd4d1bf3fea9a0d921e224b3fa24c {
  margin-top: 25px;
}
</style>

<script>
export default {
  name: "HeroReplay",
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  },
  data() {
    return {
      teammate: false,
      collapseModel: ["1"],
      heroInfo: {
        id: 0
      },
      copyData: "",
      tableData: {
        result: [],
        total: 200,
        pageSize: 25
      },
      paginationModel: 1,
      nowData: {},
      show: {
        actionSheet: false
      },
      actions: [
        { name: "复制链接", value: 0 },
        { name: "详情", subname: "需要安装王者营地", value: 1 },
        { name: "回顾", subname: "需要安装王者营地", value: 2 }
      ]
    };
  },
  mounted() {
    let heroId = this.$route.params.id;
    this.heroInfo.id = heroId;

    this.getHeroInfo(heroId);
    this.getHeroReplayByHeroId(this.heroInfo.id, 1);
  },
  methods: {
    getHeroInfo: function(heroId) {
      this.axios
        .get(this.apiList.pvp.getHeroInfo + "&heroId=" + heroId)
        .then(ret => {
          this.heroInfo = ret.data.data.heroInfo;

          document.title = this.heroInfo.name + " | 苏苏的荣耀助手";

          if (heroId.indexOf(",") > -1) this.teammate = true;
        });
    },
    onGameActionSheetClick: function(row) {
      this.nowData = row;
      this.show.actionSheet = true;

      let url = row.url,
        urlIndex = url.indexOf("=");

      this.axios
        .get("//s.91m.top/?url=" + url.substr(urlIndex + 1, url.length))
        .then(ret => {
          this.copyData =
            this.heroInfo.name + " 的对局回顾 ↓\r-\r" + ret.data.data.url;
        });
    },
    getHeroReplayByHeroId: function(heroId, page) {
      this.axios
        .get(
          this.apiList.pvp.getHeroReplayByHeroId +
            "&heroId=" +
            heroId +
            "&page=" +
            page
        )
        .then(ret => {
          this.tableData = ret.data.data;
        });
    },
    onPaginationChange: function(e) {
      this.getHeroReplayByHeroId(this.heroInfo.id, e);
    },
    onReplaySelect: function(item) {
      let nowData = this.nowData;

      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }

      if (item.value == 1) {
        this.appOpenUrl("是否打开对局详情?", "需要安装王者营地", nowData.hippy);
      }

      if (item.value == 2) {
        this.appOpenUrl("是否打开对局回顾?", "需要安装王者营地", nowData.url);
      }
    }
  }
};
</script>