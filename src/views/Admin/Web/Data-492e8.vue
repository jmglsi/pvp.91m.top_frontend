<template>
  <div class="admin-web-data">
    <!-- <div>这里是 web-data-492e8</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-8c36adba08eefa688be68bc3cf4d5fd6">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>👋 您好，管理员。</span>
          </h1>
          <template #overlay>
            <a-menu :style="{ width: '100px' }">
              <a-sub-menu key="menu" title="菜单">
                <a-menu-item
                  @click="
                    $appOpenUrl(
                      $t('open-url.title'),
                      null,
                      {
                        path: 'https://api.91m.top/hero/v1/app.php?type=getQrcode&host=camp.qq.com',
                      },
                      0
                    )
                  "
                >
                  扫码登录
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item disabled>设置</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <div class="admin-8e086eb841d9b5cd2f89212ac8fd0527">
      <a-row>
        <a-col :span="6">
          <a-statistic title="注册用户" :value="dataInfo.num_all" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="活跃用户" :value="dataInfo.num_update" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="白名单" :value="dataInfo.num_whitelist" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="玩家数" :value="dataInfo.num_player" />
        </a-col>
      </a-row>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-9033961843cd2a46b918dfbdd580b890"
    >
      <div class="admin-86c07e1e288d644944e82928f72a3db6">
        <a-menu
          :defaultSelectedKeys="['hot-talk']"
          @select="onMenuSelect"
          mode="horizontal"
        >
          <a-menu-item key="hot-keywords">热门搜索 🔍</a-menu-item>
          <a-menu-item key="hot-talk">热门讨论 🔥</a-menu-item>
          <a-menu-item key="no-adjustment-time">暂未调整 🆕</a-menu-item>
          <a-menu-item key="no-skin-time">衣柜空空 👔</a-menu-item>
          <a-sub-menu>
            <template #title>
              未来趋势 <van-icon name="arrow-down" />
            </template>
            <a-menu-item
              key="trend-hero"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: '/ranking?type=0&bid=3&cid=0&did=0&eid=b&refresh=1' },
                  0
                )
              "
            >
              英雄
            </a-menu-item>
            <a-menu-item
              key="trend-skill"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: '/?show=heroSkill' },
                  0
                )
              "
            >
              技能
            </a-menu-item>
            <a-menu-item
              key="trend-equipment"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: '/ranking?type=3&bid=0&cid=0&did=0&eid=b&refresh=1' },
                  0
                )
              "
            >
              装备
            </a-menu-item>
            <a-menu-item
              key="trend-player"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: '/ranking?type=2&bid=0&cid=0&did=0&eid=b&refresh=1' },
                  0
                )
              "
            >
              玩家
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu>
            <template #title>
              常用服务 <van-icon name="arrow-down" />
            </template>
            <a-menu-item
              key="analyse-data"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: 'https://www.aliyundrive.com/s/adSji73FSop' },
                  0
                )
              "
            >
              行为轨迹热点图
            </a-menu-item>
            <a-menu-item
              key="official-img-data"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: 'https://pvp.icreate.qq.com' },
                  0
                )
              "
            >
              萤火开放素材库
            </a-menu-item>
            <a-menu-item
              key="official-game-data"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: 'https://pvp.qq.com/matchdata/index.html' },
                  0
                )
              "
            >
              官方赛事数据库
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item
              key="ai-chatgpt"
              @click="
                $appOpenUrl(
                  '是否打开外部链接?',
                  null,
                  { path: 'https://chatgpt.woc.moe' },
                  0
                )
              "
            >
              ChatGPT (聊天)
            </a-menu-item>
            <a-menu-item disabled key="ai-stable-diffusion">
              Stable Diffusion (画图)
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>

      <div class="admin-1378e5de141cd7a6bdfe3ad089d9125c">
        <div class="admin-14fd09c9c45a0af203f58671d8c55e62">
          <ul>
            <li
              v-for="(data, index) in tableData.result[selectedIndex].rows"
              :key="'admin-105d61f2bce74ce8b94543a47bd3e25a-' + index"
              @click="onHeroClick(data)"
              class="admin-6fbd61fbcdda4791745558dd23de319b"
            >
              <span
                v-if="data.isTop == false"
                class="app-b28e48b33c0948bab67b77d696b3b9fd admin-caf10022f329436a8ee8bf7e9f7e466a"
              >
                {{ data.value }}
              </span>

              <img
                v-if="data.trend > 0"
                v-lazy="'/img/icons-app/hot_' + data.trend + '.png'"
                width="18"
                height="18"
                class="search-97c89d1a7343e149ab400d0bb141c7de"
              />
            </li>
          </ul>
        </div>

        <div class="admin-c9d65acf110c123e832b5cc410a20904">
          <van-action-sheet
            v-model="showInfo.actionSheet"
            :title="tableData.cardInfo.name + ' 的其他数据 (近期)'"
          >
            <template #default>
              <van-tabs
                v-model="skillInfo.model"
                v-if="skillInfo.model > -1"
                :ellipsis="false"
                @click="onTabsClick"
              >
                <van-tab title="顺位 (推荐)">
                  <HeroBPIndex
                    v-if="skillInfo.model == 0"
                    :heroId="tableData.cardInfo.id"
                  />
                </van-tab>
                <van-tab title="打法 (推荐)">
                  <HeroGenreList
                    v-if="skillInfo.model == 1"
                    :genreId="tableData.cardInfo.id"
                  />
                </van-tab>
                <van-tab title="出装 (推荐)">
                  <HeroEquipmentListALL
                    v-if="skillInfo.model == 2"
                    :heroId="tableData.cardInfo.id"
                  />
                </van-tab>
                <van-tab title="出装 (单件)">
                  <HeroEquipmentListOne
                    v-if="skillInfo.model == 3"
                    :equipmentId="tableData.cardInfo.id"
                    :equipmentType="1"
                  />
                </van-tab>
                <van-tab>
                  <template #title>
                    <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                      国服 (备战)
                    </span>
                    <img
                      v-lazy="'/img/icons-app/hot.png'"
                      width="13"
                      height="13"
                    />
                  </template>

                  <HeroInscriptionList
                    v-if="skillInfo.model == 4"
                    :heroId="tableData.cardInfo.id"
                  />
                </van-tab>
                <van-tab
                  title="更新调整"
                  :to="
                    '/hero/' + tableData.cardInfo.id + '/info?show=heroUpdate'
                  "
                >
                </van-tab>
              </van-tabs>
            </template>
          </van-action-sheet>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminWebData-492e8",
  components: {
    HeroBPIndex: () => import("@/components/Hero/BPIndex.vue"),
    HeroEquipmentListALL: () =>
      import("@/components/Hero/EquipmentList_All.vue"),
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
    HeroGenreList: () => import("@/components/Hero/GenreList.vue"),
    HeroInscriptionList: () => import("@/components/Hero/InscriptionList.vue"),
    //HeroUpdate: () => import("@/components/Hero/Update.vue"),
  },
  data() {
    return {
      selectedKeys: "hot-talk",
      selectedIndex: 1,
      tableData: {
        result: [
          { rows: [], topNum: 1 },
          { rows: [], topNum: 1 },
          { rows: [], topNum: 1 },
          { rows: [], topNum: 1 },
        ],
        cardInfo: {
          id: null,
          name: "",
        },
      },
      dataInfo: {
        num_all: 0,
        num_update: 0,
        num_whitelist: 0,
        num_player: 0,
      },
      showInfo: {
        actionSheet: false,
        heroFeature: false,
        searchData: false,
        searchHistory: false,
        heroData: 0,
      },
      skillInfo: {
        model: 1,
      },
      tipsInfo: [0, 0, 0, 0, 0, 0],
    };
  },
  mounted() {
    this.getDataByWebData();
    this.getSearch();
  },
  methods: {
    getDataByWebData: function () {
      this.$axios.post(this.$appApi.app.getDataByWebData).then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          this.dataInfo = data;
        } else {
          this.$message.error(status.msg);
        }
      });
    },
    getSearch: function (value = "") {
      this.$axios
        .post(
          this.$appApi.app.getSearch,
          this.$qs.stringify({
            q: value,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData.result = data.search.recommend;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onMenuSelect: function (e) {
      let menuInfo = {
        "hot-keywords": 0,
        "hot-talk": 1,
        "no-adjustment-time": 2,
        "no-skin-time": 3,
      };

      this.selectedKeys = e.key;
      this.selectedIndex = menuInfo[e.key];
    },
    onTabsClick: function (e) {
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
        tipsText = this.$appMsg.info[1028];
      }

      if (tipsText && this.tipsInfo[e] == 0) {
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
    onHeroClick: function (e) {
      this.tableData.cardInfo.id = e.heroId;
      this.tableData.cardInfo.name = e.heroName;

      if (
        [
          "hot-keywords",
          "hot-talk",
          "no-adjustment-time",
          "no-skin-time",
        ].indexOf(this.selectedKeys) > -1
      ) {
        this.$appOpenUrl(
          "是否打开内部链接?",
          null,
          { path: "/search?q=" + encodeURIComponent(e.value) + "&refresh=1" },
          0
        );
      } else if (["position-recommend"].indexOf(this.selectedKeys) > -1) {
        this.showInfo.actionSheet = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
li.admin-6fbd61fbcdda4791745558dd23de319b {
  margin-bottom: 10px;
}

span.admin-caf10022f329436a8ee8bf7e9f7e466a {
  margin-top: 6px;
}

div.admin-1378e5de141cd7a6bdfe3ad089d9125c {
  margin-top: 15px;
}

div.admin-c9d65acf110c123e832b5cc410a20904 {
  text-align: center;
}
</style>