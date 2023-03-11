<template>
  <div class="choose-a951404cf72bbe54a7fbac9cdf0908af">
    <div class="choose-f4947bf65fb55ef270296ea141e6a5b4" @click="onActionClick">
      <slot></slot>
    </div>

    <van-action-sheet
      v-model="showInfo.actionSheet"
      :closeable="false"
      title="如何操作"
    >
      <van-tabs
        v-model="tableData.model"
        v-if="tableData.model > -1"
        :border="false"
        :ellipsis="false"
        :swipeable="true"
        :swipe-threshold="$appIsMobile ? 4 : 7"
      >
        <van-tab
          v-for="(data, index) in $appConfigInfo.positionInfo"
          :key="'choose-a726de89f2f7a2df77b98d2aeb366fff-' + index"
          :title="data[0]"
        />

        <div class="choose-be7fdb49198e3c5175fd7a20e1c2ae93">
          <van-grid
            :border="false"
            class="choose-6630a648a32dd003e530d3c79dc686ac"
          >
            <van-grid-item
              v-for="(data, index) in tableData.result.rows"
              v-show="
                data.type.includes(tableData.model) || tableData.model == 0
              "
              :key="'choose-c58f7be682c38cefd953e385b90857bc-' + index"
              text=" "
              @click="getHeroId(data)"
            >
              <img
                v-lazy="{
                  src: '/img/icons-hero/' + data.id + '.jpg',
                  error: data.img,
                }"
                width="50"
                height="50"
                class="choose-c1721b4099fda993a5897b0c5a3326bc"
              />
              <span class="choose-ce813c1b85eaac5a5da5d10967cf2c6e">
                {{ data.name }}
              </span>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tabs>

      <AppHello height="50px" />
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "ChooseHero",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      tableData: {
        model: 0,
        result: {
          rows: [],
        },
      },
      showInfo: {
        actionSheet: false,
      },
    };
  },
  mounted() {
    this.getRanking();
  },
  methods: {
    getHeroId: function (e) {
      this.$emit("select", e);

      this.showInfo.actionSheet = false;
    },
    onActionClick: function () {
      this.showInfo.actionSheet = true;
    },
    getRanking: function (aid = 0, bid = 4, cid = 0, did = 1) {
      let ls = this.$appGetLocalStorage(
        "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
      );

      if (ls) {
        return (this.tableData = ls);
      }

      let nowTime = null;

      let date = new Date(),
        nowYear = date.getFullYear(),
        nowMonth = date.getMonth() + 1,
        nowDate = date.getDate();

      nowTime = nowYear + "-" + nowMonth + "-" + nowDate;

      this.$axios
        .post(
          this.$appApi.pvp.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did,
          this.$qs.stringify({
            t: nowTime,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData.result = data.result;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.tableData
            );

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
span.choose-ce813c1b85eaac5a5da5d10967cf2c6e {
  font-size: @app-font-size;
  margin-top: 3px;
}

div.choose-164050dcb4e46bbf16cd81a95f499980 {
  height: 200px;
}

div.choose-be7fdb49198e3c5175fd7a20e1c2ae93 {
  height: 443px;
}
</style>