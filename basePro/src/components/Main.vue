<template>
  <div :style="pageData.styleCell.mainStyle" :class="$store.state.setting.isAPP ? 'isAPP MainDiv' : 'MainDiv'" @click="tapVideo()">
    <div class="lessControl lessControlIsmobile">
      <transition name="slide-fade">
        <!--注册不重载的页面-->
        <keep-alive include="home">
          <router-view ref='chartView'></router-view>
        </keep-alive>
      </transition>
      <!--H5缺陷修复插件-->
      <div class="addContent"></div>
      <!--自定义遮罩 带CGN图标-->
      <div class="waitting_mask mui-hidden" @click="showEruda()">
        <img src="../assets/images/CGNlogo.png" class="waiting_img">
      </div>
      <!--自定义遮罩 灰色遮罩-->
      <div class="static_mask mui-hidden">&#160;</div>
      <!--自定义遮罩 灰色遮罩 独立遮罩 不受请求自动关闭的影响-->
      <div class="static_mask_self mui-hidden" @click="staticMaskHidden">&#160;</div>
      <!--自定义遮罩 带等待样式-->
      <div class="loadding mui-hidden">
        <van-loading type="spinner" color="#0069ac" size="44px"/>
      </div>
      <!--自定义遮罩 带等待样式-->
      <div class="loaddingT1 mui-hidden" @click="HiddenLoading('T1')">
        <img src="../assets/images/waittingT1.gif" class="loaddingT1_Img">
      </div>
      <div class="loaddingT2 mui-hidden" @click="HiddenLoading('T2')">
        <img src="../assets/images/waittingT2.gif" class="loaddingT2_Img">
      </div>
      <div class="loaddingT3 mui-hidden" @click="HiddenLoading('T3')">
        <img src="../assets/images/waittingT3.gif" class="loaddingT3_Img">
      </div>
      <!--风格样式-->
      <div class="styleMask" style="background: none">&#160;</div>
      <!--点击音效-->
      <div v-show="false">
        <video :src="pageData.domData.audioSrc" preload id="tapVideo"></video>
      </div>
      <!--APP - 4A登录UI-->
      <div id="HADbackground" style="display: none" class="HADbackground">
        <!--goHome获取数据成功后重新设置为display: none-->
        <div class="mask_contert">
          <div id="HADmsgs">
            <div id='HADbackground1' style="display: none;width: 60%;height: 250px;background: #fff;border-radius: 10px;margin-left: 20%;margin-top: 15%;">
              <img id='HADlogo' src="" width="66px" height="66px" style="margin-top: 20px;border-radius: 10px;">
              <div id="HADhadName" style="color: #333;margin-top: 10px;font-size: 18px;font-weight: 700;"></div>
              <div id="HADver" style="color: #666;margin-top: 5px;font-size: 16px;font-weight: 400;"></div>
              <div id="HADAuthentication" style="color: #333;margin-top: 30px;font-size: 18px;font-weight: 700;">正在认证...</div>
            </div>
            <div id='HADbackground2' style="display: none;position:absolute;top:0;left:0;width: 100%;height: 100vh;background: #fff;border-radius: 10px;">
              <img id='HADlogo2' src="" width="66px" height="66px" style="border-radius: 10px;margin-top: 35%;">
              <div id="HADhadName2" style="color: #333;margin-top: 10px;font-size: 18px;font-weight: 700;"></div>
              <div id="HADver2" style="color: #666;margin-top: 5px;font-size: 16px;font-weight: 400;"></div>
              <div style="color: #333;margin-top: 50px;font-size: 16px;font-weight: 500;">您没有安装最低版本<span id="HADhadName3"></span></div>
              <div style="color: #333;margin-top: 5px;font-size: 16px;font-weight: 500;">请先下载并安装，登录更安全</div>
              <div style="color: #fff;margin-top: 60px;font-size: 15px;font-weight: 400;">
                <div id="HADdonwload_button" style="width: 70%;height: 44px;background:#f7ab00;line-height: 44px;margin-left: 15%;border-radius: 10px;">下载并安装</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lessControl lessControlIsPad">
      <div>暂不支持</div>
      <div>这里是PAD系列</div>
      <div>页面逻辑复用需要注意ID重复问题</div>
    </div>
    <div class="lessControl lessControlIsPC">
      <div>暂不支持</div>
      <div>这里是 高清大屏PAD 或者 屏幕显示器 系列</div>
      <div>使用 https://www.iviewui.com/docs/introduce 框架部署</div>
      <div>页面逻辑复用需要注意ID重复问题</div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  export default {
    name: 'Main',
    data: function () {
      return {
        pageData: {
          isFrom: 'Main',
          appConf: {
            route: '',
            deBuge: false,
            browser: {}
          },
          domContorl: {
            showErudaMark: 0
          },
          domData: {
            useVedio: false,
            audioSrc: require('../assets/images/shuidi.mp3')
          },
          updateData: {},
          styleCell: {
            mainStyle: {
              width: '100%',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100vh',
              backgroundColor: '#e5e5e5',
              overflowY: 'scroll'
            }
          }
        }
      }
    },
    beforeCreate: function () {
    },
    created: function () {},
    beforeMount: function () {
    },
    mounted: function () {
      let app = this
      let mui = app.mui
      let YHCommon = app.YHCommon
      // mui初始化
      mui.init({
        swipeBack: false
      })
      // 如果是更新后首次进入，则清除所有缓存 每次更新后要根据更新日期或版本进行重命名
      if (!localStorage.getItem('FirstEntry1_0_1')) {
        // 更新说明
        localStorage.clear()
      }
      localStorage.setItem('FirstEntry1_0_1', true)
      // 收集浏览器信息
      let browser = {
        versions: (function () {
          let u = navigator.userAgent
          return {
            // IE内核
            trident: u.indexOf('Trident') > -1,
            // opera内核
            presto: u.indexOf('Presto') > -1,
            // 苹果、谷歌内核
            webKit: u.indexOf('AppleWebKit') > -1,
            // 火狐内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
            // 是否为移动终端
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1,
            // ios终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            // android终端或者uc浏览器
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            // 是否为iPhone或者QQHD浏览器
            iPhone: u.indexOf('iPhone') > -1,
            // 是否iPad
            iPad: u.indexOf('iPad') > -1,
            // 是否web应该程序，没有头部与底部
            webApp: u.indexOf('Safari') === -1,
            userAgent: navigator.userAgent
          }
        }()),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      }
      // 首次进入 全局配置自动初始化
      let Config = {
        NODE_ENV: (window.location.href.indexOf('test') === -1 && window.location.href.indexOf('19') === -1) ? 'production' : 'test', // 环境判断
        ddcorpId: 'dingc9d2820241461f3df2c783f7214b6d69', // 钉钉当前corpId
        ddcorpIdTest: 'dingc9d2820241461f3df2c783f7214b6d69', // 钉钉测试corpId
        ddcorpIdPro: 'dingc9d2820241461f3df2c783f7214b6d69', // 钉钉生产corpId
        ddAgentId: '', // 钉钉当前AgentId
        ddAgentIdTest: '', // 钉钉测试AgentId
        ddAgentIdPro: '', // 钉钉生产AgentId
        ddAccessToken: '', // 钉钉全局使用令牌
        wxAppId: 'wx636e8dd06bdac0ee', // 微信Appid
        wxAppIdTest: 'wx636e8dd06bdac0ee', // 微信Appid
        wxAppIdPro: 'wx636e8dd06bdac0ee', // 微信Appid
        wxcorpId: '', // 微信当前corpId
        wxcorpIdTest: '', // 微信测试corpId
        wxcorpIdPro: '', // 微信生产corpId
        wxAgentId: '', // 微信当前AgentId
        wxAgentIdTest: '', // 微信测试AgentId
        wxAgentIdPro: '', // 微信生产AgentId
        _4Atoken: '', // 4A 核安盾身份校验
        wxAccessToken: '', // 微信全局使用令牌
        browser: browser, // 浏览器内核信息
        originalFontSize: document.documentElement.style.fontSize, // 页面原始十分之一像素值
        fristTimeSetFont: null, // 用户自定义字体大小
        styleMask: null, // 用户自定义颜色主题
        modeUse: null, // 用户自定义模式 (如夜间模式）
        tapMusic: false // 点击音效
      }
      // 环境自动修正
      if (Config.NODE_ENV === 'test') {
        Config.ddcorpId = Config.ddcorpIdTest
        Config.ddAgentId = Config.ddAgentIdTest
        Config.wxcorpId = Config.wxcorpIdTest
        Config.wxAgentId = Config.wxAgentIdTest
        Config.wxAppId = Config.wxAppIdTest
      } else {
        Config.ddcorpId = Config.ddcorpIdPro
        Config.ddAgentId = Config.ddAgentIdPro
        Config.wxcorpId = Config.wxcorpIdPro
        Config.wxAgentId = Config.wxAgentIdPro
        Config.wxAppId = Config.wxAppIdPro
      }
      if ((window.location.href.indexOf('19') !== -1 && browser.versions.userAgent.indexOf('DingTalk') !== -1) || (mui.os.plus)) {
        // 本地调试时不开启
        app.eruda.init()
      }
      // 首次进入时，根据缓存更新全局配置
      if (!localStorage.getItem('Config')) {
        // 对JSON.stringify(Config)进行加密
        let _Config = app.$Utils.demoRequest(JSON.stringify(Config))
        localStorage.setItem('Config', _Config)
      }
      // 通用 H5缺陷修复-——无法定位输入框
      mui.ready(function () {
        mui('.MainDiv').on('tap', '.addContent', function (e) {
          document.getElementsByClassName('MainDiv')[0].style.height = '100vh'
          document.getElementsByClassName('addContent')[0].innerHTML = ''
          document.getElementsByClassName('addContent')[0].style.height = '0'
        })
      })
      // 环境检测 vue不支持IE
      // vuex store应用示例
      // console.log(app.$store.state.setting.isDingTalk)
      // console.log(app.$store.getters.doneTodos)
      // 钉钉浏览器
      if (browser.versions.userAgent.indexOf('DingTalk') !== -1) {
        app.$store.state.setting.isDingTalk = true
        // 隐藏系统自带头部 启用自定义头部
        app.hiddenSysTitle(true)
      }
      // 微信浏览器
      if (browser.versions.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
        app.$store.state.setting.isWX = true
        // 微信不支持自定义头部 只能启用其自带导航
        app.hiddenSysTitle(false)
      }
      // PC浏览器 这个可能变化 如F12 此时需要重新检测
      if (!browser.versions.mobile) {
        app.$store.state.setting.isPC = true
      } else {
        app.$store.state.setting.isPC = false
      }
      // 屏幕变化自动检测
      window.onresize = () => {
        return (() => {
          browser = {
            versions: (function () {
              let u = navigator.userAgent
              return {
                // IE内核
                trident: u.indexOf('Trident') > -1,
                // opera内核
                presto: u.indexOf('Presto') > -1,
                // 苹果、谷歌内核
                webKit: u.indexOf('AppleWebKit') > -1,
                // 火狐内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
                // 是否为移动终端
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf('iPad') > -1,
                // ios终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                // android终端或者uc浏览器
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                // 是否为iPhone或者QQHD浏览器
                iPhone: u.indexOf('iPhone') > -1,
                // 是否iPad
                iPad: u.indexOf('iPad') > -1,
                // 是否web应该程序，没有头部与底部
                webApp: u.indexOf('Safari') === -1,
                userAgent: navigator.userAgent
              }
            }()),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
          }
          YHCommon.updateConf('browser', browser)
          if (!browser.versions.mobile) {
            app.$store.state.setting.isPC = true
          } else {
            app.$store.state.setting.isPC = false
          }
        })()
      }
      // APP 基于DCloud的plus检测
      if (mui.os.plus) {
        app.$store.state.setting.isAPP = true
        mui.plusReady(function () {
          /* eslint-disable */
          // 和安盾4A登录集成
          let HADLogin = app.HADLogin
          new Promise(function (resolve) {
            HADLogin.getHAD(function () {
              resolve()
            })
          }).then(function () {
            HADLogin.callOauth(function (oauthResult) {
              // 判断认证是否成功
              // 4A 异常检验
              if(oauthResult === undefined || oauthResult.indexOf('取消') !== -1 || oauthResult.indexOf('错误') !== -1 || oauthResult.indexOf('异常') !== -1) {
                // 不转圈了
                document.getElementById('HADbackground1').style.display = 'block'
                document.getElementById('HADAuthentication').innerText = '安全认证未通过，请联系管理员'
              } else {
                // 认证通过
                document.getElementById('HADAuthentication').innerText = '安全认证通过'
                // 延迟关闭 HADbackground 并进入首页 认证信息存在 conf 的 _4Atoken 中
              }
            })
          })
          // 上部状态栏调整
          if(mui.os.android) {
            plus.navigator.setFullscreen(false)
            let originalHeight = document.body.clientHeight
            if (originalHeight === 720) {
              let getStatusbarHeight = plus.navigator.getStatusbarHeight()
              originalHeight = originalHeight + getStatusbarHeight
            }
            if (originalHeight === 782) {
              originalHeight = originalHeight + 11
            }
            plus.webview.currentWebview().setStyle({
              softinputMode: 'adjustResize',
              height: originalHeight
            })
          } else {
            console.log('setFullscreenFalse')
            plus.navigator.setFullscreen(true)
          }
          /* eslint-enable */
        })
      }
      // 主动提示安装pwa 示例代码
      // window.addEventListener("beforeinstallprompt", function(e) {
      //   // log the platforms provided as options in an install prompt
      //   console.log(e.platforms); // e.g., ["web", "android", "windows"]
      //   e.userChoice.then(function(outcome) {
      //     console.log(outcome); // either "installed", "dismissed", etc.
      //   }, handleError);
      // });
      setTimeout(function () {
        if (Config.NODE_ENV == 'test' && (app.$store.state.setting.isDingTalk || app.$store.state.setting.isWX)) {
          // 非生产且为钉钉或微信
          // app.eruda.init()
          console.log(Config)
          // 隐藏调试控制器
          // document.querySelectorAll('div')[document.querySelectorAll('div').length - 1].style.display = 'none'
          // 显示调试控制器
          // document.querySelectorAll('div')[document.querySelectorAll('div').length - 1].style.display = ''
        }
        // 全局控制字体方法 主题
        if (YHCommon.getConf('fristTimeSetFont')) {
          document.documentElement.style.fontSize = (YHCommon.getConf('originalFontSize').replace('px', '') - 1) + 1 + (YHCommon.getConf('fristTimeSetFont') - 1) + 1 + 'px'
        }
        if (YHCommon.getConf('styleMask')) {
          if (YHCommon.getConf('styleMask') == 'guohua') {
            document.querySelector('.styleMask').style.background = 'url("' + require('../assets/images/leaders4.jpeg') + '")'
          } else if (YHCommon.getConf('styleMask') == 'xiayu') {
            document.querySelector('.styleMask').style.background = 'url("' + require('../assets/images/xaiyu.gif') + '")'
          } else if (YHCommon.getConf('styleMask') == 'none') {
            document.querySelector('.styleMask').style.background = 'none'
          } else {
            document.querySelector('.styleMask').style.background = '#' + YHCommon.getConf('styleMask')
          }
        }
        if (YHCommon.getConf('modeUse')) {
          document.getElementsByClassName('MainDiv')[0].className = 'MainDiv ' + YHCommon.getConf('modeUse')
        }
        app.goHome()
      }, 500)
      // 统一监听用户手指操作
      document.addEventListener('touchstart', app.touch, false)
      document.addEventListener('touchmove', app.touch, false)
      document.addEventListener('touchend', app.touch, false)
    },
    beforeUpdate: function () {
    },
    updated: function () {},
    beforeDestroy: function () {
    },
    destroyed: function () {
    },
    methods: {
      hiddenSysTitle (boolen) {
        let app = this
        let dd = app.dd
        app.$store.state.setting.showHeader = boolen
        if (app.$store.state.setting.isDingTalk) {
          dd.ready(function () {
            dd.biz.navigation.hideBar({
              hidden: boolen, // true：隐藏，false：显示
              onSuccess: function (result) {
                console.log(result)
              },
              onFail: function (err) {
                console.log(err)
              }
            })
          })
        }
        if (app.$store.state.setting.isWX) {}
      },
      touch(event) {
        let app = this
        event = event || window.event
        switch (event.type) {
          case 'touchstart':
            app.$store.state.touchs.x = event.touches[0].clientX
            app.$store.state.touchs.y = event.touches[0].clientY
            break
          case 'touchend':
            break
          case 'touchmove':
            app.$store.state.touchs.x = event.touches[0].clientX
            app.$store.state.touchs.y = event.touches[0].clientY
            break
        }
      },
      HiddenLoading(type) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon['cgnLoadding' + type + 'Hidden']()
      },
      tapVideo () {
        let app = this
        let YHCommon = app.YHCommon
        // 钉钉环境上存在异常，会重复播放且ios上钉钉会自动下载并播放
        let tapVideo = document.getElementById('tapVideo')
        if (YHCommon.getConf('tapMusic') == 'true') {
          setTimeout(function () {
            tapVideo.play()
          }, 100)
        }
      },
      staticMaskHidden() {
        let app = this
        let ddCommon = app.ddCommon
        if (ddCommon.getConf('CompanyId') !== undefined) {
          if (document.querySelector('.companyPopupShow')) {
            ddCommon.cgnStaticHidden(true)
            // 执行 ref 为 chartView 的 router-view 的 xxx 方法 用于任意指定 router-view 子页面的指定方法调用
            // if (app.$refs['chartView'].xxx) {
            //   app.$refs['chartView'].xxx()
            // }
          }
        }
      },
      showEruda () {
        let app = this
        let YHCommon = app.YHCommon
        let showErudaMark = JSON.stringify(app.pageData.domContorl.showErudaMark)
        showErudaMark = showErudaMark - 1 + 2
        if (showErudaMark >= 9) {
          document.querySelectorAll('div')[document.querySelectorAll('div').length - 1].style.display = ''
          YHCommon.cgnWaittingHidden()
        }
        if (showErudaMark >= 10) {
          app.eruda.init()
          document.querySelectorAll('div')[document.querySelectorAll('div').length - 1].style.display = 'none'
          showErudaMark = 0
        }
        app.$set(app.pageData.domContorl, 'showErudaMark', showErudaMark)
      },
      forwardPassData (methods, params) { // 父组件的方法
        this.$emit(methods, params)
      },
      backwardPassData (methods, params) { // 子组件的方法
        let app = this
        app.$refs.son[methods](params)
      },
      goHome () { // 进入首页
        let app = this
        app.$router.replace({
          name: 'home',
          params: app.pageData
        })
      }
    },
    watch: {
      $route (to, from) {
        let app = this
        let dd = app.dd
        if (app.$store.state.setting.isDingTalk) {
          // 钉钉环境下自动更换标题栏
          dd.ready(function () {
            dd.biz.navigation.setTitle({
              title: app.$store.state.setting.headerTitle,
              onSuccess: function (result) {},
              onFail: function (err) {
                console.log(err)
              }
            })
          })
        }
        console.log(to.name)
        switch (to.name) {
          case 'home':
            app.$store.state.setting.headerTitle = '首页'
            break
          case 'setting':
            app.$store.state.setting.headerTitle = '设置'
            break
          case 'dbList':
            app.$store.state.setting.headerTitle = '列表'
            break
          case 'dbDetail_oncallhdm':
            app.$store.state.setting.headerTitle = '流程B'
            break
          case 'taskCenter_launch_detail':
            app.$store.state.setting.headerTitle = '流程A'
            break
          case 'taskCenter':
            app.$store.state.setting.headerTitle = '流程中心'
            break
          case 'technology':
            app.$store.state.setting.headerTitle = '移动天文台'
            break
          default:
        }
      }
    },
    components: {
      Toast
    }
  }
</script>

<style src="../assets/css/vant.css"></style>
<style scoped src="../assets/css/mui.min.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>
<style>
  .mui-hidden {
    display: none;
  }
  /*在需要受夜间模式控制的根节点下追加class modeUse_block*/
  .nightMode .modeUse_block div:not([class*="van-radio"]):not([class*="van-popup"]):not([class*="van-picker"]):not([class*="van-ellipsis"]):not([class*="block"]):not([class*="van-switch"]),
  .nightMode .modeUse_block span:not([class*="van-picker"]):not([class*="van-ellipsis"]),
  .nightMode .modeUse_block button:not([class*="van-picker"]):not([class*="van-ellipsis"]){
    background: #666 !important;
    color: #e5e5e5 !important;
  }
</style>
<style scoped>
  /*这部分是用来控制transition的*/
  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    display: none
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
  }
  .waiting_img {
    width: 176px;
    height: 50px;
    position: absolute;
    top: calc(50vh - 25px - 44px);
    left: calc(50% - 88px);
  }

  .waitting_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2001;
    opacity: 1;
    background: #004a86;
    animation: waitting 2s infinite ease-out 1s;
  }

  .static_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2001;
    opacity: 0.6;
    background: #000;
  }
  .static_mask_self {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2001;
    opacity: 0.6;
    background: #000;
  }
  @keyframes waitting {
    0% {
      opacity: 0.9;
      background: #004a86;
    }
    50% {
      opacity: 0.3;
      background: #004a86;
    }
    100% {
      opacity: 0.9;
      background: #004a86;
    }
  }

  .loadding {
    position: absolute;
    z-index: 999;
    top: calc(50% - 22px - 44px);
    left: calc(50% - 22px);
    width: 100%;
  }

  .loadding >>> .van-loading__spinner--spinner i::before {
    width: 2px;
  }
  .loaddingT1 {
    position: absolute;
    z-index: 9999;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.5;
  }
  .loaddingT1_Img {
    position: absolute;
    height: 100px;
    width: 100px;
    top: calc((100vh - 120px) / 2);
    left: calc((100% - 100px) / 2);
  }
  .loaddingT2 {
    position: absolute;
    z-index: 9999;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    background: #2b2d31;
    opacity: 0.5;
  }
  .loaddingT2_Img {
    position: absolute;
    height: 150px;
    width: 267px;
    top: calc((100vh - 250px) / 2);
    left: calc((100% - 267px) / 2);
  }
  .loaddingT3 {
    position: absolute;
    z-index: 9999;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    background: #1d91f3;
    opacity: 0.5;
  }
  .loaddingT3_Img {
    position: absolute;
    height: 200px;
    width: 267px;
    top: calc((100vh - 250px) / 2);
    left: calc((100% - 267px) / 2);
  }
  .styleMask {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.2;
    width: 100%;
    height: 100vh;
    z-index: 100;
    pointer-events: none;
    background-size:100% 100%;
    background: #fff;
    background-repeat: no-repeat;
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/
    -webkit-user-select:none; /*webkit浏览器*/
    -khtml-user-select:none; /*早期浏览器*/
    -moz-user-select:none;/*火狐*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
  }
  .HADbackground{
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .mask_contert {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #999;
    color: #fff;
    z-index: 20;
    font-weight: 700;
    font-size: 18px;
  }
  #HADmsgs {
    text-align: center;
    padding-top: 35%;
  }
</style>
