<template>
  <div class="setting-home">
    <div class="setting-1adddd9de210a4c10b2e24417e2eb4e5">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="$appPushBack()"
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
        <van-cell title="摇摆分路" label="单个英雄不同分路的情况">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.isSwingMode"
                @change="onSwingModeChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell title="适配小屏" label="部分页面将自动缩小图片">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.isSmallMode"
                @change="onSmallMobileChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell title="精简模式" label="优化排行界面的渲染速度">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.isReductionMode"
                @change="onReducedModeChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell title="打开链接" label="打开外部链接时会有提示">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.openUrl"
                @change="onOpenUrlChange"
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
        title="群内"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell title="王者公告" label="推送最新的公告信息">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.newsPush"
                :disabled="true"
              />
            </span>
          </template>
        </van-cell>
        <van-cell title="环比变化" label="推送变化明显的英雄">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.wow"
                :disabled="true"
              />
            </span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group
        :border="false"
        title="其他"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell
          title="当前地区"
          label="访问卡的可以尝试切换下"
          :value="$appCountry ? '国内' : '国外'"
          @click="
            $appCountry
              ? $appOpenUrl(
                  '是否切至国外?',
                  null,
                  { path: '//pvp.r18.games' },
                  0
                )
              : $appOpenUrl('是否切至国内?', null, { path: '//pvp.91m.top' }, 0)
          "
          is-link
        />
        <van-cell
          title="更新时间"
          label="最后一次数据更新的时间"
          :value="$appConfigInfo.appInfo.update.time"
        />
        <van-cell
          title="系统版本"
          label="最后一次系统更新的时间"
          :value="$appConfigInfo.appInfo.update.version"
        />
        <van-cell
          title="访问类型"
          :value="$appConfigInfo.appInfo.pwa == 1 ? 'PWA' : '普通'"
          @click="$message.info($appMsg.info[1018])"
        />
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
          isSwingMode: false,
          isSmallMode: false,
          isReductionMode: false,
          openUrl: true,
          newsPush: true,
          wow: true,
        },
      },
      cacheInfo: [
        { title: "清空排行缓存" },
        { title: "清空系统缓存", label: "[谨慎操作] 上方的设置将丢失" },
        { title: "清空全局BP模拟器缓存", label: "[谨慎操作] 自定义排序将丢失" },
      ],
    };
  },
  created() {
    this.appConfigInfo = this.$appConfigInfo;
  },
  methods: {
    onSwingModeChange: function (e) {
      let ls = this.$appConfigInfo;

      ls.appInfo.isSwingMode = e;
      this.$appSetLocalStorage("appConfigInfo", ls);

      this.$message.success(this.$appMsg.success[1000]);
    },
    onSmallMobileChange: function (e) {
      let ls = this.$appConfigInfo;

      ls.appInfo.isSmallMode = e;
      this.$appSetLocalStorage("appConfigInfo", ls);

      this.$message.success(this.$appMsg.success[1000]);
    },
    onReducedModeChange: function (e) {
      let ls = this.$appConfigInfo;

      if (!e) {
        this.$appDelectLocalStorage("VXE_TABLE_CUSTOM_COLUMN_VISIBLE");
      } else {
        this.$appSetLocalStorage("VXE_TABLE_CUSTOM_COLUMN_VISIBLE", {
          _v: 0,
          refDianFengSai:
            "allBrandRate,evaluateGoldRate,evaluateSilverRate,allMvpRate,winMvpRate,loseMvpRate,totalBeHurtedCntPerMin,totalOutputPerMin,totalHurtHeroCntPerMin,equMoneyOverflow,equMoneyMin,killCnt,deadCnt,assistCnt,joinGamePercent,usedtime",
        });
      }

      ls.appInfo.isReductionMode = e;
      this.$appSetLocalStorage("appConfigInfo", ls);

      this.$message.success(this.$appMsg.success[1000]);
    },
    onOpenUrlChange: function (e) {
      let ls = this.$appConfigInfo;

      ls.appInfo.openUrl = e;
      this.$appSetLocalStorage("appConfigInfo", ls);

      this.$message.success(this.$appMsg.success[1000]);
    },
    onDelectClick: function (e) {
      if (e == 0) {
        this.$appDelectLocalStorage("heroChartsLog");
        this.$appDelectLocalStorage("ranking");
      } else if (e == 1) {
        this.$appDelectLocalStorage("VXE_TABLE_CUSTOM_COLUMN_VISIBLE");
        this.$appDelectLocalStorage("appConfigInfo");

        this.$appDelectAllLocalStorage();

        this.$cookie.delete("agree");
      } else if (e == 2) {
        this.$appDelectLocalStorage("gameBP");
      }

      this.$message.success(this.$appMsg.success[1000]);

      if (e == 1) {
        setTimeout(() => {
          this.$router.go(0);
        }, 500);
      }
    },
  },
};
</script>

<style lang="less">
div.setting-b401c55622473cb5f8e0cf4e19901f39 {
  text-align: @app-text-align;
}
</style>