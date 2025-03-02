<template>
  <div class="admin-ke-data">
    <!-- <div>这里是 ke-data-2faa5</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-49657711d4f79ee0e5501a5c554026b8">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>🏬 您好，很高兴为您服务。</span>
          </h1>
        </a-dropdown>
      </div>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-8e086eb841d9b5cd2f89212ac8fd0527"
    >
      <a-row>
        <a-col :span="3">
          <a-statistic title="倒计时" groupSeparator="" :value="interval" />
        </a-col>
        <a-col :span="3" @click="setRoomId">
          <a-statistic title="房间号" groupSeparator="" :value="roomInfo.id" />
        </a-col>
        <a-col :span="3" @click="clearOrder">
          <a-statistic title="清空订单" groupSeparator="" value="--" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-bfee7d52ba8fdb819662db5383073de4">
      <van-grid :border="false" :column-num="5">
        <van-grid-item
          v-for="(data, index) in tableData.result.rows"
          :key="'admin-e04b41bb4bb98587ff1e08072c54f922-' + index"
        >
          <vue-qr
            v-if="data.url"
            ref="refKeQrCode"
            :text="data.url"
            :size="150"
          />
          <div class="admin-cc18a9ce6325c786a08f962ed0e43099">
            <p>订单号：{{ data.order_id || "获取中" }}</p>
            <p>用户名：{{ data.user.name || "获取中" }}</p>
            <p>UID：{{ data.user.uid || "获取中" }}</p>
            <p>
              状态：{{ tableData.result.status[index].code }} ({{
                tableData.result.status[index].data
              }})
            </p>
          </div>

          <van-button
            round
            @click="deleteOrder(index)"
            type="danger"
            size="mini"
          >
            删除订单
          </van-button>
        </van-grid-item>
        <van-grid-item @click="getOrderInfo" icon="add-o" text="添加" />
      </van-grid>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
import VueQr from "vue-qr";

export default {
  name: "adminKeData",
  components: {
    VueQr,
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      interval: 30,
      nowInterval: null,
      tableData: {
        result: {
          rows: [],
          status: [],
        },
      },
      roomInfo: {
        id: "--",
      },
    };
  },
  mounted() {
    this.roomInfo.id = this.$appGetLocalStorage("admin-ke-roomId") || "--";

    this.nowInterval = setInterval(() => {
      this.interval--;

      if (this.interval <= 0) {
        this.interval = 30;

        this.checkOrderList();
      }
    }, 1000);
  },
  methods: {
    getOrderInfo: async function () {
      let roomId;

      if (this.roomInfo.id == "--") {
        this.$message.error(this.$appMsg.error[1014]);

        return;
      } else {
        this.$message.warning(this.$appMsg.warning[2000]);

        roomId = this.roomInfo.id;
      }

      this.tableData.result.rows.push({
        url: null,
        order_id: null,
        user: {
          name: null,
          uid: null,
        },
      });
      this.tableData.result.status.push({ code: -1, data: "初始化" });

      let nowIndex = this.tableData.result.rows.length - 1;

      try {
        let res = await fetch(
          "https://api-8b8a9.91m.top/api/hanghai/code/" + roomId
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            this.$set(this.tableData.result.rows, nowIndex, res.data);
          });

        return res;
      } catch (e) {
        console.log(e);
      }
    },
    getOrderStatus: async function (i, orderId) {
      if (!orderId) return;

      try {
        let res = await fetch(
          "https://api-8b8a9.91m.top/api/hanghai/result/" + orderId
        )
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            let data = res.msg;

            data = data.replace(orderId, "");

            this.$set(this.tableData.result.status, i, {
              code: res.code,
              data: data,
            });

            if (res.code == 0 || res.code == -11) {
              this.deleteOrder(i);

              this.$message.success(this.$appMsg.success[2000]);

              this.getOrderInfo();
            }
          });

        return res;
      } catch (e) {
        console.log(e);
      }
    },
    checkOrderList: function () {
      if (this.tableData.result.rows.length == 0) return;

      this.$message.warning(this.$appMsg.warning[2001]);

      this.tableData.result.rows.map((x, i) => {
        let orderId = x.order_id;

        this.getOrderStatus(i, orderId);
      });
    },
    setRoomId: function () {
      let msg = prompt("请输入房间Id", this.roomInfo.id || "--");

      if (msg) {
        this.roomInfo.id = msg;

        this.$appSetLocalStorage("admin-ke-roomId", msg);

        this.$message.success(this.$appMsg.success[1000]);
      }
    },
    deleteOrder: function (e) {
      this.tableData.result.rows.splice(e, 1);
      this.tableData.result.status.splice(e, 1);

      this.$message.success(this.$appMsg.success[1000]);
    },
    clearOrder: function () {
      this.$dialog
        .confirm({
          title: "是否清空订单?",
        })
        .then(() => {
          //on confirm

          clearInterval(this.nowInterval);

          this.nowInterval = setInterval(() => {
            this.interval--;

            if (this.interval <= 0) {
              this.interval = 30;

              this.checkOrderList();
            }
          }, 1000);

          this.tableData.result.rows = [];
          this.tableData.result.status = [];

          this.$message.success(this.$appMsg.success[1000]);
        })
        .catch(() => {
          //on cancel
        });
    },
  },
};
</script>