<template>
  <div class="ranking-gradient">
    <div
      v-if="$appConfigInfo.appInfo.isReadme == 1"
      class="ranking-84b60dc869cf54a3d2112e59c70ce21f"
    >
      <!-- T 0 -->
      <div class="ranking-5d6884d8590d15bb78e1f71eacd590fd">
        <van-cell-group
          :border="false"
          class="ranking-1ac6534055d3b55bd4340435430b314d"
        >
          <template #title>
            T<span
              :style="{ color: 'red !important', fontSize: '30px' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >0</span
            >
            &nbsp;
            <span
              class="ranking-3605ac8c437e0c5eb801c76edfd6fb43 ranking-b4ba22aa4e7d0527ad550251603c5355"
            >
              <a-popover trigger="click" placement="bottomRight">
                <span class="ranking-0423cce7314e9aa98f20a3c55124479b">
                  非禁必选 <van-icon name="question-o" />
                </span>
                <template slot="content">
                  <span>
                    在极高的禁选率和胜率加持下，有着版本最顶尖的强度，熟练后可直接无脑选用
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="tableData.result.rows[0].length > 0">
              <li
                v-for="(data, index) in showInfo.tableData.result[0].rows"
                :key="'ranking-9caaa62de8e92fdabd24dbed8b94e965-' + index"
                @click="onHeroClick(data)"
              >
                <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                  <ChartsHeroCircle
                    :progressData="progressData.result.rows[data.id]"
                  />
                </lazy-component>
                <img
                  v-lazy="{
                    src: '/img/icons-hero/' + data.id + '.jpg',
                    error: data.img,
                  }"
                  width="50"
                  height="50"
                  class="app-border-radius"
                />
                <img
                  v-if="data.trend > 0"
                  v-lazy="'/img/icons-app/hot_' + data.trend + '.png'"
                  width="15"
                  height="15"
                  class="ranking-e49cd5784f7893174dadee338fd0e61b"
                />
                <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                  <img
                    v-lazy="{
                      src: '/img/icons-skill/' + data.skill[0].id + '.jpg',
                      error: data.skill[0].img,
                    }"
                    :style="{ left: '-10px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
                  />
                  <span
                    :style="{
                      textAlign: 'left',
                      left: '-11px',
                      marginTop: '-5px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-043052eea2d064cab23119e56f4f640e"
                  >
                    {{ data.skill[0].pickRate }}%
                  </span>
                  <img
                    v-lazy="{
                      src: '/img/icons-equipment/' + data.skill[1].id + '.jpg',
                      error: data.skill[1].img,
                    }"
                    :style="{ left: '45px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
                  />
                  <span
                    :style="{
                      textAlign: 'right',
                      left: '11px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-dabb6e25dffefe5b4821b7062afbdaef"
                  >
                    {{ data.skill[1].pickRate }}%
                  </span>
                </div>
              </li>
              <li
                v-if="tableData.result.rows[0].length > 7"
                @click="onMoreClick(0)"
              >
                <span class="ranking-a45fb50775b608a28b2c7948f5c9fbbe">
                  {{ showInfo.tableData.result[0].text }}
                </span>
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">
              {{ $t("none") }}
            </div>
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
              :style="{ color: '#fa8072 !important' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >0.5</span
            >
            &nbsp;
            <span
              class="ranking-3605ac8c437e0c5eb801c76edfd6fb43 ranking-b4ba22aa4e7d0527ad550251603c5355"
            >
              <a-popover trigger="click" placement="bottomRight">
                <span class="ranking-0423cce7314e9aa98f20a3c55124479b">
                  一人之下 <van-icon name="question-o" />
                </span>
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
            <ul v-if="tableData.result.rows[1].length > 0">
              <li
                v-for="(data, index) in showInfo.tableData.result[1].rows"
                :key="'ranking-6c7fc172ca71bccc83ee1c5491d3ba7e-' + index"
                @click="onHeroClick(data)"
              >
                <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                  <ChartsHeroCircle
                    :progressData="progressData.result.rows[data.id]"
                  />
                </lazy-component>
                <img
                  v-lazy="{
                    src: '/img/icons-hero/' + data.id + '.jpg',
                    error: data.img,
                  }"
                  width="50"
                  height="50"
                  class="app-border-radius"
                />
                <img
                  v-if="data.trend > 0"
                  v-lazy="'/img/icons-app/hot_' + data.trend + '.png'"
                  width="15"
                  height="15"
                  class="ranking-e49cd5784f7893174dadee338fd0e61b"
                />
                <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                  <img
                    v-lazy="{
                      src: '/img/icons-skill/' + data.skill[0].id + '.jpg',
                      error: data.skill[0].img,
                    }"
                    :style="{ left: '-10px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
                  />
                  <span
                    :style="{
                      textAlign: 'left',
                      left: '-11px',
                      marginTop: '-5px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-043052eea2d064cab23119e56f4f640e"
                  >
                    {{ data.skill[0].pickRate }}%
                  </span>
                  <img
                    v-lazy="{
                      src: '/img/icons-equipment/' + data.skill[1].id + '.jpg',
                      error: data.skill[1].img,
                    }"
                    :style="{ left: '45px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
                  />
                  <span
                    :style="{
                      textAlign: 'right',
                      left: '11px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-dabb6e25dffefe5b4821b7062afbdaef"
                  >
                    {{ data.skill[1].pickRate }}%
                  </span>
                </div>
              </li>
              <li
                v-if="tableData.result.rows[1].length > 7"
                @click="onMoreClick(1)"
              >
                <span class="ranking-a45fb50775b608a28b2c7948f5c9fbbe">
                  {{ showInfo.tableData.result[1].text }}
                </span>
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">
              {{ $t("none") }}
            </div>
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
              :style="{ color: 'orange !important' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >1</span
            >
            &nbsp;
            <span
              class="ranking-3605ac8c437e0c5eb801c76edfd6fb43 ranking-b4ba22aa4e7d0527ad550251603c5355"
            >
              <a-popover trigger="click" placement="bottomRight">
                <span class="ranking-0423cce7314e9aa98f20a3c55124479b">
                  强势英雄 <van-icon name="question-o" />
                </span>
                <template slot="content">
                  <span>
                    是队伍的中坚力量，具有左右胜利的实力，一般需要依阵容搭配使用
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="tableData.result.rows[2].length > 0">
              <li
                v-for="(data, index) in showInfo.tableData.result[2].rows"
                :key="'ranking-5f877badb957977895f414293d3b13ca-' + index"
                @click="onHeroClick(data)"
              >
                <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                  <ChartsHeroCircle
                    :progressData="progressData.result.rows[data.id]"
                  />
                </lazy-component>
                <img
                  v-lazy="{
                    src: '/img/icons-hero/' + data.id + '.jpg',
                    error: data.img,
                  }"
                  width="50"
                  height="50"
                  class="app-border-radius"
                />
                <img
                  v-if="data.trend > 0"
                  v-lazy="'/img/icons-app/hot_' + data.trend + '.png'"
                  width="15"
                  height="15"
                  class="ranking-e49cd5784f7893174dadee338fd0e61b"
                />
                <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                  <img
                    v-lazy="{
                      src: '/img/icons-skill/' + data.skill[0].id + '.jpg',
                      error: data.skill[0].img,
                    }"
                    :style="{ left: '-10px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
                  />
                  <span
                    :style="{
                      textAlign: 'left',
                      left: '-11px',
                      marginTop: '-5px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-043052eea2d064cab23119e56f4f640e"
                  >
                    {{ data.skill[0].pickRate }}%
                  </span>
                  <img
                    v-lazy="{
                      src: '/img/icons-equipment/' + data.skill[1].id + '.jpg',
                      error: data.skill[1].img,
                    }"
                    :style="{ left: '45px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
                  />
                  <span
                    :style="{
                      textAlign: 'right',
                      left: '11px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-dabb6e25dffefe5b4821b7062afbdaef"
                  >
                    {{ data.skill[1].pickRate }}%
                  </span>
                </div>
              </li>
              <li
                v-if="tableData.result.rows[2].length > 7"
                @click="onMoreClick(2)"
              >
                <span class="ranking-a45fb50775b608a28b2c7948f5c9fbbe">
                  {{ showInfo.tableData.result[2].text }}
                </span>
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">
              {{ $t("none") }}
            </div>
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
              :style="{ color: '#3d9140 !important' }"
              class="ranking-0eef127325d38ed4804c26bd7c88bab3"
              >2</span
            >
            &nbsp;
            <span
              class="ranking-3605ac8c437e0c5eb801c76edfd6fb43 ranking-b4ba22aa4e7d0527ad550251603c5355"
            >
              <a-popover trigger="click" placement="bottomRight">
                <span class="ranking-0423cce7314e9aa98f20a3c55124479b">
                  体系英雄 <van-icon name="question-o" />
                </span>
                <template slot="content">
                  <span>
                    能在自己的领域内表现卓越，在某些战局中起到主导团队的作用
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="tableData.result.rows[3].length > 0">
              <li
                v-for="(data, index) in showInfo.tableData.result[3].rows"
                :key="'ranking-d9221b65c901ace0d707524657300107-' + index"
                @click="onHeroClick(data)"
              >
                <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                  <ChartsHeroCircle
                    :progressData="progressData.result.rows[data.id]"
                  />
                </lazy-component>
                <img
                  v-lazy="{
                    src: '/img/icons-hero/' + data.id + '.jpg',
                    error: data.img,
                  }"
                  width="50"
                  height="50"
                  class="app-border-radius"
                />
                <img
                  v-if="data.trend > 0"
                  v-lazy="'/img/icons-app/hot_' + data.trend + '.png'"
                  width="15"
                  height="15"
                  class="ranking-e49cd5784f7893174dadee338fd0e61b"
                />
                <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                  <img
                    v-lazy="{
                      src: '/img/icons-skill/' + data.skill[0].id + '.jpg',
                      error: data.skill[0].img,
                    }"
                    :style="{ left: '-10px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
                  />
                  <span
                    :style="{
                      textAlign: 'left',
                      left: '-11px',
                      marginTop: '-5px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-043052eea2d064cab23119e56f4f640e"
                  >
                    {{ data.skill[0].pickRate }}%
                  </span>
                  <img
                    v-lazy="{
                      src: '/img/icons-equipment/' + data.skill[1].id + '.jpg',
                      error: data.skill[1].img,
                    }"
                    :style="{ left: '45px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
                  />
                  <span
                    :style="{
                      textAlign: 'right',
                      left: '11px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-dabb6e25dffefe5b4821b7062afbdaef"
                  >
                    {{ data.skill[1].pickRate }}%
                  </span>
                </div>
              </li>
              <li
                v-if="tableData.result.rows[3].length > 7"
                @click="onMoreClick(3)"
              >
                <span class="ranking-a45fb50775b608a28b2c7948f5c9fbbe">
                  {{ showInfo.tableData.result[3].text }}
                </span>
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">
              {{ $t("none") }}
            </div>
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
              class="ranking-3605ac8c437e0c5eb801c76edfd6fb43 ranking-b4ba22aa4e7d0527ad550251603c5355"
            >
              <a-popover trigger="click" placement="bottomRight">
                <span class="ranking-0423cce7314e9aa98f20a3c55124479b">
                  奇兵英雄 <van-icon name="question-o" />
                </span>
                <template slot="content">
                  <span>
                    有明显的克制关系，优缺点明显，能够在特定的阵容中表现突出
                  </span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="tableData.result.rows[4].length > 0">
              <li
                v-for="(data, index) in showInfo.tableData.result[4].rows"
                :key="'ranking-1147cba48a3152b125e90f67a6838668-' + index"
                @click="onHeroClick(data)"
              >
                <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                  <ChartsHeroCircle
                    :progressData="progressData.result.rows[data.id]"
                  />
                </lazy-component>
                <img
                  v-lazy="{
                    src: '/img/icons-hero/' + data.id + '.jpg',
                    error: data.img,
                  }"
                  width="50"
                  height="50"
                  class="app-border-radius"
                />
                <img
                  v-if="data.trend > 0"
                  v-lazy="'/img/icons-app/hot_' + data.trend + '.png'"
                  width="15"
                  height="15"
                  class="ranking-e49cd5784f7893174dadee338fd0e61b"
                />
                <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                  <img
                    v-lazy="{
                      src: '/img/icons-skill/' + data.skill[0].id + '.jpg',
                      error: data.skill[0].img,
                    }"
                    :style="{ left: '-10px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
                  />
                  <span
                    :style="{
                      textAlign: 'left',
                      left: '-11px',
                      marginTop: '-5px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-043052eea2d064cab23119e56f4f640e"
                  >
                    {{ data.skill[0].pickRate }}%
                  </span>
                  <img
                    v-lazy="{
                      src: '/img/icons-equipment/' + data.skill[1].id + '.jpg',
                      error: data.skill[1].img,
                    }"
                    :style="{ left: '45px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
                  />
                  <span
                    :style="{
                      textAlign: 'right',
                      left: '11px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-dabb6e25dffefe5b4821b7062afbdaef"
                  >
                    {{ data.skill[1].pickRate }}%
                  </span>
                </div>
              </li>
              <li
                v-if="tableData.result.rows[4].length > 7"
                @click="onMoreClick(4)"
              >
                <span class="ranking-a45fb50775b608a28b2c7948f5c9fbbe">
                  {{ showInfo.tableData.result[4].text }}
                </span>
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">
              {{ $t("none") }}
            </div>
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
              class="ranking-3605ac8c437e0c5eb801c76edfd6fb43 ranking-b4ba22aa4e7d0527ad550251603c5355"
            >
              <a-popover trigger="click" placement="bottomRight">
                <span class="ranking-0423cce7314e9aa98f20a3c55124479b">
                  弱势英雄 <van-icon name="question-o" />
                </span>
                <template slot="content">
                  <span>不是绝活哥，不建议上手</span>
                </template>
              </a-popover>
            </span>
          </template>
          <div class="ranking-f155536738c348c9a6e402eb19afa2af">
            <ul v-if="tableData.result.rows[5].length > 0">
              <li
                v-for="(data, index) in showInfo.tableData.result[5].rows"
                :key="'ranking-27799f7b525c8aa54e66ac9d76a0f65e-' + index"
                @click="onHeroClick(data)"
              >
                <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                  <ChartsHeroCircle
                    :progressData="progressData.result.rows[data.id]"
                  />
                </lazy-component>
                <img
                  v-lazy="{
                    src: '/img/icons-hero/' + data.id + '.jpg',
                    error: data.img,
                  }"
                  width="50"
                  height="50"
                  class="app-border-radius"
                />
                <img
                  v-if="data.trend > 0"
                  v-lazy="'/img/icons-app/hot_' + data.trend + '.png'"
                  width="15"
                  height="15"
                  class="ranking-e49cd5784f7893174dadee338fd0e61b"
                />
                <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                  <img
                    v-lazy="{
                      src: '/img/icons-skill/' + data.skill[0].id + '.jpg',
                      error: data.skill[0].img,
                    }"
                    :style="{ left: '-10px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
                  />
                  <span
                    :style="{
                      textAlign: 'left',
                      left: '-11px',
                      marginTop: '-5px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-043052eea2d064cab23119e56f4f640e"
                  >
                    {{ data.skill[0].pickRate }}%
                  </span>
                  <img
                    v-lazy="{
                      src: '/img/icons-equipment/' + data.skill[1].id + '.jpg',
                      error: data.skill[1].img,
                    }"
                    :style="{ left: '45px' }"
                    width="15"
                    height="15"
                    class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
                  />
                  <span
                    :style="{
                      textAlign: 'right',
                      left: '11px',
                    }"
                    class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-dabb6e25dffefe5b4821b7062afbdaef"
                  >
                    {{ data.skill[1].pickRate }}%
                  </span>
                </div>
              </li>
              <li
                v-if="tableData.result.rows[5].length > 7"
                @click="onMoreClick(5)"
              >
                <span class="ranking-a45fb50775b608a28b2c7948f5c9fbbe">
                  {{ showInfo.tableData.result[5].text }}
                </span>
              </li>
            </ul>
            <div v-else class="app-5ddd8715c99cbf00677a622145b3c163">
              {{ $t("none") }}
            </div>
          </div>
        </van-cell-group>
      </div>
    </div>

    <div class="ranking-2862744e5d7cce9d070aa41172557d78">
      英雄梯度模型由
      <span
        :style="{ color: '#1989fa !important' }"
        @click="
          $appPush({ path: '/friends?openId=8701875c7834f26c7794876584c59cd3' })
        "
      >
        @梦归奇迹
      </span>
      提供
      <br />
      梯度排行最后更新：
      <span :style="{ color: 'red !important' }">
        {{ tableData.result.updateTime || "等待更新" }}
      </span>
      <br />
      <br />
      每个人的梯度不一样，仅供参考
      <br />
      <br />
      <span
        :style="{ color: 'orange !important' }"
        @click="
          tableData.result.url
            ? $appOpenUrl(
                $t('open-url.title'),
                null,
                { path: tableData.result.url },
                0
              )
            : null
        "
      >
        {{ tableData.result.title || null }}
      </span>
    </div>

    <div class="ranking-ffab85bb31b6936dee15c689b1581675">
      <van-action-sheet
        v-model="showInfo.skillMenu"
        :title="tableDataRow.name + ' 的其他数据 (近期)'"
      >
        <template #default>
          <van-tabs
            v-model="skillInfo.model"
            v-if="skillInfo.model > -1"
            :ellipsis="false"
            @click="onSkillTabsClick"
          >
            <van-tab title="顺位 (推荐)">
              <HeroBp v-if="skillInfo.model == 0" :heroId="tableDataRow.id" />
            </van-tab>
            <van-tab title="打法 (推荐)">
              <HeroGenreList
                v-if="skillInfo.model == 1"
                :genreId="tableDataRow.id"
              />
            </van-tab>
            <van-tab title="出装 (推荐)">
              <HeroEquipmentListALL
                v-if="skillInfo.model == 2"
                :heroId="tableDataRow.id"
              />
            </van-tab>
            <van-tab title="出装 (单件)">
              <HeroEquipmentListOne
                v-if="skillInfo.model == 3"
                :equipmentId="tableDataRow.id"
                :equipmentType="1"
              />
            </van-tab>
            <van-tab>
              <template #title>
                <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                  国服 (备战)
                </span>
                <img v-lazy="'/img/icons-app/hot.png'" width="13" height="13" />
              </template>

              <HeroInscriptionList
                v-if="skillInfo.model == 4"
                :heroId="tableDataRow.id"
              />
            </van-tab>
            <van-tab
              title="更新调整"
              :to="'/hero/' + tableDataRow.id + '/info?show=heroUpdate'"
            >
            </van-tab>
          </van-tabs>
        </template>
      </van-action-sheet>
    </div>

    <div
      v-show="showInfo.heroSameHobby"
      class="ranking-d742492b2526d57a222af9b54040b3b4"
    >
      <HeroSameHobby :heroId="tableDataRow.id" />
    </div>

    <div class="ranking-2a070514f71e4c264a78b600fc9a8e0d">
      <van-action-sheet
        v-model="showInfo.heroMenu"
        :title="tableDataRow.name + ' (' + tableDataRow.id + ') 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
        @open="onActionOpen"
        @close="onActionClose"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingGradient",
  components: {
    ChartsHeroCircle: () => import("@/components/Charts/HeroCircle.vue"),
    HeroBp: () => import("@/components/Hero/Bp.vue"),
    HeroEquipmentListALL: () =>
      import("@/components/Hero/EquipmentList_All.vue"),
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
    HeroGenreList: () => import("@/components/Hero/GenreList.vue"),
    HeroInscriptionList: () => import("@/components/Hero/InscriptionList.vue"),
    HeroSameHobby: () => import("@/components/Hero/SameHobby.vue"),
    //HeroUpdate: () => import("@/components/Hero/Update.vue"),
  },
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
        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.getRanking(16, newValue.bid, newValue.cid, 0);
          this.getRanking(15);

          setTimeout(() => {
            this.getRankingByT(16, newValue.bid, newValue.cid, 0);
          }, 500);
        }
      },
    },
  },
  data() {
    return {
      tableData: {
        loading: false,
        result: {
          rows: [[], [], [], [], [], []],
        },
      },
      tableDataRow: {
        id: null,
        name: this.$t("loading"),
      },
      progressData: {
        result: {
          rows: [],
        },
      },
      actions: [
        { name: "备战", subname: "学习大神思路", value: 0 },
        { name: "搜一搜", subname: "看看都在聊什么", value: 1 },
        { name: "更新记录", subname: "NGA @EndMP", value: 2 },
        { name: "攻速阈值", subname: "NGA @小熊de大熊", value: 3 },
      ],
      showInfo: {
        tableData: {
          result: [
            {
              length: 7,
              text: "展开",
              rows: [],
            },
            {
              length: 7,
              text: "展开",
              rows: [],
            },
            {
              length: 7,
              text: "展开",
              rows: [],
            },
            {
              length: 7,
              text: "展开",
              rows: [],
            },
            {
              length: 7,
              text: "展开",
              rows: [],
            },
            {
              length: 7,
              text: "展开",
              rows: [],
            },
          ],
        },
        skillMenu: false,
        heroSameHobby: false,
        heroMenu: false,
      },
      tabsInfo: {
        model: 0,
      },
      skillInfo: {
        model: 1,
      },
      tipsInfo: [0, 0, 0, 0, 0, 0],
    };
  },
  methods: {
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        if (aid == 15) {
          this.progressData = ls;
        } else {
          this.tableData = ls;
        }

        return;
      }

      this.tableData.loading = true;

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
            newData = null;

          if (status.code == 200) {
            if (aid == 15) {
              this.progressData = data;
              this.progressData.loading = false;
              this.progressData.updateTime = ts;

              newData = this.progressData;
            } else {
              this.tableData = data;
              this.tableData.loading = false;
              this.tableData.updateTime = ts;

              //this.$refs.refDianFengSai.loadData(data.result.rows);

              newData = this.tableData;
            }

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              newData
            );

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });

      if (bid == 3 && cid == 0) {
        this.$message.info(this.$appMsg.info[1011]);
      }
    },
    getRankingByT: function (aid = 0, bid = 0, cid = 0, did = 0) {
      let ls = this.$appGetLocalStorage(
        "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
      );

      if (!ls) {
        return;
      } else {
        this.tableData.result.rows = [[], [], [], [], [], []];
      }

      ls.result.rows.map((x) => {
        let gradientIndex = null;

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

        if (x.gradient < 0 || x.gradient > 5) {
          //
        } else {
          this.tableData.result.rows[gradientIndex].push(x);
        }
      });

      this.showInfo.tableData.result[0].rows =
        this.tableData.result.rows[0].slice(0, 7);
      this.showInfo.tableData.result[1].rows =
        this.tableData.result.rows[1].slice(0, 7);
      this.showInfo.tableData.result[2].rows =
        this.tableData.result.rows[2].slice(0, 7);
      this.showInfo.tableData.result[3].rows =
        this.tableData.result.rows[3].slice(0, 7);
      this.showInfo.tableData.result[4].rows =
        this.tableData.result.rows[4].slice(0, 7);
      this.showInfo.tableData.result[5].rows =
        this.tableData.result.rows[5].slice(0, 7);
    },
    onHeroClick: function (data) {
      this.tableDataRow = data;

      this.showInfo.heroMenu = true;
    },
    onMoreClick: function (t) {
      let tableDataRows = this.tableData.result.rows[t];

      if (this.showInfo.tableData.result[t].length == 7) {
        this.showInfo.tableData.result[t].rows = tableDataRows;
        this.showInfo.tableData.result[t].length = tableDataRows.length;
        this.showInfo.tableData.result[t].text = "收起";
      } else {
        this.showInfo.tableData.result[t].rows = tableDataRows.slice(0, 7);
        this.showInfo.tableData.result[t].length = 7;
        this.showInfo.tableData.result[t].text = "展开";
      }
    },
    onSkillTabsClick: function (e) {
      let tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1014];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 3) {
        tipsText = this.$appMsg.info[1009];
      } else if (e == 4) {
        tipsText = this.$appMsg.info[1010];
      } else if (e == 5) {
        tipsText = this.$appMsg.info[1028];
      }

      if (tipsText && this.tipsInfo[e] == 0) {
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
    onActionOpen: function () {
      this.showInfo.heroSameHobby = true;
    },
    onActionClose: function () {
      this.showInfo.heroSameHobby = false;
    },
    onActionSheetSelect: function (item) {
      let heroInfo = this.tableDataRow;

      if (item.value == 0) {
        //this.$appPush({
        //path: "/hero/" + heroInfo.id + "/info",
        //});
        this.showInfo.skillMenu = true;
      }

      if (item.value == 1) {
        this.$appPush({
          path: "/search",
          query: {
            q: heroInfo.name,
            refresh: 1,
          },
        });
      }

      /*
        if (item.value == 1) {
          this.$appPush({ path: "/hero/" + heroInfo.id + "/equipment" });
        }
      */

      if (item.value == 2) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "NGA @EndMP",
          {
            path: "//ngabbs.com/read.php?pid=" + heroInfo.updateId,
          },
          0
        );
      }

      if (item.value == 3) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "NGA @小熊de大熊",
          {
            path: "//ngabbs.com/read.php?tid=12677614",
          },
          0
        );
      }
    },
  },
};
</script>

<style scoped lang="less">
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

span.ranking-a45fb50775b608a28b2c7948f5c9fbbe {
  margin-left: 12px;
  margin-top: 17px;
  position: absolute;
}

div.ranking-f155536738c348c9a6e402eb19afa2af {
  margin: 5px 10px 0 10px;
  overflow: hidden;

  li {
    float: left;
    margin: 5px 25px 15px 10px;
    text-align: center;
  }
}

div.ranking-gradient {
  background-color: white;
  margin: 25px 0;
}

div.ranking-84b60dc869cf54a3d2112e59c70ce21f {
  text-align: @app-text-align;
}
</style>