<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block pixi_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="$router.back(-1)"><span class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <div id="pixi" class="pixi"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'pixi',
    data: function () {
      return {
        pageData: {
          isFrom: 'pixi',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {},
          domData: {},
          updateData: {},
          styleCell: {
            mainStyle: {
              width: '100%',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100vh',
              backgroundColor: '#ffffff',
              overflowY: 'scroll'
            }
          }
        }
      }
    },
    beforeCreate: function () {},
    created: function () {
    },
    beforeMount: function () {},
    mounted: function () {
      let app = this
      let YHCommon = app.YHCommon
      let PIXI = app.PIXI
      app.$store.state.setting.goOn = true
      // 检查是否支持pixi
      // https://pixijs.huashengweilai.com/
      let type = 'WebGL'
      if (!PIXI.utils.isWebGLSupported()) {
        type = 'canvas'
      }
      PIXI.utils.sayHello(type)
      // 获取屏幕宽高
      let width = document.getElementsByClassName('pixi_MainDiv')[0].clientWidth
      let height = document.getElementsByClassName('pixi_MainDiv')[0].clientHeight
      // https://pixijs.huashengweilai.com API（有冲突的话以这个为准）
      // http://pixijs.download/release/docs/index.html 中文网(有点旧)
      // https://pixijs.io/examples/#/demos-basic/container.js 演示
      let webgl = new PIXI.Application({
        width: width, // 宽度
        height: height, // 高度
        antialias: true, // 反锯齿
        resolution: 1, // 分辨率
        transparent: true // 背景透明
      })
      // 改变背景
      webgl.renderer.backgroundColor = 0xffffff
      document.getElementById('pixi').appendChild(webgl.view)
      // 按屏幕比例缩放
      // https://github.com/kittykatattack/scaleToWindow
      // var scale = YHCommon.scaleToWindow(webgl.view)
      // console.log(scale)
      // 加载图像
      // add追加可处理资源
      // load中执行处理内容
      let loader = new PIXI.Loader()
      loader.add('self', require('../assets/images/self.png'))
        .add('leaders1', require('../assets/images/leaders1.jpg'))
        .add('spimg', require('../assets/images/tileset.png'))
      loader.onProgress.add(function (loader, resource) {
        // 监听加载过程
        console.log('loading: ' + resource.url)
        // 整体加载进度
        console.log('progress: ' + loader.progress + '%')
      })
      // 可以单独处理这样写
      // loader.add({name: 'self', url: require('../assets/images/self.png'), onComplete: function () {}})
      loader.load((loader, resources) => {
        // 将图片转换成GPU可以处理的纹理
        let self = new PIXI.TilingSprite(resources.self.texture)
        let leaders1 = new PIXI.TilingSprite(resources.leaders1.texture)
        // 单位PX 要求要知道图片原来的真实比例 不一致将显示不全或平铺 后续可通过缩放来压缩显示比例
        self.width = '400'
        self.height = '400'
        leaders1.width = '500'
        leaders1.height = '353'
        // 缩放
        self.scale.set(0.5, 0.5)
        leaders1.scale.set(0.7, 0.7)
        // 移动像素
        self.x = webgl.renderer.width / 2
        self.y = webgl.renderer.height / 2
        // 移动速度 像素
        self.vx = 0
        self.vy = 0
        // 锚点 1为左上角 0为右下角 0.5 时为居中
        self.anchor.x = 0.5
        self.anchor.y = 0.5
        // 改变精灵原点 将会改变精灵坐标 但占容器的空间不会改变 碰撞检测还是基于以前的状态
        // leaders1.pivot.set(32, 32)
        // 旋转 单位弧度值 占容器的空间位置值不会改变 碰撞检测还是基于以前的状态
        // leaders1.rotation = 5
        // 可固定偏离度数然后调整起始位置来控制整体 如
        // self.x = webgl.renderer.width - 200
        // self.y = webgl.renderer.height - 200
        // 先渲染的会在下层
        webgl.stage.addChild(leaders1)
        webgl.stage.addChild(self)
        // 抽取雪碧图 从一个图中裁剪 x=96 y=64 然后往下延伸 32 32的区域
        // let rectangle = new PIXI.Rectangle(96, 64, 32, 32)
        let rectangle = new PIXI.Rectangle(88, 88, 64, 64)
        resources.spimg.texture.frame = rectangle
        let rocket = new PIXI.Sprite(resources.spimg.texture)
        rocket.x = 32
        rocket.y = 32
        webgl.stage.addChild(rocket)
        // 追加帧动画 每秒执行60次
        webgl.ticker.add((delta) => {
          //  追加行为 单位帧  self每一帧转一圈
          // delta表示帧之间的延迟分量=(当前帧的时间 - 上一帧的时间) / (1000 / 60) 不足60帧时需要增加这个值作为过渡使动作更平滑 大部分设备不需要加这个值
          // self.rotation = self.rotation + (0.01 * delta)
          // 每一帧按一个固定速度移动
          // 碰撞检测
          if (YHCommon.hitTestRectangle(self, leaders1)) {
            console.log('两个图碰撞了')
            app.$store.state.setting.goOn = true
            self.y += 1
          } else {
            if (self.y - 1 + 200 * 0.5 > webgl.renderer.height) {
              app.$store.state.setting.goOn = false
              console.log('到达边界', app.$store.state.setting.goOn)
              self.y = self.y - 1
            } else {
              if (app.$store.state.setting.goOn) {
                self.y += 1
              } else {
                self.y -= 1
              }
            }
          }
          // self.x += self.vx
          // self.y += self.vy
        })
        // 改变某个渲染层的动画内容
        setTimeout(function () {
          self.texture = resources.leaders1.texture
        }, 5000)
        // 隐藏self
        // self.visible = false
        // 移除self
        // webgl.stage.removeChild(self)
      })
    },
    beforeUpdate: function () {},
    updated: function () {},
    beforeDestroy: function () {},
    destroyed: function () {},
    filters: {},
    methods: {
      forwardPassData (methods, params) { // 父组件的方法
        this.$emit(methods, params)
      },
      backwardPassData (methods, params) { // 子组件的方法
        let app = this
        app.$refs.son[methods](params)
      }
    },
    watch: {
      $route (to, from) {}
    },
    components: {}
  }
</script>

<style src="../fonts/iconfont.css"></style>
<style src="../assets/css/vant.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>

<style scoped>
  .pixi {
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
