<template>
  <div class="hero-update">
    <div
      class="tuijian-b4558c68ce168dc8679358f047eea63b tuijian-447b7147e84be512208dcc0995d67ebc app-1e4b00d1b398e8a6551429b2a2f0e17c"
    >
      <div class="tuijian-3490d5ece19a8f958d2be068e27f636a">
        <van-row>
          <van-col span="16" @click="show.calendar = true">
            <span class="tuijian-6b0325a49e13e1c8adc31a953f4bca63">{{ tableData.tips }}</span>
          </van-col>
          <van-col span="8">
            <div class="tuijian-c88c478fd2695c8b07740ccd247a28ae">
              <van-dropdown-menu direction="up">
                <van-dropdown-item v-model="updateInfo.model" :options="updateInfo.options" />
              </van-dropdown-menu>
            </div>
          </van-col>
        </van-row>
      </div>

      <div class="tuijian-7d4e6768382f99a87a56cad0ac71b15b">
        <a-timeline>
          <a-timeline-item
            v-for="(data, index) in tableData.result"
            v-show="(updateInfo.model == 0 && data.calendar.type <= 0) || (updateInfo.model == 1 && data.calendar.type > 0) || (updateInfo.model == 2 && data.calendar.type > -1)"
            :key="'tuijian-587fa4ff436ed0ff2113cd87bb01967b-' + index"
            :color="data.calendar.color"
          >
            <van-tag
              v-show="data.calendar.day"
              :color="data.calendar.color"
              round
              class="tuijian-5a0c2e4611419b82b55675d035764007"
            >{{ data.calendar.day }}</van-tag>

            <div v-if="data.url" class="tuijian-5a5152e95445ede11c05f5fa898d8fd9">
              <van-tag
                v-for="(data, index) in data.tags"
                :key="'tuijian-5e9c0708969ea62d890f9c9f063b6c44-' + index"
                color="black"
                round
                class="tuijian-26edf9c6ae9f8356043d0e175516cab6"
              >{{ data }}</van-tag>
              <a :href="data.url" target="_blank">
                <img
                  v-lazy="'/img/app-icons/link_black.png'"
                  class="tuijian-a1b6d48bbb668c1f71ac1fdd39fc7f4e"
                />
                {{ data.title }}
              </a>
            </div>

            <div
              v-else-if="!data.url"
              v-html="data.title"
              class="tuijian-5a5152e95445ede11c05f5fa898d8fd9"
            ></div>

            <div v-show="data.items.length > 0" class="tuijian-c936f93d328137bba0ab32510a2e4fd0">
              <router-link
                v-for="(dataItem, index) in data.items"
                :to="dataItem == 999 ? '' : { path: '/hero/' + dataItem + '/info' }"
                :key="'tuijian-54099f84a9943b4b1eed932ec22066eb-' + index"
              >
                <img
                  v-show="dataItem"
                  v-lazy="dataItem == 999 ? '/img/app-icons/hero.png' :'//game.gtimg.cn/images/yxzj/img201606/heroimg/' + dataItem + '/' + dataItem + '.jpg'"
                  @click="dataItem == 999 ? $message.info('提示:1000,还没上线正式服的新英雄') : ''"
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
        v-model="show.calendar"
        :title="tableData.title"
        :show-confirm="false"
        :formatter="onFormatter"
        :min-date="date.min"
        :max-date="date.max"
      />
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/hero.css");
</style>

<script>
export default {
  name: "HeroUpdate",
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId } = this;
      return { heroId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        this.getHeroUpdate(newValue.heroId);
      },
    },
  },
  data() {
    return {
      updateInfo: {
        model: 0,
        options: [
          { text: "体验服", value: 0 },
          { text: "正式服", value: 1 },
          { text: "全部", value: 2 },
        ],
      },
      show: {
        calendar: false,
      },
      date: {
        min: new Date(),
        max: new Date(),
      },
      tableData: {
        tips: null,
        title: "",
        result: [],
      },
    };
  },
  methods: {
    getHeroUpdate: function (heroId) {
      this.axios
        .get(this.apiList.pvp.getHeroUpdate + "&heroId=" + heroId)
        .then((res) => {
          this.tableData = res.data.data;
        });

      let date = new Date();

      this.date.min = new Date(date.setMonth(date.getMonth() - 4));
      this.date.max = new Date(date.setMonth(date.getMonth() + 5));
    },
    onFormatter: function (day) {
      let oDay =
        day.date.getFullYear() +
        "/" +
        (day.date.getMonth() + 1) +
        "/" +
        day.date.getDate();
      let tableData = this.tableData.result;

      for (let i = 0; i < tableData.length; i++) {
        let result = tableData[i].calendar;

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
            day.className = "dayTag-cz";
          }

          if (result.type == 3) {
            day.text = result.text;
            day.className = "dayTag-xp";
          }

          if (result.type == 4) {
            day.text = result.text;
            day.className = "dayTag-fc";
          }
        }
      }
      return day;
    },
  },
};
</script>