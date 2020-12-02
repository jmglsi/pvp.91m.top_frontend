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
        @click-left="appPush('/ranking')"
        @click-right="$message.info('提示:1004,分路推荐 ;D')"
        z-index="99999999"
        left-text="排行"
        class="hero-a2d3b30fd0cc9eb4affc0de9b7049895"
      >
        <template #title>
          <div
            @click="$message.info('提示:1005,近期热度 ;D')"
            class="hero-632d142d7a508e86f6c35a044a17411e"
          >
            <img
              v-show="showInfo.parameter && hero.info.trend > 0"
              v-lazy="'/img/app-icons/hot_' + hero.info.trend + '.png'"
              width="15"
              height="15"
              class="hero-f90943c8968fa651d7e1b617ff046fe2"
            />
            <span
              :style="
                scroll >= 50 || tabsModel > 0
                  ? { color: 'black' }
                  : { color: 'white' }
              "
              class="hero-d5d3db1765287eef77d7927cc956f50a"
              >{{ hero.title }}</span
            >
          </div>
        </template>
        <template #right>
          <div
            v-show="showInfo.parameter"
            class="hero-68adaff1d028a37f27fb33c483329cba"
          >
            <ul>
              <li
                v-for="(data, index) in hero.info.type"
                :key="'hero-e4d23e841d8e8804190027bce3180fa5-' + index"
              >
                <van-tag
                  v-if="data"
                  :color="positionInfo[data - 1][1]"
                  round
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
        v-show="showInfo.parameter"
        :autoplay="10000"
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
      >
        <template v-slot:cover
          ><span class="hero-b5741c8457973b008c424c6f94ff3901"
            >长按或右键可保存图片~</span
          ></template
        >
      </van-image-preview>
    </div>

    <div
      :style="tabsModel > 0 ? { marginTop: '50px' } : { marginTop: '0' }"
      class="hero-9afffec6fe89b34b024d06907c006f36"
    >
      <van-grid
        v-show="showInfo.parameter"
        :border="false"
        :column-num="3"
        class="app-ff4a008470319a22d9cf3d14af485977"
      >
        <van-grid-item
          class="hero-c6e864acb6955eed0361921288d34149"
          @click="$message.info('提示:1006,分均经济、场均时长、场均经济 ;D')"
        >
          <div class="hero-9f1e888d1782176b9f8c60c8b08a0837">
            <AppGold
              width="25"
              height="25"
              class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
            />
            <span
              class="app-0fc3cfbc27e91ea60a787de13dae3e3c hero-0fc3cfbc27e91ea60a787de13dae3e3c"
              >{{ hero.info.equMoneyMin || 0 }}</span
            >

            <AppTime
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
          @click="showInfo.heroSkill = true"
        >
          <div
            v-if="hero.info.skill && hero.info.equipment"
            class="hero-f3412345b511c61986bba9a39793157f"
          >
            <span
              v-for="(data, index) in hero.info.skill.slice(0, 1)"
              :key="'hero-d7768ef7449dfbbc6020f1dd0ae11593-' + index"
              class="hero-cb4b556fe00d9a0da9d94f0bbf40e78c"
            >
              <img
                v-lazy="data.img"
                width="25"
                height="25"
                class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c hero-0fc3cfbc27e91ea60a787de13dae3e3c"
                >{{ data.pickRate.toFixed(2) }}</span
              >
            </span>
            <span
              v-for="(data, index) in hero.info.equipment.slice(0, 1)"
              :key="'hero-7e44100739d2ecde9345b508ea311bbe-' + index"
              class="hero-cb4b556fe00d9a0da9d94f0bbf40e78c"
            >
              <img
                v-lazy="
                  '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                  data.list[0] +
                  '.png'
                "
                width="25"
                height="25"
                class="hero-ff2364a0be3d20e46cc69efb36afe9a5"
              />
              <span
                class="app-0fc3cfbc27e91ea60a787de13dae3e3c hero-0fc3cfbc27e91ea60a787de13dae3e3c"
                >{{ data.pickTimes }}</span
              >
            </span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="hero-913337a345680aef86e5801f1a78596b">
      <van-tabs
        v-model="tabsModel"
        :border="false"
        :ellipsis="false"
        :sticky="true"
        @change="onTabsChange"
        duration="0.5"
        line-width="25px"
        color="rgb(243,189,103)"
        title-active-color="rgb(243,189,103)"
        class="hero-d42f4851e770aa0f758b01388874f67b"
      >
        <van-tab class="hero-ab71021d21963773bfb8be80af65869f">
          <template #title>
            <van-dropdown-menu class="hero-385d73af791b8e7dc7e1209c3320ea26">
              <van-dropdown-item
                v-model="trendInfo.model"
                :options="trendInfo.options"
                :disabled="tabsModel == 0 ? false : true"
              />
            </van-dropdown-menu>
          </template>
        </van-tab>
        <van-tab
          class="hero-ab71021d21963773bfb8be80af65869f"
          title="同分路对比"
        />
        <van-tab
          class="hero-ab71021d21963773bfb8be80af65869f"
          title="自定义对比"
          :disabled="tabsModel == 0 ? true : false"
        />
        <div class="hero-e06398232dc80e41209489705546802c">
          <HeroLine
            v-if="tabsModel == 0"
            :heroId="hero.info.id"
            :trendType="trendInfo.model"
          />
        </div>
        <div
          :style="appDevice ? { marginTop: '0' } : { marginTop: '25px' }"
          class="hero-ea950cb092f4e99e2ccf981cf503e5e3"
        >
          <HeroRadar
            v-if="tabsModel > 0"
            :tabsModel="tabsModel"
            :heroId="hero.info.id"
          />
        </div>
      </van-tabs>
    </div>

    <div
      v-if="isLoaded"
      v-show="showInfo.parameter"
      class="hero-9393a9be63ea720a87e048d40caa03b5"
    >
      <div class="hero-b7b5e31b028440d2e0e0157baad49513">
        <HeroSameHobby :heroId="hero.info.id" />
      </div>

      <div class="hero-b7b5e31b028440d2e0e0157baad49513">
        <HeroUpdate :heroId="hero.info.id" :updateId="hero.info.updateId" />
      </div>
    </div>

    <div class="hero-2882d594d0ac3524bffd5148791e96da">
      <van-action-sheet
        v-model="showInfo.heroSkill"
        :title="hero.info.name + ' 的其它数据 (上周)'"
        safe-area-inset-bottom
      >
        <van-tabs>
          <van-tab title="技能">
            <HeroSkillList :heroSkill="hero.info.skill"
          /></van-tab>
          <van-tab title="装备"
            ><HeroEquipmentList :heroEquipment="hero.info.equipment"
          /></van-tab>
        </van-tabs>
      </van-action-sheet>
    </div>

    <div class="hero-16e1b9e46fe4483c6bc17aea9d20736a">
      <van-action-sheet
        v-model="showInfo.heroMenu"
        :title="hero.info.name + ' 的 ' + circle.info.text"
        :close-on-click-action="true"
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
            @click="onHeroVoteClick(1)"
          >
            <AppCry width="50" height="50" />
            <span class="hero-ebd73ade48cb3e102d1dbbfbc0377c5f">{{
              circle.info.vote[0].text
            }}</span>
          </van-grid-item>
          <van-grid-item
            class="hero-59c25466342abdb6746988b245f3a5a6"
            @click="onHeroVoteClick(2)"
          >
            <AppSmile width="50" height="50" />
            <span class="hero-ebd73ade48cb3e102d1dbbfbc0377c5f">{{
              circle.info.vote[1].text
            }}</span>
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

    <div class="hero-79acd83e2dbb9d5b6de778dd5077db2c">
      <van-tabbar
        fixed
        safe-area-inset-bottom
        active-color="rgb(243,189,103)"
        class="hero-d4a9092fd7b386904e4a2894044f2a9d"
      >
        <van-tabbar-item
          icon="/img/app-icons/like_0.png"
          name="/"
          class="app-72383b9892bd1e6a2bd310dfb1fb2344"
          @click="$message.info('提示:1007,正在开发')"
          >喜欢</van-tabbar-item
        >
        <van-tabbar-item
          icon="/img/app-icons/wiki.png"
          name="/"
          class="app-72383b9892bd1e6a2bd310dfb1fb2344"
          @click="
            hero.info.wikiId
              ? appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  '//bbs.nga.cn/read.php?tid=' + hero.info.wikiId
                )
              : $message.info(
                  '提示:1008,暂时还没有该英雄的词条,您也想出力的话请加群:810191707,备注来自苏苏的荣耀助手'
                )
          "
          >稷下图书馆</van-tabbar-item
        >
      </van-tabbar>
    </div>

    <AppBottomTabbar height="100" />
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
    HeroSkillList: (resolve) =>
      require(["@/components/Hero/SkillList.vue"], resolve),
    HeroEquipmentList: (resolve) =>
      require(["@/components/Hero/EquipmentList.vue"], resolve),
    HeroLine: (resolve) => require(["@/components/Hero/Line.vue"], resolve),
    HeroRadar: (resolve) => require(["@/components/Hero/Radar.vue"], resolve),
    HeroUpdate: (resolve) => require(["@/components/Hero/Update.vue"], resolve),
    HeroSameHobby: (resolve) =>
      require(["@/components/Hero/SameHobby.vue"], resolve),
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
      scroll: 0,
      showInfo: {
        heroImg: true,
        parameter: true,
        heroSkill: false,
        heroMenu: false,
        imagePreview: false,
        imageIndex: 0,
      },
      tabsModel: 0,
      hero: {
        title: "加载中",
        info: {
          id: 0,
          name: "加载中",
          clockwise: false,
          skin: [],
          skinIndex: 0,
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
      trendInfo: {
        model: 0,
        options: [
          { text: "巅峰赛趋势", value: 0 },
          { text: "英雄强势期", value: 1 },
          { text: "论坛舆论", value: 2 },
        ],
      },
      isLoaded: false,
    };
  },
  mounted() {
    let heroId = this.$route.params.id;

    this.getHeroInfo(heroId);

    window.addEventListener("scroll", this.scrollTop);
  },
  methods: {
    scrollTop() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
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

      this.showInfo.heroMenu = false;
    },
    onImagePreviewClick: function (imageIndex) {
      this.showInfo.imagePreview = true;
      this.showInfo.imageIndex = imageIndex;
    },
    onTabsChange: function (e) {
      let heroInfo = this.hero.info,
        dTitle;

      if (e == 0) {
        dTitle = heroInfo.name;
        this.hero.title = dTitle;
      }

      if (e == 1) {
        dTitle = "同分路对比";
        this.hero.title = dTitle;
      }

      if (e == 2) {
        dTitle = "自定义对比";
        this.hero.title = dTitle;
      }

      document.title = dTitle + " | 苏苏的荣耀助手";

      e == 0
        ? (this.showInfo.parameter = true)
        : (this.showInfo.parameter = false);
    },
  },
};
</script>