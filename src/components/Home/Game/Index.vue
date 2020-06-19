<template>
  <div class="game-home">
    <div class="game-c8d46d341bea4fd5bff866a65ff8aea9">
      <van-cell-group title="官方赛事">
        <van-cell
          v-for="(data, index) in homeInfo.official.list"
          :border="false"
          :key="'official-c8d46d341bea4fd5bff866a65ff8aea9-' + index"
          @click="onCellClick(data.id)"
        >
          <template #title>
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                :icon="data.campImg_1"
                :text="data.campName_1"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
              <van-grid-item>
                <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.time}}</span>
                <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
                <span class="game-0ecee728bf87a4c1a02883004044dcd5">{{ data.des }}</span>
              </van-grid-item>
              <van-grid-item
                :icon="data.campImg_2"
                :text="data.campName_2"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
            </van-grid>
          </template>
        </van-cell>
        <van-cell
          :title="homeInfo.official.title"
          is-link
          :to="{ path: '/game/more', query: { type: 1, from: 'ccc8489cba9340b41fa6e4a50f528cef' } }"
        />
      </van-cell-group>

      <van-cell-group title="玩家分享">
        <van-cell
          v-for="(data, index) in homeInfo.player.list"
          :border="false"
          :key="'player-c8d46d341bea4fd5bff866a65ff8aea9-' + index"
          @click="onCellClick(data.id)"
        >
          <template #title>
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                :icon="data.campImg_1"
                :text="data.campName_1"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
              <van-grid-item>
                <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.time}}</span>
                <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
                <span class="game-0ecee728bf87a4c1a02883004044dcd5">{{ data.des }}</span>
              </van-grid-item>
              <van-grid-item
                :icon="data.campImg_2"
                :text="data.campName_2"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
            </van-grid>
          </template>
        </van-cell>
        <van-cell
          :title="homeInfo.player.title"
          is-link
          :to="{ path: '/game/more', query: { type: 2, from: 'ccc8489cba9340b41fa6e4a50f528cef' } }"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style>
div.game-c8d46d341bea4fd5bff866a65ff8aea9
  div.van-grid-item__content.van-grid-item__content--center
  span.van-grid-item__text {
  font-weight: 600;
}

div.game-447b7147e84be512208dcc0995d67ebc
  i.van-icon.van-grid-item__icon
  img.van-icon__image {
  border-radius: 100%;
  width: 40px;
  height: 40px;
}
</style>

<style scoped>
.game-home {
  text-align: left;
}

.game-07cc694b9b3fc636710fa08b6922c42b {
  font-size: 12px;
}

.game-0ecee728bf87a4c1a02883004044dcd5 {
  font-size: 10px;
}

.game-f4842dcb685d490e2a43212b8072a6fe {
  color: #969799;
}
</style>

<script>
export default {
  name: "GameHome",
  data() {
    return {
      homeInfo: {
        official: {
          title: "查看更多",
          list: [
            {
              id: "9ee90e020d",
              campImg_1:
                "https://game.gtimg.cn/images/datamore/kingwatch/private/KPLALL/GuildALL/44.png",
              campName_1: "TS",
              campImg_2:
                "https://game.gtimg.cn/images/datamore/kingwatch/private/KPLALL/GuildALL/26.png",
              campName_2: "EDG.M",
              bo: 5,
              time: "05-24 18:41:00"
            },
            {
              id: "d21a930905",
              campImg_1:
                "https://p.qpic.cn/sign_up17/0/d21a9b7c6ae284cd291dca60a5dafcca/0",
              campName_1: "RNG.M",
              campImg_2:
                "https://p.qpic.cn/sign_up17/0/309054a239b5693c3830acad662976af/0",
              campName_2: "RW侠",
              bo: 5,
              time: "03-22 18:00"
            },
            {
              id: "9bbfa49428",
              campImg_1:
                "https://p.qpic.cn/sign_up17/0/9bbfa0f7ef8413c31fff4ee79d54848d/0",
              campName_1: "GK",
              campImg_2:
                "https://p.qpic.cn/sign_up17/0/494287de3372f42536bcaf85a6a75e99/0",
              campName_2: "VG",
              bo: 5,
              time: "03-22 15:00"
            }
          ]
        },
        player: {
          title: "测试",
          list: [
            {
              campImg_1:
                "https://q.qlogo.cn/headimg_dl?dst_uin=710555780&spec=100",
              campName_1: "小年叔叔",
              campImg_2:
                "https://q.qlogo.cn/headimg_dl?dst_uin=962788984&spec=100",
              campName_2: "奇迹后花园",
              bo: 7,
              time: "明天 12:30",
              des: "后攻又着火了！！"
            },
            {
              campImg_1:
                "https://q.qlogo.cn/headimg_dl?dst_uin=947065098&spec=100",
              campName_1: "苏苏",
              campImg_2:
                "https://q.qlogo.cn/headimg_dl?dst_uin=1851699048&spec=100",
              campName_2: "OnlyReol.",
              bo: 7,
              time: "今天 17:30",
              des: "姜子牙 solo"
            },
            {
              campImg_1:
                "https://q.qlogo.cn/headimg_dl?dst_uin=50371140&spec=100",
              campName_1: "舍得打我吗",
              campImg_2:
                "https://q.qlogo.cn/headimg_dl?dst_uin=947065098&spec=100",
              campName_2: "我也还是个孩子呢",
              bo: 7,
              time: "今天 14:50"
            },
            {
              campImg_1:
                "https://q.qlogo.cn/headimg_dl?dst_uin=962788984&spec=100",
              campName_1: "奇迹后花园",
              campImg_2:
                "https://q.qlogo.cn/headimg_dl?dst_uin=710555780&spec=100",
              campName_2: "小年叔叔",
              bo: 7,
              time: "03-22 12:30",
              des: "后攻着火了！"
            },
            {
              campImg_1: null,
              campName_1: "美少女战队",
              campImg_2: null,
              campName_2: "钢铁直男队",
              bo: 3,
              time: "03-20 21:30",
              des: "直男被美少女吊打？"
            }
          ]
        }
      }
    };
  },
  methods: {
    onCellClick: function(e) {
      this.$router.push({
        path: "/game/" + e,
        query: { from: "f34f122844890855d125cdfccd6bc973" }
      });
    }
  }
};
</script>