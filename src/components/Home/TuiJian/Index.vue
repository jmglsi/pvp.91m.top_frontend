<template>
  <div class="home-tuijian">
    <van-pull-refresh
      v-model="homeTuiJianIsLoading"
      :pulling-text="homeInfo.miniapp.pulling"
      :loosing-text="homeInfo.miniapp.loosing"
      :loading-text="homeInfo.miniapp.loading"
      :success-text="homeInfo.miniapp.success"
      @refresh="onHomeTuiJianRefresh"
    >
      <div
        class="tuijian-a139b05b7f8e496c00991733ef7cd589 tuijian-447b7147e84be512208dcc0995d67ebc"
      >
        <van-swipe :autoplay="3000" :height="175" class="tuijian-f97c2ea77c6a08b3afd5a59851cbe0d8">
          <van-swipe-item
            v-for="(data, index) in homeInfo.swipe.result"
            :key="'tuijian-a139b05b7f8e496c00991733ef7cd589-' + index"
            class="tuijian-ac104b3f82b3b5d3643319a05734ce93"
          >
            <img :src="data.img" class="tuijian-3c873293a7dc1ea8c20579f6a7ae94a9" />
            <van-tag
              :color="data.tag.color"
              mark
              class="tuijian-a5a5c883f68e45baa83f140e218759f1"
            >{{ data.tag.text }}</van-tag>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="tuijian-6a507ff2d5941aa4e30c98a8f3739ffe">
        <van-cell
          :title="homeInfo.tipsInfo.title"
          :value="homeInfo.tipsInfo.des"
          :to="homeInfo.tipsInfo.to"
          :url="homeInfo.tipsInfo.url"
          is-link
        />
      </div>

      <div
        class="tuijian-b4558c68ce168dc8679358f047eea63b tuijian-447b7147e84be512208dcc0995d67ebc"
      >
        <div class="tuijian-3490d5ece19a8f958d2be068e27f636a">
          <van-row>
            <van-col span="12" @click="calendarShow = true">
              <span class="tuijian-6b0325a49e13e1c8adc31a953f4bca63">{{ homeInfo.dayTag.tips }}</span>
            </van-col>
            <van-col span="12">
              <div class="tuijian-c88c478fd2695c8b07740ccd247a28ae">
                <van-tabs
                  v-model="homeInfo.dayTag.active"
                  :border="false"
                  :ellipsis="false"
                  :swipeable="true"
                  background="transparent"
                >
                  <van-tab title="体验服" />
                  <van-tab title="正式服" />
                  <van-tab title="全部" />
                </van-tabs>
              </div>
            </van-col>
          </van-row>
        </div>

        <div class="tuijian-7d4e6768382f99a87a56cad0ac71b15b">
          <a-timeline>
            <a-timeline-item
              v-for="(data, index) in homeInfo.dayTag.result"
              v-show="homeInfo.dayTag.active == homeInfo.dayTag.result[index].calendarInfo.type || homeInfo.dayTag.active == 1 && homeInfo.dayTag.result[index].calendarInfo.type > 0 || homeInfo.dayTag.active == 2 && homeInfo.dayTag.result[index].calendarInfo.type > -1"
              :key="'tuijian-b4558c68ce168dc8679358f047eea63b-' + index"
              :color="data.color"
            >
              <van-tag
                v-if="data.calendarInfo.day"
                :color="data.color"
                round
              >{{ data.calendarInfo.day }}</van-tag>
              <div v-if="data.url" class="tuijian-5a5152e95445ede11c05f5fa898d8fd9">
                <a :href="data.url" target="_blank">
                  <img
                    v-lazy="'/img/app-icons/link_black.png'"
                    class="tuijian-a1b6d48bbb668c1f71ac1fdd39fc7f4e"
                  />
                  {{ data.title }}
                </a>
              </div>
              <div v-else class="tuijian-5a5152e95445ede11c05f5fa898d8fd9" v-html="data.title"></div>
              <div v-if="data.item.length > 0" class="tuijian-c936f93d328137bba0ab32510a2e4fd0">
                <router-link
                  v-for="(id, index) in data.item"
                  :to="{ path: '/hero/' + id + '/info', query: { from: 'dayTag-' + data.calendarInfo.day } }"
                  :key="'tuijian-b4558c68ce168dc8679358f047eea63b-' + index"
                >
                  <img
                    v-if="id"
                    v-lazy="'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + id + '/' + id + '.jpg'"
                    class="tuijian-5d39f3848925994b52ec52fba934577c"
                  />
                </router-link>
              </div>
            </a-timeline-item>
          </a-timeline>
        </div>
      </div>
    </van-pull-refresh>

    <div class="tuijian-a0e7b2a565119c0a7ec3126a16016113">
      <van-calendar
        v-model="calendarShow"
        :title="homeInfo.dayTag.title"
        :show-confirm="false"
        :formatter="onFormatter"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </div>
  </div>
</template>

<style scoped>
.home-tuijian {
  margin: 0 10px;
}

.tuijian-447b7147e84be512208dcc0995d67ebc {
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  padding: 15px 10px;
  margin: 20px 10px;
}

.tuijian-a139b05b7f8e496c00991733ef7cd589 {
  padding: 0;
  overflow: hidden;
  transform: translateY(0);
}

.tuijian-3c873293a7dc1ea8c20579f6a7ae94a9 {
  height: 100%;
  width: 100%;
}

.tuijian-a5a5c883f68e45baa83f140e218759f1 {
  position: absolute;
  bottom: 25px;
  z-index: 1;
  left: 0;
}

div.van-cell.van-cell--clickable {
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
}

.tuijian-6a507ff2d5941aa4e30c98a8f3739ffe {
  text-align: left;
  margin: 0 10px;
}

.tuijian-6b0325a49e13e1c8adc31a953f4bca63 {
  line-height: 50px;
}

.tuijian-3490d5ece19a8f958d2be068e27f636a {
  margin-bottom: 25px;
}

.tuijian-7d4e6768382f99a87a56cad0ac71b15b {
  text-align: left;
}

.tuijian-5a5152e95445ede11c05f5fa898d8fd9 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.tuijian-5d39f3848925994b52ec52fba934577c {
  width: 50px;
  height: 50px;
  margin-bottom: 3px;
  margin-right: 3px;
}
</style>

<script>
export default {
  name: "HomeTuiJian",
  data() {
    return {
      loadingShow: true,
      calendarShow: false,
      minDate: new Date(),
      maxDate: new Date(),
      homeInfo: {
        swipe: {
          result: []
        },
        tipsInfo: {
          title: null,
          des: null,
          to: null,
          url: null
        },
        dayTag: {
          active: 0,
          tips: null,
          title: "",
          result: []
        },
        miniapp: {
          pulling: "喵呜...",
          loosing: "奇迹什么时候女装呢...",
          loading: "加载中...",
          success: null
        }
      },
      homeTuiJianIsLoading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.axios.get(this.appApi.list.getHome).then(ret => {
        this.homeInfo = ret.data.data;
      });

      let date = new Date();
      this.minDate = new Date(date.setMonth(date.getMonth() - 4));
      this.maxDate = new Date(date.setMonth(date.getMonth() + 5));
    },
    onHomeTuiJianRefresh: function() {
      setTimeout(() => {
        this.homeTuiJianIsLoading = false;
        this.$router.push({
          path: "/miniapp"
        });
      }, 1500);
    },
    onFormatter: function(day) {
      let oDay =
        day.date.getFullYear() +
        "/" +
        (day.date.getMonth() + 1) +
        "/" +
        day.date.getDate();
      let dayTagResult = this.homeInfo.dayTag.result;

      for (let i = 0; i < dayTagResult.length; i++) {
        let result = dayTagResult[i].calendarInfo;

        if (!result.day) continue;

        if (oDay === result.day) {
          if (result.type == 0) {
            day.bottomInfo = result.text;
            day.className = "dayTag-tyf";
          }

          if (result.type == 1) {
            day.topInfo = result.text;
            day.className = "dayTag-zsf";
          }

          if (result.type == 2) {
            day.text = result.text;
            day.className = "dayTag-xp";
          }

          if (result.type == 3) {
            day.text = result.text;
            day.className = "dayTag-fc";
          }
        }
      }
      return day;
    }
  }
};
</script>