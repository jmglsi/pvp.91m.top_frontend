<template>
  <div class="hero-info">
    <div class="hero-a8137b0fb1cc9dcb896ce9a091695877">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        z-index="99999999"
        class="hero-a2d3b30fd0cc9eb4affc0de9b7049895"
        @click-left="appPush('/ranking', $options.name)"
        @click-right="$message.info('提示:1002,分路推荐 ;D')"
      >
        <van-icon name="arrow-left" slot="left" />
        <template #title>
          <div
            @click="$message.info('提示:1003,近期热度 ;D')"
            class="info-632d142d7a508e86f6c35a044a17411e"
          >
            <img
              v-show="show.parameter && hero.info.trend > 0"
              v-lazy="'/img/app-icons/hot-' + hero.info.trend + '.png'"
              width="15"
              height="15"
              class="info-f90943c8968fa651d7e1b617ff046fe2"
            />
            <span class="info-d5d3db1765287eef77d7927cc956f50a">{{ hero.title }}</span>
          </div>
        </template>
        <template #right>
          <div v-show="show.parameter" class="info-68adaff1d028a37f27fb33c483329cba">
            <ul>
              <li
                v-for="(data, index) in hero.info.type"
                :key="'hero-e4d23e841d8e8804190027bce3180fa5-' + index"
              >
                <van-tag
                  v-if="data"
                  :color="positionInfo[data - 1][1]"
                  round
                  class="info-bc267281c62550407c9572aff2a45f69"
                >{{ positionInfo[data - 1][0] }}</van-tag>
              </li>
            </ul>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div class="hero-9afffec6fe89b34b024d06907c006f36">
      <van-grid
        v-show="show.parameter"
        :border="false"
        :column-num="3"
        class="app-ff4a008470319a22d9cf3d14af485977"
      >
        <van-grid-item
          class="hero-c6e864acb6955eed0361921288d34149"
          @click="$message.info('提示:1004,分均经济、场均时长、场均经济 ;D')"
        >
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
        <van-grid-item class="hero-c6e864acb6955eed0361921288d34149" @click="show.heroMenu = true">
          <van-circle
            v-model="circle.model"
            :rate="hero.info.dominanceRate"
            :speed="33"
            :clockwise="false"
            :color="{ '0%': '#3fecff', '100%': '#6149f6' }"
            :text="circle.info.text"
            size="75"
            class="hero-83444807ba7a7da23e12b17567d2d595"
          />
          <img
            v-show="show.heroImg"
            v-lazy="hero.info.img"
            width="50"
            height="50"
            class="info-48c8178c9726b2afcaf8c5ede5437746"
          />
        </van-grid-item>
        <van-grid-item class="hero-c6e864acb6955eed0361921288d34149" @click="show.heroSkill = true">
          <div class="info-f3412345b511c61986bba9a39793157f">
            <span
              class="info-cb4b556fe00d9a0da9d94f0bbf40e78c"
              v-for="(data, index) in hero.info.skill.slice(0, 2)"
              :key="'hero-d7768ef7449dfbbc6020f1dd0ae11593-' + index"
            >
              <img
                v-show="data.id > 0"
                v-lazy="data.img"
                width="25"
                height="25"
                class="info-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c info-0fc3cfbc27e91ea60a787de13dae3e3c"
              >{{ (data.pickRate).toFixed(2) }}</span>
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
        @click="tabsModel == 0 && hero.line == 0 ? hero.line = 1 : hero.line = 0"
        color="rgb(222,177,81)"
        class="info-d42f4851e770aa0f758b01388874f67b"
      >
        <van-tab
          class="info-ab71021d21963773bfb8be80af65869f"
          :title="hero.line == 0 ? '巅峰赛趋势' : '论坛舆论'"
        />
        <van-tab class="info-ab71021d21963773bfb8be80af65869f" title="同职业对比" />
        <van-tab
          class="info-ab71021d21963773bfb8be80af65869f"
          title="自定义对比"
          :disabled="tabsModel == 0 ? true : false"
        />
        <div class="hero-e06398232dc80e41209489705546802c">
          <HeroLine v-if="tabsModel == 0" :heroId="hero.info.id" :lineType="hero.line" />
        </div>
        <div class="hero-ea950cb092f4e99e2ccf981cf503e5e3">
          <HeroRadar v-if="tabsModel > 0" :tabsModel="tabsModel" :heroId="hero.info.id" />
        </div>
      </van-tabs>
    </div>

    <div class="app-d638615004bb2ff42ed26948aba89c80">
      <HeroUpdate v-if="isLoaded" v-show="show.parameter" :heroId="hero.info.id" />
    </div>

    <div class="hero-2882d594d0ac3524bffd5148791e96da">
      <van-action-sheet
        v-model="show.heroSkill"
        :title="hero.info.name + ' 的技能数据 (周榜)'"
        safe-area-inset-bottom
      >
        <HeroList :heroSkill="hero.info.skill" />
      </van-action-sheet>
    </div>

    <div class="hero-16e1b9e46fe4483c6bc17aea9d20736a">
      <van-action-sheet
        v-model="show.heroMenu"
        :title="hero.info.name + ' 的 ' + circle.info.text"
        :close-on-click-action="true"
        safe-area-inset-bottom
        class="hero-6b6bfab1b3e7ce800a7ea90c638d7f3a"
      >
        <van-grid class="vote-ed90360246f7e2ed71281819e0ca3623" :border="false" :column-num="2">
          <van-grid-item class="vote-59c25466342abdb6746988b245f3a5a6" @click="onHeroVoteClick(1)">
            <AppCry width="50" height="50" />
            <span class="vote-ebd73ade48cb3e102d1dbbfbc0377c5f">{{ circle.info.vote[0].text }}</span>
          </van-grid-item>
          <van-grid-item class="vote-59c25466342abdb6746988b245f3a5a6" @click="onHeroVoteClick(2)">
            <AppSmile width="50" height="50" />
            <span class="vote-ebd73ade48cb3e102d1dbbfbc0377c5f">{{ circle.info.vote[1].text }}</span>
          </van-grid-item>
          <van-cell
            title="注意事项"
            icon="question-o"
            is-link
            class="hero-fc861e4a5806e7411f7860142244c917"
            @click="onTipsClick"
          />
        </van-grid>
      </van-action-sheet>
    </div>

    <AppBottomTabbar v-if="appDevice" />
  </div>
</template>

<script>
export default {
  name: "HeroInfo",
  components: {
    AppGold: (resolve) => require(["@/assets/Icons/AppGold.vue"], resolve),
    AppTime: (resolve) => require(["@/assets/Icons/AppTime.vue"], resolve),
    AppCry: (resolve) => require(["@/assets/Icons/AppCry.vue"], resolve),
    AppSmile: (resolve) => require(["@/assets/Icons/AppSmile.vue"], resolve),
    HeroList: (resolve) => require(["@/components/Hero/List.vue"], resolve),
    HeroLine: (resolve) => require(["@/components/Hero/Line.vue"], resolve),
    HeroRadar: (resolve) => require(["@/components/Hero/Radar.vue"], resolve),
    HeroUpdate: (resolve) => require(["@/components/Hero/Update.vue"], resolve),
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
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
        heroSkill: false,
        heroMenu: false,
      },
      tabsModel: 0,
      hero: {
        line: 0,
        title: "加载中",
        info: {
          id: 0,
          skill: [],
        },
      },
      circle: {
        model: 0,
        info: {
          text: "加载中",
          tips: "加载中",
          vote: [
            {
              img: "/img/app-icons/cry.png",
              text: "加载中",
            },
            {
              img: "/img/app-icons/smile.png",
              text: "加载中",
            },
          ],
        },
      },
      isLoaded: false,
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
    getHeroInfo: function (heroId) {
      this.axios
        .get(this.apiList.pvp.getHeroInfo + "&heroId=" + heroId)
        .then((res) => {
          this.isLoaded = true;

          let data = res.data.data,
            heroInfo = data.heroInfo;

          this.circle.info = data.circleInfo;
          this.positionInfo = data.positionInfo;
          this.hero.info = heroInfo;

          this.hero.title = heroInfo.name;
          document.title = this.hero.info.name + " | 苏苏的荣耀助手";
        });
    },
    onTipsClick: function () {
      this.$dialog.alert({
        title: "请客观评价该英雄",
        message: this.circle.info.tips,
      });
    },
    onHeroVoteClick: function (voteType) {
      this.axios
        .get(
          this.apiList.pvp.addHeroVote +
            "&heroId=" +
            this.hero.info.id +
            "&voteType=" +
            voteType
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code != 200) {
            this.$message.error(status.msg);
            return;
          } else {
            this.$message.success("投票成功");
          }
        });

      this.show.heroMenu = false;
    },
    onTabsChange: function (e) {
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

      e == 0 ? (this.show.parameter = true) : (this.show.parameter = false);
    },
  },
};
</script>