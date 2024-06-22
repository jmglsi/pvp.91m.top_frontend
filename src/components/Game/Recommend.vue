<template>
  <div class="game-recommend">
    <ul class="app-d865b50ce307751bdeb9a6ab16e7baf9">
      <li class="app-1951b6e7c82938dd7446a41e829b247b">
        <div class="game-ea89eb98f6e31fc44977697c388b6c57">队友</div>
        <ul>
          <li class="game-9ad2b9949abc36830804e02760ea3e63">
            <img
              v-lazy="
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
              "
              width="25"
              height="25"
              class="game-1ab74bf7276acc5985f078fee7e63109"
            />
          </li>
          <li class="game-9ad2b9949abc36830804e02760ea3e63">
            <img
              v-lazy="
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
              "
              width="25"
              height="25"
              class="game-1ab74bf7276acc5985f078fee7e63109"
            />
          </li>
          <li class="game-9ad2b9949abc36830804e02760ea3e63">
            <img
              v-lazy="
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
              "
              width="25"
              height="25"
              class="game-1ab74bf7276acc5985f078fee7e63109"
            />
          </li>
        </ul>
      </li>
      <li class="app-1951b6e7c82938dd7446a41e829b247b">
        <div class="game-ea89eb98f6e31fc44977697c388b6c57">克制</div>
        <ul>
          <li class="game-9ad2b9949abc36830804e02760ea3e63">
            <img
              v-lazy="
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
              "
              width="25"
              height="25"
              class="game-1ab74bf7276acc5985f078fee7e63109"
            />
          </li>
          <li class="game-9ad2b9949abc36830804e02760ea3e63">
            <img
              v-lazy="
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
              "
              width="25"
              height="25"
              class="game-1ab74bf7276acc5985f078fee7e63109"
            />
          </li>
          <li class="game-9ad2b9949abc36830804e02760ea3e63">
            <img
              v-lazy="
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg'
              "
              width="25"
              height="25"
              class="game-1ab74bf7276acc5985f078fee7e63109"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GameRecommend",
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
      immediate: true,
      handler(newValue) {
        if (newValue.extraId == 0) return;

        this.lineData.result = [];

        //this.getGamePrediction(newValue.extraId, newValue.trendType);
      },
    },
  },
  data() {
    return {
      lineData: {
        markLine: {},
        markPoint: {},
        extend: {},
        settings: {},
        loading: true,
        result: {
          rows: [],
        },
      },
    };
  },
  methods: {
    getGamePrediction: function (arrData, aid) {
      this.lineData = {
        loading: true,
        result: {
          rows: [],
        },
      };

      this.$axios
        .post(
          this.$appApi.game.getGamePrediction + "&aid=" + aid,
          this.$qs.stringify({
            arrData: arrData,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.lineData = data;
            this.lineData.loading = false;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>