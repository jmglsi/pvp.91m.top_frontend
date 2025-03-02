<template>
  <div class="hero-fightPower">
    <div class="hero-fightPower-02d0b3f345c4fd4e2e0d14b24deb1992">
      <van-tabs
        v-model="tabsInfo.model"
        :border="false"
        :ellipsis="false"
        @click="onTabsClick"
      >
        <van-tab title="我为人人，人人为我">
          <van-field
            v-model="fightPower.value"
            :label="
              $wzryColumnsInfo.fightPowerType.text[fightPowerType] + ' 分数'
            "
            :disabled="disabledInfo.addFightPower"
            placeholder="请确认分数"
          >
            <template #button>
              <van-uploader
                :after-read="onAfterRead"
                :before-read="onBeforeRead"
                @oversize="onOversize"
                max-size="52428800"
              >
                <div class="hero-fightPower-4b2011a6e3693d22750506daa83636c2">
                  <van-button round size="small" type="info">
                    上传&nbsp;{{
                      $wzryColumnsInfo.fightPowerType.text[fightPowerType]
                    }}&nbsp;图片
                  </van-button>
                </div>
              </van-uploader>
            </template>
          </van-field>

          <div class="hero-fightPower-cb2772c8daa27828fc2ed77540c1bba1">
            <van-button
              round
              size="small"
              color="linear-gradient(to right, #43cbff, #6874e8)"
              @click="onAddGroupClick"
            >
              战力互助
            </van-button>
            &nbsp; &nbsp; &nbsp;
            <van-button
              round
              size="small"
              color="linear-gradient(to right, #6874e8, #9708cc)"
              @click="onExampleClick"
            >
              示例图片
            </van-button>
            &nbsp; &nbsp; &nbsp;
            <van-button
              round
              size="small"
              type="primary"
              :disabled="disabledInfo.addFightPower"
              @click="onAddFightPowerClick"
            >
              提交分数
            </van-button>
          </div>

          <div
            class="app-61046f2f5eefe3dc179e52af32241062 hero-fightPower-1fcc988ce1403e447b81fe06cbaf7e66"
          >
            <p>
              1.默认保存在【我的 - 左上角编辑】填的信息下，<span
                class="app-e4c9479b11955648dad558fe717a4eb2"
              >
                如果您的大区、省份有变化，请及时修改
              </span>
            </p>
            <p>
              2.<span class="app-e4c9479b11955648dad558fe717a4eb2">
                查询的是 xx区xx省的省100 xx，那就上传自己所在地区的 xx 省100
                图片
              </span>
              ，上方有示例
            </p>
            <p>
              3.
              <span class="app-e4c9479b11955648dad558fe717a4eb2">
                上传无响应、提示接口频繁
              </span>
              可能是图片太大了，可以在QQ、WX发一下 (压缩图片)，保存到手机再上传
            </p>
            <p>
              4.
              <span class="app-e4c9479b11955648dad558fe717a4eb2">
                频繁上传错误战力图片，将禁止查询
              </span>
            </p>
            <p>5.需要大家一起参与进来更新维护，就别光想着白嫖查询了</p>
          </div>
        </van-tab>
        <van-tab title="其他大区、省份信息">
          <div
            class="hero-fightPower-8198feb840dbc4a19c84ebfab63d9515 app-pzOne"
          >
            <vxe-table
              ref="refWzryHeroFightPower"
              id="refWzryHeroFightPower"
              :custom-config="{ storage: true }"
              :data="tableData.result.rows"
              :loading="tableData.loading"
              height="543"
            >
              <vxe-table-column title="#" type="seq" width="50" />

              <vxe-table-column type="expand" width="50">
                <template #content="{ row, rowIndex }">
                  <div
                    :style="{
                      position: 'relative',
                    }"
                  >
                    <img
                      v-if="row.fightPowerImg"
                      v-lazy="row.fightPowerImg"
                      @click="onImagePreviewClick(rowIndex)"
                      class="hero-fightPower-559b72e1d0f69118d849a535f9000646"
                    />
                    <span
                      v-else
                      class="hero-fightPower-768607b02a407038d55cbdc241ef8df2"
                    >
                      没有图片
                    </span>
                  </div>
                </template>
              </vxe-table-column>

              <vxe-table-column
                field="areaText"
                title="大区"
                :filters="[
                  { value: 1, label: '安卓QQ' },
                  { value: 2, label: '苹果QQ' },
                  { value: 3, label: '安卓WX' },
                  { value: 4, label: '苹果WX' },
                ]"
                :filter-method="onTableColumnFilterMethod"
                width="125"
                sortable
              />

              <vxe-table-column
                field="provinceText"
                title="省份"
                width="175"
                sortable
              />

              <vxe-table-column
                field="fightPowerValue"
                title="分数"
                :width="listWidth"
                sortable
              />

              <vxe-table-column
                field="updateTime"
                title="更新时间"
                width="200"
                sortable
              />
            </vxe-table>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="hero-fightPower-35084759d5e6d522413e5d29fdde22fc">
      <van-image-preview
        v-model="showInfo.imagePreview"
        :images="images"
        class="app-0ca41257ee36e86e5d89591c82113263"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "heroFightPower",
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
    extraType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { extraId, extraType } = this;
      return { extraId, extraType };
    },
  },
  data() {
    return {
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
      listWidth: 0,
      fightPower: {
        value: "",
        img: "",
      },
      images: [],
      tabsInfo: {
        model: 0,
      },
      disabledInfo: {
        addFightPower: true,
      },
      collapseInfo: {
        model: ["1"],
      },
      showInfo: {
        imagePreview: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    onAfterRead: function (e) {
      let data = e.content;

      this.$message.info(this.$appMsg.info[1002]);

      this.$axios
        .post(
          this.$appApi.app.uploadImg,
          this.$qs.stringify({
            filePath: data,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.fightPower.img = data.img;
            this.disabledInfo.addFightPower = false;

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onBeforeRead: function (file) {
      if (
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/jpg" &&
        file.type != "image/jpeg"
      ) {
        this.$message.error(this.$appMsg.error[1004]);
        return false;
      } else {
        return true;
      }
    },
    onOversize: function () {
      this.$message.error(this.$appMsg.error[1005]);
    },
    onAddGroupClick: function () {
      this.$appPush({
        path: "/search",
        query: {
          q: "大佬们快来加群",
          refresh: 1,
        },
      });
    },
    onExampleClick: function () {
      this.images = [
        "//ae03.alicdn.com/kf/H20fceeeb4eee47f68a601de161762ce8o.png",
      ];

      this.showInfo.imagePreview = true;

      this.$message.info(
        "请上传查询英雄的 " +
          this.$wzryColumnsInfo.fightPowerType.text[this.extraType] +
          " 图片，此图片仅供参考"
      );
    },
    onAddFightPowerClick: function () {
      let fightPower = this.fightPower;

      if (fightPower.value == 0 || fightPower.img > 30000) {
        return this.$message.error(this.$appMsg.error[1009]);
      }

      let postData = {
        fightPowerType: this.extraType,
        fightPowerImg: fightPower.img,
        fightPowerValue: fightPower.value,
      };

      this.$axios
        .post(
          this.$appApi.app.addHeroFightPowerByWebAccount +
            "&id=" +
            encodeURIComponent(this.extraId),
          this.$qs.stringify(postData)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.$message.success(data.msg);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getRanking: function (heroId, aid = 10, bid = 0, cid = 0, did = 0) {
      if (heroId == 0 || did == 0) return;

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
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            this.$message.info(this.$appMsg.info[1020]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTabsClick: function (e) {
      if (e == 1) {
        this.getRanking(this.extraId, 10, 0, 0, this.extraType);
      }
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "areaText") {
        return row.areaText == option.label;
      }
    },
    onImagePreviewClick: function (index) {
      this.images = [this.tableData.result.rows[index].fightPowerImg];

      this.showInfo.imagePreview = true;
    },
  },
};
</script>

<style scoped lang="less">
img.hero-fightPower-559b72e1d0f69118d849a535f9000646 {
  width: 100%;
}

div.hero-fightPower-cb2772c8daa27828fc2ed77540c1bba1 {
  margin: 25px 25px;
}

div.hero-fightPower-1fcc988ce1403e447b81fe06cbaf7e66 {
  font-size: 12px;
  margin: 125px 25px;
}
</style>