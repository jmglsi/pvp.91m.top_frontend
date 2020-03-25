<template>
  <div class="home">
    <van-swipe :autoplay="5000" :style="swipeStyle" class="home-swipe">
      <van-swipe-item v-for="(data, index) in homeInfo.swipe.list" :key="index + '-img'">
        <a :href="data.url" target="_bank">
          <img width="100%" height="200" v-lazy="data.img" style="object-fit: cover;" />
        </a>
        <van-tag
          mark
          v-if="data.type > 0"
          :color="data.tag.color"
          class="home-swipe-text"
        >{{ data.tag.text }}</van-tag>
      </van-swipe-item>
    </van-swipe>

    <div @click="calendarShow = true" class="home-title">
      <AppCalendar width="25" height="25" style="margin-right: 5px;" />
      <span style="position: absolute;font-size: 25px;margin-top: -4px;">动态</span>
    </div>

    <div class="home-dayTag">
      <van-loading class="home-loading" v-show="loadingShow" />
      <a-timeline v-show="!loadingShow">
        <a-timeline-item
          v-for="(data,index) in homeInfo.dayTag.list"
          :key="index + '-dayTag'"
          :color="data.color"
        >
          <van-tag
            round
            v-if="data.calendarInfo.day"
            :color="data.color"
            @click="calendarShow = true"
          >{{ data.calendarInfo.day }}</van-tag>
          <div v-if="data.url" class="item-title">
            <a :href="data.url" target="_blank">
              <img v-lazy="'/img/app-icons/link_black.png'" class="home-link" />
              {{ data.title }}
            </a>
          </div>
          <div v-else class="item-title" v-html="data.title"></div>
          <div v-if="data.item.length > 0" class="item-data">
            <router-link
              v-for="(id, index) in data.item"
              :key="index + '-data-img-id'"
              :to="{ path: '/hero/' + id + '/info', query: { from: 'dayTag-' + data.calendarInfo.day } }"
            >
              <img
                v-if="id != null"
                v-lazy="'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + id + '/' + id + '.jpg'"
                class="item-data-img-id"
              />
            </router-link>
          </div>
        </a-timeline-item>
      </a-timeline>
      <AppBottomTabbar />
    </div>

    <van-calendar
      :title="homeInfo.dayTag.title"
      :show-confirm="false"
      :formatter="onFormatter"
      :min-date="minDate"
      :max-date="maxDate"
      v-model="calendarShow"
    />

    <span class="home-record">
      <a href="http://beian.miit.gov.cn/" target="_blank" style="color: black;">沪ICP备16031287号-2</a>
    </span>
  </div>
</template>

<style>
.home-link {
  width: 20px;
  margin-top: -3px;
}
</style>

<style scoped>
.home-swipe-text {
  left: 0;
  z-index: 1;
  float: left;
  margin-top: 160px;
  position: absolute;
}

.home-title {
  margin: 20px;
  text-align: left;
  width: 100px;
}

.home-loading {
  text-align: center;
}

.home-dayTag {
  height: 200px;
  text-align: left;
  margin: 0 20px;
}

.item-title {
  margin-top: 10px;
  margin-bottom: 5px;
}

.item-data-img-id {
  width: 50px;
  border-radius: 10px;
  margin-bottom: 3px;
  margin-right: 3px;
}

.home-record {
  font-size: 10px;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 55px;
}
</style>

<script>
export default {
  name: "Home",
  components: {
    AppCalendar: resolve =>
      require(["@/components/AppIcons/AppCalendar.vue"], resolve),
    AppBottomTabbar: resolve =>
      require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data() {
    return {
      loadingShow: true,
      calendarShow: false,
      minDate: new Date(),
      maxDate: new Date(),
      homeInfo: {
        swipe: {
          list: []
        },
        dayTag: {
          title: "",
          list: []
        }
      },
      swipeStyle: {
        marginTop: 0
      }
    };
  },
  mounted() {
    let from = this.$route.query.from;
    if (from) {
      this.$cookie.set("from", from, { expires: "1Y" });
    }

    if (this.$cookie.get("from") == "pwa") {
      this.swipeStyle.marginTop = "-50px";
    }

    this.getHome();
    this.getTime();
  },
  methods: {
    getHome: function() {
      this.axios.get(this.appApi.list.getHome).then(ret => {
        this.homeInfo = ret.data.data;

        setTimeout(() => {
          this.loadingShow = false;
        }, 500);
      });
    },
    getTime: function() {
      let date = new Date();
      this.minDate = new Date(date.setMonth(date.getMonth() - 4));
      this.maxDate = new Date(date.setMonth(date.getMonth() + 5));
    },
    onFormatter: function(day) {
      let oDay =
        day.date.getFullYear() +
        "/" +
        (day.date.getMonth() + 1) +
        "/" +
        day.date.getDate();
      let dayTagList = this.homeInfo.dayTag.list;

      for (let i = 0; i < dayTagList.length; i++) {
        let list = dayTagList[i].calendarInfo;

        if (!list.day) continue;

        if (oDay === list.day) {
          if (list.type == 0) {
            day.bottomInfo = list.text;
            day.className = "dayTag-tyf";
          }

          if (list.type == 1) {
            day.topInfo = list.text;
            day.className = "dayTag-zsf";
          }

          if (list.type == 2) {
            day.text = list.text;
            day.className = "dayTag-xpf";
          }
        }
      }
      return day;
    }
  }
};
</script>