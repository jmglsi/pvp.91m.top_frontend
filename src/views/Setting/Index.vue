<template>
  <div class="setting-index">
    <div class="setting-1adddd9de210a4c10b2e24417e2eb4e5">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        :title="$t('setting.top-title')"
        @click-left="$appBack()"
        z-index="2000"
        class="setting-4644ad66ca89bea4c9eb012b0281fef9"
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
        :title="$t('setting.title')"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell
          :title="$t('setting.position.title')"
          :label="$t('setting.position.label')"
        >
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.isSwingMode"
                @change="onSwingSwitchChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell
          :title="$t('setting.small.title')"
          :label="$t('setting.small.label')"
        >
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.isSmallMode"
                @change="onSmallSwitchChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell
          :title="$t('setting.mode.title')"
          :label="$t('setting.mode.label')"
        >
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.isReductionMode"
                @change="onReducedSwitchChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell
          :title="$t('setting.link.title')"
          :label="$t('setting.link.label')"
        >
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.openUrl"
                @change="onOpenUrlSwitchChange"
              />
            </span>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group
        :border="false"
        :title="$t('cache.title')"
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
        :title="$t('group.title')"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell :title="$t('group.gg.title')" :label="$t('group.gg.label')">
          <template #right-icon>
            <span class="setting-a833c0959e80ada90f239fb707903be2">
              <van-switch
                v-model="$appConfigInfo.appInfo.newsPush"
                :disabled="true"
              />
            </span>
          </template>
        </van-cell>
        <van-cell
          :title="$t('group.change.title')"
          :label="$t('group.change.label')"
        >
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
        :title="$t('other.title')"
        class="setting-ea4d5993952f38933e7cced73b900ad7"
      >
        <van-cell
          :title="$t('other.area.title')"
          :label="$t('other.area.label')"
          :value="
            $appCountry ? $t('other.area.type[0]') : $t('other.area.type[1]')
          "
          @click="
            $appCountry
              ? $appOpenUrl(
                  '是否切至国外?',
                  null,
                  { path: 'https://pvp.r18.games' },
                  0
                )
              : $appOpenUrl(
                  '是否切至国内?',
                  null,
                  { path: 'https://pvp.91m.top' },
                  0
                )
          "
          is-link
        />
        <van-cell
          :title="$t('other.update.title')"
          :label="$t('other.update.label')"
          :value="$appConfigInfo.appInfo.updateInfo.time"
        />
        <van-cell
          :title="$t('other.version.title')"
          :label="$t('other.version.label')"
          :value="$appConfigInfo.appInfo.updateInfo.version"
        />
        <van-cell
          :title="$t('other.pwa.title')"
          :value="$appConfigInfo.appInfo.pwa"
          @click="$message.info($appMsg.info[1018])"
        />
      </van-cell-group>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "settingIndex",
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
    onSwingSwitchChange: function (e) {
      let ls = this.$appConfigInfo;

      ls.appInfo.isSwingMode = e;
      this.$appSetLocalStorage("appConfigInfo", ls);

      this.$message.success(this.$appMsg.success[1000]);
    },
    onSmallSwitchChange: function (e) {
      let ls = this.$appConfigInfo;

      ls.appInfo.isSmallMode = e;
      this.$appSetLocalStorage("appConfigInfo", ls);

      this.$message.success(this.$appMsg.success[1000]);
    },
    onReducedSwitchChange: function (e) {
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
    onOpenUrlSwitchChange: function (e) {
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
      } else if (e == 2) {
        this.$appDelectLocalStorage("gameBP");
      }

      this.$message.success(this.$appMsg.success[1000]);

      if (e == 1) {
        setTimeout(() => {
          window.location.reload();
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