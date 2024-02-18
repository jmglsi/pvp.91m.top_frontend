<template>
  <div class="fishing-011e7131c31f41d8c497f9e1f6b86eac">
    <div class="fishing-17e4897adf2b88206ea3ba83a3ebcf96">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          @change="onFilter"
        />
        <van-dropdown-item
          v-model="value2"
          :options="option2"
          @change="onFilter"
        />
        <van-dropdown-item title="鱼种 (全部)" ref="refFishingGround">
          <div class="fishing-0bcbe3c292d6c2e5ae5777277a33e343">
            <van-cell
              v-for="(data, index) in option3.slice(1)"
              :key="'fishing-dc6df8a02456ddea0836be02e7073977-' + index"
              :title="data.text"
            >
              <template #right-icon>
                <van-switch
                  v-model="data.switch"
                  size="24"
                  active-color="#ee0a24"
                />
              </template>
            </van-cell>
          </div>

          <div style="padding: 25px 16px">
            <van-button type="danger" block round @click="onButtonConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <div class="fishing-d172dd0c6361cd74f6194e50bf1ce999">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-collapse v-model="activeNames" :border="false" accordion>
          <div v-if="tempFishingGround.result.rows.length > 0">
            <van-collapse-item
              v-for="(data, index) in tempFishingGround.result.rows"
              :key="'fishing-dc6df8a02456ddea0836be02e7073977-' + index"
              :name="index"
            >
              <template #title>
                <span
                  v-if="data.price == 0"
                  class="fishing-28a3baff1739a145c522207499d5041c"
                >
                  <van-tag type="danger" size="large" plain round>
                    封塘中
                  </van-tag>
                </span>
                <span class="fishing-a750174d3569e32aa6c9f3e78de4ae6e">
                  {{ data.addr }}
                </span>
              </template>

              <div class="fishing-6f552ec92fd36b2069f0a4b62deee3d8">
                <div class="fishing-6143a13693f3963c1b45083162cad920">
                  塘主：{{ data.admin }}，<a href="">信息有误？</a>
                </div>
                <br />
                <div class="fishing-6143a13693f3963c1b45083162cad920">
                  鱼种：
                  <span
                    v-for="(data, index) in data.type"
                    :key="'fishing-bcedd7a0b808f13e1783c88f4fef0e59-' + index"
                    class="fishing-e9c1aedfcdf98f5a373dbbc98d122e9b"
                  >
                    <van-tag type="primary" size="large" plain round>
                      {{ data }}
                    </van-tag>
                  </span>
                </div>
                <br />
                <van-row>
                  <van-col span="12">
                    <div class="fishing-6143a13693f3963c1b45083162cad920">
                      时间：
                      <span class="fishing-4df2433cb8d6c1454d80f93341bc2fdb">
                        {{ data.time_start }}
                      </span>
                      -
                      <span class="fishing-4df2433cb8d6c1454d80f93341bc2fdb">
                        {{ data.time_end }}
                      </span>
                    </div>
                  </van-col>
                  <van-col span="12">
                    <div class="fishing-6143a13693f3963c1b45083162cad920">
                      价格：
                      <span class="fishing-4df2433cb8d6c1454d80f93341bc2fdb">
                        ?{{ data.price.toString().substring(1) }}
                      </span>
                      /
                      <span class="fishing-4df2433cb8d6c1454d80f93341bc2fdb">
                        {{ data.hour }}
                      </span>
                      小时
                    </div>
                  </van-col>
                </van-row>
                <br />
                <div class="fishing-6143a13693f3963c1b45083162cad920">
                  放鱼信息：
                  <div class="fishing-931f1907c09e957c15a0c1f1a45c7be0">
                    {{ data.description || "暂无信息" }}
                  </div>
                </div>
                <van-divider />
                <div class="fishing-fbd4e0bf1db64831c48aab682c6afd70">
                  <van-button icon="guide-o" size="small" round>
                    导航 ≈ {{ data.distance }} KM
                  </van-button>
                  &nbsp;&nbsp;&nbsp;
                  <van-button icon="phone-o" type="info" size="small" round>
                    联系电话
                  </van-button>
                  &nbsp;
                  <van-button icon="chat-o" type="primary" size="small" round>
                    联系微信
                  </van-button>
                </div>
              </div>
            </van-collapse-item>
          </div>

          <div v-else class="fishing-9e7ab34aa9bb04e005d4a23f721e2707">
            暂无信息
          </div>
        </van-collapse>
      </van-pull-refresh>

      <van-divider
        :style="{
          padding: '0 16px',
        }"
      />

      <div class="fishing-64613eb77930796762064b575d2f4e06">
        <span style="color: red">建议去之前先联系下塘主</span>
        <br />
        <br />
        <span>信息由 <a href="">@沈先生</a> 整理，合作联系：xxxxxxxx</span>
      </div>

      <AppHello height="50px" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FishingGround",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      isLoading: false,
      activeNames: 0,
      tempFish: [],
      tempFishingGround: {
        result: {
          rows: [],
        },
      },
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: "地区 (全部)", value: 0 },
        { text: "桐乡市", value: 1 },
        { text: "海宁市", value: 2 },
        { text: "嘉兴市", value: 3 },
        { text: "苏州市", value: 4 },
        { text: "湖州市", value: 5 },
      ],
      option2: [
        { text: "时长 (全部)", value: 0 },
        { text: "1 小时", value: 1 },
        { text: "2 小时", value: 2 },
        { text: "3 小时", value: 3 },
        { text: "4 小时", value: 4 },
        { text: "5 小时", value: 5 },
      ],
      option3: [
        { text: "鱼种 (全部)", value: 0 },
        { text: "鳜鱼", value: 1 },
        { text: "鲈鱼", value: 2 },
        { text: "海鲈", value: 3 },
        { text: "鲶鱼", value: 4 },
        { text: "鳟鱼", value: 5 },
        { text: "虹鳟", value: 6 },
        { text: "金鳟", value: 7 },
        { text: "鲳鱼", value: 8 },
        { text: "翘嘴", value: 9 },
        { text: "沙光鱼", value: 10 },
        { text: "太阳鱼", value: 11 },
        { text: "五道黑", value: 12 },
        { text: "鸭嘴鱼", value: 13 },
      ],
      tableData: {
        result: {
          rows: [
            {
              admin: "x先生",
              addr: "桐乡市-炉头镇-浙北渔乐垂钓基地",
              poi: "120.500034,30.701213",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "12.1放鳜鱼650斤 鲈鱼1000斤实数",
              price: 208,
              hour: 5,
              time_start: "07:00",
              time_end: "22:30",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "桐乡市-石门镇-花园路亚基地",
              poi: "120.451111,30.669231",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.15放鳜鱼一仓 11.21放鳜鱼一仓",
              price: 220,
              hour: 4,
              time_start: "06:00",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "桐乡市-大麻镇-天和路亚基地",
              poi: "120.340404,30.526895",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.28鳜鱼300 12.1放鳜鱼200鲈鱼400",
              price: 188,
              hour: 4,
              time_start: "07:00",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "桐乡市-炉头镇-红杉邨路亚基地",
              poi: "120.51982,30.66727",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.10鲈鱼5000斤11.17鲈鱼1000金鳟虹鳟200",
              price: 0,
              hour: 0,
              time_start: "00:00",
              time_end: "00:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "桐乡市-濮院镇-斗鱼路亚基地",
              poi: "120.595476,30.713317",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "12.1放 平打三金翘嘴四仓 放鱼后188",
              price: 188,
              hour: 4,
              time_start: "07:00",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-许村镇-渔聚缘路亚 (大表姐)",
              poi: "120.404758,30.461273",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.4一仓鲈鱼",
              price: 0,
              hour: 0,
              time_start: "00:00",
              time_end: "00:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-海宁路亚基地 (阿杰)",
              poi: "120.801052,30.459504",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.30 放鲈鱼7000斤  12.2  7.30正钓",
              price: 588,
              hour: 4,
              time_start: "07:00",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-马桥-不倒翁路亚",
              poi: "120.737929,30.458389",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.24鲈鱼六大仓 11.30鲈鱼2仓鲶鱼2仓",
              price: 99,
              hour: 4,
              time_start: "07:30",
              time_end: "21:30",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-老陈钓场",
              poi: "120.455088,30.412209",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: null,
              price: 0,
              hour: 0,
              time_start: "00:00",
              time_end: "00:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-老莫路亚基地",
              poi: "120.516949,30.476501",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "12.1鲈鱼1000斤 虹鳟300斤",
              price: 258,
              hour: 4,
              time_start: "07:00",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-方记路亚垂钓",
              poi: "120.638798,30.460547",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.24翘嘴一仓鲈鱼一仓",
              price: 60,
              hour: 4,
              time_start: "06:30",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-周王庙-顾家鱼庄路亚基地",
              poi: "120.528762,30.436447",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.27鲈鱼一仓 太阳鱼一仓 12.1放鲈鱼一仓",
              price: 158,
              hour: 4,
              time_start: "07:00",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "海宁市-长安镇-七里亭路亚",
              poi: "120.446375,30.500372",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: null,
              price: 0,
              hour: 0,
              time_start: "00:00",
              time_end: "00:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "嘉兴市-秀洲区-嘉兴追渔路亚基地",
              poi: "120.733394,30.604654",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "小塘 12.1鳜鱼171斤 老口鲈鱼595斤",
              price: 140,
              hour: 4,
              time_start: "07:30",
              time_end: "22:00",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "嘉兴市-秀洲区-标点路亚基地",
              poi: "120.682951,30.663031",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.25鲈鱼1151斤 11.30鲈鱼742翘嘴546斤",
              price: 128,
              hour: 4,
              time_start: "07:30",
              time_end: "22:30",
              distance: 0,
            },
            {
              admin: "x先生",
              addr: "嘉兴市-秀洲区-隐于野路亚俱乐部",
              poi: "120.793766,30.815058",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "11.17翘嘴2000斤 11.24海鲈682斤",
              price: 80,
              hour: 4,
              time_start: "07:00",
              time_end: "21:00",
              distance: 0,
            },
          ],
        },
      },
      posInfo: {
        position: {
          lat: 0,
          lng: 0,
        },
      },
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      this.tempFishingGround = this.tableData;

      this.$axios.post(this.$appApi.app.getCoordinate).then((res) => {
        let data = res.data.data;

        this.tableData.result.rows.map((x, i) => {
          if (x.poi) {
            let y = x.poi.split(",");

            this.tableData.result.rows[i].distance = this.getDistance(
              data ? data.result.location.lng : 0,
              data ? data.result.location.lat : 0,
              y[0],
              y[1]
            ).toFixed(2);
          }
        });

        this.tableData.result.rows.sort(function (x, y) {
          if (x.poi) {
            return x.distance - y.distance;
          }
        });

        this.tempFishingGround = this.tableData;

        this.$message.success(this.$appMsg.success[1000]);
      });
    },
    getDistance: function (lng1, lat1, lng2, lat2) {
      var radLat1 = (lat1 * Math.PI) / 180.0;
      var radLat2 = (lat2 * Math.PI) / 180.0;
      var a = radLat1 - radLat2;
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      var s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137;
      // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;

      return s;
    },
    onFilter: function () {
      let b = { result: { rows: [] } },
        c = "",
        d = 0,
        e = [];

      c = this.option1[this.value1].text;
      d = this.option2[this.value2].value;

      this.option3.map((x) => {
        if (x.switch) {
          e.push(x.text);
        }
      });
      this.tempFish = e;

      this.tempFishingGround = this.tableData;

      if (this.value1 > 0) {
        this.tableData.result.rows.map((j) => {
          if (j.addr.indexOf(c) > -1) {
            b.result.rows.push(j);
          }
        });

        this.tempFishingGround = b;
      }

      if (this.value2 > 0) {
        this.tableData.result.rows.map((j) => {
          if (j.hour == d) {
            b.result.rows.push(j);
          }
        });

        this.tempFishingGround = b;
      }

      if (this.tempFish.length > 0) {
        this.tempFish.map((y) => {
          this.tableData.result.rows.map((j) => {
            if (j.type.indexOf(y) > -1) {
              b.result.rows.push(j);
            }
          });
        });

        this.tempFishingGround = b;
      }

      this.value1 = 0;
      this.value2 = 0;
      this.value3 = 0;
    },
    onButtonConfirm() {
      this.onFilter();

      this.$refs.refFishingGround.toggle();
    },
    onRefresh() {
      this.tempFishingGround = this.tableData;
      this.isLoading = false;

      this.$message.success(this.$appMsg.success[1000]);
    },
  },
};
</script>

<style scoped lang="less">
span.fishing-4df2433cb8d6c1454d80f93341bc2fdb {
  color: orange;
  font-size: 20px;
}

span.fishing-e9c1aedfcdf98f5a373dbbc98d122e9b {
  margin-right: 5px;
}

div.fishing-fbd4e0bf1db64831c48aab682c6afd70 {
  text-align: center;
}

div.fishing-0bcbe3c292d6c2e5ae5777277a33e343 {
  text-align: left;
}

div.fishing-931f1907c09e957c15a0c1f1a45c7be0 {
  font-size: 17px;
  color: red;
  margin-top: 10px;
}

div.fishing-d172dd0c6361cd74f6194e50bf1ce999 {
  margin-top: 25px;
  text-align: left;
}

div.fishing-9e7ab34aa9bb04e005d4a23f721e2707 {
  text-align: center;
  height: 500px;
}

div.fishing-64613eb77930796762064b575d2f4e06 {
  text-align: center;
  color: gray;
  padding: 0 16px;
}
</style>