<template>
  <div class="setting-home">
    <div class="setting-1adddd9de210a4c10b2e24417e2eb4e5">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="$router.go(-1)"
        z-index="99999999"
        left-text="返回"
        title="通用"
      />
    </div>

    <div class="setting-b401c55622473cb5f8e0cf4e19901f39">
      <van-cell-group
        :border="false"
        title="设置"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell
          title="适配小屏"
          label="打开后部分页面将自动缩小图片"
          icon="graphic"
        >
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="appInfo.isSmallMobile"
                @change="onMobileInfoChange"
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
        <van-cell title="当前版本" :value="appInfo.version" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      appInfo: {
        isSmallMobile: false,
        version: 0,
      },
      cacheInfo: [
        { title: "清空程序缓存", label: null },
        { title: "清空排行缓存", label: null },
        { title: "清空全局BP模拟器缓存", label: "清空后自定义排序将丢失" },
      ],
    };
  },
  mounted() {
    let appConfigInfo = this.$appGetLocalStorage("appConfigInfo");

    this.appInfo = appConfigInfo.appInfo;
    appConfigInfo.appInfo.isSmallMobile == 1
      ? (this.appInfo.isSmallMobile = true)
      : (this.appInfo.isSmallMobile = false);
  },
  methods: {
    onMobileInfoChange: function (e) {
      let isSmallMobileInt = 0,
        isSmallMobileBool = false;

      if (e == false) {
        isSmallMobileInt = 0;
        isSmallMobileBool = false;
      } else {
        isSmallMobileInt = 1;
        isSmallMobileBool = true;
      }

      this.appInfo.isSmallMobile = isSmallMobileBool;
      this.$appConfigInfo.appInfo.isSmallMobile = isSmallMobileInt;

      this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);

      this.$message.success(this.$appMsg.success[1004]);
    },
    onDelectClick: function (e) {
      if (e == 0) {
        localStorage.removeItem("appConfigInfo");
        localStorage.removeItem("gameBP");
        localStorage.removeItem("gameHome");
        localStorage.removeItem("heroUpdate-0");
        localStorage.removeItem("searchData");
      } else if (e == 1) {
        this.$appDelectRankingCache();
      } else if (e == 2) {
        localStorage.removeItem("ranking-0-4-0");
      }

      this.$message.success(this.$appMsg.success[1000]);
    },
  },
};
</script>

<style  scoped>
div.setting-b401c55622473cb5f8e0cf4e19901f39 {
  text-align: left;
}
</style>