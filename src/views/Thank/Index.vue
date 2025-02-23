<template>
  <div class="thank-0902863a4106c5d389307e2905b7d25c">
    <div v-if="showInfo.loading" class="thank-460c0a7276acc8f88ef16d4c5b3668e1">
      <van-loading />
    </div>
    <div v-else class="thank-460c0a7276acc8f88ef16d4c5b3668e1">
      <div
        v-if="!showInfo.afdian"
        class="thank-ee5e6f32be8ae4437eef536794a34083"
      >
        <van-grid :border="false" :column-num="3">
          <van-grid-item text="1 元" />
          <van-grid-item text="6 元" />
          <van-grid-item text="18 元" />
          <van-grid-item text="58 元" />
          <van-grid-item text="98 元" />
          <van-grid-item text="自定义" />
        </van-grid>

        <div class="thank-e42b74b346730e1f71b97c42da887998">
          <van-button
            round
            plain
            icon="cash-o"
            type="info"
            color="orange"
            size="small"
          >
            赞助一下
          </van-button>
        </div>
      </div>

      <div
        v-else-if="showInfo.afdian"
        class="thank-c9dddaadd8311ada182ce37ef7352c4a"
      >
        <ul class="thank-dc7b2d618c86783a64aad7686de8f787">
          <li
            v-for="(data, index) in tableData.result.rows"
            :key="'thank-a778116b63df18be2491153c21503f96-' + index"
            class="thank-3c684e893023297ec1c4b71ca85f660a"
          >
            <img
              v-lazy="data.user.avatar"
              width="40"
              height="40"
              class="thank-fd47ba14457b5ac046683d4e30b76a5d"
            />
            <div class="thank-1b23f8a4c97cc55f757ec2aae921f03d">
              {{ data.user.name }}
            </div>
          </li>
        </ul>

        <div class="thank-55f0a0d869cd1891bca86b9f237685d2">
          <ul class="thank-1e248fdda9784da54070908e1d13f208">
            <li
              v-for="(data, index) in 5"
              :key="'thank-19827cb7c76582fa1708036bbb590ae2-' + index"
              class="thank-73315d5746a2ee0cc52c784f3793543f"
              @click="getAfdian(index)"
            >
              {{ index + 1 }}
            </li>
          </ul>
        </div>

        <div class="thank-e83f9de1f98d9144f702e25085300872">
          特别感谢
          <span
            :style="{
              color: '#1989fa !important',
            }"
            @click="
              $appOpenUrl(
                $t('open-url.title'),
                null,
                { path: 'https://afdian.com/a/jmglsi/thank' },
                0
              )
            "
          >
            小伙伴们
          </span>
          的赞助
        </div>
      </div>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "thankHome",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      showInfo: {
        afdian: true,
        loading: true,
      },
    };
  },
  mounted() {
    //this.friends = this.randomSortArray(this.friends);
    this.initPage();
    this.getAfdian(0);
  },
  methods: {
    initPage: function () {
      let q = this.$route.query,
        show = q.show || "";

      if (show) {
        if (show == "afdian") {
          this.showInfo.afdian = true;
        } else if (show == "sponsor") {
          this.showInfo.afdian = false;
        } else {
          this.showInfo.afdian = true;
        }
      }
    },
    randomSortArray: function (arr) {
      let stack = [];

      while (arr.length) {
        let index = Number(Math.random() * arr.length);

        stack.push(arr[index]);
        arr.splice(index, 1);
      }
      return stack;
    },
    getAfdian: function (page = 0) {
      this.$axios
        .post(this.$appApi.app.getAfdian + "&page=" + page)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.showInfo.loading = false;

            this.tableData.result.rows = data.list;
          } else {
            //this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
div.thank-460c0a7276acc8f88ef16d4c5b3668e1 {
  margin-top: 50px;
  width: 100%;

  ul.thank-dc7b2d618c86783a64aad7686de8f787 {
    width: 85%;
    max-width: 850px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;

    li.thank-3c684e893023297ec1c4b71ca85f660a {
      margin: 10px 5px;
      width: 65px;
      height: 75px;
    }
  }
}

div.thank-55f0a0d869cd1891bca86b9f237685d2 {
  text-align: center;
  display: inline-block;
  margin: 25px 0;

  ul.thank-1e248fdda9784da54070908e1d13f208 {
    li.thank-73315d5746a2ee0cc52c784f3793543f {
      width: 25px;
      float: left;
      margin: 0 20px;
    }
  }
}

div.thank-1b23f8a4c97cc55f757ec2aae921f03d {
  font-size: 10px;
  margin-top: 5px;
}

div.thank-ee5e6f32be8ae4437eef536794a34083 {
  margin-bottom: 25px;
}

div.thank-e42b74b346730e1f71b97c42da887998 {
  margin-top: 25px;
}

div.thank-e83f9de1f98d9144f702e25085300872 {
  margin-top: 25px;
  color: gray;
  font-size: 14px;
}

img.thank-fd47ba14457b5ac046683d4e30b76a5d {
  border-radius: 100%;
  width: 40px;
  height: 40px;
}

div.thank-0902863a4106c5d389307e2905b7d25c {
  text-align: center;
}
</style>