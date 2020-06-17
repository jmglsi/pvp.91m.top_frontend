<template>
  <div class="hero-update">
    <div class="tuijian-b4558c68ce168dc8679358f047eea63b tuijian-447b7147e84be512208dcc0995d67ebc">
      <div class="tuijian-3490d5ece19a8f958d2be068e27f636a">
        <van-row>
          <van-col span="16" @click="calendarShow = true">
            <span class="tuijian-6b0325a49e13e1c8adc31a953f4bca63">{{ homeInfo.dayTag.tips }}</span>
          </van-col>
          <van-col span="8">
            <div class="tuijian-c88c478fd2695c8b07740ccd247a28ae">
              <van-dropdown-menu direction="up" background="transparent">
                <van-dropdown-item v-model="heroType" :options="heroOptions" />
              </van-dropdown-menu>
            </div>
          </van-col>
        </van-row>
      </div>

      <div class="tuijian-7d4e6768382f99a87a56cad0ac71b15b">
        <a-timeline>
          <a-timeline-item
            v-for="(data, index) in homeInfo.dayTag.result"
            v-show="(heroType == 0 && homeInfo.dayTag.result[index].calendarInfo.type <= 0) || (heroType == 1 && homeInfo.dayTag.result[index].calendarInfo.type > 0) || (heroType == 2 && homeInfo.dayTag.result[index].calendarInfo.type > -1)"
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
.tuijian-3490d5ece19a8f958d2be068e27f636a {
  margin-bottom: 25px;
}

.tuijian-6b0325a49e13e1c8adc31a953f4bca63 {
  line-height: 50px;
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
  name: "Update",
  props: {
    aid: {
      type: Number,
      default: 0
    }
  },
  watch: {
    aid: {
      immediate: true,
      handler(val) {
        this.init(val);
      }
    }
  },
  data() {
    return {
      heroType: 0,
      heroOptions: [
        { text: "体验服", value: 0 },
        { text: "正式服", value: 1 },
        { text: "全部", value: 2 }
      ],
      calendarShow: false,
      minDate: new Date(),
      maxDate: new Date(),
      homeInfo: {
        id: 0,
        dayTag: {
          active: 0,
          tips: null,
          title: "",
          result: []
        }
      },
      homeTuiJianIsLoading: false
    };
  },
  mounted() {
    let heroId = this.$props.aid;
    this.init(heroId);
  },
  methods: {
    init: function(heroId) {
      this.axios
        .get(this.appApi.list.getHeroUpdate + "&aid=" + heroId)
        .then(ret => {
          this.homeInfo = ret.data.data;
        });

      let date = new Date();
      this.minDate = new Date(date.setMonth(date.getMonth() - 4));
      this.maxDate = new Date(date.setMonth(date.getMonth() + 5));
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