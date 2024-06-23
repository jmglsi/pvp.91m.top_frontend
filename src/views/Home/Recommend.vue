<template>
  <div class="app-recommend recommend-b77f3080e567fd154c25b053042dcba9">
    <div class="recommend-fde59ce861918e4314a5a460e7c9cc54">
      <div
        class="app-a139b05b7f8e496c00991733ef7cd589 app-1e4b00d1b398e8a6551429b2a2f0e17c"
      >
        <van-pull-refresh
          v-model="isLoading"
          :pulling-text="homeData.miniappInfo.pulling"
          :loosing-text="homeData.miniappInfo.loosing"
          :loading-text="homeData.miniappInfo.loading"
          :success-text="homeData.miniappInfo.success"
          @refresh="onPullRefresh"
          class="recommend-af03857fe372b964b53ef3a082c2b518"
        >
          <van-swipe
            :autoplay="5000"
            height="200"
            class="app-f97c2ea77c6a08b3afd5a59851cbe0d8"
          >
            <van-swipe-item
              v-for="(data, index) in homeData.swipeInfo.result.rows"
              :key="'recommend-0c74eea41745fb37742d335606774a60-' + index"
              @click="onUrlClick(data)"
              class="recommend-ac104b3f82b3b5d3643319a05734ce93"
            >
              <img
                v-lazy="data.img"
                class="home-3c873293a7dc1ea8c20579f6a7ae94a9"
              />
              <van-tag
                mark
                :color="data.tag.color"
                size="medium"
                class="app-a5a5c883f68e45baa83f140e218759f1"
              >
                {{ data.tag.text }}
              </van-tag>
            </van-swipe-item>
          </van-swipe>
        </van-pull-refresh>

        <div class="app-609a820218e58b4ea5a5f7656e61a0ad">
          <van-swipe
            ref="refSkillMenu"
            :autoplay="10000"
            @change="onSwipeChange"
            class="app-1c17c2e6813dda8cab7978f50d30203c"
          >
            <van-swipe-item>
              <van-grid
                :border="false"
                :column-num="3"
                class="app-18e05b8e51e3beb49ba55397d11cb8ce"
              >
                <van-grid-item
                  v-for="(data, index) in homeData.indexInfo"
                  :key="'recommend-ea25beed04733529ada26478f028b97e-' + index"
                  :to="data.to"
                >
                  <span v-if="data.img">
                    <img
                      v-lazy="data.img"
                      width="50"
                      height="50"
                      class="app-border-radius"
                    />
                  </span>
                  <div
                    v-if="data.title"
                    class="home-f55b83381f479ed4c1203b80f891d83a"
                  >
                    {{ data.title }}
                  </div>
                </van-grid-item>
              </van-grid>

              <van-cell
                :title="homeData.tipsInfo.title || $t('loading')"
                :label="homeData.tipsInfo.label || '清除缓存试一试~'"
                :value="homeData.tipsInfo.value || '⏳'"
                :is-link="homeData.tipsInfo.isLink"
                @click="
                  homeData.tipsInfo.isLink
                    ? onUrlClick(homeData.tipsInfo)
                    : null
                "
                class="app-06eab62dcb5a23b966a620807d78e66f"
              />
            </van-swipe-item>
            <van-swipe-item>
              <van-row>
                <van-col span="5" class="home-56677dd04cbe46e7b175e734b4ec94ef">
                  <van-sidebar
                    @change="onSidebarChange"
                    v-model="changeInfo.bid"
                  >
                    <van-sidebar-item :title="$t('hero')" />
                    <van-sidebar-item :title="$t('skill')" />
                    <van-sidebar-item :title="$t('equipment')" />
                  </van-sidebar>
                </van-col>
                <van-col span="19">
                  <div class="home-41d74f0099cd7f9b526d7c601ada0e26">
                    <div
                      @click="
                        changeInfo.cid == 0
                          ? (changeInfo.cid = 1)
                          : (changeInfo.cid = 0)
                      "
                      class="home-07e33cfc65db63122f9d18ae77a89315"
                    >
                      <span v-if="changeInfo.cid == 0">
                        <img
                          width="20"
                          height="20"
                          v-lazy="'/img/icons-app/hot_2.png'"
                        />
                        {{ $t("up") }}
                      </span>
                      <span v-else>
                        <img
                          width="20"
                          height="20"
                          v-lazy="'/img/icons-app/hot_1.png'"
                        />
                        {{ $t("down") }}
                      </span>
                    </div>
                    <div class="home-e289b0da5cdb7507d4d9cc22f588cbda">
                      <ul class="home-0fb3346555b8f5460aaaf04001361da5">
                        <li
                          v-for="(data, index) in tableData.result.rows"
                          :key="
                            'home-0e73165b8a0e247743acaaf2d13e2a47-' + index
                          "
                          @click="
                            $appPush({
                              path: '/search',
                              query: {
                                q: data.heroId,
                                show: 'heroSkill',
                                refresh: 1,
                              },
                            })
                          "
                          class="home-423fda2e543a1804accff6229de61143"
                        >
                          <img
                            width="30"
                            height="30"
                            v-lazy="{
                              //src: '/img/icons-hero/' + data.heroId + '.jpg',
                              //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data.heroId + '/' + data.heroId + '.jpg',
                              src:
                                '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                                data.heroId +
                                '/' +
                                data.heroId +
                                '.jpg',
                            }"
                            class="app-border-radius"
                          />
                          &nbsp;&nbsp;&nbsp;
                          <img
                            width="30"
                            height="30"
                            v-lazy="getChangeImg(changeInfo.bid, data.id)"
                            class="app-border-radius"
                          />
                          &nbsp;&nbsp;&nbsp;
                          <span class="home-18174044426adc86b297062d2e40e214">
                            {{ data.pickRate }}
                          </span>
                          <span class="app-07cc694b9b3fc636710fa08b6922c42b"
                            >%</span
                          >
                          <span
                            :style="
                              data.change.updateType == 2
                                ? { color: 'red !important' }
                                : { color: 'blue !important' }
                            "
                            class="app-07cc694b9b3fc636710fa08b6922c42b home-2095d846baffaf78edd96501f098e66a"
                          >
                            {{
                              (data.change.updateType == 2 ? "+" : "-") +
                              Math.abs(data.change.updateValue)
                            }}
                          </span>
                        </li>
                      </ul>
                      <div
                        v-if="tableData.result.rows.length == 0"
                        class="home-caa1dc26349a3e0c95b4a9e69a6e53b7"
                      >
                        {{ $t("none") }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="home-07e33cfc65db63122f9d18ae77a89315 home-d553001f432b5a09d9ae776abd8413c0"
                    @click="getRanking(11, changeInfo.bid, changeInfo.cid, 0)"
                  >
                    🔍 {{ $t("search.text") }}
                  </div>
                </van-col>
              </van-row>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div class="recommend-3379002f77deb3f52601cf5ddcdcebca">
        <van-skeleton v-if="showInfo.skeleton" :row="30" />

        <lazy-component
          @show="onComponentShow"
          class="hero-2a23eb5062a0258f23f4969c4c60aa2e"
        >
          <HeroUpdate :extraId="0" :aid="0" />
        </lazy-component>
      </div>
    </div>
  </div>
</template>

<script>
import ColorThief from "colorthief";

export default {
  name: "recommendHome",
  components: {
    HeroUpdate: () => import("@/components/Hero/Update.vue"),
  },
  data() {
    return {
      isLoading: false,
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
        color: {},
        column: [],
        columns: [],
      },
      homeData: {
        miniappInfo: {
          to: "/miniapp",
          pulling: "喵呜...",
          loosing: "奇迹什么时候女装呢...",
          loading: this.$t("loading"),
          success: null,
        },
        swipeInfo: {
          result: {
            rows: [],
          },
        },
        indexInfo: [],
        tipsInfo: {
          title: null,
          label: null,
          value: null,
          isLink: false,
          to: null,
          url: null,
        },
      },
      changeInfo: {
        bid: 1,
        cid: 0,
        img: null,
      },
      showInfo: {
        skeleton: true,
      },
    };
  },
  mounted() {
    this.getAppHome();
    this.initPage();

    setTimeout(() => {
      this.initColor();
    }, 500);
  },
  methods: {
    initPage: function () {
      let q = this.$appQuery,
        show = q.show || "";

      if (show == "heroSkill") {
        this.$refs.refSkillMenu.swipeTo(1);
      }
    },
    initColor: function () {
      let colorthief = new ColorThief(),
        nowColor = "0, 0, 0",
        o =
          document.getElementsByClassName(
            "home-3c873293a7dc1ea8c20579f6a7ae94a9"
          ) || [];

      Array.from(o, (x, i) => {
        let nowRow = this.homeData.swipeInfo.result.rows[i];

        if (nowRow.name) {
          x.addEventListener("load", () => {
            nowColor = colorthief.getPalette(x, 3)[0].toString();

            this.homeData.swipeInfo.result.rows[i].tag.color =
              "rgb(" + nowColor + ")";
          });

          return x;
        }
      });
    },
    getAppHome: function () {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage("appHome");

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.homeData = ls;

        return;
      }

      this.$axios.post(this.$appApi.app.getAppHome).then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          this.homeData = data;
          this.homeData.updateTime = ts;

          this.$appSetLocalStorage("appHome", this.homeData);
        } else {
          this.$message.error(status.msg);
        }
      });
    },
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.tableData = ls;

        return;
      }

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
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.tableData
            );
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onSwipeChange: function (e) {
      let changeInfo = this.changeInfo;

      if (e == 1) {
        this.getRanking(11, changeInfo.bid, changeInfo.cid, 0);
      }
    },
    onSidebarChange: function () {
      let changeInfo = this.changeInfo;

      this.tableData.result.rows = [];

      if (changeInfo.bid == 0) {
        this.changeInfo.bid = 1;

        this.$appPush({
          path: "/ranking",
          query: { type: 0, bid: 3, cid: 0, did: 0, refresh: 1 },
        });
      } else {
        this.getRanking(11, changeInfo.bid, changeInfo.cid, 0);
      }
    },
    onComponentShow: function () {
      setTimeout(() => {
        this.showInfo.skeleton = false;
      }, 500);
    },
    onPullRefresh: function () {
      setTimeout(() => {
        this.isLoading = false;

        this.$appPush({
          path: this.homeData.miniappInfo.to,
        });
      }, 2500);
    },
    getChangeImg: function (bid, id) {
      let url;

      if (bid == 1) {
        url = "//game.gtimg.cn/images/yxzj/img201606/summoner/" + id + ".jpg";
      } else if (bid == 2) {
        url = "//game.gtimg.cn/images/yxzj/img201606/itemimg/" + id + ".jpg";
      }

      return url;
    },
    onUrlClick: function (data) {
      this.$appOpenUrl(
        "是否打开" + (data.url ? "外部" : "内部") + "链接?",
        null,
        { path: data.url ? data.url : data.to },
        data.url ? 0 : 1
      );
    },
  },
};
</script>