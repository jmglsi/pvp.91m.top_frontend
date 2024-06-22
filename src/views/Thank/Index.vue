<template>
  <div class="thank-0902863a4106c5d389307e2905b7d25c">
    <div class="thank-e83f9de1f98d9144f702e25085300872">
      特别感谢
      <a
        class="app-317dc33fc3c84e49e10251797e2ae37b"
        href="https://afdian.net/a/jmglsi/thank"
      >
        小伙伴们
      </a>
      的赞助
    </div>

    <div v-if="showInfo.loading" class="thank-460c0a7276acc8f88ef16d4c5b3668e1">
      <van-loading />
    </div>
    <div v-else class="thank-460c0a7276acc8f88ef16d4c5b3668e1">
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
    </div>

    <div class="thank-aaa175fc14004e3fc59df356c3c382d5">等等...</div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "homeThank",
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
        loading: true,
      },
    };
  },
  mounted() {
    //this.friends = this.randomSortArray(this.friends);
    this.getAfdian(0);
  },
  methods: {
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

div.thank-aaa175fc14004e3fc59df356c3c382d5 {
  margin-top: 27px;
}

div.thank-e83f9de1f98d9144f702e25085300872,
div.thank-aaa175fc14004e3fc59df356c3c382d5 {
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
  margin-top: 50px;
}
</style>