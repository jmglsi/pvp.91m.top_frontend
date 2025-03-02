<template>
  <div class="tools-fg">
    <div class="tools-17e4897adf2b88206ea3ba83a3ebcf96">
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
          <div class="tools-0bcbe3c292d6c2e5ae5777277a33e343">
            <van-cell
              v-for="(data, index) in option3.slice(1)"
              :key="'tools-dc6df8a02456ddea0836be02e7073977-' + index"
              :title="data.text"
            >
              <template #right-icon>
                <van-switch
                  v-model="data.switch"
                  size="15px"
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

    <div class="tools-d172dd0c6361cd74f6194e50bf1ce999">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-collapse v-model="activeNames" :border="false" accordion>
          <div v-if="tempFishingGround.result.rows.length > 0">
            <van-collapse-item
              v-for="(data, index) in tempFishingGround.result.rows"
              :key="'tools-dc6df8a02456ddea0836be02e7073977-' + index"
              :name="index"
            >
              <template #title>
                <span
                  v-if="data.price == 0"
                  class="tools-28a3baff1739a145c522207499d5041c"
                >
                  <van-tag type="danger" size="large" plain round>
                    封塘中
                  </van-tag>
                </span>
                <span class="tools-a750174d3569e32aa6c9f3e78de4ae6e">
                  {{ data.addr }}
                </span>
              </template>

              <div class="tools-6f552ec92fd36b2069f0a4b62deee3d8">
                <div class="tools-6143a13693f3963c1b45083162cad920">
                  塘主：{{ data.admin }}，<a href="">信息有误?</a>
                </div>
                <br />
                <div class="tools-6143a13693f3963c1b45083162cad920">
                  鱼种：
                  <span
                    v-for="(data, index) in data.type"
                    :key="'tools-bcedd7a0b808f13e1783c88f4fef0e59-' + index"
                    class="tools-e9c1aedfcdf98f5a373dbbc98d122e9b"
                  >
                    <van-tag type="primary" size="large" plain round>
                      {{ data }}
                    </van-tag>
                  </span>
                </div>
                <br />
                <van-row>
                  <van-col span="12">
                    <div class="tools-6143a13693f3963c1b45083162cad920">
                      时间：
                      <span class="tools-4df2433cb8d6c1454d80f93341bc2fdb">
                        {{ data.time_start }}
                      </span>
                      -
                      <span class="tools-4df2433cb8d6c1454d80f93341bc2fdb">
                        {{ data.time_end }}
                      </span>
                    </div>
                  </van-col>
                  <van-col span="12">
                    <div class="tools-6143a13693f3963c1b45083162cad920">
                      价格：
                      <span class="tools-4df2433cb8d6c1454d80f93341bc2fdb">
                        ?{{ data.price.toString().substring(1) }}
                      </span>
                      /
                      <span class="tools-4df2433cb8d6c1454d80f93341bc2fdb">
                        {{ data.hour }}
                      </span>
                      小时
                    </div>
                  </van-col>
                </van-row>
                <br />
                <div class="tools-6143a13693f3963c1b45083162cad920">
                  放鱼信息：
                  <div class="tools-931f1907c09e957c15a0c1f1a45c7be0">
                    {{ data.description || "暂无信息" }}
                  </div>
                </div>
                <van-divider />
                <div class="tools-fbd4e0bf1db64831c48aab682c6afd70">
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

          <div v-else class="tools-9e7ab34aa9bb04e005d4a23f721e2707">
            暂无信息
          </div>

          <div id="container"></div>
        </van-collapse>
      </van-pull-refresh>

      <van-divider
        :style="{
          padding: '0 16px',
        }"
      />

      <div class="tools-64613eb77930796762064b575d2f4e06">
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
//import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  name: "toolsFishingGround",
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
              addr: "test-aaa-bbb",
              poi: "120.500034,30.701213",
              type: ["鳜鱼", "鲈鱼", "鲶鱼", "翘嘴"],
              description: "12.1放鳜鱼650斤 鲈鱼1000斤实数",
              price: 208,
              hour: 5,
              time_start: "07:00",
              time_end: "22:30",
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
    //this.initPage();
    setTimeout(() => {
      this.test();
    }, 500);
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
    test: function () {
      this.$wechat.ready(() => {
        this.$wechat.openLocation({
          latitude: 120.76,
          longitude: 30.75,
        });
      });
    },
    getDistance: function (lng1, lat1, lng2, lat2) {
      let radLat1 = (lat1 * Math.PI) / 180.0;
      let radLat2 = (lat2 * Math.PI) / 180.0;
      let a = radLat1 - radLat2;
      let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      let s =
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
    onButtonConfirm: function () {
      this.onFilter();

      this.$refs.refFishingGround.toggle();
    },
    onRefresh: function () {
      this.tempFishingGround = this.tableData;
      this.isLoading = false;

      this.$message.success(this.$appMsg.success[1000]);
    },
  },
};
</script>

<style scoped lang="less">
span.tools-4df2433cb8d6c1454d80f93341bc2fdb {
  color: orange;
  font-size: 20px;
}

span.tools-e9c1aedfcdf98f5a373dbbc98d122e9b {
  margin-right: 5px;
}

div.tools-fbd4e0bf1db64831c48aab682c6afd70 {
  text-align: center;
}

div.tools-0bcbe3c292d6c2e5ae5777277a33e343 {
  text-align: left;
}

div.tools-931f1907c09e957c15a0c1f1a45c7be0 {
  font-size: 17px;
  color: red;
  margin-top: 10px;
}

div.tools-d172dd0c6361cd74f6194e50bf1ce999 {
  margin-top: 25px;
  text-align: left;
}

div.tools-9e7ab34aa9bb04e005d4a23f721e2707 {
  text-align: center;
  height: 500px;
}

div.tools-64613eb77930796762064b575d2f4e06 {
  text-align: center;
  color: gray;
  padding: 0 16px;
}
</style>