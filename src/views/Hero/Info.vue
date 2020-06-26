<template>
  <div class="hero-info">
    <div class="hero-a8137b0fb1cc9dcb896ce9a091695877">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        z-index="99999999"
        @click-left="$router.push({ path: '/ranking', from: '0aec27ad03df08d2d0bb21bb41575a21' })"
      >
        <van-icon name="arrow-left" slot="left" />
        <template #title>
          <div
            @click="$message.info('巅峰赛趋势、分路推荐 ;D')"
            class="info-632d142d7a508e86f6c35a044a17411e"
          >
            <img
              v-if="hero.info.trend > 0"
              v-lazy="'/img/app-icons/hot-' + hero.info.trend + '.png'"
              v-show="show.parameter"
              width="15"
              class="info-3d5f1ffeadf58eb64ef57aef7e53a31e"
            />
            <span class="info-d5d3db1765287eef77d7927cc956f50a">{{ hero.title }}</span>
          </div>
        </template>
        <template #right>
          <span v-show="show.parameter" class="info-68adaff1d028a37f27fb33c483329cba">
            <ul>
              <li
                v-for="(data, index) in hero.info.type"
                :key="'hero-e4d23e841d8e8804190027bce3180fa5-' + index"
              >
                <van-tag
                  v-if="data > 0"
                  :color="positionInfo[data][1]"
                  round
                  class="info-bc267281c62550407c9572aff2a45f69"
                >{{ positionInfo[data][0] }}</van-tag>
              </li>
            </ul>
          </span>
        </template>
      </van-nav-bar>
    </div>

    <div class="hero-9afffec6fe89b34b024d06907c006f36">
      <van-grid
        :border="false"
        :column-num="3"
        v-show="show.parameter"
        class="app-ff4a008470319a22d9cf3d14af485977"
      >
        <van-grid-item @click="$message.info('分均经济、场均时长、场均经济 XD')">
          <div class="info-795f3202b17cb6bc3d4b771d8c6c9eaf">
            <AppGold width="25" height="25" class="info-ff2364a0be3d20e46cc69efb36afe9a5" />
            <span
              class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c info-0fc3cfbc27e91ea60a787de13dae3e3c"
            >{{ hero.info.equMoneyMin || 0 }}</span>

            <AppTime width="25" height="25" class="info-ff2364a0be3d20e46cc69efb36afe9a5" />
            <span
              class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c info-0fc3cfbc27e91ea60a787de13dae3e3c"
            >{{ hero.info.usedtime || 0 }}</span>
          </div>

          <span class="info-9726255eec083aa56dc0449a21b33190">
            <van-tag
              round
              color="black"
              class="info-1d61d12b768d71c075477fd92281464d"
            >{{ hero.info.equMoneyOverflow || 0 }}</van-tag>
          </span>
        </van-grid-item>
        <van-grid-item @click="show.actionSheet = true">
          <van-circle
            v-model="circle.model"
            :rate="hero.info.dominanceRate"
            :speed="33"
            :clockwise="false"
            :color="{ '0%': '#3fecff', '100%': '#6149f6' }"
            :text="circle.info.text"
            size="75"
          />
          <img
            width="50"
            v-show="show.heroImg"
            v-lazy="hero.info.img"
            class="info-b798abe6e1b1318ee36b0dcb3fb9e4d3"
          />
        </van-grid-item>
        <van-grid-item @click="$message.info('技能下面的数字是占比 ;D')">
          <div class="info-f3412345b511c61986bba9a39793157f">
            <span
              class="info-713dd4d0b2e842c08da62ddeec872331"
              v-for="(data, index) in hero.info.skill"
              :key="'hero-713dd4d0b2e842c08da62ddeec872331-' + index"
            >
              <img
                v-if="data.id > 0"
                v-lazy="data.img"
                width="25"
                class="info-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c info-0fc3cfbc27e91ea60a787de13dae3e3c"
              >{{ data.pickRate }}</span>
            </span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="hero-913337a345680aef86e5801f1a78596b">
      <van-tabs
        v-model="tabsModel"
        :border="false"
        @change="onTabsChange"
        color="rgb(222,177,81)"
        class="info-d42f4851e770aa0f758b01388874f67b"
      >
        <van-tab title="巅峰赛趋势" />
        <van-tab title="同职业对比" />
        <van-tab title="自定义对比" />
        <div class="hero-e06398232dc80e41209489705546802c">
          <HeroLine v-show="tabsModel == 0" :heroId="hero.info.id" />
        </div>
        <div class="hero-ea950cb092f4e99e2ccf981cf503e5e3">
          <HeroRadar v-if="tabsModel > 0" :tabsModel="tabsModel" :heroId="hero.info.id" />
        </div>
      </van-tabs>
    </div>

    <div class="app-margin">
      <HeroUpdate v-if="isLoaded" v-show="show.parameter" :heroId="hero.info.id" />
    </div>

    <div class="hero-16e1b9e46fe4483c6bc17aea9d20736a">
      <van-action-sheet
        v-model="show.actionSheet"
        :title="hero.info.name + ' 的 ' + circle.info.text"
        :close-on-click-action="true"
        safe-area-inset-bottom
      >
        <van-grid :border="false" :column-num="2">
          <van-grid-item @click="onHeroVoteClick(1)">
            <AppCry width="50" height="50" />
            <span class="vote-ebd73ade48cb3e102d1dbbfbc0377c5f">{{ circle.info.vote[0].text }}</span>
          </van-grid-item>
          <van-grid-item @click="onHeroVoteClick(2)">
            <AppSmile width="50" height="50" />
            <span class="vote-ebd73ade48cb3e102d1dbbfbc0377c5f">{{ circle.info.vote[1].text }}</span>
          </van-grid-item>
          <van-cell
            title="注意事项"
            icon="question-o"
            @click="onTipsClick"
            class="hero-fc861e4a5806e7411f7860142244c917"
            is-link
          />
        </van-grid>
      </van-action-sheet>
    </div>

    <AppBottomTabbar v-if="appDevice" />
  </div>
</template>

<style>
div.van-circle__text {
  font-size: 10px;
}

div.info-d42f4851e770aa0f758b01388874f67b div.van-tabs__nav,
.info-d57ac45256849d9b13e2422d91580fb9 {
  z-index: 1;
}

div.van-nav-bar__right {
  width: 35%;
}
</style>

<style scoped>
.info-68adaff1d028a37f27fb33c483329cba li {
  float: left;
}

.hero-16e1b9e46fe4483c6bc17aea9d20736a {
  text-align: left;
}

.hero-e06398232dc80e41209489705546802c {
  margin-top: 25px;
}

.info-d5d3db1765287eef77d7927cc956f50a {
  margin: 0 5px;
}

.info-3d5f1ffeadf58eb64ef57aef7e53a31e {
  margin-top: -5px;
}

.info-68adaff1d028a37f27fb33c483329cba {
  position: absolute;
  margin-top: -3px;
  right: 20px;
}

.app-ff4a008470319a22d9cf3d14af485977 {
  margin-top: 15px;
}

.info-d42f4851e770aa0f758b01388874f67b {
  margin: 23px 0;
}

.info-9726255eec083aa56dc0449a21b33190 {
  margin-top: 5px;
}

.info-b798abe6e1b1318ee36b0dcb3fb9e4d3 {
  position: absolute;
  border-radius: 100%;
}

.info-0fc3cfbc27e91ea60a787de13dae3e3c {
  margin-left: -40px;
  margin-top: 26px;
}

.vote-ebd73ade48cb3e102d1dbbfbc0377c5f {
  font-size: 10px;
  margin-top: 10px;
}

.info-ff2364a0be3d20e46cc69efb36afe9a5 {
  margin: 0 3px;
}

.info-1d61d12b768d71c075477fd92281464d {
  margin: 7px 0 0 0;
}

.info-bc267281c62550407c9572aff2a45f69 {
  margin-left: 3px;
}
</style>

<script>
export default {
  name: "HeroInfo",
  components: {
    AppGold: resolve => require(["@/assets/Icons/AppGold.vue"], resolve),
    AppTime: resolve => require(["@/assets/Icons/AppTime.vue"], resolve),
    AppCry: resolve => require(["@/assets/Icons/AppCry.vue"], resolve),
    AppSmile: resolve => require(["@/assets/Icons/AppSmile.vue"], resolve),
    HeroLine: resolve => require(["@/components/Hero/Line.vue"], resolve),
    HeroRadar: resolve => require(["@/components/Hero/Radar.vue"], resolve),
    HeroUpdate: resolve => require(["@/components/Hero/Update.vue"], resolve),
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id != from.params.id) {
      this.getHeroInfo(to.params.id);
      next();
    }
  },
  data() {
    return {
      show: {
        heroImg: true,
        parameter: true,
        actionSheet: false
      },
      tabsModel: 0,
      hero: {
        title: "加载中",
        info: {
          id: 0
        }
      },
      circle: {
        model: 0,
        info: {
          text: "加载中",
          tips: "加载中",
          vote: [
            {
              img: "/img/app-icons/cry.png",
              text: "加载中"
            },
            {
              img: "/img/app-icons/smile.png",
              text: "加载中"
            }
          ]
        }
      },
      isLoaded: false
    };
  },
  mounted() {
    let heroId = this.$route.params.id;

    this.getHeroInfo(heroId);

    setInterval(() => {
      this.show.heroImg == true
        ? (this.show.heroImg = false)
        : (this.show.heroImg = true);
    }, 1000 * 5);
  },
  methods: {
    getHeroInfo: function(heroId) {
      this.axios
        .get(this.apiList.pvp.getHeroInfo + "&heroId=" + heroId)
        .then(ret => {
          this.isLoaded = true;

          let data = ret.data.data,
            heroInfo = data.heroInfo;

          this.circle.info = data.circleInfo;
          this.positionInfo = data.positionInfo;
          this.hero.info = heroInfo;

          this.hero.title = heroInfo.name;
          document.title = this.hero.info.name + " | 苏苏的荣耀助手";
        });
    },
    onTipsClick: function() {
      this.$dialog.alert({
        title: "请客观评价该英雄",
        message: this.circle.info.tips
      });
    },
    onHeroVoteClick: function(voteType) {
      this.axios
        .get(
          this.apiList.pvp.addHeroVote +
            "&heroId=" +
            this.hero.info.id +
            "&voteType=" +
            voteType
        )
        .then(ret => {
          let status = ret.data.status;

          if (status.code != 200) {
            this.$message.error(status.msg);
            return;
          } else {
            this.$message.success("投票成功");
          }
        });
      this.show.actionSheet = false;
    },
    onTabsChange: function(e) {
      e == 0 ? (this.show.parameter = true) : (this.show.parameter = false);

      let heroInfo = this.hero.info,
        dTitle;

      if (e == 0) {
        dTitle = heroInfo.name;
        this.hero.title = dTitle;
      }

      if (e == 1) {
        dTitle = "同职业对比";
        this.hero.title = dTitle;
      }

      if (e == 2) {
        dTitle = "自定义对比";
        this.hero.title = dTitle;
      }

      document.title = dTitle + " | 苏苏的荣耀助手";
    }
  }
};
</script>