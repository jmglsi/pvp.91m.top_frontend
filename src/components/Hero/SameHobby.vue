<template>
  <div class="hero-same-hobby">
    <div
      class="app-a931c759bf506211221c0cc099e8d1c2 app-6bdc6915ee08058392eafe0ef6e353fd app-9b9faf4e737f5907995f767e0b345dab"
    >
      <div class="hero-1a67ccb40b81a7318620c55405993a5d">
        <ul
          class="app-d865b50ce307751bdeb9a6ab16e7baf9 hero-e35a6eccbb664dddb48bb07bb1e2d7b7"
        >
          <li
            v-for="(data, index) in tableData.result.rows"
            :key="'hero-c0fbe3299b9f6d7787c3c413f35fbfae-' + index"
            class="app-1951b6e7c82938dd7446a41e829b247b"
            @click="$appPush({ path: data.to })"
          >
            <div :style="{ position: 'relative' }">
              <img
                v-if="data.fightPowerIcon"
                v-lazy="data.fightPowerIcon"
                width="55"
                height="45"
                class="hero-b388f78be6e273d6af7956cd2ae3c767"
              />
              <img
                v-lazy="data.img"
                width="75"
                height="75"
                class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7"
              />
              <div class="hero-913efcd4d0c3a78c5794f0967fdeda4b">
                {{ data.name }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div
        class="hero-a6c4ccf6f4e422e8df37fc7a1b93e07c app-52b0e5c90604d59d1814f184d58e2033"
      >
        <van-button
          round
          icon="replay"
          color="#000000"
          size="mini"
          class="hero-14c32e76fd7b6f33de94027b74bbc3fb"
          @click="getHeroInfoByWebAccountList(heroId, 1)"
        >
          {{ $t("refresh") }}
        </van-button>
        &nbsp;
        <van-button
          round
          icon="question-o"
          type="danger"
          size="mini"
          class="hero-14c32e76fd7b6f33de94027b74bbc3fb"
          @click="
            $appPush({
              path: '/search',
              query: {
                q: '国服认证',
                refresh: 1,
              },
            })
          "
        >
          {{ $t("authenticate") }}
        </van-button>
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
        if (!newValue.heroId) return;

        this.getHeroInfoByWebAccountList(newValue.heroId, 0);
      },
    },
  },
  data() {
    return {
      tableData: {
        result: {
          rows: [],
        },
      },
    };
  },
  methods: {
    getHeroInfoByWebAccountList: function (heroId, tipsType) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage("heroSameHobby-" + heroId);

      if (
        ls &&
        ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout &&
        tipsType == 0
      ) {
        this.tableData = ls;

        return;
      }

      this.$axios
        .post(
          this.$appApi.app.getHeroInfoByWebAccountList + "&heroId=" + heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage("heroSameHobby-" + heroId, this.tableData);

            if (tipsType == 1)
              this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
div.hero-same-hobby {
  text-align: center;
}

img.hero-b388f78be6e273d6af7956cd2ae3c767 {
  border-radius: unset;
  margin-left: -5px;
  margin-top: -13px;
  position: absolute;
}

div.hero-1a67ccb40b81a7318620c55405993a5d {
  height: 110px;
  overflow: hidden;

  ul.hero-e35a6eccbb664dddb48bb07bb1e2d7b7 {
    height: 135px;
    width: 100%;

    div.hero-913efcd4d0c3a78c5794f0967fdeda4b {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}

div.hero-a6c4ccf6f4e422e8df37fc7a1b93e07c {
  margin-top: 5px;
}
</style>