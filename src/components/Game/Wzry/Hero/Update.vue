<template>
  <div class="app-update">
    <div
      class="app-0464ec62d5cba8a9ec29d0c4c89fc7c6 app-b4a64ecd008af42ba95bc20350599699 update-e1fade65183eeca567683609ebb7005f"
    >
      <div class="update-3490d5ece19a8f958d2be068e27f636a">
        <van-row>
          <van-col
            :span="$appIsMobile ? 15 : 21"
            @click="showInfo.calendar = true"
          >
            <span class="update-6b0325a49e13e1c8adc31a953f4bca63">
              {{ updateData.result.tips }}
            </span>
          </van-col>
          <van-col :span="$appIsMobile ? 9 : 3">
            <div
              class="app-f3b57b63e4f5f4e157fd45bdb8611005 app-8f06e89ca90bebf60c91699c473f4022"
            >
              <van-dropdown-menu>
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
            v-for="(data, index) in updateData.result.rows"
            v-show="
              (updateInfo.model == 0 && data.calendar.type <= 0) ||
              (updateInfo.model == 1 && data.calendar.type > 0) ||
              (updateInfo.model == 2 && data.calendar.type >= 0)
            "
            :key="'hero-587fa4ff436ed0ff2113cd87bb01967b-' + index"
            :color="data.calendar.color"
          >
            <van-tag
              round
              v-if="data.calendar.day"
              :color="data.calendar.color"
              @click="
                extraId > 0 ? onOpenHeroUpdateDetailClick(extraId, data) : null
              "
              class="update-5a0c2e4611419b82b55675d035764007"
            >
              {{ data.calendar.day }}
            </van-tag>

            <div
              v-if="data.url"
              class="update-5a5152e95445ede11c05f5fa898d8fd9"
            >
              <van-tag
                round
                v-for="(data, index) in data.tags"
                :key="'hero-12c9bc92e856bdab7bc932b5d368f97e-' + index"
                color="black"
                class="update-26edf9c6ae9f8356043d0e175516cab6"
              >
                {{ data }}
              </van-tag>
              <span
                @click="
                  data.url
                    ? $appOpenUrl(
                        $t('open-url.title'),
                        null,
                        { path: data.url },
                        0
                      )
                    : null
                "
                class="update-f0af832cbd923851be8557213d95dddc"
              >
                &nbsp;🔗&nbsp;{{ data.title }}
              </span>
            </div>

            <div
              v-else
              v-html="data.title"
              class="update-5a5152e95445ede11c05f5fa898d8fd9"
            />

            <div class="update-c936f93d328137bba0ab32510a2e4fd0">
              <span
                v-for="(item, index) in data.heroList"
                :key="'hero-54099f84a9943b4b1eed932ec22066eb-' + index"
                @click="
                  item != extraId
                    ? $appPush({
                        path: '/hero/' + item + '/info',
                      })
                    : null
                "
                class="update-704985931ce54a5350c733c036dfd8b2"
              >
                <img
                  v-lazy="
                    item < 900
                      ? {
                          //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + item + '/' + item + '.jpg',
                          src:
                            '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                            item +
                            '/' +
                            item +
                            '.jpg',
                        }
                      : $appCache + '/img/icons-app/hero_white.png'
                  "
                  width="40"
                  height="40"
                  class="app-border-radius update-5d39f3848925994b52ec52fba934577c"
                />
              </span>
            </div>

            <div
              v-if="data.equipmentList.length > 0"
              class="update-33717161c2d8c0d081510c322ab5876a"
            >
              <van-divider />
              <span
                v-for="(item, index) in data.equipmentList"
                :key="'hero-df0ed5943fd740242219ad3e45245f6e-' + index"
                @click="onEquipmentClick(data, index)"
                class="update-cf1228c4eb54ec10bf815f0ed3816a49"
              >
                <img
                  v-lazy="{
                    //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + item + '.jpg',
                    src:
                      '//game.gtimg.cn/images/yxzj/img201606/itemimg/' +
                      item +
                      '.jpg',
                  }"
                  width="40"
                  height="40"
                  class="app-border-radius update-5d39f3848925994b52ec52fba934577c"
                />
              </span>
            </div>
          </a-timeline-item>
        </a-timeline>

        <div
          v-if="extraId > 0 && updateId > 0"
          @click="
            $appOpenUrl(
              $t('open-url.title'),
              'NGA @EndMP',
              {
                path: 'https://ngabbs.com/read.php?pid=' + updateId,
              },
              0
            )
          "
          class="update-0b479089ade5d13a2c41830785ebac9d"
        >
          <van-tag
            plain
            color="orange"
            size="large"
            class="update-77ed43eb3bc38c0cb1a38367cfedd9d6"
          >
            更多更新记录
          </van-tag>
        </div>
      </div>
    </div>

    <div class="update-54d18ea9d2c044692d2df8b888792af8">
      <van-calendar
        v-model="showInfo.calendar"
        :title="updateData.result.title"
        :show-confirm="false"
        :formatter="onCalendarFormatter"
        :min-date="date.min"
        :max-date="date.max"
      />
    </div>

    <div class="hero-ec93fee7573d5d8daa4444009358e91b">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        description="其他数据 (近期)"
      >
        <template #default>
          <GameWzryHeroEquipmentListOne :extraId="equipmentId" :extraType="2" />
        </template>
      </van-action-sheet>
    </div>

    <div class="update-25ad144033367c9bb904b06d66436d71">
      <van-dialog
        v-model="showInfo.dialog"
        @close="showInfo.checked ? onCopy(updateDataRow) : null"
      >
        <template #title>
          <span class="update-f1223965b6bcd34f5e1e3115266cb7ba">
            {{ updateInfo.title }}
          </span>
          &nbsp;
          <span class="update-50d683cbc99c635a03f18ca2fcfbe70b">
            <van-switch
              v-model="showInfo.checked"
              size="15px"
              class="update-0ae9adc9418f0f446d0b49ef7e49e94c"
            />
          </span>
        </template>
        <div
          v-html="updateInfo.text"
          class="update-288ac40c37c02b743c0c2cc51c650dd3"
        />
      </van-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "heroUpdate",
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
    updateId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    GameWzryHeroEquipmentListOne: () =>
      import("@/components/Game/Wzry/Hero/EquipmentList_One.vue"),
  },
  computed: {
    listenChange() {
      const { extraId, updateId } = this;
      return { extraId, updateId };
    },
  },
  watch: {
    listenChange: {
      immediate: false,
      handler(newValue) {
        if (!newValue.extraId) return;
        let agree = this.$appConfigInfo.appInfo.isReadme;

        if (agree == 1) {
          this.getHeroUpdate(0, newValue.updateType, newValue.extraId);
        }
      },
    },
  },
  data() {
    return {
      copyData: "",
      equipmentId: null,
      date: {
        min: new Date(),
        max: new Date(),
      },
      updateData: {
        result: {
          rows: [],
          tips: "",
          title: "",
        },
      },
      updateDataRow: {},
      updateInfo: {
        model: 0,
        options: [
          { value: 0, text: "体验服" },
          { value: 1, text: "正式服" },
          { value: 2, text: "全部" },
        ],
        title: "",
        text: "",
      },
      showInfo: {
        actionSheet: false,
        dialog: false,
        calendar: false,
        checked: false,
      },
    };
  },
  mounted() {
    let agree = this.$appConfigInfo.appInfo.isReadme;

    if (agree == 1) {
      this.getHeroUpdate(0, 0, this.extraId);
    }
  },
  methods: {
    getHeroUpdate: function (aid = 0, bid = 0, heroId = 0) {
      let appConfigInfo = this.$appConfigInfo,
        date = new Date(),
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "heroUpdate-" + aid + "-" + bid + "-" + heroId
        );

      this.date.min = new Date(date.setMonth(date.getMonth() - 4));
      this.date.max = new Date(date.setMonth(date.getMonth() + 4));

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.updateData = ls;

        return;
      }

      this.$axios
        .post(
          this.$appApi.app.getHeroUpdate +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&id=" +
            encodeURIComponent(heroId)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.updateData = data;
            this.updateData.updateTime = ts;

            this.$appSetLocalStorage(
              "heroUpdate-" + aid + "-" + bid + "-" + heroId,
              this.updateData
            );
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    formatDate: function (date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onCalendarFormatter: function (day) {
      let o = this.updateData.result.rows,
        mapType = -5;

      let oldDay = this.$appXEUtils.toDateString(
        this.formatDate(day.date),
        "yyyy-MM-dd"
      );

      o.map((x) => {
        let result = x.calendar;

        if (result.type == -1) {
          //
        } else {
          if (oldDay == result.day) {
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

            /**
             *
             * 取优先级最高的
             *
             */
            if (result.type > mapType) {
              mapType = result.type;
            }
          }
        }
      });

      if (mapType == 0) {
        day.className = "app-fdc229c08af23dac1a0e8caac88a239d";
      }

      if (mapType == 1) {
        day.className = "app-d7a506baa20bdbe9daaa1366348175a9";
      }

      if (mapType == 1.1) {
        day.className = "app-53f544c1e6fce0feac70340d481ad2ed";
      }

      if (mapType == 1.2) {
        day.className = "app-8a900759792c14b84891392b9f0e360d";
      }

      if (mapType == 1.3) {
        day.className = "app-bda9643ac6601722a28f238714274da4";
      }

      if (mapType == 2) {
        day.className = "app-ee3e4aec9bcaaaf72cd0c59e8a0f477d";
      }

      if (mapType == 3) {
        day.className = "app-9f27410725ab8cc8854a2769c7a516b8";
      }

      if (mapType == 4) {
        day.className = "app-48d6215903dff56238e52e8891380c8f";
      }

      return day;
    },
    onEquipmentClick: function (e, a) {
      this.equipmentId = Number(e.equipmentList[a]) || 0;
      this.showInfo.actionSheet = true;
    },
    onCopy: function (row) {
      let date = new Date(row.calendar.day);

      this.copyData =
        "[quote]\n[size=110%][b][url=" +
        row.url +
        "][color=blue]" +
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日[/color][/url][/b][/size]\n======\nNGA英雄调整模板\n[/quote]";

      this.$appCopyData(this.copyData);
    },
    onOpenHeroUpdateDetailClick: function (heroId, row) {
      this.$axios
        .post(
          this.$appApi.app.getHeroUpdate +
            "&aid=1" +
            "&id=" +
            encodeURIComponent(heroId) +
            "&articleId=" +
            row.articleId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.updateDataRow = row;

            this.updateInfo.text = data.heroList[0].updateText;
            this.updateInfo.title = row.calendar.day + " 的更新内容";

            this.showInfo.dialog = true;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
img.update-5d39f3848925994b52ec52fba934577c {
  margin-bottom: 5px;
  margin-right: 5px;
}

span.update-6b0325a49e13e1c8adc31a953f4bca63 {
  line-height: 50px;
}

span.update-26edf9c6ae9f8356043d0e175516cab6 {
  margin-right: 2px;
}

span.update-50d683cbc99c635a03f18ca2fcfbe70b {
  margin-top: 3px;
  position: absolute;
}

span.update-f0af832cbd923851be8557213d95dddc {
  color: rgb(63, 169, 255) !important;
}

div.update-3490d5ece19a8f958d2be068e27f636a {
  margin-bottom: 25px;
}

div.update-7d4e6768382f99a87a56cad0ac71b15b {
  text-align: @app-text-align;
}

div.update-5a5152e95445ede11c05f5fa898d8fd9 {
  margin-bottom: 5px;
  margin-top: 10px;
}

div.update-0b479089ade5d13a2c41830785ebac9d {
  text-align: center;
  margin: 10px 0;
}

div.update-288ac40c37c02b743c0c2cc51c650dd3 {
  font-size: 12px;
  padding: 20px;
  text-align: @app-text-align;
}
</style>