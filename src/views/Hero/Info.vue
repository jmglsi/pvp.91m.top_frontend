<template>
  <div class="hero-info">
    <div class="hero-a8137b0fb1cc9dcb896ce9a091695877">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :safe-area-inset-top="true"
        :style="
          scroll >= 50
            ? { backgroundColor: 'white !important' }
            : { backgroundColor: 'transparent !important' }
        "
        @click-left="
          $appPush({
            path: $store.getters.getHistory.fullPath,
          })
        "
        @click-right="$message.info($appMsg.info[1004])"
        :left-text="scroll >= 50 ? '搜一搜' : null"
        z-index="99999999"
        class="hero-a2d3b30fd0cc9eb4affc0de9b7049895"
      >
        <template #title>
          <div
            :style="
              scroll >= 50 || tabsInfo.model > 0 ? null : { display: 'none' }
            "
            class="hero-632d142d7a508e86f6c35a044a17411e"
          >
            <!-- @click="$message.info('英雄id:' + hero.info.id + '，近期热度')" -->
            <ChooseHero @select="getHeroId">
              <span
                :style="
                  scroll >= 50 || tabsInfo.model > 0
                    ? { color: 'black !important' }
                    : { color: 'white !important' }
                "
                class="hero-d5d3db1765287eef77d7927cc956f50a"
              >
                {{ hero.title }}
              </span>
              <img
                v-if="showInfo.parameter && hero.info.change.trendType > 0"
                v-lazy="
                  '/img/icons-app/hot_' + hero.info.change.trendType + '.png'
                "
                width="15"
                height="15"
                class="hero-f90943c8968fa651d7e1b617ff046fe2"
              />
            </ChooseHero>
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
                  v-if="data"
                  round
                  :color="$appConfigInfo.positionInfo[data][1] || 'black'"
                  class="hero-bc267281c62550407c9572aff2a45f69"
                >
                  {{ $appConfigInfo.positionInfo[data][0] || $t("unknown") }}
                </van-tag>
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
        :height="$appIsApple && $appConfigInfo.appInfo.pwa == 1 ? '300' : '250'"
        :style="
          $appIsApple && $appConfigInfo.appInfo.pwa == 1
            ? { marginTop: '-50px' }
            : {}
        "
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
        <template #indicator>
          <div class="custom-indicator"></div>
        </template>
      </van-swipe>

      <van-image-preview
        v-model="showInfo.imagePreview"
        :images="hero.info.skin"
        :startPosition="showInfo.imageIndex"
        class="app-0ca41257ee36e86e5d89591c82113263"
      >
        <template #cover>
          <span class="hero-b5741c8457973b008c424c6f94ff3901">
            长按或右键保存图片
          </span>
        </template>
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
              v-lazy="'/img/icons-app/gold.png'"
              width="25"
              height="25"
              class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
            />
            <span
              class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 hero-0fc3cfbc27e91ea60a787de13dae3e3c"
            >
              {{ hero.info.equipmentMoney || 0 }}
            </span>

            <img
              v-lazy="'/img/icons-app/time.png'"
              width="25"
              height="25"
              class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
            />
            <span
              class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 hero-0fc3cfbc27e91ea60a787de13dae3e3c"
            >
              {{ hero.info.usedtime || 0 }}
            </span>
          </div>

          <span class="hero-9726255eec083aa56dc0449a21b33190">
            <van-tag
              round
              color="black"
              class="hero-1d61d12b768d71c075477fd92281464d"
            >
              {{ hero.info.equipmentMoneyMin || 0 }}
            </van-tag>
          </span>
        </van-grid-item>
        <van-grid-item
          class="hero-c6e864acb6955eed0361921288d34149"
          @click="showInfo.heroActionSheet = true"
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
          @click="showInfo.skillActionSheet = true"
        >
          <div class="hero-f3412345b511c61986bba9a39793157f">
            <span class="hero-5a7c3c141fd96e8559a5994bd1c63057">
              <img
                v-lazy="{
                  src: '/img/icons-skill/' + hero.info.skill[0].id + '.jpg',
                  error: hero.info.skill[0].img,
                }"
                width="25"
                height="25"
                class="app-border-radius hero-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 hero-0fc3cfbc27e91ea60a787de13dae3e3c"
              >
                {{ hero.info.skill[0].pickRate }}%
              </span>
            </span>
            <span class="hero-5a7c3c141fd96e8559a5994bd1c63057">
              <img
                v-lazy="{
                  src: '/img/icons-equipment/' + hero.info.skill[1].id + '.jpg',
                  error: hero.info.skill[1].img,
                }"
                width="25"
                height="25"
                class="app-border-radius hero-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 hero-0fc3cfbc27e91ea60a787de13dae3e3c"
              >
                {{ hero.info.skill[1].pickRate }}%
              </span>
            </span>
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
        @click="onHeroTabsClick"
        duration="0.5"
        line-width="25px"
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
          <HeroHistogram
            v-if="tabsInfo.model == 0 && trendInfo.model == 0"
            :heroId="hero.info.id"
            :aid="trendInfo.model"
          />
          <ChartsHeroLine
            v-else-if="tabsInfo.model == 0 && trendInfo.model > 0"
            :heroId="hero.info.id"
            :aid="trendInfo.model"
          />
        </div>
        <div
          :style="$appIsMobile ? { marginTop: '0' } : { marginTop: '25px' }"
          class="hero-ea950cb092f4e99e2ccf981cf503e5e3"
        >
          <ChartsHeroRadar
            v-if="tabsInfo.model > 0"
            :tabsModel="tabsInfo.model"
            :heroId="hero.info.id"
          />
        </div>
      </van-tabs>
    </div>

    <div
      v-if="showInfo.parameter"
      class="hero-9393a9be63ea720a87e048d40caa03b5"
    >
      <van-skeleton v-if="showInfo.skeleton" :row="30" />

      <lazy-component
        @show="onComponentShow"
        class="hero-2a23eb5062a0258f23f4969c4c60aa2e"
      >
        <div id="heroSameHobby" class="hero-b7b5e31b028440d2e0e0157baad49513">
          <HeroSameHobby :heroId="hero.info.id" />
        </div>

        <div class="hero-b7b5e31b028440d2e0e0157baad49513">
          <HeroUpdate
            v-if="hero.info.id && hero.info.id < 900"
            :aid="1"
            :heroId="hero.info.id"
            :updateId="hero.info.updateId"
          />
        </div>
      </lazy-component>
    </div>

    <div class="hero-2882d594d0ac3524bffd5148791e96da">
      <van-action-sheet
        v-model="showInfo.skillActionSheet"
        :title="hero.info.name + ' 的其他数据 (近期)'"
      >
        <template #default>
          <van-tabs
            v-model="skillInfo.model"
            v-if="skillInfo.model > -1"
            :ellipsis="false"
            @click="onSkillTabsClick"
          >
            <van-tab title="顺位 (推荐)">
              <HeroBp :heroId="hero.info.id" />
            </van-tab>
            <van-tab title="打法 (推荐)">
              <HeroGenreList :genreId="hero.info.id" />
            </van-tab>
            <van-tab title="出装 (推荐)">
              <HeroEquipmentListALL :heroId="hero.info.id" />
            </van-tab>
            <van-tab title="出装 (单件)">
              <HeroEquipmentListOne
                :equipmentId="hero.info.id"
                :equipmentType="1"
              />
            </van-tab>
            <van-tab>
              <template #title>
                <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                  国服 (备战)
                </span>
                <img v-lazy="'/img/icons-app/hot.png'" width="13" height="13" />
              </template>

              <HeroInscriptionList :heroId="hero.info.id" />
            </van-tab>
          </van-tabs>
        </template>
      </van-action-sheet>
    </div>

    <AppHello height="100px" />

    <div class="hero-16e1b9e46fe4483c6bc17aea9d20736a">
      <van-action-sheet
        v-model="showInfo.heroActionSheet"
        :title="hero.info.name + ' 的 ' + circle.info.text"
        class="hero-6b6bfab1b3e7ce800a7ea90c638d7f3a"
      >
        <template #default>
          <van-grid
            :border="false"
            :column-num="2"
            class="hero-ed90360246f7e2ed71281819e0ca3623"
          >
            <van-grid-item
              class="hero-59c25466342abdb6746988b245f3a5a6"
              @click="onHeroVoteClick(0)"
            >
              <img v-lazy="circle.info.vote[0].img" width="50" height="50" />
              <span class="hero-ebd73ade48cb3e102d1dbbfbc0377c5f">
                {{ circle.info.vote[0].text }}
              </span>
            </van-grid-item>
            <van-grid-item
              class="hero-59c25466342abdb6746988b245f3a5a6"
              @click="onHeroVoteClick(1)"
            >
              <img v-lazy="circle.info.vote[1].img" width="50" height="50" />
              <span class="hero-ebd73ade48cb3e102d1dbbfbc0377c5f">
                {{ circle.info.vote[1].text }}
              </span>
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
                  theme: 'round-button',
                })
              "
            />
          </van-grid>
        </template>
      </van-action-sheet>
    </div>

    <div
      v-if="tabsInfo.model == 0"
      class="hero-79acd83e2dbb9d5b6de778dd5077db2c"
    >
      <van-tabbar fixed class="app-130a360689f8d613da10c94d53527a1b">
        <van-tabbar-item
          v-if="hero.info.id && hero.info.id < 999"
          :icon="'/img/icons-app/like_' + hero.info.likeStatus + '.png'"
          icon-prefix="app-72383b9892bd1e6a2bd310dfb1fb2344"
          @click="onHeroLikeClick"
        >
          {{ hero.info.likeStatus == 1 ? "已关注" : "关注" }}
        </van-tabbar-item>
        <!--
          <van-tabbar-item
            icon="/img/icons-app/research.png"
            icon-prefix="app-72383b9892bd1e6a2bd310dfb1fb2344"
            @click="
              hero.info.wikiId
                ? $appOpenUrl(
                    $t('open-url.title'),
                    null,
                    { path: '//ngabbs.com/read.php?tid=' + hero.info.wikiId },
                    0
                  )
                : $message.info($appMsg.info[1006])
            "
          >
            稷下图书馆
          </van-tabbar-item>
        -->
        <van-tabbar-item
          icon="/img/icons-app/group.png"
          to="/search?q=%E5%A4%A7%E4%BD%AC%E4%BB%AC%E5%BF%AB%E6%9D%A5%E5%8A%A0%E7%BE%A4&refresh=1"
          icon-prefix="app-72383b9892bd1e6a2bd310dfb1fb2344"
        >
          加群讨论
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "heroInfo",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
    ChartsHeroRadar: () => import("@/components/Charts/HeroRadar.vue"),
    ChartsHeroLine: () => import("@/components/Charts/HeroLine.vue"),
    ChooseHero: () => import("@/components/Choose/Hero.vue"),
    HeroBp: () => import("@/components/Hero/Bp.vue"),
    HeroEquipmentListALL: () =>
      import("@/components/Hero/EquipmentList_All.vue"),
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
    HeroGenreList: () => import("@/components/Hero/GenreList.vue"),
    HeroHistogram: () => import("@/components/Hero/Histogram.vue"),
    HeroInscriptionList: () => import("@/components/Hero/InscriptionList.vue"),
    HeroSameHobby: () => import("@/components/Hero/SameHobby.vue"),
    HeroUpdate: () => import("@/components/Hero/Update.vue"),
  },
  watch: {
    $route: function (to) {
      let id = to.params.id;

      if (id) {
        this.initShow();
        this.getHeroInfo(id);
      }
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "keyWords",
          name: "keyWords",
          content:
            this.hero.info.name +
            ",趋势,预测,技能,出装,装备,备战,组队,更新,胜率,顶端局,巅峰赛,顶端巅峰赛",
        },
        {
          vmid: "description",
          name: "description",
          content: "王者荣耀 " + this.hero.info.name + " 顶端巅峰赛的趋势",
        },
      ],
    };
  },
  data() {
    return {
      scroll: 0,
      hero: {
        title: this.$t("loading"),
        info: {
          id: null,
          name: this.$t("loading"),
          clockwise: false,
          equipmentMoney: 0,
          equipmentMoneyMin: 0,
          skin: [],
          skinIndex: 0,
          likeStatus: 0,
          change: {
            trendType: 0,
          },
          skill: [
            {
              id: null,
              img: "//image.ttwz.qq.com/images/skill/80102.png",
              pickRate: 0,
            },
            {
              id: null,
              img: "//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/1701.png",
              pickTimes: 0,
            },
          ],
        },
      },
      circle: {
        model: 0,
        info: {
          text: this.$t("loading"),
          tips: this.$t("loading"),
          vote: [
            {
              img: "/img/icons-app/cry.png",
              text: this.$t("loading"),
            },
            {
              img: "/img/icons-app/smile.png",
              text: this.$t("loading"),
            },
          ],
        },
      },
      showInfo: {
        imageIndex: 0,
        imagePreview: false,
        skillActionSheet: false,
        heroActionSheet: false,
        skeleton: true,
        heroImg: true,
        parameter: true,
      },
      tabsInfo: {
        model: 0,
      },
      trendInfo: {
        model: 0,
        options: [
          { value: 0, text: "巅峰赛趋势" },
          { value: 1, text: "国服分趋势" },
          { value: 2, text: "英雄强势期" },
          { value: 3, text: "舆论趋势图" },
        ],
      },
      skillInfo: {
        model: 1,
      },
      tipsInfo: [0, 0, 0, 0, 0],
    };
  },
  destroy() {
    window.removeEventListener("scroll", this.listenerScrollTop);
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let p = this.$route.params;

      this.initShow();
      this.getHeroInfo(p.id);
    },
    initShow: function () {
      let r = this.$route,
        //hash = r.hash || "",
        show = r.query.show || "";

      if (show == "heroUpdate") {
        this.$message.info(this.$appMsg.info[1016]);
      }

      setTimeout(() => {
        if (show == "heroSkill") {
          this.showInfo.skillActionSheet = true;
        } else {
          this.showInfo.skillActionSheet = false;
        }
      }, 500);

      window.addEventListener("scroll", this.listenerScrollTop);
    },
    listenerScrollTop: function () {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    getHeroInfo: function (id = 111) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage("heroInfo-" + id);

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        let heroInfoData = ls.heroInfo;

        this.circle.info = ls.circleInfo;
        this.hero.info = heroInfoData;

        heroInfoData.id && heroInfoData.id < 900
          ? (this.trendInfo.model = 0)
          : (this.trendInfo.model = 2);

        this.hero.title = heroInfoData.name;

        document.title = heroInfoData.name + " | " + appConfigInfo.appInfo.name;

        return;
      }

      this.$axios
        .post(this.$appApi.app.getHeroInfo + "&id=" + id)
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            let data = res.data.data,
              heroInfo = data.heroInfo;

            this.circle.info = data.circleInfo;
            this.hero.info = heroInfo;

            data.updateTime = ts;

            this.$appSetLocalStorage("heroInfo-" + id, data);

            heroInfo.id && heroInfo.id < 900
              ? (this.trendInfo.model = 0)
              : (this.trendInfo.model = 2);

            this.hero.title = heroInfo.name;
            document.title = heroInfo.name + " | " + appConfigInfo.appInfo.name;

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getHeroId: function (e) {
      this.$appPush({
        path: "/hero/" + e.id + "/info",
      });
    },
    onComponentShow: function () {
      setTimeout(() => {
        this.showInfo.skeleton = false;
      }, 250);
    },
    onSkillTabsClick: function (e) {
      let tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1014];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 3) {
        tipsText = this.$appMsg.info[1009];
      } else if (e == 4) {
        tipsText = this.$appMsg.info[1010];
      } else if (e == 5) {
        //tipsText = this.$appMsg.info[1028];
      }

      if (tipsText && this.tipsInfo[e] == 0) {
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
    onHeroTabsClick: function (e) {
      let appConfigInfo = this.$appConfigInfo,
        heroInfo = this.hero.info,
        dTitle;

      if (e == 0) {
        dTitle = heroInfo.name;

        this.hero.title = dTitle;
      } else if (e == 1) {
        dTitle = "同分路对比";
        this.hero.title = null;
      } else if (e == 2) {
        dTitle = "自定义对比";
        this.hero.title = null;
      }

      document.title = dTitle + " | " + appConfigInfo.appInfo.name;

      e == 0
        ? (this.showInfo.parameter = true)
        : (this.showInfo.parameter = false);
    },
    onHeroVoteClick: function (voteType) {
      this.$axios
        .post(
          this.$appApi.app.addHeroVote +
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

      this.showInfo.heroActionSheet = false;
    },
    onHeroLikeClick: function () {
      this.$axios
        .post(
          this.$appApi.app.addWebAccountLikeHero +
            "&heroId=" +
            this.hero.info.id
        )
        .then((res) => {
          let heroData = this.hero,
            status = res.data.status,
            ls = this.$appGetLocalStorage("heroInfo-" + heroData.info.id);

          if (status.code == 200) {
            heroData.info.likeStatus == 0
              ? (this.hero.info.likeStatus = 1)
              : (this.hero.info.likeStatus = 0);

            ls.heroInfo.likeStatus = this.hero.info.likeStatus;

            this.$appSetLocalStorage("heroInfo-" + heroData.info.id, ls);

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onImagePreviewClick: function (imageIndex) {
      this.showInfo.imagePreview = true;
      this.showInfo.imageIndex = imageIndex;
    },
  },
};
</script>