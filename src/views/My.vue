<template>
  <div class="my">
    <van-nav-bar v-if="isLogin" :border="false">
      <van-icon name="edit" slot="right" />
    </van-nav-bar>

    <div v-if="isLogin" class="my-cd77c40b62763f6adf5598bce7fceede">
      <img
        width="100"
        height="100"
        src="https://i.loli.net/2020/06/20/jNdowuY2EIvk4Uf.jpg"
        class="my-d5ca322453f2986b752e58b11af83d96"
      />
      <div class="my-f9c7cabc13f359223ebc3ccf9cc104b8">
        <span class="my-25930e3036f13852cb0b29694bbab611 my-b068931cc450442b63f5b3d276ea4297">苏苏</span>
        <span class="my-25930e3036f13852cb0b29694bbab611 my-293a35164a20c927b0fd61942fbc1cf2">
          <van-tag round color="red">管理员</van-tag>
        </span>
      </div>
    </div>

    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group :border="false" title=" " class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell v-if="isLogin == false" title="登录" is-link @click="isLogin = true" />
        <van-grid v-if="isLogin" :border="false" :column-num="2">
          <van-grid-item icon="/img/app-icons/team.png" text="10" />
          <van-grid-item icon="/img/app-icons/bp_data.png" text="200" to="/game/new" />
        </van-grid>
      </van-cell-group>
    </div>

    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group :border="false" title=" " class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell icon="question-o" title="常见问题" value="自豪的使用语雀" is-link url="https://doc.91m.top" />
        <van-cell
          icon="comment-o"
          title="意见/建议/咨询/交友"
          value="jmglsi (苏苏)"
          is-link
          url="//wpa.qq.com/msgrd?v=3&uin=947065098&site=qq&menu=yes"
        />
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-4cf71de630f99f4bf37ea1218fdab416">
      <van-cell-group :border="false" title=" " class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell
          v-if="isLogin"
          title="退出登录"
          title-class="my-4236a440a662cc8253d7536e5aa17942"
          @click="isLogin = false"
        />
      </van-cell-group>
    </div>

    <div class="my-111fb4d92036323891a140cd49383f86">
      <van-cell-group :border="false" title=" ">
        <van-cell
          title="沪ICP备16031287号-2"
          url="http://beian.miit.gov.cn"
          class="my-c0bdff9ec0fe8c0a83371c4573d7ecf4"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style>
div.my-7dc22b2c6a992f0232345df41303f5ea
  div.van-grid
  div.van-grid-item
  div.van-grid-item__content
  span.van-grid-item__text {
  font-size: 20px;
}
</style>

<style scoped>
.my-d5ca322453f2986b752e58b11af83d96 {
  border-radius: 100%;
}

.my-f9c7cabc13f359223ebc3ccf9cc104b8 {
  margin-top: 10px;
}

.my-25930e3036f13852cb0b29694bbab611 {
  margin: 0 3px;
}

.my-293a35164a20c927b0fd61942fbc1cf2 {
  position: absolute;
  margin-top: -2px;
}

.my-4cf71de630f99f4bf37ea1218fdab416 {
  width: 200px;
  margin: 0 auto;
}

.my-4236a440a662cc8253d7536e5aa17942 {
  color: red;
  line-height: 40px;
  border-radius: 100px;
}

.my-7dc22b2c6a992f0232345df41303f5ea {
  text-align: left;
}

.my-c0bdff9ec0fe8c0a83371c4573d7ecf4 {
  font-size: 10px;
}
</style>

<script>
export default {
  name: "My",
  data() {
    return {
      isLogin: false
    };
  },
  mounted() {},
  methods: {}
};
</script>