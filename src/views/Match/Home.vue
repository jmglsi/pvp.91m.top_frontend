<template>
  <div class="bp-home">
    <div class="match">
      <van-cell-group title="官方赛事">
        <van-cell v-for="(data, index) in match.list" :key="index + '-match'" :value="data.des">
          <template #title>
            <van-grid :border="false" :column-num="3">
              <van-grid-item :icon="data.camp1Img" :text="data.camp1Name" />
              <van-grid-item>
                <span class="match-time">{{ data.time}}</span>
                <span class="match-vs">VS</span>
                <span class="match-des">{{ data.des }}</span>
              </van-grid-item>
              <van-grid-item :icon="data.camp2Img" :text="data.camp2Name" />
            </van-grid>
          </template>
        </van-cell>
        <van-cell :title="match.title" is-link to="bp" />
      </van-cell-group>

      <van-cell-group title="玩家分享">
        <van-cell v-for="(data, index) in playerShare.list" :key="index + '-playerShare'">
          <template #title>
            <van-grid :border="false" :column-num="3">
              <van-grid-item :icon="data.camp1Img" :text="data.camp1Name" />
              <van-grid-item>
                <span class="match-time">{{ data.time}}</span>
                <span class="match-vs">VS</span>
                <span class="match-des">{{ data.des }}</span>
              </van-grid-item>
              <van-grid-item :icon="data.camp2Img" :text="data.camp2Name" />
            </van-grid>
          </template>
        </van-cell>
        <van-cell :title="playerShare.title" is-link to="bp" />
      </van-cell-group>
    </div>
    <AppBottomTabbar />
  </div>
</template>

<style>
div.match
  div.van-grid-item__content.van-grid-item__content--center
  span.van-grid-item__text {
  font-weight: 600;
}

i.van-icon.van-grid-item__icon img.van-icon__image {
  border-radius: 100%;
  width: 40px;
  height: 40px;
}
</style>

<style scoped>
.bp-home {
  text-align: left;
}

.match-time {
  font-size: 12px;
}

.match-des {
  font-size: 10px;
}

.match-vs {
  color: #969799;
}
</style>

<script>
export default {
  name: "BpHome",
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data() {
    return {
      match: {
        title: "查看更多",
        list: [
          {
            camp1Img:
              "https://p.qpic.cn/sign_up17/0/9ee90d6340da4a19855df4e2b5b5c70e/0",
            camp1Name: "成都AG",
            camp2Img:
              "https://p.qpic.cn/sign_up17/0/e020d7c560b3f9acd3d6e64e2cc18bed/0",
            camp2Name: "南京Hero",
            bo: 5,
            time: "昨天 20:00"
          },
          {
            camp1Img:
              "https://p.qpic.cn/sign_up17/0/d21a9b7c6ae284cd291dca60a5dafcca/0",
            camp1Name: "RNG.M",
            camp2Img:
              "https://p.qpic.cn/sign_up17/0/309054a239b5693c3830acad662976af/0",
            camp2Name: "RW侠",
            bo: 5,
            time: "昨天 18:00"
          },
          {
            camp1Img:
              "https://p.qpic.cn/sign_up17/0/9bbfa0f7ef8413c31fff4ee79d54848d/0",
            camp1Name: "GK",
            camp2Img:
              "https://p.qpic.cn/sign_up17/0/494287de3372f42536bcaf85a6a75e99/0",
            camp2Name: "VG",
            bo: 5,
            time: "昨天 15:00"
          }
        ]
      },
      playerShare: {
        title: "测试",
        list: [
          {
            camp1Img:
              "https://q.qlogo.cn/headimg_dl?dst_uin=710555780&spec=100",
            camp1Name: "小年叔叔",
            camp2Img:
              "https://q.qlogo.cn/headimg_dl?dst_uin=962788984&spec=100",
            camp2Name: "奇迹后花园",
            bo: 7,
            time: "明天 12:30",
            des: "后攻又着火了！！"
          },
          {
            camp1Img:
              "https://q.qlogo.cn/headimg_dl?dst_uin=947065098&spec=100",
            camp1Name: "苏苏",
            camp2Img:
              "https://q.qlogo.cn/headimg_dl?dst_uin=1851699048&spec=100",
            camp2Name: "OnlyReol.",
            bo: 7,
            time: "今天 17:30",
            des: "姜子牙 solo"
          },
          {
            camp1Img: "https://q.qlogo.cn/headimg_dl?dst_uin=50371140&spec=100",
            camp1Name: "舍得打我吗",
            camp2Img:
              "https://q.qlogo.cn/headimg_dl?dst_uin=947065098&spec=100",
            camp2Name: "我也还是个孩子呢",
            bo: 7,
            time: "今天 14:50"
          },
          {
            camp1Img:
              "https://q.qlogo.cn/headimg_dl?dst_uin=962788984&spec=100",
            camp1Name: "奇迹后花园",
            camp2Img:
              "https://q.qlogo.cn/headimg_dl?dst_uin=710555780&spec=100",
            camp2Name: "小年叔叔",
            bo: 7,
            time: "前天 12:30",
            des: "后攻着火了！"
          },
          {
            camp1Img: null,
            camp1Name: "美少女战队",
            camp2Img: null,
            camp2Name: "钢铁直男队",
            bo: 3,
            time: "03-20 21:30",
            des: "直男被美少女吊打？"
          }
        ]
      }
    };
  },
  mounted() {
    this.$message.info("正在重写，原始入口在左上角");
  },
  methods: {}
};
</script>