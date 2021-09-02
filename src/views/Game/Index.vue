<template>
  <div class="game-home">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "GameHome",
};
</script>

<style lang="less">
img.game-1ab74bf7276acc5985f078fee7e63109 {
  border-radius: @app-border-radius;
  margin-top: -3px;
}

span.game-07b120eca6da2e9c7115d4ccae824cca {
  margin: 0 5px;
}

div.game-recommend {
  text-align: center;

  ul.app-d865b50ce307751bdeb9a6ab16e7baf9 {
    margin-bottom: unset;
  }

  li.app-1951b6e7c82938dd7446a41e829b247b {
    width: 75px;
    margin-top: unset;
  }

  li.game-9ad2b9949abc36830804e02760ea3e63 {
    margin-top: 10px;
  }
}

div.game-ea89eb98f6e31fc44977697c388b6c57 {
  margin-bottom: 10px;
}

div.game-237b90fb6955b98328736810edefe6e7 {
  width: 100%;
}

div.game-82f6ee2b57fb59b0b7b3803164d6b9d8 {
  font-size: @app-font-size + 2px;
  margin-top: 5px;
}

div.game-4863c43e8743ebf1be3f48c5c4519627 {
  div.van-tabs__line {
    bottom: 13px;
  }
}

div.game-99938282f04071859941e18f16efcf42 {
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: auto;

  span.van-tab__text {
    font-size: @app-font-size + 2px;
  }

  div.van-tabs__wrap {
    left: 0;
    margin: 0 auto;
    position: fixed;
    right: 0;
    top: 20px;
    width: 40%;
  }

  div.van-tab.van-ellipsis {
    line-height: 30px;
  }

  div.van-grid-item__content {
    padding: 8px 4px;
  }
}
</style>