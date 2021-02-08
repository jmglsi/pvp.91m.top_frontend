<template>
  <div class="hero-info">
    <div class="hero-a8137b0fb1cc9dcb896ce9a091695877">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :style="
          scroll >= 50
            ? { backgroundColor: 'white' }
            : { backgroundColor: 'transparent' }
        "
        @click-left="
          $appPush({
            path: '/search',
            query: { q: routeInfo.from.heroName, from: 'heroInfo', refresh: 1 },
          })
        "
        @click-right="$message.info($appMsg.info[1004])"
        left-text="搜一搜"
        z-index="99999999"
        class="hero-a2d3b30fd0cc9eb4affc0de9b7049895"
      >
        <template #title>
          <div
            @click="$message.info('英雄id:' + hero.info.id + ',近期热度 ;D')"
            class="hero-632d142d7a508e86f6c35a044a17411e"
          >
            <span
              :style="
                scroll >= 50 || tabsInfo.model > 0
                  ? { color: 'black' }
                  : { color: 'white' }
              "
              class="hero-d5d3db1765287eef77d7927cc956f50a"
            >
              {{ hero.title }}
            </span>
            <img
              v-if="showInfo.parameter && hero.info.trend > 0"
              v-lazy="'/img/app-icons/hot_' + hero.info.trend + '.png'"
              width="15"
              height="15"
              class="hero-f90943c8968fa651d7e1b617ff046fe2"
            />
          </div>
        </template>
        <template #right>
          <div
            v-if="showInfo.parameter"
            class="hero-68adaff1d028a37f27fb33c483329cba"
          >
            <ul>
              <li
                v-for="(data, index) in hero.info.type"
                :key="'hero-5b659d3a22bcdd20abf3405d43ae80a7-' + index"
              >
                <van-tag
                  round
                  v-if="data"
                  :color="positionInfo[data - 1][1]"
                  class="hero-bc267281c62550407c9572aff2a45f69"
                  >{{ positionInfo[data - 1][0] }}</van-tag
                >
              </li>
            </ul>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div class="hero-e21ecc3330f7f3c382fc113f392368bd">
      <van-swipe
        v-if="showInfo.parameter"
        :autoplay="7500"
        :height="250"
        class="hero-f39c862bd8ca3cf1c9c09bc84129c5dd"
      >
        <van-swipe-item
          v-for="(data, index) in hero.info.skin"
          :key="'hero-07ae211504ad5deba5d239525b888d59-' + index"
          @click="onImagePreviewClick(index)"
          class="hero-5a0b1ba1b22eb336b55e70eb2abbac30"
        >
          <img v-lazy="data" class="hero-44908c08b6c253a19ab6246e6eec857a" />
        </van-swipe-item>
      </van-swipe>
      <van-image-preview
        v-model="showInfo.imagePreview"
        :images="hero.info.skin"
        :startPosition="showInfo.imageIndex"
        className="hero-c8c469026f350858cfa8f2e5bb6596df"
      >
        <template v-slot:cover
          ><span class="hero-b5741c8457973b008c424c6f94ff3901"
            >长按或右键可保存图片~</span
          ></template
        >
      </van-image-preview>
    </div>

    <div
      :style="tabsInfo.model > 0 ? { marginTop: '50px' } : { marginTop: '0' }"
      class="hero-9afffec6fe89b34b024d06907c006f36"
    >
      <van-grid
        v-if="showInfo.parameter"
        :border="false"
        :column-num="3"
        class="hero-d7eb5a86f1d4b50ea22711e1e60718e9"
      >
        <van-grid-item
          class="hero-c6e864acb6955eed0361921288d34149"
          @click="$message.info($appMsg.info[1005])"
        >
          <div class="hero-9f1e888d1782176b9f8c60c8b08a0837">
            <img
              v-lazy="
                '//img06.mifile.cn/v1/MI_542ED8B1722DC/65d2ff54aa494198a72119fe39627e3c.png'
              "
              width="25"
              height="25"
              class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
            />
            <span
              class="app-0fc3cfbc27e91ea60a787de13dae3e3c hero-0fc3cfbc27e91ea60a787de13dae3e3c"
              >{{ hero.info.equMoneyMin || 0 }}</span
            >

            <img
              v-lazy="
                '//img06.mifile.cn/v1/MI_542ED8B1722DC/57f4613bdb1a0f3e40b154a87b1538a4.png'
              "
              width="25"
              height="25"
              class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
            />
            <span
              class="app-0fc3cfbc27e91ea60a787de13dae3e3c hero-0fc3cfbc27e91ea60a787de13dae3e3c"
              >{{ hero.info.usedtime || 0 }}</span
            >
          </div>

          <span class="hero-9726255eec083aa56dc0449a21b33190">
            <van-tag
              round
              color="black"
              class="hero-1d61d12b768d71c075477fd92281464d"
              >{{ hero.info.equMoneyOverflow || 0 }}</van-tag
            >
          </span>
        </van-grid-item>
        <van-grid-item
          class="hero-c6e864acb6955eed0361921288d34149"
          @click="showInfo.heroMenu = true"
        >
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
        </van-grid-item>
        <van-grid-item
          class="hero-c6e864acb6955eed0361921288d34149"
          @click="showInfo.skillMenu = true"
        >
          <div class="hero-f3412345b511c61986bba9a39793157f">
            <span class="hero-5a7c3c141fd96e8559a5994bd1c63057"
              ><img
                v-lazy="hero.info.skill.preview[0].img"
                width="25"
                height="25"
                class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c hero-0fc3cfbc27e91ea60a787de13dae3e3c"
                >{{ hero.info.skill.preview[0].pickRate }}%</span
              ></span
            >
            <span class="hero-5a7c3c141fd96e8559a5994bd1c63057"
              ><img
                v-lazy="hero.info.skill.preview[1].img"
                width="25"
                height="25"
                class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c hero-0fc3cfbc27e91ea60a787de13dae3e3c"
                >{{ hero.info.skill.preview[1].pickRate }}%</span
              ></span
            >
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="hero-913337a345680aef86e5801f1a78596b">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :border="false"
        :ellipsis="false"
        @change="onHeroTabsChange"
        duration="0.5"
        line-width="25px"
        color="orange"
        title-active-color="orange"
        class="hero-d42f4851e770aa0f758b01388874f67b"
      >
        <van-tab class="hero-ab71021d21963773bfb8be80af65869f">
          <template #title>
            <div class="app-f3b57b63e4f5f4e157fd45bdb8611005">
              <van-dropdown-menu direction="up">
                <van-dropdown-item
                  v-model="trendInfo.model"
                  :options="trendInfo.options"
                  :disabled="tabsInfo.model == 0 ? false : true"
                />
              </van-dropdown-menu>
            </div>
          </template>
        </van-tab>
        <van-tab
          class="hero-ab71021d21963773bfb8be80af65869f"
          title="同分路对比"
        />
        <van-tab
          class="hero-ab71021d21963773bfb8be80af65869f"
          title="自定义对比"
          :disabled="tabsInfo.model == 0 ? true : false"
        />
        <div class="hero-e06398232dc80e41209489705546802c">
          <HeroLine
            v-if="tabsInfo.model == 0"
            :heroId="hero.info.id"
            :trendType="trendInfo.model"
          />
        </div>
        <div
          :style="$appIsMobile ? { marginTop: '0' } : { marginTop: '25px' }"
          class="hero-ea950cb092f4e99e2ccf981cf503e5e3"
        >
          <HeroRadar
            v-if="tabsInfo.model > 0"
            :tabsModel="tabsInfo.model"
            :heroId="hero.info.id"
          />
        </div>
      </van-tabs>
    </div>

    <div
      v-show="showInfo.parameter"
      class="hero-9393a9be63ea720a87e048d40caa03b5"
    >
      <van-skeleton v-show="showInfo.heroUpdate" :row="30" />

      <lazy-component
        :preLoad="1"
        @show="onComponentShow"
        class="hero-2a23eb5062a0258f23f4969c4c60aa2e"
      >
        <div class="hero-b7b5e31b028440d2e0e0157baad49513">
          <HeroSameHobby :heroId="hero.info.id" />
        </div>

        <div class="hero-b7b5e31b028440d2e0e0157baad49513">
          <HeroUpdate
            v-if="hero.info.id"
            :heroId="hero.info.id"
            :updateId="hero.info.updateId"
          />
        </div>
      </lazy-component>
    </div>

    <div
      class="app-e827ba0e6873e7ce7ef7c6c58e970609 hero-2882d594d0ac3524bffd5148791e96da"
    >
      <van-action-sheet
        v-model="showInfo.skillMenu"
        :title="hero.info.name + ' 的其他数据 (上周)'"
        safe-area-inset-bottom
      >
        <van-tabs
          v-model="skillInfo.model"
          v-if="skillInfo.model > -1"
          :ellipsis="false"
          @change="onSkillTabsChange"
          color="orange"
          title-active-color="orange"
        >
          <van-tab title="技能">
            <HeroSkillList :heroId="hero.info.id"
          /></van-tab>
          <van-tab title="装备 (推荐)"
            ><HeroEquipmentListALL :heroId="hero.info.id"
          /></van-tab>
          <van-tab title="装备 (单件)"
            ><HeroEquipmentListOne
              :equipmentId="hero.info.id"
              :equipmentType="1"
          /></van-tab>
        </van-tabs>
      </van-action-sheet>
    </div>

    <div class="hero-16e1b9e46fe4483c6bc17aea9d20736a">
      <van-action-sheet
        v-model="showInfo.heroMenu"
        :title="hero.info.name + ' 的 ' + circle.info.text"
        safe-area-inset-bottom
        class="hero-6b6bfab1b3e7ce800a7ea90c638d7f3a"
      >
        <van-grid
          class="hero-ed90360246f7e2ed71281819e0ca3623"
          :border="false"
          :column-num="2"
        >
          <van-grid-item
            class="hero-59c25466342abdb6746988b245f3a5a6"
            @click="onHeroVoteClick(0)"
          >
            <img
              v-lazy="
                '//img06.mifile.cn/v1/MI_542ED8B1722DC/775ce210e6ab76e03cc5a0ff43e46141.png'
              "
              width="50"
              height="50"
            />
            <span class="hero-ebd73ade48cb3e102d1dbbfbc0377c5f">{{
              circle.info.vote[0].text
            }}</span>
          </van-grid-item>
          <van-grid-item
            class="hero-59c25466342abdb6746988b245f3a5a6"
            @click="onHeroVoteClick(1)"
          >
            <img
              v-lazy="
                '//img08.mifile.cn/v1/MI_542ED8B1722DC/2dfa18ec81ff43a63abf94798f431e8d.png'
              "
              width="50"
              height="50"
            />
            <span class="hero-ebd73ade48cb3e102d1dbbfbc0377c5f">{{
              circle.info.vote[1].text
            }}</span>
          </van-grid-item>
          <van-cell
            title="注意事项"
            icon="question-o"
            is-link
            class="hero-fc861e4a5806e7411f7860142244c917"
            @click="
              $dialog.alert({
                title: '请客观评价该英雄',
                message: circle.info.tips,
              })
            "
          />
        </van-grid>
      </van-action-sheet>
    </div>

    <div
      v-show="tabsInfo.model == 0"
      class="hero-79acd83e2dbb9d5b6de778dd5077db2c"
    >
      <van-tabbar
        fixed
        safe-area-inset-bottom
        active-color="orange"
        class="hero-d4a9092fd7b386904e4a2894044f2a9d"
      >
        <van-tabbar-item
          :icon="
            hero.info.likeStatus == 1
              ? '/img/app-icons/like_1.png'
              : '/img/app-icons/like_0.png'
          "
          name="/"
          icon-prefix="app-72383b9892bd1e6a2bd310dfb1fb2344"
          @click="onHeroLikeClick"
          >{{ hero.info.likeStatus == 1 ? "已喜欢" : "喜欢" }}</van-tabbar-item
        >
        <van-tabbar-item
          icon="//img07.mifile.cn/v1/MI_542ED8B1722DC/09e4d71b4fc218baad6fcc97ce0b8a96.png"
          name="/"
          icon-prefix="app-72383b9892bd1e6a2bd310dfb1fb2344"
          @click="
            hero.info.wikiId
              ? $appOpenUrl('是否打开外部链接?', null, {
                  path: 'https://bbs.nga.cn/read.php?tid=' + hero.info.wikiId,
                })
              : $message.info($appMsg.info[1006])
          "
          >稷下图书馆</van-tabbar-item
        >
      </van-tabbar>
    </div>

    <AppBottomTabbar height="100px" />
  </div>
</template>

<script>
export default {
  name: "HeroInfo",
  components: {
    HeroSkillList: () => import("@/components/Hero/SkillList.vue"),
    HeroEquipmentListALL: () =>
      import("@/components/Hero/EquipmentList_All.vue"),
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
    HeroLine: () => import("@/components/Hero/Line.vue"),
    HeroRadar: () => import("@/components/Hero/Radar.vue"),
    HeroUpdate: () => import("@/components/Hero/Update.vue"),
    HeroSameHobby: () => import("@/components/Hero/SameHobby.vue"),
    AppBottomTabbar: () => import("@/components/App/BottomTabbar.vue"),
  },
  watch: {
    $route: function (to) {
      let heroId = parseInt(to.params.id) || 111;

      this.getHeroInfo(heroId);
    },
  },
  data() {
    return {
      scroll: 0,
      hero: {
        title: "加载中",
        info: {
          id: null,
          name: "加载中",
          clockwise: false,
          skin: [],
          skinIndex: 0,
          skill: {
            preview: [
              {
                id: 0,
                img: "//image.ttwz.qq.com/images/skill/80102.png",
                pickRate: 0,
              },
              {
                id: 0,
                img:
                  "//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/1701.png",
                pickTimes: 0,
              },
            ],
          },
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
      showInfo: {
        heroImg: true,
        parameter: true,
        skillMenu: false,
        heroMenu: false,
        imagePreview: false,
        imageIndex: 0,
        heroUpdate: true,
      },
      tabsInfo: {
        model: 0,
      },
      trendInfo: {
        model: 0,
        options: [
          { text: "巅峰赛趋势", value: 0 },
          { text: "英雄强势期", value: 1 },
          { text: "舆论趋势", value: 2 },
        ],
      },
      skillInfo: {
        model: 0,
      },
      tipsInfo: [0, 0, 0],
      routeInfo: {
        from: {
          heroName: "",
        },
      },
    };
  },
  mounted() {
    let heroId = parseInt(this.$route.params.id) || 111,
      show = this.$route.query.show || "";

    this.getHeroInfo(heroId);

    if (show == "heroUpdate") {
      this.$message.info(this.$appMsg.info[1016]);
    }

    if (show == "heroSkill") {
      this.showInfo.skillMenu = true;
    } else {
      this.showInfo.skillMenu = false;
    }

    window.addEventListener("scroll", this.scrollTop);
  },
  methods: {
    scrollTop: function () {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    getHeroInfo: function (heroId) {
      this.$axios
        .post(this.$appApi.pvp.getHeroInfo + "&heroId=" + heroId)
        .then((res) => {
          let data = res.data.data,
            heroInfo = data.heroInfo;

          this.circle.info = data.circleInfo;
          this.positionInfo = data.positionInfo;
          this.hero.info = heroInfo;

          if (!this.routeInfo.from.heroName)
            this.routeInfo.from.heroName = heroInfo.name;

          this.hero.title = heroInfo.name;
          document.title = heroInfo.name + " | " + this.$appInfo.name;
        });
    },
    onComponentShow: function () {
      setTimeout(() => {
        this.showInfo.heroUpdate = false;
      }, 1000);
    },
    onHeroVoteClick: function (voteType) {
      this.$axios
        .post(
          this.$appApi.pvp.addHeroVote +
            "&heroId=" +
            this.hero.info.id +
            "&voteType=" +
            voteType
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });

      this.showInfo.heroMenu = false;
    },
    onSkillTabsChange: function (e) {
      let tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1009];
      }

      if (this.tipsInfo[e] == 0) {
        this.$message.info(tipsText);
        this.tipsInfo[e] = 1;
      }
    },
    onHeroLikeClick: function () {
      this.$axios
        .post(
          this.$appApi.pvp.addWebAccountHeroLike +
            "&heroId=" +
            this.hero.info.id
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success(this.$appMsg.success[1000]);

            this.hero.info.likeStatus == 0
              ? (this.hero.info.likeStatus = 1)
              : (this.hero.info.likeStatus = 0);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onImagePreviewClick: function (imageIndex) {
      this.showInfo.imagePreview = true;
      this.showInfo.imageIndex = imageIndex;
    },
    onHeroTabsChange: function (e) {
      let dTitle = "",
        heroInfo = this.hero.info;

      if (e == 0) {
        dTitle = heroInfo.name;
        this.hero.title = dTitle;
      } else if (e == 1) {
        dTitle = "同分路对比";
        this.hero.title = "";
      } else if (e == 2) {
        dTitle = "自定义对比";
        this.hero.title = "";
      }

      document.title = dTitle + " | " + this.$appInfo.name;

      e == 0
        ? (this.showInfo.parameter = true)
        : (this.showInfo.parameter = false);
    },
  },
};
</script>
