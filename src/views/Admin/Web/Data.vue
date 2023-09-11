<template>
  <div class="admin-web-data">
    <!-- <div>这里是 web-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-8c36adba08eefa688be68bc3cf4d5fd6">
        <h1>👋 晚上好，苏苏 ~</h1>
      </div>
    </div>

    <div class="admin-8e086eb841d9b5cd2f89212ac8fd0527">
      <a-row>
        <a-col :span="8">
          <a-statistic
            title="对局样本"
            :value="93239"
            :valueStyle="{ color: 'red' }"
          />
        </a-col>
        <a-col :span="8">
          <a-statistic title="注册用户" :value="17206" />
        </a-col>
        <a-col :span="8">
          <a-statistic title="活跃用户" :value="288" />
        </a-col>
      </a-row>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-9033961843cd2a46b918dfbdd580b890"
    >
      <div class="admin-86c07e1e288d644944e82928f72a3db6">
        <a-menu
          :defaultSelectedKeys="['hot-keywords']"
          @select="onMenuSelect"
          mode="horizontal"
        >
          <a-menu-item key="hot-keywords">热门搜索</a-menu-item>
          <a-menu-item key="hot-talk">热门讨论</a-menu-item>
          <a-menu-item key="no-adjustment-time">暂未调整</a-menu-item>
          <a-menu-item key="position-recommend">分路推荐</a-menu-item>
          <a-menu-item key="no-skin-time">衣柜空空</a-menu-item>
          <a-sub-menu>
            <template #title>未来趋势</template>
            <a-menu-item key="trend-hero">英雄</a-menu-item>
            <a-menu-item key="trend-skill">召唤师技能</a-menu-item>
            <a-menu-item key="trend-equipment">装备</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>

      <div class="admin-1378e5de141cd7a6bdfe3ad089d9125c">
        <div class="admin-14fd09c9c45a0af203f58671d8c55e62">
          <ul>
            <li
              v-for="(data, index) in tableData.result.rows"
              :key="'admin-105d61f2bce74ce8b94543a47bd3e25a-' + index"
              @click="onHeroClick(data)"
              class="admin-6fbd61fbcdda4791745558dd23de319b"
            >
              <img
                width="30"
                height="30"
                v-lazy="{
                  src: '/img/icons-hero/' + data.heroId + '.jpg',
                  error:
                    '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                    data.heroId +
                    '/' +
                    data.heroId +
                    '.jpg',
                }"
                class="app-border-radius"
              />
              <span
                v-if="data.text"
                class="app-b28e48b33c0948bab67b77d696b3b9fd admin-caf10022f329436a8ee8bf7e9f7e466a"
              >
                {{ data.text }}
              </span>
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
  name: "adminWebData",
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
      selectedKeys: "hot-keywords",
      tableData: {
        result: {
          rows: [
            {
              heroId: 105,
              heroName: "廉颇",
              text: "",
              to: "/search?q=廉颇&refresh=1",
            },
            {
              heroId: 106,
              heroName: "小乔",
              text: "",
              to: "/search?q=小乔&refresh=1",
            },
            {
              heroId: 107,
              heroName: "赵云",
              text: "",
              to: "/search?q=赵云&refresh=1",
            },
            {
              heroId: 108,
              heroName: "墨子",
              text: "",
              to: "/search?q=墨子&refresh=1",
            },
            {
              heroId: 109,
              heroName: "妲己",
              text: "",
              to: "/?show=heroSkill",
            },
          ],
        },
        cardInfo: {
          id: null,
          name: "",
        },
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
  methods: {
    onMenuSelect: function (e) {
      this.selectedKeys = e.key;
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

      if (["hot-keywords", "hot-talk"].indexOf(this.selectedKeys) > -1) {
        this.$appOpenUrl("是否打开内部链接?", null, { path: e.to }, 0);
      } else if (
        ["trend-hero", "trend-skill", "trend-equipment"].indexOf(
          this.selectedKeys
        ) > -1
      ) {
        this.$appOpenUrl("是否打开内部链接?", null, { path: e.to }, 0);
      } else {
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
  position: absolute;
}

div.admin-1378e5de141cd7a6bdfe3ad089d9125c {
  margin-top: 15px;
}

div.admin-c9d65acf110c123e832b5cc410a20904 {
  text-align: center;
}
</style>