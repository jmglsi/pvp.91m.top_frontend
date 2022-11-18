<template>
  <div v-if="!agree" class="app-5ede0b0dd2f5aa86fdde8d379def6341">
    <van-action-sheet
      v-model="showInfo.actionSheet"
      :closeable="false"
      :close-on-click-overlay="false"
      title="请同意后再操作"
    >
      <div class="app-fe64546261ce7a19b6784737edd0fdf1">
        <div class="app-41b238cc893836e28b50cd5a59843803">
          <a-checkbox :checked="showInfo.checked" @change="onAgreeChange">
            我已经阅读并同意
            <a href="//www.yuque.com/jmglsi/pvp/yyxgbh#NPkLH" target="_blank">
              《隐私和数据声明》
            </a>
          </a-checkbox>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "AppReadme",
  data() {
    return {
      agree: false,
      showInfo: {
        actionSheet: true,
        checked: false,
      },
    };
  },
  mounted() {
    let agree = 0;
    agree = this.$cookie.get("agree");

    this.agree = agree;
    this.$appConfigInfo.appInfo.isReadme = agree;
  },
  methods: {
    onAgreeChange: function () {
      let nowActionSheet = true,
        nowChecked = false,
        nowChecked_int = 0;

      if (this.showInfo.checked == true) {
        nowActionSheet = true;
        nowChecked = false;
        nowChecked_int = 0;
      } else {
        nowActionSheet = false;
        nowChecked = true;
        nowChecked_int = 1;
      }

      this.showInfo.actionSheet = nowActionSheet;
      this.showInfo.checked = nowChecked;
      this.$cookie.set("agree", nowChecked_int, {
        expires: "1Y",
      });

      this.$message.success(this.$appMsg.success[1000]);

      setTimeout(() => {
        location.reload();
      }, 2000);
    },
  },
};
</script>