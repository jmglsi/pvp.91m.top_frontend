<template>
  <div class="tools-box">
    <div class="hero-8778da9c88edc2c621030d53600ecdca">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="$appBack()"
        z-index="2000"
        class="hero-9c47e80a41c0f6aaeb409ec1a6fc757e"
      >
        <template #title>
          <ChooseWzryHero @select="getHeroInfo">
            <div class="hero-632d142d7a508e86f6c35a044a17411e">
              <img
                width="30"
                height="30"
                v-lazy="
                  heroInfo.id && heroInfo.id < 900
                    ? {
                        //error: tableData.cardInfo.img,
                        src: heroInfo.img,
                      }
                    : $appCache + '/img/icons-app/hero_white.png'
                "
                class="hero-8ba6da67abb320a53f0428302ecb4826"
              />
              <span class="hero-b84d89f2a957899d88d18f67175fb663">
                {{ heroInfo.name }} - {{ selectInfo.text }}
              </span>
            </div>
          </ChooseWzryHero>
        </template>
        <template #right>
          <div class="app-68adaff1d028a37f27fb33c483329cba">
            <van-popover
              v-model="showInfo.popoverMeau"
              :actions="popoverMeauActions"
              @select="onPopoverMeauSelect"
              trigger="click"
              placement="bottom-end"
            >
              <template #reference>
                <div class="hero-6bbd42d33f03cb632ef4b5649b717bb2">
                  <img
                    v-lazy="$appCache + '/img/icons-app/more.png'"
                    width="30"
                    height="30"
                    class="app-border-radius"
                  />
                </div>
              </template>
            </van-popover>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
      class="hero-1e10165c5c18492247adde951fcc877e"
    >
      <div
        v-if="selectInfo.value == 0"
        class="hero-45af63c525ab541863e3e50f2f52c934"
      >
        <div class="hero-9b898abc5472b4fc427f88da23cf76d1">
          <!--
        <ChooseWzrySkin
          v-if="heroInfo.id"
          :extraId="heroInfo.id"
          @select="getSkinInfo"
        >
          123
        </ChooseWzrySkin>
        -->

          <van-grid :border="false" :column-num="3">
            <van-grid-item
              v-for="(data, index) in skinData.result.rows"
              :key="'hero-cf2a06a8e5d83d1eb2c472e7e5b496e0-' + index"
              @click="getSkinInfo(data)"
            >
              <div class="app-508c6ba453fed92a75a63dba09c892cf">
                <div
                  v-if="data.class.length > 0"
                  class="hero-87fafe67fc55856956e462b65f7d26b8"
                >
                  <van-tag
                    type="primary"
                    size="large"
                    :style="{ white: '100%' }"
                    :color="data.class[0][1]"
                  >
                    {{ data.class[0][0] }}
                  </van-tag>
                </div>
                <img
                  :style="{
                    backgroundColor: 'rgb(250, 250, 250)',
                  }"
                  width="100"
                  height="161.8"
                  v-lazy="data.skinImg"
                />
                <div class="app-ecb26e3ebb0456087e850f45c7484687"></div>
                <div class="app-e8a723fff1bfb5b0e938a949c31b0659">
                  <div
                    :style="{
                      color: data.skinImg ? 'white' : 'black',
                      marginTop: '10px',
                      marginLeft: '15px',
                    }"
                  >
                    <span>评分：{{ data.score }}</span>
                    <br />
                    <span>占比：{{ data.pickRate }}</span>
                    <span class="app-f929a9d9af35e647bf66a06a6c421ea1">%</span>
                  </div>
                </div>
                <div class="app-c8b5f5d48f608ded3e078de9bef7c61b">
                  <span
                    :style="{
                      color: data.qualityColor[1],
                    }"
                  >
                    {{ data.skinName }}
                  </span>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>

        <div v-if="heroInfo.id" class="hero-175c358c9271d591abf0163679968135">
          <van-divider
            :style="{
              padding: '0 16px',
            }"
          >
            今天上线的皮肤，顶端局次日更新 (仅供参考)
          </van-divider>

          <div class="hero-7c7f825106f6288d7e5bea8012e23041">
            <span class="hero-41f3f668239a416414146113b108bcbc">
              理论上越喜欢的皮肤，使用的场次越多
            </span>
            <br />
            <span class="hero-04ad1b6577bcddb707fdd0b80abe2e78">
              手感占比，评分由
              <span
                :style="{
                  color: 'rgb(25, 137, 250) !important',
                }"
                @click="
                  $appOpenUrl(
                    $t('open-url.title'),
                    '是否打开外部链接?',
                    {
                      path: 'https://ricochet.cn/wzry/skin',
                    },
                    0
                  )
                "
              >
                NGA@sjn4048
              </span>
              提供
            </span>
          </div>
        </div>
      </div>

      <div
        v-else-if="selectInfo.value == 1"
        class="hero-45af63c525ab541863e3e50f2f52c934"
      >
        <div class="hero-da4fb4d6fd537e447df2bda7175dfb30">
          <vxe-table
            ref="refToolsBoxZhanLi"
            id="refToolsBoxZhanLi"
            :custom-config="{ storage: true }"
            :expand-config="{ accordion: true }"
            :data="tableData.result.rows"
            :loading="tableData.loading"
          >
            <vxe-table-column field="type" title="类型">
              <template #default="{ rowIndex }">
                <span v-if="rowIndex == 0">铜牌</span>
                <span v-if="rowIndex == 1">银牌</span>
                <span v-if="rowIndex == 2">金牌</span>
                <span v-if="rowIndex == 3">小国标</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="zhanli" title="战力" />
            <vxe-table-column field="city" title="地区" />
          </vxe-table>
        </div>

        <div class="hero-175c358c9271d591abf0163679968135">
          <van-divider
            :style="{
              padding: '0 16px',
            }"
          >
            <van-popover
              v-model="showInfo.popoverArea"
              :actions="popoverAreaActions"
              @select="onPopoverAreaSelect"
              trigger="click"
              placement="bottom"
            >
              <template #reference>
                <span class="hero-fd49d92b96ae025864a37f8a357c4352">
                  点击这里切换：{{ areaType }}
                </span>
              </template>
            </van-popover>
          </van-divider>

          <div class="hero-7c7f825106f6288d7e5bea8012e23041">
            <span class="hero-04ad1b6577bcddb707fdd0b80abe2e78">
              牌子由
              <span
                :style="{
                  color: 'rgb(25, 137, 250) !important',
                }"
                @click="
                  $appOpenUrl(
                    $t('open-url.title'),
                    '是否打开外部链接?',
                    {
                      path: 'https://www.sapi.run',
                    },
                    0
                  )
                "
              >
                @遇见导航
              </span>
              提供
            </span>
          </div>
        </div>
      </div>

      <div
        v-else-if="selectInfo.value == 2"
        class="hero-45af63c525ab541863e3e50f2f52c934"
      ></div>
    </div>

    <div class="hero-5194b26f60f4dbe228f41b4f67ff9bee">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :description="skinInfo.skinName + ' - ' + skinInfo.onlineTime"
      >
        <template #default>
          <div class="hero-679a6881ddbf59f58891881c089e6c26">
            <div class="hero-7a49cf7d7a1f3a88a27da581a3671081">
              <img
                :style="{
                  backgroundColor: 'rgb(250, 250, 250)',
                }"
                width="100%"
                height="100%"
                v-lazy="skinInfo.skinBigImg"
              />
            </div>

            <div class="hero-99614c7c186209dc84da6d2725610257">
              <van-grid :border="false" :column-num="2">
                <van-grid-item>
                  <template #default>
                    <span class="hero-f5d72629de1b7931fc280a85e44a9adf">
                      {{ skinInfo.score || "-" }}
                    </span>

                    <span class="hero-f5732434b589359fb4e0ddfca3eeeca8">
                      全部评分 ({{ skinInfo.voteCount }} 人)
                    </span>
                  </template>
                </van-grid-item>
                <van-grid-item>
                  <template #default>
                    <div class="hero-927a2471f3fa92ad034d4ea15a619838">
                      <van-rate
                        v-model="stars"
                        :size="25"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                      />
                    </div>

                    <span class="hero-f5732434b589359fb4e0ddfca3eeeca8">
                      我的评分
                    </span>
                  </template>
                </van-grid-item>
              </van-grid>
            </div>

            <div v-if="stars > 0" class="hero-4ec63e552a907ff3e3213b74265a3349">
              <van-button
                round
                type="info"
                size="small"
                @click="updateSkinRate"
              >
                提交评分
              </van-button>
            </div>
          </div>
        </template>
      </van-action-sheet>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "toolsBox",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
    ChooseWzryHero: () => import("@/components/Choose/Wzry/Hero.vue"),
    //ChooseWzrySkin: () => import("@/components/Choose/Wzry/Skin.vue"),
  },
  data() {
    return {
      areaType: "安卓QQ",
      stars: 0,
      popoverMeauActions: [
        { text: "查皮肤", value: 0 },
        { text: "查牌子", value: 1 },
        //{ text: "查日报", value: 2 },
        //{ text: "查移动轨迹", value: 3, disabled: true },
        { text: "查国服战力", value: 4 },
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
        result: {
          rows: [],
        },
      },
      paiziData: {
        result: {
          tongpai_list: [],
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
        text: "查皮肤",
        value: 0,
      },
      heroInfo: {
        id: 0,
        name: "请选择英雄",
        img: "",
        type: [],
      },
      skinInfo: {
        skinId: 0,
        skinName: "请选择英雄",
        skinImg: "",
      },
      showInfo: {
        actionSheet: false,
        popoverArea: false,
        popoverMeau: true,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.showInfo.popoverMeau = false;
    }, 1000 * 5);
  },
  methods: {
    getHeroInfo: function (e) {
      this.heroInfo = e;

      this.getSelectData();
    },
    getSkinInfo: function (e) {
      this.skinInfo = e;
      this.showInfo.actionSheet = true;
      this.stars = 0;
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

      if (this.heroInfo.id == 0 && selectIndex != 2) {
        return this.$message.error(this.$appMsg.error[1013]);
      }

      if (selectIndex == 0) {
        this.getRankingByHeroSkin(18, 0, 0, 0, this.heroInfo.id);
      } else if (selectIndex == 1) {
        this.areaType = areaType;

        this.getRankingByHeroPaiZi(9, 0, 0, 0, this.heroInfo.id, this.areaType);
      } else if (selectIndex == 2) {
        this.$appPush({ path: "/tools/daily" });
      } else if (selectIndex == 3) {
        //
      } else if (selectIndex == 4) {
        this.$appPush({
          path: "/search",
          query: {
            q: this.heroInfo.name,
            refresh: 1,
            show: "heroSkill",
          },
        });
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
      this.tableData.result.rows = [];
      this.paiziData.loading = true;

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
            "&id=" +
            encodeURIComponent(heroId) +
            "&areaType=" +
            encodeURIComponent(areaType)
        )
        .then((res) => {
          let data = res.data.data.result,
            status = res.data.status;

          if (status.code == 200) {
            this.paiziData = data;
            this.paiziData.loading = false;

            this.tableData.result.rows.push(data.tongpai_list[0]);
            this.tableData.result.rows.push(data.yinpai_list[0]);
            this.tableData.result.rows.push(data.jinpai_list[0]);
            this.tableData.result.rows.push(data.xiaoguobiao_list[0]);

            //this.$message.success(this.$appMsg.success[1000]);
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

      this.skinData.loading = true;

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
            "&id=" +
            encodeURIComponent(heroId)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status,
            newData = null;

          if (status.code == 200) {
            this.skinData = data;
            this.skinData.loading = false;
            this.skinData.updateTime = ts;

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

            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    updateSkinRate: function () {
      this.$axios
        .post(this.$appApi.app.updateSkinRate, {
          skinId: this.skinInfo.skinId,
          stars: this.stars,
        })
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
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

span.hero-f5d72629de1b7931fc280a85e44a9adf {
  font-size: 25px;
}

span.hero-f5732434b589359fb4e0ddfca3eeeca8 {
  color: gray;
}

div.hero-da4fb4d6fd537e447df2bda7175dfb30 {
  margin-top: 25px;
}

div.hero-7c7f825106f6288d7e5bea8012e23041 {
  color: red;
  font-size: @app-font-size;
}

div.hero-87fafe67fc55856956e462b65f7d26b8 {
  position: absolute;
  margin-left: -4px;
  margin-top: 5px;
  transform: scale(0.75);
  width: 100px;
  text-align: left;
}

div.hero-679a6881ddbf59f58891881c089e6c26 {
  padding: 25px;
  margin-bottom: 50px;
}

div.hero-927a2471f3fa92ad034d4ea15a619838 {
  height: 37.5px;
}

div.hero-99614c7c186209dc84da6d2725610257 {
  margin-top: 10px;
}

div.hero-4ec63e552a907ff3e3213b74265a3349 {
  position: absolute;
  left: 0;
  margin: 0 auto;
  width: 100%;
  margin-top: 10px;
}
</style>