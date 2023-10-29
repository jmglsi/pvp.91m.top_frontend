<template>
  <div class="n-home">
    <div class="n-ccbde4cf0b3d5dfa3b8958124cdf8f05">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        z-index="99999999"
        class="n-7b54c0b5320a9a1b5ba31164e1e6de26"
      >
        <template #left>
          <a-dropdown
            :trigger="['click']"
            overlayClassName="n-fe0b2db606a124fca2e458d677e5e6a7"
          >
            <a @click.prevent>
              <van-icon :color="nowIconColor" :name="nowIconName" size="18" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  :disabled="gameLabel ? false : true"
                  @click="onHomeClick"
                  key="n-top-left-0"
                >
                  <span>返回首页</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item
                  :disabled="gameLabel ? false : true"
                  @click="onSetStatusClick(gameLabel, 1, 1)"
                  key="n-top-left-1"
                >
                  <span>我要报名</span>
                </a-menu-item>
                <a-menu-item
                  :disabled="
                    gameLabel && tableData.myInfo.status != 0 ? false : true
                  "
                  @click="onSetStatusClick(gameLabel, 1, 0)"
                  key="n-top-left-2"
                >
                  <span
                    :style="
                      gameLabel && tableData.myInfo.status != 0
                        ? { color: 'blue' }
                        : {}
                    "
                  >
                    清除状态
                  </span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item
                  :disabled="gameLabel ? false : true"
                  @click="onSetStatusClick(gameLabel, 1, 2)"
                  key="n-top-left-3"
                >
                  <span :style="gameLabel ? { color: 'red' } : {}">
                    我要请假
                  </span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item
                  :disabled="gameLabel ? true : false"
                  @click="openId ? onModalShowClick(2) : null"
                  key="n-top-left-4"
                >
                  <span>{{ openId ? "新建分组" : "请先登录" }}</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
        <template #title>
          <div @click="onTitleClick" class="n-6e52395638ccfaf655bf8c600d8c8044">
            <div class="n-995b1773c816966a6a2fef460a9751f2">
              <span class="n-6938e80e77fe7d0953d2ccbcaeb26df7">
                {{ authorInfo.name }}
              </span>
              <img
                v-if="gameLabel"
                v-lazy="'/img/icons-app/stow.png'"
                width="15"
                height="15"
                class="n-72534a6f0c50503046338e9ce9231d3d"
              />
            </div>
            <div class="n-d172dd0c6361cd74f6194e50bf1ce999">
              {{ authorInfo.description || "这个人很懒，什么都没留下" }}
            </div>
          </div>
        </template>
        <template #right>
          <a-dropdown :trigger="['click']">
            <a @click.prevent>
              <van-icon :color="nowIconColor" name="setting-o" size="18" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item
                  @click="
                    $appOpenUrl(
                      $t('open-url.title'),
                      '查看使用说明',
                      {
                        path: url.question,
                      },
                      0
                    )
                  "
                  key="n-top-right-0"
                >
                  <span style="color: red">使用说明</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item
                  :disabled="
                    gameLabel || homeData.result.rows.myTeam.length > 0
                      ? true
                      : false
                  "
                  @click="onModalShowClick(3)"
                  key="n-top-right-1"
                >
                  <span>新建帮会</span>
                </a-menu-item>
                <a-menu-item
                  :disabled="gameLabel == 'new'"
                  @click="onModalShowClick(1)"
                  key="n-top-right-2"
                >
                  <span>新建角色</span>
                </a-menu-item>
                <a-menu-item @click="onModalShowClick(4)" key="n-top-right-3">
                  <span>导入角色</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item disabled key="n-top-right-4">
                  <!-- :style="gameLabel ? {} : { color: 'blue' }" -->
                  <span> 数据录入 </span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </van-nav-bar>
    </div>

    <div
      class="n-2e270a31625e1ee7b1730f1ef0c4d92e"
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
    >
      <van-pull-refresh
        v-model="showInfo.pullRefresh"
        :disabled="nMode == 'edit' ? true : false"
        @refresh="onPullRefresh"
      >
        <div v-if="!gameLabel" class="n-b4e157ffbfb4ee490b792d5eabfbdac1">
          <div class="n-90ada85d44c24e38318c47b44be27bc8">
            <van-cell-group :border="false" title="我的帮会">
              <div v-if="homeData.result.rows.myTeam.length > 0">
                <van-cell
                  v-for="(data, index) in homeData.result.rows.myTeam"
                  :key="'app-26ad5d9a2b2a9161a4268f8ae740350c-' + index"
                  :icon="data.icon"
                  :title="data.title"
                  :label="data.label"
                  :value="data.value"
                  is-link
                  @click="onTeamListClick(data)"
                />
              </div>
              <div v-else class="n-ad264e30744d4b76ffa84e851e64906e">
                暂无帮会
              </div>
            </van-cell-group>
          </div>

          <div class="n-c135773fcc3610088460b5e8cf829d5c">
            <van-cell-group :border="false" title="我的角色">
              <div v-if="homeData.result.rows.myRole.length > 0">
                <van-cell
                  v-for="(data, index) in homeData.result.rows.myRole"
                  :key="'app-26ad5d9a2b2a9161a4268f8ae740350c-' + index"
                  :icon="data.icon"
                  :label="data.label"
                  :value="data.value"
                  is-link
                  @click="onRoleListClick(data)"
                >
                  <template #title>
                    <img
                      v-lazy="professionInfo.rows[data.nType].icon"
                      width="20"
                      height="20"
                      class="n-efa7b0dee5b54ae0ba3766dcf90b156d"
                    />
                    {{ professionInfo.rows[data.nType].name }}-{{ data.title }}
                  </template>
                </van-cell>
              </div>
              <div v-else class="n-ad264e30744d4b76ffa84e851e64906e">
                暂无角色
              </div>
            </van-cell-group>
          </div>

          <div class="n-fa5a798d6c69dcc44259373f8ffbe37d">
            <van-cell-group :border="false" title="我的分组">
              <div v-if="homeData.result.rows.myEngage.length > 0">
                <van-cell
                  v-for="(data, index) in homeData.result.rows.myEngage"
                  :key="'app-26ad5d9a2b2a9161a4268f8ae740350c-' + index"
                  :icon="data.icon"
                  :title="data.title"
                  :value="data.value"
                  is-link
                  @click="onEngageListClick(data)"
                >
                  <template #label>
                    <div class="n-6cf5e5a50b79366afe6c4b68f0ba7f7c">
                      {{ data.label }}
                    </div>
                  </template>
                </van-cell>
              </div>
              <div v-else class="n-ad264e30744d4b76ffa84e851e64906e">
                暂无分组
              </div>
            </van-cell-group>
          </div>
        </div>

        <div v-else>
          <div class="n-4ff05f4e6819046173bb0bbafac2f638">
            <van-cell-group :border="false" title=" ">
              <van-tabs v-model="campData.model_1">
                <van-tab
                  v-for="(data, index) in professionInfo.rows"
                  :key="'app-26ad5d9a2b2a9161a4268f8ae740350c-' + index"
                >
                  <template #title>
                    <span
                      v-if="data.icon"
                      class="n-dc67a8d07dcdf061c4e02c1793137258"
                    >
                      <img
                        v-lazy="data.icon"
                        width="20"
                        height="20"
                        class="n-f55ecb3f409ffca3564479b48d350533"
                      />
                      &nbsp;
                    </span>
                    <span
                      :style="{ color: 'rgb(' + data.color[0] + ')' }"
                      class="n-0a0aced2a9def01994f24aec79c15122"
                    >
                      {{ index == 0 ? "一团" : data.name }} &nbsp; ({{
                        professionInfo.rows[index].num[0]
                      }})
                    </span>
                  </template>
                </van-tab>
              </van-tabs>

              <van-grid
                :column-num="5"
                class="n-6d1b1ed47d74b1d23d4acf4fbe4da7aa"
              >
                <draggable
                  :list="campData.rows_1"
                  :disabled="nMode == 'edit' ? false : true"
                  @change="onDraggableChange"
                  group="camp"
                  class="n-8a1f9b68723d8f55df1e80295ce6edc2"
                >
                  <van-grid-item
                    v-for="(data, index) in campData.rows_1"
                    :key="'app-310c92dbfb6d706b9f22acb16bc27802-' + index"
                    :style="
                      data.nCamp > 0
                        ? {
                            background:
                              'rgba(0, 0, 0, 0) linear-gradient(to top right, rgb(' +
                              professionInfo.rows[data.nType].color[0] +
                              '), rgb(' +
                              professionInfo.rows[data.nType].color[1] +
                              ')) repeat scroll 0% 0%',
                          }
                        : { background: 'rgba(0, 0, 0)' }
                    "
                    @click="onCampClick(data, 1, index)"
                    class="n-ba0473a8bc744d3eb535e09cef7593bc"
                  >
                    <div class="n-2e18d726e34c59f679fbf74316c67b68">
                      <span class="n-f2a32c26eb3e74db9dc116b7c46b976e">
                        {{
                          data.nCamp > 0
                            ? statusInfo[data.status] + data.nName
                            : "待加入"
                        }}
                      </span>
                    </div>
                    <img
                      v-if="data.nCamp > 0"
                      v-lazy="professionInfo.rows[data.nType].icon"
                      width="20"
                      height="20"
                      class="n-fc4b85d1f8f74bd31ae7eae82cbc2c62"
                    />
                    <div class="n-5a6a603db52c0d61ec14ec297431dcf6" />
                  </van-grid-item>
                </draggable>
              </van-grid>
            </van-cell-group>
          </div>

          <div @click="onEditClick" class="n-0902863a4106c5d389307e2905b7d25c">
            <van-divider
              :style="{
                color: 'gray',
                borderColor: 'gray',
                padding: '0 16px',
                marginTop: '40px',
              }"
            >
              <span style="color: red">
                {{ nMode == "view" ? "访问" : "编辑" }}模式
              </span>
              &nbsp;-&nbsp;
              <span style="color: red">发起人</span>可以编辑表格，点这切换模式
            </van-divider>
          </div>

          <div class="n-4ff05f4e6819046173bb0bbafac2f638">
            <van-cell-group :border="false" title=" ">
              <van-tabs v-model="campData.model_2">
                <van-tab
                  v-for="(data, index) in professionInfo.rows"
                  :key="'app-26ad5d9a2b2a9161a4268f8ae740350c-' + index"
                >
                  <template #title>
                    <span
                      v-if="data.icon"
                      class="n-dc67a8d07dcdf061c4e02c1793137258"
                    >
                      <img
                        v-lazy="data.icon"
                        width="20"
                        height="20"
                        class="n-f55ecb3f409ffca3564479b48d350533"
                      />
                      &nbsp;
                    </span>
                    <span
                      :style="{ color: 'rgb(' + data.color[0] + ')' }"
                      class="n-0a0aced2a9def01994f24aec79c15122"
                    >
                      {{ index == 0 ? "二团" : data.name }} &nbsp; ({{
                        professionInfo.rows[index].num[1]
                      }})
                    </span>
                  </template>
                </van-tab>
              </van-tabs>

              <van-grid
                :column-num="5"
                class="n-6d1b1ed47d74b1d23d4acf4fbe4da7aa"
              >
                <draggable
                  :list="campData.rows_2"
                  :disabled="nMode == 'edit' ? false : true"
                  @change="onDraggableChange"
                  group="camp"
                  class="n-8a1f9b68723d8f55df1e80295ce6edc2"
                >
                  <van-grid-item
                    v-for="(data, index) in campData.rows_2"
                    :key="'app-310c92dbfb6d706b9f22acb16bc27802-' + index"
                    :style="
                      data.nCamp > 0
                        ? {
                            background:
                              'rgba(0, 0, 0, 0) linear-gradient(to top right, rgb(' +
                              professionInfo.rows[data.nType].color[0] +
                              '), rgb(' +
                              professionInfo.rows[data.nType].color[1] +
                              ')) repeat scroll 0% 0%',
                          }
                        : { background: 'rgba(0, 0, 0)' }
                    "
                    @click="onCampClick(data, 2, index)"
                    class="n-ba0473a8bc744d3eb535e09cef7593bc"
                  >
                    <div class="n-2e18d726e34c59f679fbf74316c67b68">
                      <span class="n-f2a32c26eb3e74db9dc116b7c46b976e">
                        {{
                          data.nCamp > 0
                            ? statusInfo[data.status] + data.nName
                            : "待加入"
                        }}
                      </span>
                    </div>
                    <img
                      v-if="data.nCamp > 0"
                      v-lazy="professionInfo.rows[data.nType].icon"
                      width="20"
                      height="20"
                      class="n-fc4b85d1f8f74bd31ae7eae82cbc2c62"
                    />
                    <div class="n-5a6a603db52c0d61ec14ec297431dcf6" />
                  </van-grid-item>
                </draggable>
              </van-grid>
            </van-cell-group>
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <div class="n-87a9bb81f6f08175a42ac985a4ce54eb">
      <van-popup
        v-if="gameLabel"
        v-model="showInfo.popup"
        position="top"
        :style="{ height: '30%' }"
      >
        <div class="n-3f8de12aae28c954ba0ccf610da2a648">
          <div class="n-3a7f5ddf6c68a1694bf9b542e8876835">
            {{ authorInfo.description }}
          </div>
          <van-divider
            :style="{
              color: 'red',
              borderColor: 'red',
              padding: '0 16px',
              marginTop: '20px',
            }"
          >
            点击下方可复制成员信息
          </van-divider>
        </div>
      </van-popup>
    </div>

    <div class="n-f181eb3b0bde73ce2fd279179664f5d6">
      <a-modal
        v-model="showInfo.nModal"
        cancelText="取消"
        okText="确定"
        @ok="onModalOk"
      >
        <template #title>
          <span v-if="showInfo.createRole">新建角色</span>
          <span v-if="showInfo.createEngage">新建分组</span>
          <span v-if="showInfo.createTeam">新建帮会</span>
          <span v-if="showInfo.importRole">导入角色</span>
        </template>

        <div
          v-if="showInfo.createRole"
          class="n-e5a345c45b6de5d26268c141ca23e71e"
        >
          <div class="n-b49c0fe3382293dd045677aa23c9e6a3">
            <van-radio-group
              v-model="editInfo.nType"
              class="n-a505998fe253054b600f54bb9b0ccb55"
            >
              <van-radio
                v-for="(data, index) in professionInfo.rows"
                :key="'app-310c92dbfb6d706b9f22acb16bc27802-' + index"
                :name="index"
                :disabled="index == 0"
                class="n-fcc35edc628651ab30ef10d9f772acf0"
              >
                <span
                  v-if="data.icon"
                  class="n-b483fe2ac957ac59c38b263eaede8dc4"
                >
                  <img
                    v-lazy="data.icon"
                    width="20"
                    height="20"
                    class="n-6fa7b51cbc902afa9e2b83377b97b754"
                  />
                  &nbsp;
                </span>
                <span>{{ index == 0 ? "请选择职业" : data.name }}</span>
              </van-radio>
            </van-radio-group>

            <van-cell-group :border="false">
              <van-field
                v-model="editInfo.nName"
                label="角色 Id"
                placeholder="请输入角色 Id"
                class="n-fce42c651ad31b43c91ec081b2da592d"
              />
              <van-field
                v-model="editInfo.description"
                label="角色描述"
                placeholder="有什么需要备注的吗"
                class="n-fce42c651ad31b43c91ec081b2da592d"
              />
            </van-cell-group>
          </div>
        </div>

        <div
          v-if="showInfo.createEngage"
          class="n-e5a345c45b6de5d26268c141ca23e71e"
        >
          <van-cell-group :border="false">
            <van-field
              v-model="editInfo.description"
              autosize
              show-word-limit
              rows="5"
              type="textarea"
              maxlength="100"
              placeholder="描述内容"
            />
          </van-cell-group>
        </div>

        <div
          v-if="showInfo.createTeam"
          class="n-6dcb5225432681c2dce9ffcfcca81e25"
        >
          <van-cell-group :border="false">
            <van-field
              v-model="editInfo.teamName"
              label="帮会名字"
              placeholder="请输入帮会名字"
              class="n-fce42c651ad31b43c91ec081b2da592d"
            />
          </van-cell-group>
        </div>

        <div
          v-if="showInfo.importRole"
          class="n-6dcb5225432681c2dce9ffcfcca81e25"
        >
          <van-cell-group :border="false">
            <van-field
              v-model="editInfo.roleText"
              :autosize="{ maxHeight: 250 }"
              rows="10"
              type="textarea"
              placeholder="复制 接龙 / 文档 的成员角色到这里，一行一个，建议：【职业】角色 Id"
            />
          </van-cell-group>
        </div>
      </a-modal>
    </div>

    <div class="n-dd4263bf2714071b4dd904e115e09349">
      <van-popup v-model="showInfo.picker" round position="bottom">
        <van-picker
          show-toolbar
          :default-index="$cookie.get('lang-index') || 0"
          :confirm-button-text="$t('confirm')"
          :cancel-button-text="$t('cancel')"
          :columns="columns"
          :swipe-duration="250"
          @confirm="onPickerConfirm"
          @cancel="onPickerCancel"
          title="如何操作"
          ref="refPicker"
        />
      </van-popup>
    </div>

    <div class="n-aa5985c67335242694f8fcbe71daeeb8">
      <van-action-sheet
        v-model="showInfo.roleActionSheet"
        :actions="roleActionSheetActions"
        :closeable="false"
        :close-on-click-action="true"
        @select="onRoleActionSheetSelect"
        title="如何操作"
      />
    </div>

    <div class="n-0c0417c7568139ec675c0b1da98576c5">
      <van-action-sheet
        v-model="showInfo.teamActionSheet"
        :actions="teamActionSheetActions"
        :closeable="false"
        :close-on-click-action="true"
        @select="onTeamActionSheetSelect"
        title="如何操作"
      />
    </div>

    <div class="n-ff45be8b8aa87178e4d29998c8e811b6">
      <van-action-sheet
        v-model="showInfo.engageActionSheet"
        :actions="engageActionSheetActions"
        :closeable="false"
        :close-on-click-action="true"
        @select="onEngageActionSheetSelect"
        title="如何操作"
      />
    </div>

    <div class="n-3dd36d00d2b6ccf750790ad378e60cb3">
      <van-action-sheet
        v-model="showInfo.editActionSheet"
        :actions="editActionSheetActions"
        :closeable="false"
        :close-on-click-action="true"
        :title="
          professionInfo.rows[tableDataRow.nType].name +
          '-' +
          statusInfo[tableDataRow.status] +
          tableDataRow.nName +
          ' 如何操作'
        "
        @select="onEditMenuSheetSelect"
      />
    </div>

    <div class="n-8cf6000423c44588ad4bba401804890c">
      该灵感由帮会
      <span
        :style="{ color: '#1989fa !important' }"
        @click="
          $appPush({
            path: '/friends',
            query: { openId: '6cae4deb289dfd8d3ea8e807e95c27ea' },
          })
        "
      >
        @九天揽月-北斗
      </span>
      提供
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "toolsNHome",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
    draggable,
  },
  watch: {
    $route: function (to) {
      let gameLabel = to.query.gameLabel;

      if (gameLabel) {
        this.gameLabel = gameLabel;

        this.getGameBP(gameLabel);
      }
    },
  },
  data() {
    return {
      nowModal: 0,
      nowNId: "",
      nMode: "view",
      nowTeamId: "",
      nowTeamName: "",
      nowGameLabel: "",
      nowIconColor: "#1989fa",
      nowIconName: "add-o",
      nowDataChange: false,
      openId: this.$cookie.get("openId") || "",
      joinTeamId: this.$route.query.joinTeamId || "",
      gameLabel: this.$route.query.gameLabel || "",
      url: {
        question: "//docs.91m.top/%E7%BD%91%E7%AB%99/%E9%80%86%E6%B0%B4%E5%AF%92.html",
      },
      tableData: {
        author: {},
        myInfo: {
          openId: "",
          status: 0,
        },
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        nCamp: 0,
        nIndex: 0,
        nType: 0,
        nId: "",
        nName: "",
        yIndex: "",
      },
      campData: {
        model_1: 0,
        model_2: 0,
        rows_1: [
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
        ],
        rows_2: [
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
          {
            nType: -1,
          },
        ],
      },
      homeData: {
        result: {
          rows: {
            myRole: [],
            myTeam: [],
            myEngage: [],
          },
        },
      },
      newData: {
        rows_1: [],
        rows_2: [],
      },
      columns: [],
      roleActionSheetActions: [
        {
          name: "切换角色",
          subname: "切换成这个角色，下次报名将使用这个",
          value: 0,
        },
      ],
      teamActionSheetActions: [
        {
          name: "复制信息",
          subname: "复制帮会的链接，以便于别人加入",
          value: 0,
        },
      ],
      engageActionSheetActions: [
        {
          name: "直接打开",
          subname: "进入队伍分组的编辑界面，要报名",
          value: 0,
        },
        {
          name: "复制信息",
          subname: "复制分组的链接，以便于别人报名",
          value: 1,
        },
      ],
      editActionSheetActions: [
        {
          name: "取消占位",
          subname: "将会清空这个位置，但是不会取消报名",
          value: 0,
        },
      ],
      authorInfo: {
        openId: "",
        name: "加载中...",
        description: "这个人很懒，什么都没留下。",
      },
      editInfo: {
        nType: 0,
        nName: "",
        teamName: "",
        description: "",
        roleText: "",
      },
      showInfo: {
        popup: false,
        picker: false,
        roleActionSheet: false,
        teamActionSheet: false,
        engageActionSheet: false,
        editActionSheet: false,
        pullRefresh: false,
        createRole: false,
        createEngage: false,
        createTeam: false,
        importRole: false,
        nModal: false,
      },
      statusInfo: [
        "👻", //正常
        "", //报名
        "💊 ", //请假
      ],
      professionInfo: {
        model: 0,
        rows: [],
      },
    };
  },
  created() {
    this.professionInfo.rows = this.$appConfigInfo.professionInfo;
  },
  mounted() {
    let gameLabel = this.gameLabel,
      joinTeamId = this.joinTeamId;

    if (gameLabel) {
      if (gameLabel == "new") {
        this.authorInfo.name = "本地";
        this.authorInfo.description = "本地模式，右上角导入帮会成员角色";

        this.initLocal();
      } else {
        this.getGameBP(gameLabel);
      }
    } else {
      this.getGameHome(1);

      this.authorInfo.name = "首页";
      this.authorInfo.description = "请先点击【⚙️】查阅【使用说明】";

      if (joinTeamId) {
        this.onJoinTeam(joinTeamId, 1);
      }
    }
  },
  methods: {
    initLocal: function () {
      let roleText = this.$appGetLocalStorage("roleText") || "",
        localCamp = this.$appGetLocalStorage("roleCamp") || {
          model_1: 0,
          model_2: 0,
          rows_1: [],
          rows_2: [],
        },
        professionInfo = this.professionInfo,
        roleList = [];

      this.columns = [];
      this.editInfo.roleText = roleText;

      if (!roleText) return;

      roleText.split(/\n/).map((x, i) => {
        professionInfo.rows.map((y, j) => {
          let nTypeIndex = x.indexOf(y.name);

          if (nTypeIndex > -1) {
            let roleName = x.slice(nTypeIndex + 3, x.length);

            roleList.push({
              disabled: false,
              nCamp: 0,
              nIndex: 0,
              nType: j,
              nName: roleName,
              nText: roleName,
              status: 1,
              yIndex: i,
            });
          }

          this.columns.push({ text: y.name, value: j, children: [] });
        });
      });

      this.tableData.result.rows = roleList;

      /**
       *
       * 初始化表格
       *
       */
      this.initColumns();
      this.initCamp();

      /**
       *
       * 初始化团
       *
       */
      localCamp.rows_1.map((x) => {
        if (x.nType > -1) {
          this.tableData.result.rows[x.yIndex].nCamp = x.nCamp;
          this.tableData.result.rows[x.yIndex].disabled = true;

          this.campData.rows_1[x.nIndex] = x;
        }
      });

      localCamp.rows_2.map((x) => {
        if (x.nType > -1) {
          this.tableData.result.rows[x.yIndex].nCamp = x.nCamp;
          this.tableData.result.rows[x.yIndex].disabled = true;

          this.campData.rows_2[x.nIndex] = x;
        }
      });

      this.onIconLoadingChange();
    },
    initCamp: function () {
      let all_1 = 0,
        all_2 = 0,
        all = [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ];

      this.professionInfo.rows[0].num[0] = all_1;
      this.professionInfo.rows[0].num[1] = all_2;

      this.campData.rows_1.map((a) => {
        if (a.nCamp > 0) {
          all[a.nType][0] = all[a.nType][0] + 1;

          all_1++;
        }
      });

      this.campData.rows_2.map((b) => {
        if (b.nCamp > 0) {
          all[b.nType][1] = all[b.nType][1] + 1;

          all_2++;
        }
      });

      this.professionInfo.rows.map((c, i) => {
        this.professionInfo.rows[i].num = all[i];
      });

      this.professionInfo.rows[0].num[0] = all_1;
      this.professionInfo.rows[0].num[1] = all_2;
    },
    initColumns: function () {
      let tableData = this.tableData.result.rows,
        professionInfo = this.professionInfo.rows,
        initCamp_1 = [],
        initCamp_2 = [];

      for (let x = 0; x < 30; x++) {
        initCamp_1.push({ nType: -1 });
        initCamp_2.push({ nType: -1 });
      }

      /**
       *
       * 两个不能用同一个不然会绑定在一起
       *
       */
      this.campData.model_1 = 0;
      this.campData.rows_1 = initCamp_1;

      this.campData.model_2 = 0;
      this.campData.rows_2 = initCamp_2;

      this.columns = [];
      professionInfo.map((x, i) => {
        this.columns.push({ text: x.name, value: i, children: [] });
      });

      tableData.map((x, i) => {
        if (x.nCamp == 0) {
          //
        } else if (x.nCamp == 1) {
          this.campData.rows_1[x.nIndex] = x;
        } else if (x.nCamp == 2) {
          this.campData.rows_2[x.nIndex] = x;
        }

        x.nIndex = i;
        x.yIndex = i;
        x.text = this.statusInfo[x.status] + x.nName;

        this.tableData.result.rows[i].nIndex = i;
        this.tableData.result.rows[i].yIndex = i;

        if (x.disabled || x.nCamp > 0 || x.status != 1) {
          x.disabled = true;
        } else {
          x.disabled = false;
        }

        if (x.nType > 0) {
          this.columns[x.nType].children.push(x);
        }
      });

      this.columns.map((x, i) => {
        if (i > 0) {
          if (x.children.length == 0) {
            x.disabled = true;
          } else {
            x.disabled = false;
          }
        }
      });

      this.columns[0].children.push({
        disabled: true,
        nCamp: 0,
        nIndex: 0,
        nId: "",
        text: "请选择成员",
        nType: -1,
        yIndex: 0,
      });
    },
    getGameHome: function (aid = 0) {
      this.$axios
        .post(this.$appApi.game.getGameHome + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.homeData = data;

            this.onIconLoadingChange();

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            //this.$message.error(status.msg);
          }
        });
    },
    getGameBP: function (gameLabel, aid = 1) {
      if (gameLabel == "new") {
        this.onIconLoadingChange();
      } else {
        this.$axios
          .post(
            this.$appApi.game.getGameBP + "&aid=" + aid,
            this.$qs.stringify({
              gameLabel: gameLabel,
            })
          )
          .then((res) => {
            let status = res.data.status;

            if (status.code == 200) {
              let data = res.data.data;

              this.authorInfo = data.author;
              this.tableData = data;

              this.initColumns();
              this.initCamp();
              this.onIconLoadingChange();

              //this.$message.success(this.$appMsg.success[1005]);
            } else {
              this.$message.error(status.msg);
            }
          });
      }
    },
    updateGameBP: function (gameLabel, aid = 1) {
      if (gameLabel == "new") {
        this.onIconLoadingChange();
      } else {
        this.$axios
          .post(
            this.$appApi.game.updateGameBP + "&aid=" + aid,
            this.$qs.stringify({
              gameLabel: gameLabel,
              arrData: JSON.stringify(this.newData),
            })
          )
          .then((res) => {
            let status = res.data.status;

            if (status.code == 200) {
              this.nowDataChange = false;

              setTimeout(() => {
                this.getGameBP(gameLabel);
              }, 250);

              //this.$message.success(this.$appMsg.success[1000]);
            } else {
              this.$message.error(status.msg);
            }
          });
      }
    },
    updateGameBPIndex: function (gameLabel, nId, nCamp, nIndex, aid = 1) {
      if (gameLabel == "new") {
        if (nCamp == 1) {
          this.campData.rows_1[nIndex].nCamp = nCamp;
          this.campData.rows_1[nIndex].nIndex = nIndex;
          this.campData.rows_1[nIndex].disabled = true;
        } else if (nCamp == 2) {
          this.campData.rows_2[nIndex].nCamp = nCamp;
          this.campData.rows_2[nIndex].nIndex = nIndex;
          this.campData.rows_2[nIndex].disabled = true;
        }

        this.nowDataChange = false;

        this.$appSetLocalStorage("roleCamp", this.campData);

        setTimeout(() => {
          this.getGameBP(this.gameLabel);
        }, 250);
      } else {
        this.$axios
          .post(
            this.$appApi.game.updateGameBPIndex + "&aid=" + aid,
            this.$qs.stringify({
              gameLabel: gameLabel,
              nId: nId,
              nCamp: nCamp,
              nIndex: nIndex,
            })
          )
          .then((res) => {
            let status = res.data.status;

            if (status.code == 200) {
              this.nowDataChange = false;

              setTimeout(() => {
                this.getGameBP(this.gameLabel);
              }, 250);

              //this.$message.success(this.$appMsg.success[1000]);
            } else {
              this.$message.error(status.msg);
            }
          });
      }
    },
    onPullRefresh: function () {
      let gameLabel = this.gameLabel;

      if (gameLabel) {
        if (this.nowDataChange == true) {
          if (gameLabel == "new") {
            this.$appSetLocalStorage("roleCamp", this.newData);
          }

          this.updateGameBP(gameLabel, 1);
        }
      } else {
        this.getGameHome(1);
      }

      setTimeout(() => {
        this.showInfo.pullRefresh = false;
      }, 500);
    },
    onModalOk: function () {
      let editInfo = this.editInfo;

      if (this.showInfo.createRole) {
        if (!editInfo.nName) {
          this.$message.error(this.$appMsg.error[2000]);
        } else if (editInfo.nType == 0) {
          this.$message.error(this.$appMsg.error[2001]);
        } else {
          this.onCreateRoleClick(
            editInfo.nName,
            editInfo.nType,
            editInfo.description,
            1
          );

          this.editInfo.nType = 0;
          this.editInfo.nName = "";
        }
      } else if (this.showInfo.createEngage) {
        this.onCreateEngageClick(editInfo.description, 1);

        this.editInfo.description = "";
      } else if (this.showInfo.createTeam) {
        if (!editInfo.teamName) {
          this.$message.error(this.$appMsg.error[2002]);
        } else {
          this.onCreateTeamClick(editInfo.teamName, 1);
          this.editInfo.teamName = "";
        }
      } else if (this.showInfo.importRole) {
        this.$appSetLocalStorage("roleText", this.editInfo.roleText);

        this.initLocal();
      }

      this.showInfo.nModal = false;
    },
    onCampChange() {
      let newData = {
        rows_1: [],
        rows_2: [],
      };

      this.campData.rows_1.map((x, i) => {
        x.nIndex = i;

        if (x.nType != -1) {
          newData.rows_1.push(x);
        }
      });

      this.campData.rows_2.map((x, i) => {
        x.nIndex = i;

        if (x.nType != -1) {
          newData.rows_2.push(x);
        }
      });

      this.newData = newData;
      this.nowDataChange = true;
    },
    onDraggableChange: function () {
      this.initCamp();
      this.onCampChange();
    },
    onPickerConfirm: function (value, index) {
      let tableDataRow = this.tableDataRow,
        nCamp = tableDataRow.nCamp,
        nIndex = tableDataRow.nIndex,
        nowRow = {};

      if (!this.columns[index[0]].children[index[1]].disabled) {
        if (nCamp == 1) {
          this.campData.rows_1[nIndex] =
            this.columns[index[0]].children[index[1]];

          nowRow = this.campData.rows_1[nIndex];
        } else if (nCamp == 2) {
          this.campData.rows_2[nIndex] =
            this.columns[index[0]].children[index[1]];

          nowRow = this.campData.rows_2[nIndex];
        }

        this.columns[index[0]].children[index[1]].disabled = true;
        this.columns[index[0]].children[index[1]].nCamp = nCamp;
        this.columns[index[0]].children[index[1]].nIndex = nIndex;
      }

      this.initCamp();
      this.onCampChange();
      this.updateGameBPIndex(
        this.gameLabel,
        nowRow.nId,
        nowRow.nCamp,
        nowRow.nIndex
      );

      /**
       *
       * 每次选择重置到 0,0
       *
       */
      this.$refs.refPicker.setColumnIndex(0, 0);

      this.showInfo.picker = false;
    },
    onPickerCancel: function () {
      this.$refs.refPicker.setColumnIndex(0, 0);

      this.showInfo.picker = false;
    },
    onRoleActionSheetSelect: function (value, index) {
      if (index == 0) {
        this.onSetUsedClick(this.nowNId, 1);
      }
    },
    onTeamActionSheetSelect: function (value, index) {
      let copyData = "";

      if (index == 0) {
        copyData =
          "帮会:" +
          this.nowTeamName +
          "\n链接:" +
          location.origin +
          location.pathname +
          "?joinTeamId=" +
          this.nowTeamId;

        this.$appCopyData(copyData);
      }
    },
    onEngageActionSheetSelect: function (value, index) {
      let copyData = "";

      if (index == 0) {
        this.$appPush({ path: "/tools/n/home?gameLabel=" + this.nowGameLabel });
      } else if (index == 1) {
        copyData =
          "链接:" +
          location.origin +
          location.pathname +
          "?gameLabel=" +
          this.nowGameLabel;

        this.$appCopyData(copyData);
      }
    },
    onEditMenuSheetSelect: function (value, index) {
      let tableDataRow = this.tableDataRow,
        disabled_1 =
          this.campData.rows_1[tableDataRow.nIndex].disabled || false,
        disabled_2 =
          this.campData.rows_2[tableDataRow.nIndex].disabled || false,
        yIndex = 0;

      if (index == 0) {
        if (tableDataRow.nCamp == 1) {
          if (disabled_1) {
            yIndex = this.campData.rows_1[tableDataRow.nIndex].yIndex;

            this.campData.rows_1[tableDataRow.nIndex] = {
              nId: "",
              nName: "",
              nType: -1,
            };
          }
        } else if (tableDataRow.nCamp == 2) {
          if (disabled_2) {
            yIndex = this.campData.rows_2[tableDataRow.nIndex].yIndex;

            this.campData.rows_2[tableDataRow.nIndex] = {
              nId: "",
              nName: "",
              nType: -1,
            };
          }
        }

        this.updateGameBPIndex(this.gameLabel, tableDataRow.nId, 0, 0);

        if (tableDataRow.nCamp > 0) {
          if (tableDataRow.status == 1) {
            this.tableData.result.rows[yIndex].disabled = false;
          }

          this.tableData.result.rows[yIndex].nCamp = 0;
          this.tableData.result.rows[yIndex].nIndex = 0;
        }

        this.initCamp();
      }
    },
    onIconLoadingChange: function (name = "checked") {
      this.nowIconName = name;

      setTimeout(() => {
        if (this.gameLabel) {
          this.onIconColor(this.tableData.myInfo.status);
        } else {
          this.nowIconColor = "#1989fa";
        }

        this.nowIconName = "add-o";
      }, 500);
    },
    onIconColor: function (e = 0) {
      let status = 0,
        color = "";

      status = e;
      this.tableData.myInfo.status = 0;

      if (this.openId) {
        if (status == 0) {
          color = "#1989fa";
        } else if (status == 1) {
          color = "red";
        } else if (status == 2) {
          color = "black";
        } else if (status == 3) {
          color = "green";
        }
      } else {
        status = 0;
        color = "#1989fa";
      }

      this.nowIconColor = color;
      this.tableData.myInfo.status = status;
    },
    onJoinTeam: function (teamId, aid = 1) {
      this.$axios
        .post(
          this.$appApi.game.getTeamInfo + "&aid=" + aid,
          this.$qs.stringify({
            teamId: teamId,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            let teamName = data.teamName;

            this.$dialog
              .confirm({
                title: "是否加入该帮会?",
                message: teamName,
              })
              .then(() => {
                //on confirm
                this.$axios
                  .post(
                    this.$appApi.game.joinTeam + "&aid=" + aid,
                    this.$qs.stringify({
                      teamId: teamId,
                    })
                  )
                  .then((res) => {
                    let status = res.data.status;

                    if (status.code == 200) {
                      this.getGameHome(1);

                      this.$message.success(this.$appMsg.success[1000]);
                    } else {
                      //this.$message.error(status.msg);
                    }
                  });

                this.showInfo.actionSheet = false;
              })
              .catch(() => {
                //on cancel
              });
            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            //this.$message.error(status.msg);
          }
        });

      this.$appPush({ path: "/tools/n/home" });
    },
    onCreateRoleClick: function (nName, nType, description, aid = 1) {
      this.$axios
        .post(
          this.$appApi.game.createRole + "&aid=" + aid,
          this.$qs.stringify({
            nName: nName,
            nType: nType,
            description: description,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            if (this.gameLabel) {
              this.getGameBP(this.gameLabel, 1);
            } else {
              this.getGameHome(1);
            }

            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onCreateEngageClick: function (description, aid = 1) {
      this.$axios
        .post(
          this.$appApi.game.createEngage + "&aid=" + aid,
          this.$qs.stringify({
            description: description,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.getGameHome(1);

            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onCreateTeamClick: function (teamName, aid = 1) {
      this.$axios
        .post(
          this.$appApi.game.createTeam + "&aid=" + aid,
          this.$qs.stringify({
            teamName: teamName,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.getGameHome(1);

            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onModalShowClick: function (e) {
      this.showInfo.nModal = true;

      if (e == 1) {
        this.showInfo.createRole = true;
        this.showInfo.createEngage = false;
        this.showInfo.createTeam = false;
        this.showInfo.importRole = false;
      } else if (e == 2) {
        this.showInfo.createRole = false;
        this.showInfo.createEngage = true;
        this.showInfo.createTeam = false;
        this.showInfo.importRole = false;
      } else if (e == 3) {
        this.showInfo.createRole = false;
        this.showInfo.createEngage = false;
        this.showInfo.createTeam = true;
        this.showInfo.importRole = false;
      } else if (e == 4) {
        this.showInfo.createRole = false;
        this.showInfo.createEngage = false;
        this.showInfo.createTeam = false;
        this.showInfo.importRole = true;
      }
    },
    onSetUsedClick: function (nId, aid = 1) {
      this.$axios
        .post(
          this.$appApi.game.setUsed + "&aid=" + aid,
          this.$qs.stringify({
            nId: nId,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.getGameHome(1);

            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onSetStatusClick: function (gameLabel, aid = 1, bid = 1) {
      this.$axios
        .post(
          this.$appApi.game.setStatus + "&aid=" + aid + "&bid=" + bid,
          this.$qs.stringify({
            gameLabel: gameLabel,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.getGameBP(this.gameLabel);

            //this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onHomeClick: function () {
      this.gameLabel = "";
      this.authorInfo.name = "首页";
      this.authorInfo.description = "请先点击【⚙️】查阅【使用说明】";

      this.getGameHome(1);

      this.$appPush({ path: "/tools/n/home" });
    },
    onTitleClick: function () {
      if (this.showInfo.popup == false) {
        this.showInfo.popup = true;
      } else {
        this.showInfo.popup = false;
      }
    },
    onEditClick: function () {
      if (this.nMode == "view") {
        this.nMode = "edit";

        this.$message.success("编辑模式 - 可以拖拽修改排序");
      } else if (this.nMode == "edit") {
        this.nMode = "view";

        this.$message.success("访问模式 - 可以点击进行修改");
      }
    },
    onCampClick: function (e, camp, index) {
      if (this.nMode == "edit") return;

      this.tableDataRow = {
        nCamp: 0,
        nIndex: 0,
        nType: 0,
        nId: "",
        nName: "",
        yIndex: "",
      };

      if (e.nCamp > 0) {
        this.tableDataRow = e;

        this.showInfo.editActionSheet = true;
      } else {
        this.showInfo.picker = true;
      }

      /**
       *
       * 更新到最新的 camp 和 index
       *
       */
      this.tableDataRow.nCamp = camp;
      this.tableDataRow.nIndex = index;
    },
    onRoleListClick: function (e) {
      this.showInfo.roleActionSheet = true;

      this.nowNId = e.nId;
    },
    onTeamListClick: function (e) {
      this.showInfo.teamActionSheet = true;

      this.nowTeamId = e.teamId;
      this.nowTeamName = e.teamName;
    },
    onEngageListClick: function (e) {
      this.showInfo.engageActionSheet = true;

      this.nowGameLabel = e.gameLabel;
    },
  },
};
</script>

<style lang="less">
img.n-f55ecb3f409ffca3564479b48d350533 {
  margin-top: -3px;
  border-radius: 100%;
  border: 1px solid #ccc !important;
}

img.n-fc4b85d1f8f74bd31ae7eae82cbc2c62 {
  border-radius: 100%;
  margin-top: -17px;
  position: absolute;
  text-align: left;
  left: 7.5%;
}

img.n-72534a6f0c50503046338e9ce9231d3d {
  transform: rotate(180deg);
  margin-left: 5px;
  margin-top: -3px;
}

img.n-efa7b0dee5b54ae0ba3766dcf90b156d,
img.n-6fa7b51cbc902afa9e2b83377b97b754 {
  margin-top: -3px;
}

span.n-f2a32c26eb3e74db9dc116b7c46b976e {
  color: white;
  font-size: 10px;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
  left: 7.5%;
}

div.n-b4e157ffbfb4ee490b792d5eabfbdac1 {
  margin-top: 25px;
  text-align: left;
  height: 1150px;
}

div.n-fcc35edc628651ab30ef10d9f772acf0 {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 100px;
}

div.n-6cf5e5a50b79366afe6c4b68f0ba7f7c {
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 90%;
}

div.n-c135773fcc3610088460b5e8cf829d5c,
div.n-fa5a798d6c69dcc44259373f8ffbe37d {
  margin-top: 50px;
}

div.n-fe0b2db606a124fca2e458d677e5e6a7 {
  div.ant-popover-title,
  ul.ant-dropdown-menu {
    text-align: left !important;
  }
}

div.n-4ff05f4e6819046173bb0bbafac2f638 {
  div.van-tabs__line {
    z-index: unset !important;
  }
}

div.n-ad264e30744d4b76ffa84e851e64906e {
  text-align: center;
}

div.n-3f8de12aae28c954ba0ccf610da2a648 {
  margin-top: 25px;
  margin-left: 10px;
  margin-right: 10px;
}

div.n-8cf6000423c44588ad4bba401804890c {
  font-size: @app-font-size;
  margin-top: 50px;
}

div.n-4ff05f4e6819046173bb0bbafac2f638 {
  margin-top: -10px;
}

div.n-995b1773c816966a6a2fef460a9751f2 {
  margin-top: 5px;
}

div.n-d172dd0c6361cd74f6194e50bf1ce999 {
  font-size: 10px;
  color: gray !important;
  margin-top: -3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

div.n-6d1b1ed47d74b1d23d4acf4fbe4da7aa {
  margin-top: 10px;
}

div.n-8a1f9b68723d8f55df1e80295ce6edc2 {
  display: contents;
}

div.n-2e18d726e34c59f679fbf74316c67b68 {
  position: absolute;
  width: 100%;
  margin-top: 13px;
  left: 0;
}

div.n-ba0473a8bc744d3eb535e09cef7593bc {
  height: 50px;
  text-align: left;
}
</style>