<template>
  <div class="hero-update">
    <div
      class="
        app-0464ec62d5cba8a9ec29d0c4c89fc7c6
        app-b4a64ecd008af42ba95bc20350599699
        update-e1fade65183eeca567683609ebb7005f
      "
    >
      <div class="update-3490d5ece19a8f958d2be068e27f636a">
        <van-row>
          <van-col
            :span="$appIsMobile ? 15 : 21"
            @click="showInfo.calendar = true"
          >
            <span class="update-6b0325a49e13e1c8adc31a953f4bca63">
              {{ tableData.result.tips }}
            </span>
          </van-col>
          <van-col :span="$appIsMobile ? 9 : 3">
            <div
              class="
                app-f3b57b63e4f5f4e157fd45bdb8611005
                app-8f06e89ca90bebf60c91699c473f4022
              "
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
              v-if="data.calendar.day"
              :color="data.calendar.color"
              @click="
                heroId > 0 ? onOpenHeroUpdateTextClick(heroId, data) : null
              "
              round
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
                :key="'update-12c9bc92e856bdab7bc932b5d368f97e-' + index"
                color="black"
                class="update-26edf9c6ae9f8356043d0e175516cab6"
              >
                {{ data }}
              </van-tag>
              <span
                @click="
                  data.url
                    ? $appOpenUrl(
                        '是否打开外部链接?',
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
                v-for="(item, index) in data.hero"
                :key="'update-54099f84a9943b4b1eed932ec22066eb-' + index"
                @click="
                  item != heroId
                    ? $appPush({ path: '/hero/' + item + '/info' })
                    : null
                "
                class="update-704985931ce54a5350c733c036dfd8b2"
              >
                <img
                  v-lazy="
                    item > 900
                      ? '/img/app-icons/hero_white.png'
                      : '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                        item +
                        '/' +
                        item +
                        '.jpg'
                  "
                  width="40"
                  height="40"
                  class="update-5d39f3848925994b52ec52fba934577c"
                />
              </span>
            </div>

            <div
              v-if="data.equipment.length > 0"
              class="update-33717161c2d8c0d081510c322ab5876a"
            >
              <van-divider />
              <span
                v-for="(item, index) in data.equipment"
                :key="'update-df0ed5943fd740242219ad3e45245f6e-' + index"
                @click="onEquipmentClick(data, index)"
                class="update-cf1228c4eb54ec10bf815f0ed3816a49"
              >
                <img
                  v-lazy="
                    '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                    item +
                    '.png'
                  "
                  width="40"
                  height="40"
                  class="update-5d39f3848925994b52ec52fba934577c"
                />
              </span>
            </div>
          </a-timeline-item>
        </a-timeline>

        <div
          v-if="heroId > 0 && updateId > 0"
          @click="
            $appOpenUrl(
              '是否查看英雄更多更新记录?',
              'NGA @EndMP',
              {
                path: '//ngabbs.com/read.php?pid=' + updateId,
              },
              0
            )
          "
          class="update-0b479089ade5d13a2c41830785ebac9d"
        >
          <van-tag
            round
            color="orange"
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
        :title="tableData.result.title"
        :show-confirm="false"
        :formatter="onFormatter"
        :min-date="date.min"
        :max-date="date.max"
      />
    </div>

    <div class="hero-ec93fee7573d5d8daa4444009358e91b">
      <van-action-sheet
        v-model="showInfo.skillMenu"
        title="其他数据 (近期)"
      >
        <template #default>
          <HeroEquipmentListOne :equipmentId="equipmentId" :equipmentType="2" />
        </template>
      </van-action-sheet>
    </div>

    <div class="update-25ad144033367c9bb904b06d66436d71">
      <van-dialog
        v-model="showInfo.dialog"
        @close="
          showInfo.checked ? onHeroUpdateTextCopy(heroId, tableDataRow) : null
        "
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
  name: "HeroUpdate",
  props: {
    aid: {
      type: Number,
      default: 0,
    },
    heroId: {
      type: Number,
      default: 0,
    },
    updateId: {
      type: Number,
      default: 0,
    },
  },
  components: {
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
  },
  computed: {
    listenChange() {
      const { aid, heroId, updateId } = this;
      return { aid, heroId, updateId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        //if (!newValue.heroId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.getHeroUpdate(newValue.heroId, newValue.aid);
        }
      },
    },
  },
  data() {
    return {
      copyData: "",
      equipmentId: 0,
      date: {
        min: new Date(),
        max: new Date(),
      },
      tableData: {
        result: {
          rows: [],
          tips: "",
          title: "",
        },
      },
      tableDataRow: {},
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
        calendar: false,
        dialog: false,
        checked: false,
        skillMenu: false,
      },
    };
  },
  methods: {
    onFormatter: function (day) {
      let tableData = this.tableData.result.rows,
        mapType = -5;

      let oDay =
        day.date.getFullYear() +
        "/" +
        (day.date.getMonth() + 1) +
        "/" +
        day.date.getDate();

      tableData.map((x) => {
        let result = x.calendar;

        if (result.type == -1) {
          //
        } else {
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
    getHeroUpdate: function (heroId, aid = 0) {
      let appConfigInfo = this.$appConfigInfo,
        date = new Date(),
        ts = this.$appTs,
        ls = this.$appGetLocalStorage("heroUpdate-" + heroId);

      this.date.min = new Date(date.setMonth(date.getMonth() - 4));
      this.date.max = new Date(date.setMonth(date.getMonth() + 4));

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.tableData = ls);
      }

      this.$axios
        .post(
          this.$appApi.pvp.getHeroUpdate + "&heroId=" + heroId + "&aid=" + aid
        )
        .then((res) => {
          this.tableData = res.data.data;
          this.tableData.updateTime = ts;

          this.$appSetLocalStorage("heroUpdate-" + heroId, this.tableData);
        });
    },
    onEquipmentClick: function (e, a) {
      this.equipmentId = parseInt(e.equipment[a]) || 0;
      this.showInfo.skillMenu = true;
    },
    onHeroUpdateTextCopy: function (heroId, row) {
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
          this.tableDataRow = data;

          this.updateInfo.title = data.calendar.day + " 的更新内容";
          this.updateInfo.text = res.data.data;

          this.showInfo.dialog = true;
        });
    },
  },
};
</script>

<style scoped lang="less">
img.update-5d39f3848925994b52ec52fba934577c {
  border-radius: @app-border-radius;
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
  margin-top: 10px;
  margin-bottom: 5px;
}

div.update-0b479089ade5d13a2c41830785ebac9d {
  text-align: center;
  margin: 10px 0;
}

div.update-288ac40c37c02b743c0c2cc51c650dd3 {
  font-size: @app-font-size + 2px;
  padding: 20px;
  text-align: @app-text-align;
}

div.update-c88c478fd2695c8b07740ccd247a28ae {
  div.van-dropdown-menu__bar {
    border-radius: 100px;
  }
}
</style>