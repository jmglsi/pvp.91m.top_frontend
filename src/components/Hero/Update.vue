<template>
  <div class="hero-update">
    <div
      class="app-0464ec62d5cba8a9ec29d0c4c89fc7c6 app-b4a64ecd008af42ba95bc20350599699 update-e1fade65183eeca567683609ebb7005f"
    >
      <div class="update-3490d5ece19a8f958d2be068e27f636a">
        <van-row>
          <van-col span="16" @click="showInfo.calendar = true">
            <span class="update-6b0325a49e13e1c8adc31a953f4bca63">{{
              tableData.result.tips
            }}</span>
          </van-col>
          <van-col span="8">
            <div class="update-c88c478fd2695c8b07740ccd247a28ae">
              <van-dropdown-menu direction="up">
                <van-dropdown-item
                  v-model="updateInfo.model"
                  :options="updateInfo.options"
                />
              </van-dropdown-menu>
            </div>
          </van-col>
        </van-row>
      </div>

      <div class="update-7d4e6768382f99a87a56cad0ac71b15b">
        <a-timeline>
          <a-timeline-item
            v-for="(data, index) in tableData.result.rows"
            v-show="
              (updateInfo.model == 0 && data.calendar.type <= 0) ||
              (updateInfo.model == 1 && data.calendar.type > 0) ||
              (updateInfo.model == 2 && data.calendar.type >= 0)
            "
            :key="'update-587fa4ff436ed0ff2113cd87bb01967b-' + index"
            :color="data.calendar.color"
          >
            <van-tag
              round
              v-show="data.calendar.day"
              :color="data.calendar.color"
              @click="onOpenHeroUpdateTextClick(heroId, data)"
              class="update-5a0c2e4611419b82b55675d035764007"
              >{{ data.calendar.day }}</van-tag
            >

            <div
              v-if="data.url"
              class="update-5a5152e95445ede11c05f5fa898d8fd9"
            >
              <van-tag
                round
                v-for="(data, index) in data.tags"
                :key="'tuijian-5e9c0708969ea62d890f9c9f063b6c44-' + index"
                color="black"
                class="update-26edf9c6ae9f8356043d0e175516cab6"
                >{{ data }}</van-tag
              >
              <span
                @click="appOpenUrl('是否打开外部链接?', null, data.url)"
                class="update-f0af832cbd923851be8557213d95dddc"
              >
                <img
                  v-lazy="'/img/app-icons/link_black.png'"
                  class="update-a1b6d48bbb668c1f71ac1fdd39fc7f4e"
                />
                {{ data.title }}
              </span>
            </div>

            <div
              v-else-if="!data.url"
              v-html="data.title"
              class="update-5a5152e95445ede11c05f5fa898d8fd9"
            ></div>

            <div
              v-show="data.items.length > 0"
              class="update-c936f93d328137bba0ab32510a2e4fd0"
            >
              <router-link
                v-for="(heroId, index) in data.items"
                :to="heroId == 999 ? '' : { path: '/hero/' + heroId + '/info' }"
                :key="'update-54099f84a9943b4b1eed932ec22066eb-' + index"
              >
                <img
                  v-if="heroId != 155"
                  v-show="heroId"
                  v-lazy="
                    heroId == 999
                      ? '/img/app-icons/hero_white.png'
                      : '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                        heroId +
                        '/' +
                        heroId +
                        '.jpg'
                  "
                  @click="
                    heroId == 999
                      ? $message.info('提示:1000,还没上线正式服的新英雄')
                      : ''
                  "
                  class="update-5d39f3848925994b52ec52fba934577c"
                />
              </router-link>
            </div>
          </a-timeline-item>
        </a-timeline>

        <div
          v-if="heroId != 0"
          @click="
            appOpenUrl(
              '是否查看英雄更多更新记录?',
              'NGA @EndMP',
              '//nga.178.com/read.php?pid=' + updateId
            )
          "
          class="update-0b479089ade5d13a2c41830785ebac9d"
        >
          <van-tag
            round
            color="orange"
            class="tuijian-4a4543f0a71a7c9f19600ef30bd3d067"
            >更多更新记录</van-tag
          >
        </div>
      </div>
    </div>

    <div class="tuijian-a0e7b2a565119c0a7ec3126a16016113">
      <van-calendar
        v-model="showInfo.calendar"
        :title="tableData.result.title"
        :show-confirm="false"
        :formatter="onFormatter"
        :min-date="date.min"
        :max-date="date.max"
      />
    </div>

    <div class="tuijian-3cc26c96de198245a3ee2d64e1f94ebf">
      <van-dialog
        v-model="showInfo.dialog"
        @close="onCloseHeroUpdateTextClick(heroId, now)"
      >
        <template #title>
          <span class="update-f1223965b6bcd34f5e1e3115266cb7ba">{{
            updateInfo.title
          }}</span
          >&nbsp;
          <span class="update-50d683cbc99c635a03f18ca2fcfbe70b"
            ><van-switch
              size="15px"
              class="update-0ae9adc9418f0f446d0b49ef7e49e94c"
              v-model="showInfo.checked"
          /></span>
        </template>
        <div
          v-html="updateInfo.text"
          class="update-288ac40c37c02b743c0c2cc51c650dd3"
        />
      </van-dialog>
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/hero-update.css");
</style>

<script>
export default {
  name: "HeroUpdate",
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
    updateId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId, updateId } = this;
      return { heroId, updateId };
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
      copyData: "",
      updateInfo: {
        model: 0,
        options: [
          { text: "体验服", value: 0 },
          { text: "正式服", value: 1 },
          { text: "全部", value: 2 },
        ],
        title: "",
        text: "",
      },
      now: {},
      showInfo: {
        calendar: false,
        dialog: false,
        checked: false,
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
      let tableData = this.tableData.result.rows;

      for (let i = 0; i < tableData.length; i++) {
        let result = tableData[i].calendar;

        if (!result.day) continue;

        if (oDay === result.day) {
          if (result.type == 0) {
            day.bottomInfo = result.text;
            day.className = "update-tyf";
          }

          if (result.type == 1) {
            day.topInfo = result.text;
            day.className = "update-zsf";
          }

          if (result.type == 2) {
            day.text = result.text;
            day.className = "update-cz";
          }

          if (result.type == 3) {
            day.text = result.text;
            day.className = "update-xp";
          }

          if (result.type == 4) {
            day.text = result.text;
            day.className = "update-fc";
          }
        }
      }
      return day;
    },
    onOpenHeroUpdateTextClick: function (heroId, data) {
      if (heroId == 0) return;

      this.axios
        .get(
          this.apiList.pvp.getHeroUpdateText +
            "&heroId=" +
            heroId +
            "&articleId=" +
            data.articleId
        )
        .then((res) => {
          this.updateInfo.title = data.calendar.day + " 的更新内容";
          this.updateInfo.text = res.data.data;

          this.showInfo.dialog = true;
          this.now = data;
        });
    },
    onCloseHeroUpdateTextClick: function (heroId, data) {
      if (this.showInfo.checked == false) return;

      let date = new Date(data.calendar.day);
      let newDate =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日";

      this.copyData =
        "[quote]\r[size=110%][b][url=" +
        data.url +
        "][color=blue]" +
        newDate +
        "[/color][/url][/b][/size]\r======\rNGA英雄调整模板\r[/quote]";
      this.appCopyData(this.copyData);
    },
  },
};
</script>