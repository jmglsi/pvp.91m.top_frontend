<template>
  <div class="setting-home">
    <div class="setting-1adddd9de210a4c10b2e24417e2eb4e5">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="$router.go(-1)"
        z-index="99999999"
        left-text="返回"
        title="通用"
      />
    </div>

    <div
      class="setting-b401c55622473cb5f8e0cf4e19901f39"
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
    >
      <van-cell-group
        :border="false"
        title="设置"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell title="精简模式" label="优化排行界面的加载速度">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="appConfigInfo.appInfo.isReducedMode"
                @change="onReducedModeChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell title="适配小屏" label="部分页面将自动缩小图片">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="appConfigInfo.appInfo.isSmallMobile"
                @change="onSmallMobileChange"
              />
            </span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group
        :border="false"
        title="缓存"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell
          v-for="(data, index) in cacheInfo"
          :key="'setting-7e40a645babda019f1204a81365179fc-' + index"
          :title="data.title"
          :label="data.label"
          is-link
          @click="onDelectClick(index)"
        />
      </van-cell-group>

      <van-cell-group
        :border="false"
        title="其他"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell
          title="当前地区"
          label="国外访问卡的可以尝试切换下"
          :value="$appCountry ? '国内' : '国外'"
          @click="
            $appCountry
              ? $appOpenUrl('是否切至国外?', null, {
                  path: '//pvp.r18.games',
                })
              : $appOpenUrl('是否切至国内?', null, {
                  path: '//pvp.91m.top',
                })
          "
          is-link
        />
        <van-cell
          title="访问类型"
          :value="appConfigInfo.appInfo.pwa == 1 ? 'PWA' : '普通'"
          @click="$message.info($appMsg.info[1018])"
        />
        <van-cell
          title="更新时间"
          label="最后一次数据更新的时间"
          :value="appConfigInfo.appInfo.updateTime"
        />
        <van-cell title="程序版本" :value="appConfigInfo.appInfo.version" />
      </van-cell-group>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "Setting",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      appConfigInfo: {
        appInfo: {
          isSmallMobile: false,
          isReducedMode: false,
          version: 0,
        },
      },
      cacheInfo: [
        { title: "清空程序缓存", label: null },
        { title: "清空排行缓存", label: null },
        { title: "清空全局BP模拟器缓存", label: "自定义排序将丢失，谨慎操作" },
      ],
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let appConfigInfo = this.$appGetLocalStorage("appConfigInfo"),
        isReducedMode = false,
        isSmallMobile = false;

      this.appConfigInfo.appInfo = appConfigInfo.appInfo;

      appConfigInfo.appInfo.isReducedMode == 1
        ? (isReducedMode = true)
        : (isReducedMode = false);
      this.appConfigInfo.appInfo.isReducedMode = isReducedMode;

      appConfigInfo.appInfo.isSmallMobile == 1
        ? (isSmallMobile = true)
        : (isSmallMobile = false);
      this.appConfigInfo.appInfo.isSmallMobile = isSmallMobile;
    },
    onReducedModeChange: function (e) {
      let appConfigInfo = this.$appGetLocalStorage("appConfigInfo"),
        isReducedMode = false;

      if (e == false) {
        localStorage.removeItem("VXE_TABLE_CUSTOM_COLUMN_VISIBLE");

        isReducedMode = false;
      } else {
        this.$appSetLocalStorage("VXE_TABLE_CUSTOM_COLUMN_VISIBLE", {
          _v: 0,
          refDianFengSai:
            "allBrandRate,evaluateGoldRate,evaluateSilverRate,allMvpRate,winMvpRate,loseMvpRate,totalBeHurtedCntPerMin,totalOutputPerMin,totalHurtHeroCntPerMin,equMoneyOverflow,equMoneyMin,killCnt,deadCnt,assistCnt,joinGamePercent,usedtime",
        });

        isReducedMode = true;
      }

      this.appConfigInfo.appInfo.isReducedMode = isReducedMode;
      appConfigInfo.appInfo.isReducedMode = Number(isReducedMode);

      this.$appSetLocalStorage("appConfigInfo", appConfigInfo);

      this.$message.success(this.$appMsg.success[1004]);
    },
    onSmallMobileChange: function (e) {
      let appConfigInfo = this.$appGetLocalStorage("appConfigInfo"),
        isSmallMobile = false;

      e == false ? (isSmallMobile = false) : (isSmallMobile = true);

      this.appConfigInfo.appInfo.isSmallMobile = isSmallMobile;
      appConfigInfo.appInfo.isSmallMobile = Number(isSmallMobile);

      this.$appSetLocalStorage("appConfigInfo", appConfigInfo);

      this.$message.success(this.$appMsg.success[1004]);
    },
    onDelectClick: function (e) {
      if (e == 0) {
        localStorage.removeItem("VXE_TABLE_CUSTOM_COLUMN_VISIBLE");

        localStorage.removeItem("appConfigInfo");
        localStorage.removeItem("appHome");
        localStorage.removeItem("gameHome");
        localStorage.removeItem("searchData");
        this.$appDelectCache("heroUpdate");
        this.$appDelectCache("heroSameHobby");

        this.isSmallMobile = false;
        this.isReducedMode = false;
      } else if (e == 1) {
        this.$appDelectCache("ranking");
        this.$appDelectCache("charts");
      } else if (e == 2) {
        localStorage.removeItem("gameBP");
      }

      this.$message.success(this.$appMsg.success[1000]);

      if (e == 0) {
        setTimeout(() => {
          this.$router.go(0);
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
div.setting-b401c55622473cb5f8e0cf4e19901f39 {
  text-align: left;
}
</style>