<template>
  <div class="tools-hero-view">
    <div class="tools-ed54df2282a902e04da118c6dd9d8843">
      <van-button
        round
        size="small"
        :icon="'/img/icons-hero/' + hero.info.id + '.jpg'"
        class="tools-7fd0a5f5913603ec56c9095e237cd4bc"
      >
        <img
          v-if="hero.info.change.trendType > 0"
          v-lazy="'/img/icons-app/hot_' + hero.info.change.trendType + '.png'"
          width="15"
          height="15"
          class="tools-26a263bb8e3b535b7a46349053f49e96"
        />
        <span class="tools-a100b6fadea02956261621e88186b9a2">
          {{ hero.info.name }}
        </span>

        <ChartsHeroProgress
          v-if="hero.info.id && hero.info.id < 900"
          :listWidth="60"
          :progressData="progressData.result.rows[hero.info.id]"
          class="tools-c63abbfb166e7e598518fe6a7a58c86b"
        />
      </van-button>
      <span class="tools-d3eb91ba1fa50a7d88bd6a93569c69b1">
        热度趋势 来源:苏苏的荣耀助手
      </span>
      <span
        class="tools-d3eb91ba1fa50a7d88bd6a93569c69b1 tools-c63abbfb166e7e598518fe6a7a58c86b"
      >
        最后更新 {{ viewInfo.nowTime }}
      </span>
    </div>

    <ChartsRankingLine
      :trend="hero.info.change.trendType"
      :charts="{
        columns: lineData.result.columns,
        rows: lineData.result.rows[hero.info.id],
      }"
      :exStyle="{
        width: '302px',
        height: '115px',
        grid: { left: -43, bottom: -15, width: 302, height: 105 },
      }"
      :animation="false"
      class="tools-ea7120740464ce78c305436d1f150b4d"
    />

    <div class="tools-bed58a7a97fd68cfc9d2cf0dc5d9f9d5">
      <ul>
        <li
          v-for="(data, index) in tableData.result.rows"
          :key="'tools-32bc3a9909dc2659759bef0eecc68def-' + index"
        >
          <van-button
            v-if="index < 2 && data.pickRate > 5"
            round
            size="mini"
            :icon="'/img/icons-skill/' + data.skillId + '.jpg'"
            class="tools-7fd0a5f5913603ec56c9095e237cd4bc"
          >
            {{
              $appConfigInfo.positionInfo[data.positionId + 1][0] +
              " | " +
              parseInt(data.pickRate) +
              "%"
            }}
          </van-button>
        </li>
        <li>
          <van-button
            round
            size="mini"
            :icon="hero.info.skill[1].img"
            class="tools-7fd0a5f5913603ec56c9095e237cd4bc"
          >
            {{ parseInt(hero.info.skill[1].pickRate) + "%" }}
          </van-button>
        </li>
      </ul>
    </div>

    <div class="tools-01d8b754716fc5f519c1a4b654867193">
      <div class="tools-58e4ea8e49b560235a7058518676b7e4">
        <vue-qr ref="refQrCode" :text="hero.qrcode.url" :size="200" />
      </div>
      <span class="tools-e144855db3887408c0e2202a42027279">
        {{ hero.qrcode.name }}
      </span>
    </div>
  </div>
</template>

<script>
import VueQr from "vue-qr";

import "echarts/lib/component/markLine";

import "zrender/lib/svg/svg";

export default {
  name: "ToolsView",
  components: {
    VueQr,
    ChartsHeroProgress: () => import("@/components/Charts/HeroProgress.vue"),
    ChartsRankingLine: () => import("@/components/Charts/RankingLine.vue"),
  },
  data() {
    return {
      hero: {
        title: this.$t("loading"),
        info: {
          id: null,
          name: this.$t("loading"),
          clockwise: false,
          equipmentMoney: 0,
          equipmentMoneyMin: 0,
          skin: [],
          skinIndex: 0,
          likeStatus: 0,
          change: {
            trendType: 0,
          },
          skill: [
            {
              id: null,
              img: "//image.ttwz.qq.com/images/skill/80102.png",
              pickRate: 0,
            },
            {
              id: null,
              img: "//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/1701.png",
              pickTimes: 0,
            },
          ],
        },
        qrcode: {
          name: "",
          url: "",
        },
      },
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      lineData: {
        result: {
          columns: ["日期", "热度"],
          rows: [],
        },
      },
      progressData: {
        result: {
          rows: [],
        },
      },
      viewInfo: {
        nowTime: "",
        timeout: 60,
      },
    };
  },
  created() {
    this.initPage();

    this.getRanking(15);
    this.getHeroChartsLog(7);
  },
  methods: {
    initPage: function () {
      let p = this.$route.params,
        date = new Date(),
        nowYear = date.getFullYear(),
        nowMonth = date.getMonth() + 1,
        nowDate = date.getDate(),
        nowH = date.getHours(),
        nowI = date.getMinutes(),
        nowS = date.getSeconds();

      if (nowMonth < 10) nowMonth = "0" + nowMonth;
      if (nowDate < 10) nowDate = "0" + nowDate;
      if (nowH < 10) nowH = "0" + nowH;
      if (nowI < 10) nowI = "0" + nowI;
      if (nowS < 10) nowS = "0" + nowS;

      this.viewInfo.nowTime =
        nowYear +
        "-" +
        nowMonth +
        "-" +
        nowDate +
        " " +
        nowH +
        ":" +
        nowI +
        ":" +
        nowS;

      this.getHeroInfo(p.id);
      this.getHeroInfoByRandSuit(p.id);
      this.getRankingByGenreList(p.id, 14);
    },
    getHeroInfo: function (id = 111) {
      let ts = this.$appTs,
        ls = this.$appGetLocalStorage("heroInfo-" + id);

      if (ls && ts - ls.updateTime < this.viewInfo.timeout) {
        let heroInfoData = ls.heroInfo;

        this.hero.info = heroInfoData;

        return;
      }

      this.$axios
        .post(this.$appApi.app.getHeroInfo + "&id=" + id)
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            let heroData = res.data.data,
              heroInfoData = heroData.heroInfo;
            this.hero.info = heroInfoData;

            heroData.updateTime = ts;

            this.$appSetLocalStorage("heroInfo-" + id, heroData);

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getHeroInfoByRandSuit: function (id = 111) {
      this.$axios
        .post(this.$appApi.app.getHeroInfoByRandSuit + "&heroId=" + id)
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            let suitData = res.data.data;
            console.log(suitData);
            this.hero.qrcode = suitData;

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0) {
      let ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < this.viewInfo.timeout) {
        if (aid == 15) {
          this.progressData = ls;
        } else {
          this.tableData = ls;
        }

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
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status,
            newData = null;

          if (status.code == 200) {
            if (aid == 15) {
              this.progressData = data;
              this.progressData.loading = false;
              this.progressData.updateTime = ts;

              newData = this.progressData;
            } else {
              this.tableData = data;
              this.tableData.loading = false;
              this.tableData.updateTime = ts;

              newData = this.tableData;
            }

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              newData
            );
          } else {
            this.$message.error(status.msg);
          }
        });

      if (bid == 3 && cid == 0) {
        this.$message.info(this.$appMsg.info[1011]);
      }
    },
    getRankingByGenreList: function (
      genreId = 111,
      aid = 14,
      bid = 0,
      cid = 0,
      did = 0
    ) {
      let ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + genreId
        );

      if (ls && ts - ls.updateTime < this.viewInfo.timeout) {
        return (this.tableData = ls);
      }

      this.tableData.loading = true;

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
            "&id=" +
            genreId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                genreId,
              this.tableData
            );
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getHeroChartsLog: function (aid = 6, bid = 0, cid = 0, did = 0) {
      let ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "heroChartsLog-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < this.viewInfo.timeout) {
        return (this.lineData = ls);
      }

      this.$axios
        .post(
          this.$appApi.app.getHeroChartsLog +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          this.lineData.status = status;

          if (status.code == 200) {
            this.lineData = data;
            this.lineData.updateTime = ts;

            this.$appSetLocalStorage(
              "heroChartsLog-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.lineData
            );
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
button.tools-7fd0a5f5913603ec56c9095e237cd4bc {
  margin-right: 5px;

  img.van-icon__image {
    border-radius: @app-border-radius;
    height: 20px;
    margin-left: -3px;
    object-fit: cover;
    width: 20px;
  }

  img.tools-26a263bb8e3b535b7a46349053f49e96 {
    left: 26px;
    top: -2px;
    position: absolute;
  }

  span.van-button__text,
  span.tools-a100b6fadea02956261621e88186b9a2 {
    margin-top: 2px;
  }
}

span.tools-d3eb91ba1fa50a7d88bd6a93569c69b1 {
  position: absolute;
  width: 300px;
  text-align: @app-text-align;
}

span.tools-c63abbfb166e7e598518fe6a7a58c86b {
  margin-top: 15px;
}

span.tools-e144855db3887408c0e2202a42027279 {
  font-size: 10px;
  left: 65px;
  margin-top: 105px;
  position: absolute;
  text-align: center;
  width: 200px;
}

div.tools-ea7120740464ce78c305436d1f150b4d {
  margin: 10px;
  margin-left: 5px;
  margin-top: 12px;
  width: 250px;
}

div.tools-bed58a7a97fd68cfc9d2cf0dc5d9f9d5 {
  position: absolute;
  left: 5px;
  top: 122px;
  text-align: @app-text-align;

  li {
    float: left;
  }
}

div.tools-ed54df2282a902e04da118c6dd9d8843 {
  left: 5px;
  position: absolute;
  top: 2px;
  font-size: @app-font-size;
  color: rgb(175, 175, 175);

  img.van-icon__image {
    border-radius: @app-border-radius;
    height: 28px;
    margin-left: -7px;
    width: 28px;
  }

  span.tools-a100b6fadea02956261621e88186b9a2 {
    margin-top: -5px;
  }

  span.van-button__text {
    width: 60px;
  }
}

div.tools-c63abbfb166e7e598518fe6a7a58c86b {
  margin-top: -14px;
  margin-left: -9px;
  position: absolute;
}

div.tools-01d8b754716fc5f519c1a4b654867193 {
  z-index: -1;
}

div.tools-58e4ea8e49b560235a7058518676b7e4 {
  left: -65px;
  margin-top: 13px;
  position: absolute;
  transform: scale(0.25);
}
</style>>