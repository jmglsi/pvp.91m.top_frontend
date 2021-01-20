<template>
  <div class="search-home">
    <div class="search-9420e49425fc3d6dcfe7b9f8d62b1b6b">
      <van-search
        v-model="search.value"
        :placeholder="search.placeholder"
        shape="round"
        @input="onClearInputData"
        @clear="onClearInputData"
        @cancel="$router.go(-1)"
        show-action
      >
        <template #action>
          <div @click="onSearch(search.value)">
            {{ search.value ? "搜索" : "取消" }}
          </div>
        </template>
      </van-search>
    </div>

    <div v-show="!search.value" class="search-843c48c53bd40c7f476497c030fb0e92">
      <div class="search-4b9ca1bc335daf2e137b6c468a2c39b4">
        <div class="search-3c00205f941124762c6c5e000e7e2bde">
          <van-cell-group
            :border="false"
            title="热门推荐"
            class="search-dea6590081d28a153cc325fdaeb10c43"
          >
            <van-grid :border="false" :column-num="2">
              <van-grid-item
                v-for="(data, index) in tableData.search.hotRecommend"
                :key="'search-fb90ed45d99ca42494069dff99f2d9d0-' + index"
                @click="onSearch(data)"
              >
                <span class="search-8fd6a51f93ef7b5379535e63a5e071cd"
                  ><span
                    class="search-f43418d85f50da28b3a9c1e780237105"
                    :style="index < 4 ? { color: 'red' } : {}"
                    >{{ index + 1 }}</span
                  >&nbsp;
                  <span class="search-4eb6182d96f5f9cf7e7e0282ddca8e80">{{
                    data
                  }}</span></span
                >
              </van-grid-item>
            </van-grid>
          </van-cell-group>
        </div>

        <div
          v-show="showInfo.searchHistory == true"
          class="search-a79b6044b2b3a5a9bce4cb65bd80e774"
        >
          <van-cell-group
            :border="false"
            title="历史搜索"
            class="search-827ba321df0f99b511a783406dd7e82f"
          >
            <div class="search-88cf8ac86e2afc51906e60c7025f522b">
              <van-tag
                v-for="(data, index) in tableData.search.history"
                :key="'search-167cdfdc117a16ef2b47014355f7daad-' + index"
                size="medium"
                color="#ffe1e1"
                text-color="#ad0000"
                @click="onSearch(data)"
                class="search-34690b06683636425980897b6bcd33d4"
                >{{ data }}</van-tag
              >
            </div>
            <div class="search-93aea4a321bd36aefe85b2b0526e52e8">
              <van-button
                round
                @click="onClearSearchData"
                icon="clear"
                size="small"
                type="danger"
                >清除历史搜索</van-button
              >
            </div>
          </van-cell-group>
        </div>
      </div>
    </div>

    <div
      v-show="showInfo.searchData"
      class="search-db4665e1908869c6354106ce00ff95ba"
    >
      <van-cell-group
        :border="false"
        title=""
        class="search-7eb8c85291f87604bb87a151d0dc5d88"
      >
        <van-cell
          v-for="(data, index) in tableData.result.rows"
          :key="'search-4047b92d726d15c081d00f3520c76b5b-' + index"
          :title="data.title"
          :value="data.value"
          :is-link="data.isLink"
          :to="data.to"
          :url="data.url"
        />
      </van-cell-group>
    </div>

    <AppBottomTabbar height="100px" />
  </div>
</template>

<style>
@import url("/css/app-style/search.css");
</style>

<script>
export default {
  name: "SearchHome",
  components: {
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  data() {
    return {
      search: {
        data: this.$cookie.get("searchData") || "",
        value: this.$route.query.q || "",
        placeholder: "搜索",
      },
      tableData: {
        search: {
          history: [],
          hotRecommend: [],
          placeholder: [],
        },
        result: {
          rows: [],
        },
      },
      showInfo: {
        searchData: false,
        searchHistory: true,
      },
    };
  },
  mounted() {
    this.onSearch(this.search.value);

    setInterval(() => {
      let text = this.tableData.search.placeholder;

      this.search.placeholder = text[Math.floor(Math.random() * text.length)];
    }, 5000);
  },
  methods: {
    onSearch: function (value) {
      this.search.value = value.toString();

      this.getSearch(value);

      if (value) {
        this.showInfo.searchData = true;
        this.showInfo.searchHistory = false;
        this.addSearchData(value);

        this.$appPush({ query: { q: value } });
      }
    },
    getSearch: function (value) {
      this.$axios
        .post(
          this.$appApi.pvp.getSearch,
          this.$qs.stringify({
            q: value,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          this.tableData = data;

          if (status.code == 200) {
            if (value && data.result.rows.length == 0) {
              this.$message.warning(this.$appMsg.warning[1003]);
            }

            this.initSearchHistory();
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    initSearchHistory: function () {
      let searchData = this.$cookie.get("searchData");

      searchData
        ? (this.tableData.search.history = searchData.split(",").reverse())
        : (this.tableData.search.history = []);
    },
    addSearchData: function (value) {
      let searchData = this.$cookie.get("searchData"),
        setValue = searchData;

      if (!searchData) {
        setValue = value;
      } else if (searchData.indexOf(value) == -1) {
        setValue = searchData + "," + value;
      }

      this.$cookie.set("searchData", setValue, { expires: "1Y" });
    },
    onClearSearchData: function () {
      this.$cookie.delete("searchData");

      this.search.data = "";
      this.showInfo.searchData = false;
      this.tableData.search.history = [];
      this.showInfo.searchHistory = false;

      this.$message.success(this.$appMsg.success[1000]);
    },
    onClearInputData: function () {
      if (this.search.value.length == 0) {
        this.showInfo.searchData = false;
        this.showInfo.searchHistory = true;
        this.initSearchHistory();

        this.$appPush({ path: "/search" });
      }
    },
  },
};
</script>