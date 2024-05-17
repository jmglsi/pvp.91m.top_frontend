<template>
  <div class="hero-bp app-bpIndex">
    <van-row>
      <van-col span="12">
        <div class="hero-427034659a1ba05f529b72e639b4481f">
          <span>蓝方</span>
          <br />
          <span>总占比:{{ heroBpInfo.blue.allPickRate }}</span>
          <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
          <br />
          <span>总胜率:{{ heroBpInfo.blue.allWinRate }}</span>
          <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
        </div>
        <ul class="hero-666568243a3618d60572c92f2cf0ff3d">
          <li>
            <div
              :style="{ opacity: (newBpInfo.blue[0].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-00b97ff5a43507241bb2776b701516bb"
            >
              1
            </div>
            <div
              :style="{ marginTop: '-55px' }"
              class="hero-0492ba0dd77bbcafdac5b4aeded96ed1"
            >
              <span>
                占比:
                {{ newBpInfo.blue[0].pickRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
              <br />
              <span>
                胜率:
                {{ newBpInfo.blue[0].winRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.blue[1].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-00b97ff5a43507241bb2776b701516bb"
            >
              4
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.blue[1].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-00b97ff5a43507241bb2776b701516bb"
            >
              5
            </div>
            <div
              :style="{ marginTop: '-85px' }"
              class="hero-0492ba0dd77bbcafdac5b4aeded96ed1"
            >
              <span>
                占比:
                {{ newBpInfo.blue[1].pickRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
              <br />
              <span>
                胜率:
                {{ newBpInfo.blue[1].winRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.blue[2].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-00b97ff5a43507241bb2776b701516bb"
            >
              8
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.blue[2].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-00b97ff5a43507241bb2776b701516bb"
            >
              9
            </div>
            <div
              :style="{ marginTop: '-85px' }"
              class="hero-0492ba0dd77bbcafdac5b4aeded96ed1"
            >
              <span>
                占比:
                {{ newBpInfo.blue[2].pickRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
              <br />
              <span>
                胜率:
                {{ newBpInfo.blue[2].winRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
            </div>
          </li>
        </ul>
      </van-col>
      <van-col span="12">
        <div class="hero-427034659a1ba05f529b72e639b4481f">
          <span>红方</span>
          <br />
          <span>总占比:{{ heroBpInfo.red.allPickRate }}</span>
          <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
          <br />
          <span>总胜率:{{ heroBpInfo.red.allWinRate }}</span>
          <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
        </div>

        <ul class="hero-d5f3c2f290902549bb3b62cbfbf7a1bb">
          <li>
            <div
              :style="{ opacity: (newBpInfo.red[0].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-85a6487e98ea46cd1391fd415d370de0"
            >
              2
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.red[0].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-85a6487e98ea46cd1391fd415d370de0"
            >
              3
            </div>
            <div
              :style="{ marginTop: '-85px' }"
              class="hero-6c02537f8c5493e03caec9b1ea2cb5e7"
            >
              <span>
                占比:
                {{ newBpInfo.red[0].pickRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
              <br />
              <span>
                胜率:
                {{ newBpInfo.red[0].winRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.red[1].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-85a6487e98ea46cd1391fd415d370de0"
            >
              6
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.red[1].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-85a6487e98ea46cd1391fd415d370de0"
            >
              7
            </div>
            <div
              :style="{ marginTop: '-85px' }"
              class="hero-6c02537f8c5493e03caec9b1ea2cb5e7"
            >
              <span>
                占比:
                {{ newBpInfo.red[1].pickRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
              <br />
              <span>
                胜率:
                {{ newBpInfo.red[1].winRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
            </div>
          </li>
          <li>
            <div
              :style="{ opacity: (newBpInfo.red[2].pickRate / 100) * 2 }"
              class="hero-84d1241e18d9a700e019ca9654463a63 hero-85a6487e98ea46cd1391fd415d370de0"
            >
              10
            </div>
            <div
              :style="{ marginTop: '-55px' }"
              class="hero-6c02537f8c5493e03caec9b1ea2cb5e7"
            >
              <span>
                占比:
                {{ newBpInfo.red[2].pickRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
              <br />
              <span>
                胜率:
                {{ newBpInfo.red[2].winRate }}
                <span class="hero-4f9cc6d1b08849bf0c18bc06df163a6a">%</span>
              </span>
            </div>
          </li>
        </ul>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "HeroBPIndex",
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
        if (!newValue.heroId) return;

        this.getRanking(4, 0, 0, 0, newValue.heroId);
      },
    },
  },
  data() {
    return {
      heroBpInfo: {
        blue: {
          allPickTimes: 0,
          allPickRate: 0,
          allWinTimes: 0,
          allWinRate: 0,
          pickIndex: [
            {
              pickTimes: 0,
              pickRate: 0,
              winTimes: 0,
              winRate: 0,
            },
            {
              pickTimes: 0,
              pickRate: 0,
              winTimes: 0,
              winRate: 0,
            },
            {
              pickTimes: 0,
              pickRate: 0,
              winTimes: 0,
              winRate: 0,
            },
          ],
        },
        red: {
          allPickTimes: 0,
          allPickRate: 0,
          allWinTimes: 0,
          allWinRate: 0,
          pickIndex: [
            {
              pickTimes: 0,
              pickRate: 0,
              winTimes: 0,
              winRate: 0,
            },
            {
              pickTimes: 0,
              pickRate: 0,
              winTimes: 0,
              winRate: 0,
            },
            {
              pickTimes: 0,
              pickRate: 0,
              winTimes: 0,
              winRate: 0,
            },
          ],
        },
      },
      newBpInfo: {
        blue: [
          {
            pickRate: 0,
            winRate: 0,
          },
          {
            pickRate: 0,
            winRate: 0,
          },
          {
            pickRate: 0,
            winRate: 0,
          },
        ],
        red: [
          {
            pickRate: 0,
            winRate: 0,
          },
          {
            pickRate: 0,
            winRate: 0,
          },
          {
            pickRate: 0,
            winRate: 0,
          },
        ],
      },
    };
  },
  methods: {
    getRanking: function (aid, bid, cid, did, heroId) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage("heroBpIndex-" + heroId);

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.tableData = ls;

        return;
      }

      this.$axios
        .post(
          this.$appApi.app.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did +
            "&heroId=" +
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            let nowdata = data.result;

            this.heroBpInfo = nowdata;
            this.heroBpInfo.updateTime = ts;

            if (nowdata.blue.allPickTimes == 0) return;

            this.newBpInfo.blue[0].pickRate =
              Math.floor(
                (nowdata.blue.pickIndex[0].pickTimes /
                  nowdata.blue.allPickTimes) *
                  10000
              ) / 100;
            this.newBpInfo.blue[0].winRate =
              Math.floor(
                (nowdata.blue.pickIndex[0].winTimes /
                  nowdata.blue.pickIndex[0].pickTimes) *
                  10000
              ) / 100;
            //蓝 1

            this.newBpInfo.blue[1].pickRate =
              Math.floor(
                ((nowdata.blue.pickIndex[1].pickTimes +
                  nowdata.blue.pickIndex[2].pickTimes) /
                  nowdata.blue.allPickTimes) *
                  10000
              ) / 100;
            this.newBpInfo.blue[1].winRate =
              Math.floor(
                ((nowdata.blue.pickIndex[1].winTimes +
                  nowdata.blue.pickIndex[2].winTimes) /
                  (nowdata.blue.pickIndex[1].pickTimes +
                    nowdata.blue.pickIndex[2].pickTimes)) *
                  10000
              ) / 100;
            //蓝 2-3

            this.newBpInfo.blue[2].pickRate =
              Math.floor(
                ((nowdata.blue.pickIndex[3].pickTimes +
                  nowdata.blue.pickIndex[4].pickTimes) /
                  nowdata.blue.allPickTimes) *
                  10000
              ) / 100;
            this.newBpInfo.blue[2].winRate =
              Math.floor(
                ((nowdata.blue.pickIndex[3].winTimes +
                  nowdata.blue.pickIndex[4].winTimes) /
                  (nowdata.blue.pickIndex[3].pickTimes +
                    nowdata.blue.pickIndex[4].pickTimes)) *
                  10000
              ) / 100;
            //蓝 4-5

            this.newBpInfo.red[0].pickRate =
              Math.floor(
                ((nowdata.red.pickIndex[0].pickTimes +
                  nowdata.red.pickIndex[1].pickTimes) /
                  nowdata.red.allPickTimes) *
                  10000
              ) / 100;
            this.newBpInfo.red[0].winRate =
              Math.floor(
                ((nowdata.red.pickIndex[0].winTimes +
                  nowdata.red.pickIndex[1].winTimes) /
                  (nowdata.red.pickIndex[0].pickTimes +
                    nowdata.red.pickIndex[1].pickTimes)) *
                  10000
              ) / 100;
            //红 1-2

            this.newBpInfo.red[1].pickRate =
              Math.floor(
                ((nowdata.red.pickIndex[2].pickTimes +
                  nowdata.red.pickIndex[3].pickTimes) /
                  nowdata.red.allPickTimes) *
                  10000
              ) / 100;
            this.newBpInfo.red[1].winRate =
              Math.floor(
                ((nowdata.red.pickIndex[2].winTimes +
                  nowdata.red.pickIndex[3].winTimes) /
                  (nowdata.red.pickIndex[2].pickTimes +
                    nowdata.red.pickIndex[3].pickTimes)) *
                  10000
              ) / 100;
            //红 3-4

            this.newBpInfo.red[2].pickRate =
              Math.floor(
                (nowdata.red.pickIndex[4].pickTimes /
                  nowdata.red.allPickTimes) *
                  10000
              ) / 100;
            this.newBpInfo.red[2].winRate =
              Math.floor(
                (nowdata.red.pickIndex[4].winTimes /
                  nowdata.red.pickIndex[4].pickTimes) *
                  10000
              ) / 100;
            //红 5

            this.$appSetLocalStorage("heroBpIndex-" + heroId, this.newBpInfo);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
ul.hero-666568243a3618d60572c92f2cf0ff3d {
  float: left;
}

ul.hero-d5f3c2f290902549bb3b62cbfbf7a1bb {
  float: right;
}

ul.hero-666568243a3618d60572c92f2cf0ff3d,
ul.hero-d5f3c2f290902549bb3b62cbfbf7a1bb {
  margin-top: 10px;
}

span.hero-4f9cc6d1b08849bf0c18bc06df163a6a {
  font-size: @app-font-size;
}

div.hero-84d1241e18d9a700e019ca9654463a63 {
  color: white;
}

div.hero-427034659a1ba05f529b72e639b4481f {
  margin-top: 15px;
  margin-bottom: 15px;
}

div.hero-00b97ff5a43507241bb2776b701516bb {
  background-color: blue;
  border-radius: 10px;
  height: @app-height;
  margin: 10px;
  text-align: center;
  width: @app-width;
}

div.hero-85a6487e98ea46cd1391fd415d370de0 {
  background-color: red;
  border-radius: 10px;
  height: @app-height;
  margin: 10px;
  text-align: center;
  width: @app-width;
}

div.hero-0492ba0dd77bbcafdac5b4aeded96ed1 {
  left: 75px;
  position: absolute;
  text-align: @app-text-align;
}

div.hero-6c02537f8c5493e03caec9b1ea2cb5e7 {
  position: absolute;
  right: 75px;
  text-align: @app-text-align;
}
</style>