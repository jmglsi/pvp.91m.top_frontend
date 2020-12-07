<template>
  <div v-show="sameHobbyData.result.rows.length > 0" class="hero-same-hobby">
    <div
      class="app-a931c759bf506211221c0cc099e8d1c2 app-6bdc6915ee08058392eafe0ef6e353fd app-9b9faf4e737f5907995f767e0b345dab"
    >
      <ul
        class="app-d865b50ce307751bdeb9a6ab16e7baf9 hero-same-hobby-e35a6eccbb664dddb48bb07bb1e2d7b7"
      >
        <li
          v-for="(data, index) in sameHobbyData.result.rows"
          :key="'hero-same-hobby-418bbf1206aab9cb337c42b4d2c1d6ec-' + index"
          class="app-1951b6e7c82938dd7446a41e829b247b"
          @click="
            $router.push({ path: '/friends', query: { openId: data.openId } })
          "
        >
          <img
            v-if="data.fightPowerIcon"
            v-lazy="data.fightPowerIcon"
            width="35"
            height="35"
            class="hero-same-hobby-b388f78be6e273d6af7956cd2ae3c767"
          />
          <img
            width="75"
            height="75"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=' + data.uin + '&spec=640'"
            class="app-4ab161130e76571ab0c31aa23a6238c7"
          />
          <div class="hero-same-hobby-913efcd4d0c3a78c5794f0967fdeda4b">
            {{ data.name }}
          </div>
        </li>
      </ul>

      <div class="hero-same-768072e388401bba973734e004d2ac51">
        <van-button
          round
          icon="replay"
          color="#000000"
          size="mini"
          class="hero-same-hobby-14c32e76fd7b6f33de94027b74bbc3fb"
          @click="getHeroByWebAccount(heroId, 1)"
          >刷新</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSameHobby",
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId } = this;
      return { heroId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        this.getHeroByWebAccount(newValue.heroId, 0);
      },
    },
  },
  data() {
    return {
      sameHobbyData: {
        result: {
          rows: [],
        },
      },
    };
  },
  methods: {
    getHeroByWebAccount: function (heroId, tips) {
      this.axios
        .get(this.apiList.pvp.getHeroByWebAccount + "&heroId=" + heroId)
        .then((res) => {
          this.sameHobbyData = res.data.data;

          if (tips == 1) this.$message.success("刷新成功");
        });
    },
  },
};
</script>