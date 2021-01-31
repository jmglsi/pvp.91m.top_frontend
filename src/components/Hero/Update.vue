<template>
  <div class="hero-update">
    <div
      class="app-0464ec62d5cba8a9ec29d0c4c89fc7c6 app-b4a64ecd008af42ba95bc20350599699 update-e1fade65183eeca567683609ebb7005f"
    >
      <div class="update-3490d5ece19a8f958d2be068e27f636a">
        <van-row>
          <van-col
            :span="$appIsMobile ? 15 : 21"
            @click="showInfo.calendar = true"
          >
            <span class="update-6b0325a49e13e1c8adc31a953f4bca63">{{
              tableData.result.tips
            }}</span>
          </van-col>
          <van-col :span="$appIsMobile ? 9 : 3">
            <div class="app-f3b57b63e4f5f4e157fd45bdb8611005">
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
              v-show="data.calendar.day"
              :color="data.calendar.color"
              @click="
                heroId > 0 ? onOpenHeroUpdateTextClick(heroId, data) : null
              "
              round
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
                :key="'update-12c9bc92e856bdab7bc932b5d368f97e-' + index"
                color="black"
                class="update-26edf9c6ae9f8356043d0e175516cab6"
                >{{ data }}</van-tag
              >
              <span
                @click="
                  $appOpenUrl('是否打开外部链接?', null, { path: data.url })
                "
                class="update-f0af832cbd923851be8557213d95dddc"
                >&nbsp;🔗
                {{ data.title }}
              </span>
            </div>

            <div
              v-else-if="!data.url"
              v-html="data.title"
              class="update-5a5152e95445ede11c05f5fa898d8fd9"
            />

            <div class="update-c936f93d328137bba0ab32510a2e4fd0">
              <span
                v-for="(itemHeroId, index) in data.items"
                :key="'update-54099f84a9943b4b1eed932ec22066eb-' + index"
                @click="
                  itemHeroId < 900 && itemHeroId != heroId
                    ? $appPush({ path: '/hero/' + itemHeroId + '/info' })
                    : null
                "
                class="update-704985931ce54a5350c733c036dfd8b2"
              >
                <img
                  v-lazy="
                    itemHeroId > 900
                      ? '/img/app-icons/hero_white.png'
                      : '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                        itemHeroId +
                        '/' +
                        itemHeroId +
                        '.jpg'
                  "
                  @click="
                    itemHeroId > 900 ? $message.info($appMsg.info[1000]) : null
                  "
                  class="update-5d39f3848925994b52ec52fba934577c"
                />
              </span>
            </div>
          </a-timeline-item>
        </a-timeline>

        <div
          v-if="heroId > 0"
          @click="
            $appOpenUrl('是否查看英雄更多更新记录?', 'NGA @EndMP', {
              path: '//nga.178.com/read.php?pid=' + updateId,
            })
          "
          class="update-0b479089ade5d13a2c41830785ebac9d"
        >
          <van-tag
            round
            color="orange"
            class="update-77ed43eb3bc38c0cb1a38367cfedd9d6"
            >更多更新记录</van-tag
          >
        </div>
      </div>
    </div>

    <div
      class="app-e827ba0e6873e7ce7ef7c6c58e970609 update-54d18ea9d2c044692d2df8b888792af8"
    >
      <van-calendar
        v-model="showInfo.calendar"
        :title="tableData.result.title"
        :show-confirm="false"
        :formatter="onFormatter"
        :min-date="date.min"
        :max-date="date.max"
        safe-area-inset-bottom
      />
    </div>

    <div class="update-25ad144033367c9bb904b06d66436d71">
      <van-dialog
        v-model="showInfo.dialog"
        @close="
          showInfo.checked ? onHeroUpdateTextCopy(heroId, tableDataRow) : null
        "
      >
        <template #title>
          <span class="update-f1223965b6bcd34f5e1e3115266cb7ba">{{
            updateInfo.title
          }}</span
          >&nbsp;
          <span class="update-50d683cbc99c635a03f18ca2fcfbe70b"
            ><van-switch
              v-model="showInfo.checked"
              size="15px"
              class="update-0ae9adc9418f0f446d0b49ef7e49e94c"
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
        if (newValue.heroId == null) return;

        this.getHeroUpdate(newValue.heroId);
      },
    },
  },
  data() {
    return {
      copyData: "",
      date: {
        min: new Date(),
        max: new Date(),
      },
      tableData: {
        result: {
          rows: [],
        },
        tips: "",
        title: "",
      },
      tableDataRow: {},
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
      showInfo: {
        calendar: false,
        dialog: false,
        checked: false,
      },
    };
  },
  methods: {
    getHeroUpdate: function (heroId) {
      this.$axios
        .post(this.$appApi.pvp.getHeroUpdate + "&heroId=" + heroId)
        .then((res) => {
          this.tableData = res.data.data;
        });

      let date = new Date();

      this.date.min = new Date(date.setMonth(date.getMonth() - 4));
      this.date.max = new Date(date.setMonth(date.getMonth() + 4));
    },
    onFormatter: function (day) {
      let tableData = this.tableData.result.rows,
        maxType = -5;

      let oDay =
        day.date.getFullYear() +
        "/" +
        (day.date.getMonth() + 1) +
        "/" +
        day.date.getDate();

      for (let i = 0; i < tableData.length; i++) {
        let result = tableData[i].calendar;

        if (!result.day) continue;

        if (oDay == result.day) {
          if (result.type == 0) {
            day.bottomInfo = result.text;
          }

          if (result.type == 1) {
            day.topInfo = result.text;
          }

          if (result.type == 1.1) {
            day.text = result.text;
          }

          if (result.type == 1.2) {
            day.text = result.text;
          }

          if (result.type == 1.3) {
            day.text = result.text;
          }

          if (result.type == 2) {
            day.text = result.text;
          }

          if (result.type == 3) {
            day.text = result.text;
          }

          if (result.type == 4) {
            day.text = result.text;
          }

          if (result.type > maxType) {
            maxType = result.type;
          }
        }
      }

      if (maxType > -3) {
        if (maxType == 0) {
          day.className = "update-tyf";
        }

        if (maxType == 1) {
          day.className = "update-zsf";
        }

        if (maxType == 1.1) {
          day.className = "update-xyx";
        }

        if (maxType == 1.2) {
          day.className = "update-pb";
        }

        if (maxType == 1.3) {
          day.className = "update-cz";
        }

        if (maxType == 2) {
          day.className = "update-fx";
        }

        if (maxType == 3) {
          day.className = "update-xpf";
        }

        if (maxType == 4) {
          day.className = "update-fc";
        }
      }

      return day;
    },
    onOpenHeroUpdateTextClick: function (heroId, data) {
      this.$axios
        .post(
          this.$appApi.pvp.getHeroUpdateText +
            "&heroId=" +
            heroId +
            "&articleId=" +
            data.articleId
        )
        .then((res) => {
          this.updateInfo.title = data.calendar.day + " 的更新内容";
          this.updateInfo.text = res.data.data;

          this.showInfo.dialog = true;
          this.tableDataRow = data;
        });
    },
    onHeroUpdateTextCopy: function (heroId, row) {
      let date = new Date(row.calendar.day);

      this.copyData =
        "[quote]\r[size=110%][b][url=" +
        row.url +
        "][color=blue]" +
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日[/color][/url][/b][/size]\r======\rNGA英雄调整模板\r[/quote]";

      setTimeout(
        (copyData) => {
          this.$appCopyData(copyData);
        },
        750,
        this.copyData
      );
    },
  },
};
</script>
