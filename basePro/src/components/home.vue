<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block home_MainDiv">
    <!--Main Watch中改Title值 首页返回需要特殊定制 其他$router.back(-1)即可-->
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="signOut()"><span class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <van-notice-bar left-icon="volume-o" scrollable :text="pageData.domData.noticeTxt"/>
      <div class="home_swipe">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img src="../assets/images/yunhai01.gif" width="100%" height="250px">
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/images/yunhai02.gif" width="100%" height="250px">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="home_mode">
        <div class="home_mode_pice">
          <van-grid :column-num="4" :gutter="0" icon-size="30px" :clickable="true">
            <van-grid-item icon="iconfont-setting2 iconfont" text="个人定制" @click="goSetting()"></van-grid-item>
            <van-grid-item icon="iconfont-liucheng iconfont" text="静态模板"
                           @click="goTaskCenter()"></van-grid-item>
            <van-grid-item :icon="pageData.styleCell.pice_02" text="列表详情"
                           @click="goList()" badge="99+"></van-grid-item>
            <van-grid-item :icon="pageData.styleCell.pice_03" text="前端天文台" @click="goNewtechnology()"></van-grid-item>
          </van-grid>
        </div>
        <div class="clear">&#160;</div>
      </div>
      <div class="home_lazy">
        <div class="home_lazy_list">
          <div class="home_lazy_list_cell" v-for="(value, index) in pageData.domData.imageList" :key="index" @click="ImagePreview(value)">
            <img v-lazy="value" class="home_lazy_list_cell_img"/>
            <div class="home_lazy_list_cell_textContent">
              <div class="home_lazy_list_cell_textContent_title">新闻</div>
              <div class="home_lazy_list_cell_textContent_detail">
                您可以搜索新闻事件、热点话题、人物动态、产品资讯等,快速了解它们的最新进展百度新闻是包含海量资讯的新闻服务平台,真实反映每时每刻的新闻热点。
              </div>
            </div>
            <div class="onePx">&#160;</div>
          </div>
        </div>
        <div class="home_lazy_blank">&#160;</div>
      </div>
      <div class="version">版本 1.0.0</div>
      <div class="home_tabbar">
        <van-tabbar v-model="pageData.domContorl.tabbarActive">
          <van-tabbar-item name="home" icon="iconfont-setting iconfont" badge="5">自定义图标</van-tabbar-item>
          <van-tabbar-item name="search" icon="search">自带图标</van-tabbar-item>
          <van-tabbar-item name="search" :icon="pageData.styleCell.settings">图片类型</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast, Tabbar, TabbarItem, NoticeBar, Lazyload, ImagePreview, Dialog } from 'vant'
  export default {
    name: 'home',
    data: function () {
      return {
        pageData: {
          isFrom: 'home',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {
            tabbarActive: ''
          },
          domData: {
            noticeTxt: '滚动通知:这里是雨禾玉雷的前端实验室',
            imageList: [
              'https://img01.yzcdn.cn/vant/apple-1.jpg',
              'https://img01.yzcdn.cn/vant/apple-2.jpg',
              'https://img01.yzcdn.cn/vant/apple-3.jpg',
              'https://img01.yzcdn.cn/vant/apple-1.jpg',
              require('../assets/images/yunhai02.gif')
            ]
          },
          updateData: {},
          styleCell: {
            mainStyle: {
              width: '100%',
              height: '100vh',
              overflowY: 'scroll'
            },
            pice_01: require('../assets/images/waittingT1.gif'),
            pice_02: require('../assets/images/waittingT2.gif'),
            pice_03: require('../assets/images/around01.gif'),
            settings: require('../assets/images/settings.png')
          }
        }
      }
    },
    beforeCreate: function () {
    },
    created: function () {
    },
    beforeMount: function () {
    },
    mounted: function () {
      let app = this
      let element = document.getElementsByClassName('home_lazy')[0]
      let elementCell = document.getElementsByClassName('home_lazy_list_cell')[0]
      app.autoScroll(element, elementCell, 20, 1500)
    },
    beforeUpdate: function () {
    },
    updated: function () {},
    beforeDestroy: function () {
    },
    destroyed: function () {
    },
    methods: {
      goList () {
        let app = this
        app.$router.push({
          name: 'dbList',
          params: app.pageData
        })
      },
      goSetting () {
        let app = this
        app.$router.push({
          name: 'setting',
          params: app.pageData
        })
      },
      goTaskCenter () {
        let app = this
        app.$router.push({
          name: 'taskCenter',
          params: app.pageData
        })
      },
      goNewtechnology () {
        let app = this
        app.$router.push({
          name: 'technology',
          params: app.pageData
        })
      },
      ImagePreview (img) {
        // 附件预览
        ImagePreview([img])
      },
      forwardPassData (methods, params) { // 父组件的方法
        this.$emit(methods, params)
      },
      backwardPassData (methods, params) { // 子组件的方法
        let app = this
        app.$refs.son[methods](params)
      },
      autoScroll(element, elementCell, speed, delay) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.autoScroll(app, element, elementCell, speed, delay)
      },
      signOut () {
        let app = this
        let dd = app.dd
        // 如果是钉钉或微信 则提示是否退出应用 否则提示 '没有退路啦'
        if (app.$store.state.setting.isDingTalk) {
          Dialog.confirm({
            title: '确定退出应用？',
            message: '将返回应用列表'
          })
            .then(() => {
              dd.ready(function () {
                dd.biz.navigation.close({
                  onSuccess: function(result) {},
                  onFail: function(err) {
                    console.log(err)
                  }
                })
              })
            })
            .catch(() => {
              // on cancel
            })
        } else if (app.$store.state.setting.isWX) {} else {
          Toast('没有退路啦！')
        }
      }
    },
    watch: {
      $route (to, from) {
        let app = this
        let element = document.getElementsByClassName('home_lazy')[0]
        let elementCell = document.getElementsByClassName('home_lazy_list_cell')[0]
        app.autoScroll(app, element, elementCell, 20, 1500)
      }
    },
    components: {
      Toast,
      Tabbar,
      TabbarItem,
      NoticeBar,
      Lazyload,
      ImagePreview,
      Dialog
    }
  }
</script>

<style src="../fonts/iconfont.css"></style>
<style src="../assets/css/vant.css"></style>
<style scoped src="../assets/css/mui.min.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>

<style scoped>
  .home_swipe {
    width: 100%;
  }
  .home_system_mode_pice >>> .van-grid-item__text {
    font-size: 13px;
    font-weight: 500;
    color: #000;
  }

  .home_quick_mode {
    position: relative;
    top: -1px;
    left: 0;
    width: 100%;
    height: 66px;
  }

  .home_quick_mode_left {
    font-size: 16px;
    width: calc(50% - 1px);
    height: 100%;
    line-height: 66px;
    float: left;
    background: #ffffff;
    text-align: center;
    font-weight: 800;
    border: 1px solid #e5e5e5;
  }

  .home_quick_mode_left >>> .van-icon {
    position: relative;
    top: -20px;
    left: 3px;
  }

  .home_quick_mode_left >>> .van-info {
    min-width: 22px;
    line-height: 22px;
  }

  .home_quick_mode_right {
    font-size: 16px;
    margin-left: 1px;
    width: calc(50% - 1px);
    height: 100%;
    line-height: 66px;
    float: left;
    background: #ffffff;
    text-align: center;
    font-weight: 800;
    border: 1px solid #e5e5e5;
  }

  .mode_header {
    width: calc(100% - 2px);
    height: 44px;
    background: #ffffff;
    margin-left: 1px;
    margin-top: 8px;
    margin-bottom: 1px;
  }

  .mode_header_leftPcik {
    margin-top: 5px;
    margin-left: 15px;
    width: 8px;
    height: 34px;
    background: #0069ac;
    float: left;
  }

  .mode_header_font {
    width: calc(100% - 10px - 15px - 8px);
    height: 44px;
    line-height: 44px;
    float: left;
    padding-left: 10px;
    font-weight: 600;
  }

  .mode_header_font_title {
    font-size: 15px;
    width: 50%;
    height: 44px;
    line-height: 44px;
    float: left;
  }

  .mode_header_font_ChangeComp {
    width: 50%;
    height: 44px;
    line-height: 44px;
    color: #0086b3;
    float: right;
    text-align: right;
    padding-right: 5px;
    font-size: 15px;
  }

  .home_system_mode_pice {
    width: 100%;
    float: left;
  }

  .clear {
    clear: both;
    width: 100%;
    height: 1px;
  }

  .masterUser {
    position: absolute;
    top: 15%;
    left: 10%;
    z-index: 100;
    width: 80%;
    border-radius: 20px;
    min-height: 450px;
    background: #e5e5e5;
    border: 1px solid #0069ac;
  }

  .getCode {
    position: relative;
    top: 22px;
    left: 5%;
    width: 90%;
    height: 66px;
    line-height: 44px;
    text-align: center;
    background: #0077aa;
    color: #ffffff;
  }

  .code {
    position: relative;
    left: 5%;
    width: 90%;
    height: 44px;
    background: #0077aa;
    color: #ffffff;
    border-radius: 15px;
  }

  .changeCode {
    position: relative;
    top: 44px;
    left: 5%;
    width: 90%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #004a86;
    color: #ffffff;
    border-radius: 15px;
  }

  .changeUser {
    position: relative;
    top: 66px;
    left: 5%;
    width: 90%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #004a86;
    color: #ffffff;
    border-radius: 15px;
  }
  .changeCompanyId {
    position: relative;
    top: 88px;
    left: 5%;
    width: 90%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #004a86;
    color: #ffffff;
    border-radius: 15px;
  }
  .masterUser_hidden {
    position: relative;
    top: 120px;
    left: 5%;
    width: 90%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #0069ac;
    color: #ffffff;
    border-radius: 15px;
  }

  .companyPopup >>> .van-icon-cross:before {
    display: none;
  }

  .companyPopup >>> .van-cascader__title {
    text-align: center;
    width: 100%;
    height: 66px;
    line-height: 66px;
    font-size: 17px;
    color: #666;
  }

  .companyPopup >>> .van-tabs {
    /*width: 100%;*/
    /*min-height: 50vh;*/
  }

  .companyPopup >>> .van-tabs__wrap--scrollable .van-tab {
    /*flex: 0 0 50%;*/
  }

  .companyPopup >>> .van-tab {
    font-size: 16px;
    /*border: 1px #e5e5e5 solid;*/
    /*color: #a5a5a5;*/
    /*background: #e5e5e5;*/
    /*border-radius: 22px;*/
  }

  .companyPopup >>> .van-tab--active {
    /*font-size: 16px;*/
    /*font-weight: 600;*/
    /*background: #0069ac;*/
    /*color: #e5e5e5;*/
    /*border: 1px #e5e5e5 solid;*/
  }

  .companyPopup >>> .van-tabs__wrap {
    /*width: 90%;*/
    /*margin-left: 5%;*/
  }

  .companyPopup >>> .van-cascader__option {
    /*width: 80%;*/
    /*height: 55px;*/
    /*line-height: 55px;*/
    font-size: 16px;
    /*text-align: center;*/
    /*margin-left: 5%;*/
    /*border: #e5e5e5 solid 1px;*/
    /*margin-top: 10px;*/
    /*border-radius: 15px;*/
    /*background: #0086b3;*/
    /*font-weight: 400;*/
    /*color: #b5b5b5;*/
  }

  .companyPopup >>> .van-icon {
    display: none;
  }

  .version {
    position: fixed;
    right: 11px;
    bottom: 88px;
    z-index: 99;
    width: 77px;
    height: 22px;
    border-radius: 22px;
    background: #0077aa;
    color: #f2f3f5;
    font-size: 8px;
    line-height: 22px;
    text-align: center;
    opacity: 0.5;
  }
  /*.home_mode {*/
    /*width: 100%;*/
    /*max-height: calc(100vh - 200px - 400px);*/
    /*overflow: hidden;*/
  /*}*/
  /*.home_mode_pice {*/
    /*width: 100%;*/
    /*float: left;*/
  /*}*/
  /*.home_mode_pice >>> .van-grid-item__text {*/
    /*font-size: 13px;*/
    /*font-weight: 500;*/
    /*color: #000;*/
  /*}*/
  /*.home_mode_pice >>> .van-grid-item__content {*/
    /*!*border-radius: 5px;*!*/
  /*}*/
  /*.home_mode_pice >>> .van-icon-iconfont-setting {*/
    /*color: #0086b3;*/
  /*}*/
  /*.home_mode_pice >>> .van-icon-iconfont {*/
    /*font-size: 50px !important;*/
  /*}*/
  .companyPopup >>> .van-overlay{
    display: none;
  }
  .home_lazy {
    width: 100%;
    height: 400px;
    overflow: scroll;
  }
  .home_lazy_blank {
    width: 100%;
    height: 66px;
  }
  .home_lazy_list_cell_img {
    width: 88px;
    height: 88px;
    padding: 15px;
    float: left;
  }
  .home_lazy_list_cell {
    width: calc(100% - 0px);
    height: 88px;
    overflow: hidden;
    background: #fff;
  }
  .home_lazy_list_cell_textContent {
    /*微信QQ浏览器需要额外缩减5px*/
    width: calc(100% - 88px - 10px - 5px);
    height: calc(88px - 30px);
    word-break: break-all;
    white-space: normal;
    margin: 15px;
    overflow: hidden;
    font-size: 13px;
    font-weight: 400;
  }
  .home_lazy_list_cell_textContent_detail{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .home_tabbar >>> .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
    height: 66px;
  }
  .home_tabbar >>> .van-tabbar-item__icon {
    margin-bottom: 8px;
    font-size: 28px;
  }
  .home_tabbar >>> .van-tabbar-item__text {
    font-weight: 600;
  }
  .home_tabbar >>> .van-tabbar-item__icon img {
    width: 28px;
    height: auto;
  }
  .home_tabbar >>> .van-tabbar-item:not(:last-child) {
    border-right: 2px solid #f9f9f9;
  }
  .onePx{
    position: relative;
    border:none;
  }
  .onePx:after{
    content: '';
    position: absolute;
    bottom: 0;
    background: #f5f5f5;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .home_mode_pice >>> img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    object-fit: fill;
  }
</style>
