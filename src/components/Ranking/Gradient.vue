<template>
  <div class="ranking-gradient">
    <div class="ranking-84b60dc869cf54a3d2112e59c70ce21f">
      <!-- T 0 -->
      <div class="ranking-5d6884d8590d15bb78e1f71eacd590fd">
        <van-cell-group
          :border="false"
          class="ranking-1ac6534055d3b55bd4340435430b314d"
        >
          <template #title>
            T<span
              :style="{ color: 'red', fontSize: '30px' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >0</span
            >
            &nbsp;
            <span
              class="
                ranking-3605ac8c437e0c5eb801c76edfd6fb43
                ranking-b4ba22aa4e7d0527ad550251603c5355
              "
            >
              <a-popover placement="bottomRight" trigger="click">
                <span>非禁必须 <van-icon name="question-o" /></span>
                <template slot="content">
                  <span>
                    在极高的禁选率和胜率加持下，有着版本最顶尖的强度，熟练后可直接无脑选用。
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="rankingData.result.rows[0].length > 0">
              <li
                v-for="(data, index) in rankingData.result.rows[0]"
                :key="'ranking-9caaa62de8e92fdabd24dbed8b94e965-' + index"
                @click="
                  $appPush({
                    path: '/search',
                    query: { q: data.name, refresh: 1 },
                  })
                "
              >
                <img
                  width="35"
                  height="35"
                  v-lazy="data.img"
                  class="ranking-712ef34fdf31f8510e087c7a42d9cd48"
                />
                <img
                  width="15"
                  height="15"
                  v-if="data.trend > 0"
                  v-lazy="'/img/app-icons/hot_' + data.trend + '.png'"
                  class="
                    ranking-092fa818fdb7286350fa796ffd546c6b
                    app-db21bca782a535e91eb87f56b8abdc45
                  "
                />
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">暂无</div>
          </div>
        </van-cell-group>
      </div>

      <!-- T 0.5 -->
      <div class="ranking-5d6884d8590d15bb78e1f71eacd590fd">
        <van-cell-group
          :border="false"
          class="ranking-1ac6534055d3b55bd4340435430b314d"
        >
          <template #title>
            T<span
              :style="{ color: '#fa8072' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >0.5</span
            >
            &nbsp;
            <span
              class="
                ranking-3605ac8c437e0c5eb801c76edfd6fb43
                ranking-b4ba22aa4e7d0527ad550251603c5355
              "
            >
              <a-popover placement="bottomRight" trigger="click">
                <span>T0 之下 <van-icon name="question-o" /></span>
                <template slot="content">
                  <span>
                    介于 T0 和 T1
                    之间，具有作为团队核心的能力，适用于绝大多数阵容
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="rankingData.result.rows[1].length > 0">
              <li
                v-for="(data, index) in rankingData.result.rows[1]"
                :key="'ranking-6c7fc172ca71bccc83ee1c5491d3ba7e-' + index"
                @click="
                  $appPush({
                    path: '/search',
                    query: { q: data.name, refresh: 1 },
                  })
                "
              >
                <img
                  width="35"
                  height="35"
                  v-lazy="data.img"
                  class="ranking-712ef34fdf31f8510e087c7a42d9cd48"
                />
                <img
                  width="15"
                  height="15"
                  v-if="data.trend > 0"
                  v-lazy="'/img/app-icons/hot_' + data.trend + '.png'"
                  class="
                    ranking-092fa818fdb7286350fa796ffd546c6b
                    app-db21bca782a535e91eb87f56b8abdc45
                  "
                />
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">暂无</div>
          </div>
        </van-cell-group>
      </div>

      <!-- T 1 -->
      <div class="ranking-5d6884d8590d15bb78e1f71eacd590fd">
        <van-cell-group
          :border="false"
          class="ranking-1ac6534055d3b55bd4340435430b314d"
        >
          <template #title>
            T<span
              :style="{ color: 'orange' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >1</span
            >
            &nbsp;
            <span
              class="
                ranking-3605ac8c437e0c5eb801c76edfd6fb43
                ranking-b4ba22aa4e7d0527ad550251603c5355
              "
            >
              <a-popover placement="bottomRight" trigger="click">
                <span>强势英雄 <van-icon name="question-o" /></span>
                <template slot="content">
                  <span>
                    是队伍的中坚力量，具有左右胜利的实力，一般需要依阵容搭配使用。
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="rankingData.result.rows[2].length > 0">
              <li
                v-for="(data, index) in rankingData.result.rows[2]"
                :key="'ranking-5f877badb957977895f414293d3b13ca-' + index"
                @click="
                  $appPush({
                    path: '/search',
                    query: { q: data.name, refresh: 1 },
                  })
                "
              >
                <img
                  width="35"
                  height="35"
                  v-lazy="data.img"
                  class="ranking-712ef34fdf31f8510e087c7a42d9cd48"
                />
                <img
                  width="15"
                  height="15"
                  v-if="data.trend > 0"
                  v-lazy="'/img/app-icons/hot_' + data.trend + '.png'"
                  class="
                    ranking-092fa818fdb7286350fa796ffd546c6b
                    app-db21bca782a535e91eb87f56b8abdc45
                  "
                />
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">暂无</div>
          </div>
        </van-cell-group>
      </div>

      <!-- T 2 -->
      <div class="ranking-5d6884d8590d15bb78e1f71eacd590fd">
        <van-cell-group
          :border="false"
          class="ranking-1ac6534055d3b55bd4340435430b314d"
        >
          <template #title>
            T<span
              :style="{ color: '#3d9140' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >2</span
            >
            &nbsp;
            <span
              class="
                ranking-3605ac8c437e0c5eb801c76edfd6fb43
                ranking-b4ba22aa4e7d0527ad550251603c5355
              "
            >
              <a-popover placement="bottomRight" trigger="click">
                <span>体系英雄 <van-icon name="question-o" /></span>
                <template slot="content">
                  <span>
                    能在自己的领域内表现卓越，在某些战局中起到主导团队的作用。
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="rankingData.result.rows[3].length > 0">
              <li
                v-for="(data, index) in rankingData.result.rows[3]"
                :key="'ranking-d9221b65c901ace0d707524657300107-' + index"
                @click="
                  $appPush({
                    path: '/search',
                    query: { q: data.name, refresh: 1 },
                  })
                "
              >
                <img
                  width="35"
                  height="35"
                  v-lazy="data.img"
                  class="ranking-712ef34fdf31f8510e087c7a42d9cd48"
                />
                <img
                  width="15"
                  height="15"
                  v-if="data.trend > 0"
                  v-lazy="'/img/app-icons/hot_' + data.trend + '.png'"
                  class="
                    ranking-092fa818fdb7286350fa796ffd546c6b
                    app-db21bca782a535e91eb87f56b8abdc45
                  "
                />
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">暂无</div>
          </div>
        </van-cell-group>
      </div>

      <!-- T 3 -->
      <div class="ranking-5d6884d8590d15bb78e1f71eacd590fd">
        <van-cell-group
          :border="false"
          class="ranking-1ac6534055d3b55bd4340435430b314d"
        >
          <template #title>
            T<span class="ranking-0eef127325d38ed4804c26bd7c88bab3">3</span>
            &nbsp;
            <span
              class="
                ranking-3605ac8c437e0c5eb801c76edfd6fb43
                ranking-b4ba22aa4e7d0527ad550251603c5355
              "
            >
              <a-popover placement="bottomRight" trigger="click">
                <span>奇兵英雄 <van-icon name="question-o" /></span>
                <template slot="content">
                  <span>
                    有明显的克制关系，优缺点明显，能够在特定的阵容中表现突出。
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="rankingData.result.rows[4].length > 0">
              <li
                v-for="(data, index) in rankingData.result.rows[4]"
                :key="'ranking-1147cba48a3152b125e90f67a6838668-' + index"
                @click="
                  $appPush({
                    path: '/search',
                    query: { q: data.name, refresh: 1 },
                  })
                "
              >
                <img
                  width="35"
                  height="35"
                  v-lazy="data.img"
                  class="ranking-712ef34fdf31f8510e087c7a42d9cd48"
                />
                <img
                  width="15"
                  height="15"
                  v-if="data.trend > 0"
                  v-lazy="'/img/app-icons/hot_' + data.trend + '.png'"
                  class="
                    ranking-092fa818fdb7286350fa796ffd546c6b
                    app-db21bca782a535e91eb87f56b8abdc45
                  "
                />
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">暂无</div>
          </div>
        </van-cell-group>
      </div>

      <!-- T 4 -->
      <div class="ranking-5d6884d8590d15bb78e1f71eacd590fd">
        <van-cell-group
          :border="false"
          class="ranking-1ac6534055d3b55bd4340435430b314d"
        >
          <template #title>
            T<span class="ranking-0eef127325d38ed4804c26bd7c88bab3">4</span>
            &nbsp;
            <span
              class="
                ranking-3605ac8c437e0c5eb801c76edfd6fb43
                ranking-b4ba22aa4e7d0527ad550251603c5355
              "
            >
              <a-popover placement="bottomRight" trigger="click">
                <span>弱势英雄 <van-icon name="question-o" /></span>
                <template slot="content">
                  <span>不是绝活哥，不建议上手。</span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="rankingData.result.rows[5].length > 0">
              <li
                v-for="(data, index) in rankingData.result.rows[5]"
                :key="'ranking-27799f7b525c8aa54e66ac9d76a0f65e-' + index"
                @click="
                  $appPush({
                    path: '/search',
                    query: { q: data.name, refresh: 1 },
                  })
                "
              >
                <img
                  width="35"
                  height="35"
                  v-lazy="data.img"
                  class="ranking-712ef34fdf31f8510e087c7a42d9cd48"
                />
                <img
                  width="15"
                  height="15"
                  v-if="data.trend > 0"
                  v-lazy="'/img/app-icons/hot_' + data.trend + '.png'"
                  class="
                    ranking-092fa818fdb7286350fa796ffd546c6b
                    app-db21bca782a535e91eb87f56b8abdc45
                  "
                />
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">暂无</div>
          </div>
        </van-cell-group>
      </div>
    </div>

    <div class="ranking-2862744e5d7cce9d070aa41172557d78">
      梯度由
      <span
        :style="{ color: '#1989fa' }"
        @click="
          $appPush({ path: '/friends?openId=8701875c7834f26c7794876584c59cd3' })
        "
      >
        @梦归奇迹
      </span>
      指导 ;D
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroGradient",
  props: {
    bid: {
      type: Number,
      default: 0,
    },
    cid: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { bid, cid } = this;
      return { bid, cid };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        this.getRanking(0, newValue.bid, newValue.cid, 0);
      },
    },
  },
  data() {
    return {
      rankingData: {
        result: {
          rows: [[], [], [], [], [], []],
        },
      },
    };
  },
  methods: {
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0) {
      if (bid == 0 && cid == 0) return;

      let ranking = this.$appGetLocalStorage(
        "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
      );

      if (!ranking) {
        this.$message.error(this.$appMsg.error[1010]);

        return;
      } else {
        this.rankingData.result.rows = [[], [], [], [], [], []];
      }

      ranking.result.rows.map((x) => {
        let gradientIndex = 0;

        if (x.gradient == 0) {
          gradientIndex = 0;
        } else if (x.gradient == 0.5) {
          gradientIndex = 1;
        } else if (x.gradient == 1) {
          gradientIndex = 2;
        } else if (x.gradient == 2) {
          gradientIndex = 3;
        } else if (x.gradient == 3) {
          gradientIndex = 4;
        } else if (x.gradient == 4) {
          gradientIndex = 5;
        }

        this.rankingData.result.rows[gradientIndex].push(x);
      });
    },
  },
};
</script>

<style scoped lang="less">
img.ranking-712ef34fdf31f8510e087c7a42d9cd48 {
  border-radius: 100%;
}

img.ranking-092fa818fdb7286350fa796ffd546c6b {
  position: absolute;
  margin-left: -1px;
}

span.ranking-0eef127325d38ed4804c26bd7c88bab3 {
  font-size: 20px;
  margin-left: 5px;
}

span.ranking-3605ac8c437e0c5eb801c76edfd6fb43 {
  font-size: @app-font-size;
}

span.ranking-b4ba22aa4e7d0527ad550251603c5355 {
  float: right;
}

div.ranking-f155536738c348c9a6e402eb19afa2af {
  margin: 5px 10px 0 10px;
  overflow: hidden;

  li {
    float: left;
    text-align: center;
    margin: 5px 15px 15px 10px;
  }
}

div.ranking-gradient {
  margin: 25px 0;
}

div.ranking-84b60dc869cf54a3d2112e59c70ce21f {
  text-align: left;
}

div.ranking-2862744e5d7cce9d070aa41172557d78 {
  margin-top: 50px;
  font-size: @app-font-size;
}
</style>