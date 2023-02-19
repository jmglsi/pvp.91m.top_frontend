<template>
  <div class="app-square">
    <div
      class="
        square-cad86054cf97209ea888c47407f2b1b8
        app-4eb2044800e2b7b9e5c44d370af22b27
      "
    >
      <div class="square-b5ef386ed8989d7603a5cb470d663b67">
        <div class="square-083a770f697e829b819171c6ec1a34e7">
          <van-tag round type="danger" size="medium">置顶</van-tag>
        </div>
        <a-card
          :hoverable="true"
          class="square-9e0ab13d2ba69005149eef0b04e58dfa"
        >
          <img
            slot="cover"
            alt="example"
            v-lazy="
              '//ae02.alicdn.com/kf/H2efc999293c04c3b9aaa524299b9d2ede.png'
            "
          />
          <a-card-meta title="月爱 · 马可啵啵">
            <div slot="description">
              <div class="square-82b7dcde3857ad1fe70f4417776d7494">
                这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述
              </div>
              <div class="square-1ec7dc2c73ecc78ac251b004eb9b4c55">
                <a href="#">#孤单边</a>，<a href="#">#奇怪出装鉴定</a>
              </div>
            </div>
            <a-avatar
              slot="avatar"
              src="http://pic.rmb.bdstatic.com/bjh/59b1b7e9f95ee8fd205f96c26ac8b6ce.jpeg"
            />
          </a-card-meta>
        </a-card>
      </div>

      <div class="square-b5ef386ed8989d7603a5cb470d663b67">
        <div class="square-083a770f697e829b819171c6ec1a34e7">
          <van-tag round type="warning" size="medium">好玩</van-tag>
        </div>
        <a-card
          :hoverable="true"
          class="square-9e0ab13d2ba69005149eef0b04e58dfa"
        >
          <img
            slot="cover"
            alt="example"
            v-lazy="
              '//ae02.alicdn.com/kf/H2efc999293c04c3b9aaa524299b9d2ede.png'
            "
          />
          <a-card-meta title="剑风 · 马可啵啵">
            <div slot="description">
              <div class="square-82b7dcde3857ad1fe70f4417776d7494">
                这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述
              </div>
              <div class="square-1ec7dc2c73ecc78ac251b004eb9b4c55">
                <a href="#">#孤单边</a>，<a href="#">#奇怪出装鉴定</a>
              </div>
            </div>
            <a-avatar
              slot="avatar"
              src="http://q.qlogo.cn/headimg_dl?dst_uin=2694353795&spec=640"
            />
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SquareHome",
  data() {
    return {
      tableData: {
        result: {
          rows: [],
        },
      },
    };
  },
  mounted() {
    this.getGameHome();
  },
  methods: {
    getGameHome: function () {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage("gameHome");

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.tableData = ls);
      }

      this.$axios.post(this.$appApi.game.getGameHome).then((res) => {
        this.tableData = res.data.data;
        this.tableData.updateTime = ts;

        this.$appSetLocalStorage("gameHome", this.tableData);
      });
    },
  },
};
</script>

<style scoped lang="less">
div.square-cad86054cf97209ea888c47407f2b1b8 {
  margin: 0 auto;
  text-align: @app-text-align;
  width: 95%;
}

div.square-083a770f697e829b819171c6ec1a34e7 {
  margin-left: 25px;
  margin-top: 25px;
  position: absolute;
  z-index: @app-z-index;
}

div.square-9e0ab13d2ba69005149eef0b04e58dfa {
  border-radius: 10px;
  margin-top: 25px;
}

div.square-1ec7dc2c73ecc78ac251b004eb9b4c55 {
  margin-top: 10px;
}
</style>