<template>
  <div class="tools-px app-px">
    <div class="tools-8c35b9de834af969baf22173b9539eb9">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="$appBack()"
        z-index="2000"
        class="tools-cf6d59913ef0046e9a11dd73ce8c8545"
      >
        <template #title>
          <span
            @click="$message.warning($appMsg.warning[1005])"
            class="tools-2de2ce7733cbb350c6aa2862912c853b"
          >
            票选
          </span>
        </template>
        <template #right>
          <span @click="getRanking(-1, 0, 0, 0)">
            <van-icon name="replay" />
          </span>
        </template>
      </van-nav-bar>
    </div>

    <div class="tools-0c81212fbe656b4245967fe1fba3413e">
      <div class="tools-4e31671abda91ffcc22a860a7bcd84ee">
        <van-row>
          <a-popover arrowPointAtCenter trigger="click" placement="bottomLeft">
            <van-col span="8">
              <div class="tools-194d92f12722c6d346dc1207ba7d2499">
                <div>
                  <img
                    v-lazy="topInfo[1].skinImg"
                    width="50"
                    height="50"
                    class="app-border-radius"
                  />
                </div>
                <div>
                  <van-tag round :color="topInfo[1].tag.color" type="primary">
                    {{ topInfo[1].skinName }}
                  </van-tag>
                </div>
                <div>
                  <span
                    :style="{
                      color: topInfo[1].tag.color,
                    }"
                    class="tools-279a4b0330c1a4ef39cde3a334a9c652"
                  >
                    2
                  </span>
                </div>
                <div class="tools-82175be63be4c53021549241368b4c6f">
                  <span class="tools-2de2ce7733cbb350c6aa2862912c853b">
                    {{ topInfo[1].allVoteNum || 0 }} 万
                  </span>
                </div>
              </div>
            </van-col>
            <template slot="content">
              <span>分均:{{ topInfo[1].addNum }}</span>
              <br />
              <span
                :style="
                  topInfo[1].needTime > 0
                    ? { color: 'red' }
                    : { color: '#1680d1' }
                "
              >
                还差:{{ topInfo[1].needVote }} 万
              </span>
              <br />
              <span>还需:{{ topInfo[1].needTime }} 小时</span>
            </template>
          </a-popover>
          <a-popover arrowPointAtCenter trigger="click" placement="bottom">
            <van-col span="8">
              <div class="tools-6fc36a6c243522e9579bb8500fcd8812">
                <div>
                  <img
                    v-lazy="topInfo[0].skinImg"
                    width="75"
                    height="75"
                    class="app-border-radius"
                  />
                  <img
                    v-lazy="$appCache + '/img/icons-app/crown.png'"
                    width="50"
                    height="50"
                    class="tools-c3aea51299c526f7b079c527ae02deb9"
                  />
                </div>
                <div>
                  <van-tag round :color="topInfo[0].tag.color" type="primary">{{
                    topInfo[0].skinName
                  }}</van-tag>
                </div>
                <div>
                  <span
                    :style="{
                      color: topInfo[0].tag.color,
                    }"
                    class="tools-279a4b0330c1a4ef39cde3a334a9c652"
                  >
                    1
                  </span>
                </div>
                <div class="tools-82175be63be4c53021549241368b4c6f">
                  <span class="tools-2de2ce7733cbb350c6aa2862912c853b">
                    {{ topInfo[0].allVoteNum || 0 }} 万
                  </span>
                </div>
              </div>
            </van-col>
            <template slot="content">
              <span
                @click="onUrlClick(tableData.result)"
                class="tools-4fb4d4758e19b050e0de1ef488ae54a3"
              >
                {{ tableData.result.title || "好耶!" }}
                <van-icon name="arrow" />
              </span>
            </template>
          </a-popover>
          <a-popover arrowPointAtCenter trigger="click" placement="bottomLeft">
            <van-col span="8">
              <div class="tools-2e9cd6ca0ca7a6d34edb205e1087b7e1">
                <div>
                  <img
                    v-lazy="topInfo[2].skinImg"
                    width="50"
                    height="50"
                    class="app-border-radius"
                  />
                </div>
                <div>
                  <van-tag round :color="topInfo[2].tag.color" type="primary">
                    {{ topInfo[2].skinName }}
                  </van-tag>
                </div>
                <div>
                  <span
                    :style="{
                      color: topInfo[2].tag.color,
                    }"
                    class="tools-279a4b0330c1a4ef39cde3a334a9c652"
                  >
                    3
                  </span>
                </div>
                <div class="tools-82175be63be4c53021549241368b4c6f">
                  <span class="tools-2de2ce7733cbb350c6aa2862912c853b">
                    {{ topInfo[2].allVoteNum || 0 }} 万
                  </span>
                </div>
              </div>
            </van-col>
            <template slot="content">
              <span>分均:{{ topInfo[2].addNum }}</span>
              <br />
              <span
                :style="
                  topInfo[2].needTime > 0
                    ? { color: 'red' }
                    : { color: '#1680d1' }
                "
              >
                还差:{{ topInfo[2].needVote }} 万
              </span>
              <br />
              <span>还需:{{ topInfo[2].needTime }} 小时</span>
            </template>
          </a-popover>
        </van-row>
      </div>

      <div class="tools-32cf2eae6fcd7e91e52572c57b0dfed2">
        <vxe-table
          ref="refWzryPiaoXuan"
          id="refWzryPiaoXuan"
          :custom-config="{ storage: true }"
          :data="tableData.result.rows.slice(3)"
          :loading="tableData.loading"
          :height="clientHeight"
        >
          <vxe-table-column field="skinName" title="#" width="75">
            <template #default="{ row, rowIndex }">
              <van-tag
                mark
                :color="row.tag.color"
                type="primary"
                class="app-e4d23e841d8e8804190027bce3180fa5"
              >
                {{ row.skinName }}
              </van-tag>

              <div
                :style="{
                  position: 'relative',
                }"
              >
                <img
                  v-lazy="row.skinImg"
                  width="35"
                  height="35"
                  class="app-border-radius"
                />
                <div
                  class="app-5f19eaf71f40d74d66be84db52b3ad87 tools-58206caebd18d792f59aa1ec064f65d1"
                >
                  {{ rowIndex + 4 }}
                </div>
              </div>
            </template>
          </vxe-table-column>

          <vxe-table-column
            field="addNum"
            title="分均 (≈)"
            width="100"
            sortable
          />

          <vxe-table-column
            field="allVoteNum"
            title="当前 (万)"
            :width="listWidth"
            :title-prefix="{ content: $appMsg.tips[1020] }"
            sortable
          >
            <template #default="{ row }">
              <div
                :style="{
                  position: 'relative',
                }"
              >
                <div>{{ row.allVoteNum }}</div>
                <span
                  v-if="row.needVote > 0"
                  :style="
                    row.needTime > 0 ? { color: 'red' } : { color: '#1680d1' }
                  "
                  class="tools-ad602d217564b616b293eac07fc53138"
                >
                  还差 {{ row.needVote }}
                </span>
              </div>
            </template>
          </vxe-table-column>

          <vxe-table-column
            field="needTime"
            title="还需 (时)"
            :width="listWidth"
            :title-prefix="{ content: $appMsg.tips[1021] }"
            sortable
          />
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toolsPiaoXuan",
  data() {
    return {
      type: Number(this.$route.query.type) || 0,
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
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
      listWidth: 0,
      clientHeight: 0,
      topInfo: [
        {
          skinImg: this.$appCache + "/img/icons-app/hero_white.png",
          tag: {},
        },
        {
          skinImg: this.$appCache + "/img/icons-app/hero_white.png",
          tag: {},
        },
        {
          skinImg: this.$appCache + "/img/icons-app/hero_white.png",
          tag: {},
        },
      ],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(-235);
    let tableWidth = this.$appInitTableWidth(350);

    tableWidth > 0 ? (this.listWidth = tableWidth + 10) : (this.listWidth = 0);
  },
  mounted() {
    this.getRanking(-1, 0, 0, 0);
  },
  methods: {
    afterConfig: function (e) {
      if (!e.series) {
        return e;
      }

      Array.from(e.series, (x) => {
        x.symbol = "none";

        return x;
      });

      return e;
    },
    getRanking: function (aid = -1, bid = 0, cid = 0, did = 0) {
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
            status = res.data.status,
            result = data.result;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            if (result.rows.length > 0) {
              this.topInfo = [result.rows[0], result.rows[1], result.rows[2]];
            }

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onUrlClick: function (data) {
      this.$appOpenUrl(
        "是否打开" + (data.url ? "外部" : "内部") + "链接?",
        null,
        { path: data.url ? data.url : data.to },
        data.url ? 0 : 1
      );
    },
  },
};
</script>

<style scoped lang="less">
img.tools-c3aea51299c526f7b079c527ae02deb9 {
  margin-left: -30px;
  margin-top: -20px;
  position: absolute;
  transform: rotate(54deg);
}

span.tools-279a4b0330c1a4ef39cde3a334a9c652 {
  font-size: 50px;
}

span.tools-ad602d217564b616b293eac07fc53138 {
  font-size: @app-font-size;
  left: 0;
  margin-left: 25px;
  margin-top: -3px;
  position: absolute;
  width: 100%;
}

span.tools-4fb4d4758e19b050e0de1ef488ae54a3 {
  color: #1680d1;
}

div.tools-58206caebd18d792f59aa1ec064f65d1 {
  font-size: @app-font-size;
  left: -28px;
  margin-top: -10px;
  position: absolute;
  text-align: center;
  width: 100%;
}

div.tools-0c81212fbe656b4245967fe1fba3413e {
  position: absolute;
  width: 100%;
}

div.tools-4e31671abda91ffcc22a860a7bcd84ee {
  height: 325px;
  padding-top: 25px;
}

div.tools-194d92f12722c6d346dc1207ba7d2499 {
  padding-top: 75px;
}

div.tools-2e9cd6ca0ca7a6d34edb205e1087b7e1 {
  padding-top: 100px;
}
</style>