<template>
  <div class="choose-a951404cf72bbe54a7fbac9cdf0908af">
    <div
      class="choose-f4947bf65fb55ef270296ea141e6a5b4"
      @click="onActionSheetClick"
    >
      <slot />
    </div>

    <van-action-sheet
      v-model="showInfo.actionSheet"
      :closeable="false"
      :description="'皮肤 - ' + $t('how-to-choose')"
    >
      <div class="choose-be7fdb49198e3c5175fd7a20e1c2ae93">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(data, index) in tableData.result.rows"
            :key="'hero-cf2a06a8e5d83d1eb2c472e7e5b496e0-' + index"
            @click="getItem(data)"
          >
            <div class="app-508c6ba453fed92a75a63dba09c892cf">
              <img width="100" height="161.8" v-lazy="data.skinImg" />
              <div class="app-ecb26e3ebb0456087e850f45c7484687"></div>
              <div class="app-e8a723fff1bfb5b0e938a949c31b0659">
                <div
                  :style="{
                    color: 'white',
                    marginTop: '10px',
                    marginLeft: '15px',
                  }"
                >
                  <span>评分：{{ data.score }}</span>
                  <br />
                  <span>占比：{{ data.pickRate }}</span>
                  <span class="app-f929a9d9af35e647bf66a06a6c421ea1">%</span>
                </div>
              </div>
              <div class="app-c8b5f5d48f608ded3e078de9bef7c61b">
                <span
                  :style="
                    data.score >= 7.5 || data.pickRate >= 50
                      ? { color: 'orange' }
                      : {}
                  "
                >
                  {{
                    data.score >= 7.5 || data.pickRate >= 50
                      ? "👍 " + data.skinName
                      : data.skinName
                  }}
                </span>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>

      <AppHello height="50px" />
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "chooseHero",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { extraId } = this;
      return { extraId };
    },
  },
  watch: {
    listenChange: {
      immediate: false,
      handler(newValue) {
        if (!newValue.extraId) return;

        this.getRanking(18, 0, 0, 0, newValue.extraId);
      },
    },
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
    this.getRanking(18, 0, 0, 0, this.extraId);
  },
  methods: {
    getItem: function (e) {
      this.$emit("select", e);

      this.showInfo.actionSheet = false;
    },
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0, heroId = 111) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.tableData = ls;

        return;
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
            encodeURIComponent(heroId)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status,
            newData = null;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            newData = data.result;

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
                heroId,
              newData
            );

            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onActionSheetClick: function () {
      this.showInfo.actionSheet = true;
    },
  },
};
</script>

<style scoped lang="less">
div.choose-be7fdb49198e3c5175fd7a20e1c2ae93 {
  height: 487px;
}
</style>