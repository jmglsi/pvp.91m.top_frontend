<template>
  <div class="hero-tools">
    <div class="hero-a8137b0fb1cc9dcb896ce9a091695877">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="$appBack()"
        z-index="99999999"
        class="hero-a2d3b30fd0cc9eb4affc0de9b7049895"
      >
        <template #title>
          <ChooseHero @select="getHeroId">
            <div class="hero-632d142d7a508e86f6c35a044a17411e">
              <img
                width="30"
                height="30"
                v-lazy="
                  heroInfo.id && heroInfo.id < 900
                    ? {
                        //src: '/img/icons-hero/' + tableData.cardInfo.id + '.jpg',
                        //error: tableData.cardInfo.img,
                        src: heroInfo.img,
                      }
                    : '/img/icons-app/hero_white.png'
                "
                class="hero-8ba6da67abb320a53f0428302ecb4826"
              />
              <span class="hero-b84d89f2a957899d88d18f67175fb663">
                {{ heroInfo.name }} - {{ selectInfo.text }}
              </span>
            </div>
          </ChooseHero>
        </template>
        <template #right>
          <div class="hero-68adaff1d028a37f27fb33c483329cba">
            <van-popover
              v-model="showInfo.popoverMeau"
              trigger="click"
              placement="bottom-end"
              :actions="popoverMeauActions"
              @select="onPopoverMeauSelect"
            >
              <template #reference>
                <img
                  v-lazy="'/img/icons-app/more.png'"
                  width="30"
                  height="30"
                  class="app-border-radius"
                />
              </template>
            </van-popover>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div
      v-if="selectInfo.value == 0 && heroInfo.id > 0 && heroInfo.id < 900"
      class="hero-45af63c525ab541863e3e50f2f52c934"
    >
      <div class="hero-da4fb4d6fd537e447df2bda7175dfb30">
        <h3>银牌</h3>
        <ul class="hero-808c832aed5231b27514e2f46c89f06f">
          <li
            v-for="(data, index) in paiziData.result.yinpai_list"
            :key="'hero-3a2ef6246515b12e951994a8ee67a1d2-' + index"
          >
            {{ data.province }} - {{ data.city }}：{{ data.zhanli }}
          </li>
        </ul>
      </div>

      <div class="hero-da4fb4d6fd537e447df2bda7175dfb30">
        <h3>金牌</h3>
        <ul class="hero-808c832aed5231b27514e2f46c89f06f">
          <li
            v-for="(data, index) in paiziData.result.jinpai_list"
            :key="'hero-30eb8bc8bc47b22eaf9ef7a89765c90f-' + index"
          >
            {{ data.province }}：{{ data.zhanli }}
          </li>
        </ul>
      </div>

      <div class="hero-da4fb4d6fd537e447df2bda7175dfb30">
        <h3>小国</h3>
        <ul class="hero-808c832aed5231b27514e2f46c89f06f">
          <li
            v-for="(data, index) in paiziData.result.xiaoguobiao_list"
            :key="'hero-211b6ce6196c920a37d216fdf52d3f3e-' + index"
          >
            全国：{{ data.zhanli }}
          </li>
        </ul>
      </div>

      <div class="hero-175c358c9271d591abf0163679968135">
        <van-divider :style="{ padding: '0 16px' }">
          <van-popover
            v-model="showInfo.popoverArea"
            trigger="click"
            placement="bottom"
            :actions="popoverAreaActions"
            @select="onPopoverAreaSelect"
          >
            <template #reference>
              <span class="hero-fd49d92b96ae025864a37f8a357c4352">
                点击这里切换：{{ areaType }}
              </span>
            </template>
          </van-popover>
        </van-divider>
      </div>
    </div>

    <div
      v-else-if="selectInfo.value == 2"
      class="hero-45af63c525ab541863e3e50f2f52c934"
    >
      <div class="hero-9b898abc5472b4fc427f88da23cf76d1">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(data, index) in skinData.result.rows"
            :key="'hero-cf2a06a8e5d83d1eb2c472e7e5b496e0-' + index"
          >
            <div class="hero-508c6ba453fed92a75a63dba09c892cf">
              <img width="90" height="140" v-lazy="data.skinIcon" />
              <div class="hero-c8b5f5d48f608ded3e078de9bef7c61b">
                <span>{{ data.skinName }}</span>
                &nbsp;
                <div
                  :style="{
                    color: data.pickRate >= 50 ? 'red' : 'unset',
                  }"
                >
                  {{ data.pickRate }} %
                </div>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="hero-175c358c9271d591abf0163679968135">
        <van-divider :style="{ padding: '0 16px' }">
          今天上线的皮肤，隔日更新
        </van-divider>

        <div class="hero-7c7f825106f6288d7e5bea8012e23041">
          皮肤手感占比 (仅供参考)
        </div>
      </div>
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
export default {
  name: "HeroTools",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
    ChooseHero: () => import("@/components/Choose/Hero.vue"),
  },
  data() {
    return {
      areaType: "安卓QQ",
      popoverMeauActions: [
        { text: "查牌子", value: 0 },
        { text: "查战力", value: 1 },
        { text: "查皮肤", value: 2 },
      ],
      popoverAreaActions: [
        { text: "安卓QQ" },
        { text: "苹果QQ" },
        { text: "安卓WX" },
        { text: "苹果WX" },
      ],
      tableData: {
        loading: false,
        updateTime: 0,
      },
      paiziData: {
        result: {
          yinpai_list: [],
          jinpai_list: [],
          xiaoguobiao_list: [],
        },
      },
      skinData: {
        result: {
          rows: [],
        },
      },
      selectInfo: {
        text: "查牌子",
        value: 0,
      },
      heroInfo: {
        id: 0,
        name: "请选择英雄",
        img: "",
        type: [],
      },
      showInfo: {
        popoverArea: false,
        popoverMeau: true,
      },
    };
  },
  mounted() {},
  methods: {
    getHeroId: function (e) {
      this.heroInfo = e;

      this.getSelectData();
    },
    onPopoverMeauSelect: function (e) {
      this.selectInfo = e;

      this.getSelectData();
    },
    onPopoverAreaSelect: function (e) {
      this.areaType = e.text;

      this.getRankingByHeroPaiZi(9, 0, 0, 0, this.heroInfo.id, this.areaType);
    },
    getSelectData: function () {
      let q = this.$route.query,
        areaType = q.areaType || this.areaType,
        selectIndex = this.selectInfo.value;

      if (this.heroInfo.id == 0) {
        return this.$message.error(this.$appMsg.error[1013]);
      }

      if (selectIndex == 0) {
        this.areaType = areaType;

        this.getRankingByHeroPaiZi(9, 0, 0, 0, this.heroInfo.id, this.areaType);
      } else if (selectIndex == 1) {
        this.$message.info(this.$appMsg.info[1032]);
      } else if (selectIndex == 2) {
        this.getRankingByHeroSkin(18, 0, 0, 0, this.heroInfo.id);
      }
    },
    getRankingByHeroPaiZi: function (
      aid = 0,
      bid = 0,
      cid = 0,
      did = 0,
      heroId = 111,
      areaType = "安卓QQ"
    ) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" +
            aid +
            "-" +
            bid +
            "-" +
            cid +
            "-" +
            did +
            "-" +
            heroId +
            "-" +
            areaType
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.paiziData = ls;

        return;
      }

      this.tableData.loading = true;

      this.$axios
        .post(
          this.$appApi.app.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did +
            "&heroId=" +
            heroId +
            "&areaType=" +
            areaType
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status,
            newData = null;

          if (status.code == 200) {
            this.paiziData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            newData = data.result;

            this.$appSetLocalStorage(
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                heroId +
                "-" +
                areaType,
              newData
            );

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getRankingByHeroSkin: function (
      aid = 0,
      bid = 0,
      cid = 0,
      did = 0,
      heroId = 111
    ) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.skinData = ls;

        return;
      }

      this.tableData.loading = true;

      this.$axios
        .post(
          this.$appApi.app.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did +
            "&heroId=" +
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status,
            newData = null;

          if (status.code == 200) {
            this.skinData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            newData = data.result;

            this.$appSetLocalStorage(
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                heroId,
              newData
            );

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
img.hero-8ba6da67abb320a53f0428302ecb4826 {
  border-radius: 100%;
}

ul.hero-808c832aed5231b27514e2f46c89f06f {
  margin-top: 15px;
}

span.hero-b84d89f2a957899d88d18f67175fb663 {
  color: gray;
  font-size: 12px;
}

div.hero-45af63c525ab541863e3e50f2f52c934 {
  margin-top: 75px;
}

div.hero-da4fb4d6fd537e447df2bda7175dfb30 {
  margin-top: 25px;
}

div.hero-c8b5f5d48f608ded3e078de9bef7c61b {
  margin-top: 5px;
  font-size: 12px;
}

div.hero-7c7f825106f6288d7e5bea8012e23041 {
  color: red;
}
</style>