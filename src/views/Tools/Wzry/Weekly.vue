<template>
  <div class="tools-weekly">
    <div
      v-if="articleId > 0 && update.heroList.length > 0"
      class="tools-99fbdd20d1de3e2b40c66e8041b4c785"
    >
      <van-divider
        content-position="right"
        :style="{
          color: '#1680d1',
          borderColor: '#1680d1',
        }"
      >
        最近更新
      </van-divider>

      <div class="tools-54ad173da92d80c798bc0e5ffe014a66">
        <div class="tools-715a26d0452334a25d81cd422f67f5f0">
          <span class="tools-b25280b37a417ded3d58f929839c2019">
            #英雄
            <span v-if="update.heroList.length > 10">
              🪧 更新涉及英雄较多
            </span>
          </span>
          <van-grid :border="false" :column-num="10">
            <van-grid-item
              v-for="(data, index) in update.heroList.slice(0, 10)"
              :key="'tools-cfa606defc3c9f6e30fbe7005a331abe-' + index"
            >
              <div
                :style="{
                  position: 'relative',
                }"
              >
                <img
                  v-lazy="{
                    //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data.id + '/' + data.id + '.jpg',
                    src: data.img,
                  }"
                  width="35"
                  height="35"
                  class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7"
                />

                <div
                  v-if="data.updateType == 3 || data.updateType == 4"
                  class="tools-5688b4942ace92e2a2445773bcc4c483"
                >
                  <van-icon
                    :color="data.updateType == 3 ? 'green' : '#1680d1'"
                    size="17"
                    name="goods-collect"
                  />
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>

        <div
          v-if="update.equipmentList.length > 0"
          class="tools-d8b89f67742b030749a8f0562e16172e"
        >
          <span class="tools-b25280b37a417ded3d58f929839c2019">#装备</span>
          <van-grid :border="false" :column-num="10">
            <van-grid-item
              v-for="(data, index) in update.equipmentList"
              :key="'tools-cfa606defc3c9f6e30fbe7005a331abe-' + index"
            >
              <div
                :style="{
                  position: 'relative',
                }"
              >
                <img
                  v-lazy="{
                    //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + data + '.jpg',
                    src: data.img,
                  }"
                  width="35"
                  height="35"
                  class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7"
                />
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>

    <div class="tools-99fbdd20d1de3e2b40c66e8041b4c785">
      <van-divider
        content-position="right"
        :style="{
          color: '#1680d1',
          borderColor: '#1680d1',
        }"
      >
        环比变化
      </van-divider>

      <div class="tools-cb374c8bf75153633b4f9a691780d513">
        <div class="tools-d172dd0c6361cd74f6194e50bf1ce999">
          <span class="tools-b25280b37a417ded3d58f929839c2019">
            #技能 (%) ⚠️ 上升 > 5% 将会高亮
          </span>
          <van-grid :border="false" :column-num="10">
            <van-grid-item
              v-for="(data, index) in change.skillList.slice(0, 10)"
              :key="'tools-cfa606defc3c9f6e30fbe7005a331abe-' + index"
            >
              <div
                :style="{
                  position: 'relative',
                }"
              >
                <img
                  v-lazy="{
                    //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data.heroId + '/' + data.heroId + '.jpg',
                    src: data.heroImg,
                  }"
                  width="35"
                  height="35"
                  class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7"
                />

                <img
                  v-lazy="{
                    //error: '//camp.qq.com/images/skill/' + data.id + '.png',
                    src: data.img,
                  }"
                  width="17"
                  height="17"
                  class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7 tools-72aa4435371df16ebd5958bf17d2ce17"
                />

                <div
                  :style="
                    (data.change.updateValue || 0) * -1 >= 5
                      ? { color: 'red' }
                      : {}
                  "
                  class="tools-3c561cfe952966d66469f189d0f1ded6"
                >
                  {{ (data.change.updateValue || 0) * -1 }}
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>

        <div class="tools-b2cca4f9da036f28cadf00a23c86251a">
          <span class="tools-b25280b37a417ded3d58f929839c2019">
            #出装 (%) ⚠️ 上升 > 5% 将会高亮
          </span>
          <van-grid :border="false" :column-num="10">
            <van-grid-item
              v-for="(data, index) in change.equipmentList.slice(0, 25)"
              :key="'tools-cfa606defc3c9f6e30fbe7005a331abe-' + index"
            >
              <div
                :style="{
                  position: 'relative',
                }"
              >
                <img
                  v-lazy="{
                    //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data.heroId + '/' + data.heroId + '.jpg',
                    src: data.heroImg,
                  }"
                  width="35"
                  height="35"
                  class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7"
                />

                <img
                  v-lazy="{
                    //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + data.id + '.jpg',
                    src: data.img,
                  }"
                  width="17"
                  height="17"
                  class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7 tools-72aa4435371df16ebd5958bf17d2ce17"
                />

                <div
                  :style="
                    (data.change.updateValue || 0) * -1 >= 5
                      ? { color: 'red' }
                      : {}
                  "
                  class="tools-3c561cfe952966d66469f189d0f1ded6"
                >
                  {{ (data.change.updateValue || 0) * -1 }}
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>

    <div class="tools-0718fd9d729c89c24317bec50cd5f968">
      <van-divider content-position="right">
        数据整理 苏苏的荣耀助手
      </van-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "toolsWeekly",
  data() {
    return {
      articleId: Number(this.$route.query.articleId) || 0,
      update: {
        heroList: [],
        equipmentList: [],
      },
      change: {
        skillList: [],
        equipmentList: [],
      },
    };
  },
  created() {},
  mounted() {
    let articleId = this.articleId;

    this.getRanking(11, 1, 0, 0);
    this.getRanking(11, 2, 0, 0);

    if (articleId > 0) {
      this.getHeroUpdateDetail(articleId);
    }
  },
  methods: {
    getRanking: function (aid = 11, bid = 0, cid = 0, did = 0) {
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
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getHeroUpdateDetail: function (articleId) {
      this.$axios
        .post(this.$appApi.app.getHeroUpdate + "&aid=1&articleId=" + articleId)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.update = data;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style scoped>
img.tools-72aa4435371df16ebd5958bf17d2ce17 {
  background-color: #fff !important;
  left: 27px;
  margin-top: 20px;
  padding: 1px;
  position: absolute;
}

span.tools-b25280b37a417ded3d58f929839c2019 {
  color: grey;
  font-size: 10px;
}

div.tools-weekly {
  text-align: left;
  width: 750px;
  padding: 0 16px;
}

div.tools-0718fd9d729c89c24317bec50cd5f968 {
  margin-left: 375px;
  margin-top: -75px;
  position: absolute;
  width: 375px;
}

div.tools-5688b4942ace92e2a2445773bcc4c483 {
  background-color: #fff !important;
  border-radius: 100%;
  height: 20px;
  margin-left: 35px;
  margin-top: -16px;
  padding: 1px;
  position: absolute;
  text-align: center;
  width: 20px;
}

div.tools-3c561cfe952966d66469f189d0f1ded6 {
  font-size: 10px;
  text-align: center;
  margin-top: 3px;
}
</style>