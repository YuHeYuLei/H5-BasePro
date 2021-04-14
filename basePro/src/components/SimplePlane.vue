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
    name: 'star',
    data: function () {
      return {
        pageData: {
          isFrom: 'star',
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
      let self = this
      let PIXI = self.PIXI
      let width = document.getElementsByClassName('pixi_MainDiv')[0].clientWidth
      let height = document.getElementsByClassName('pixi_MainDiv')[0].clientHeight
      const app = new PIXI.Application({
        width: width, // 宽度
        height: height, // 高度
        antialias: true, // 反锯齿
        resolution: 1, // 分辨率
        backgroundColor: 0x1099bb
      })

      // Get the texture for rope.
      // const app = new PIXI.Application({
      //   width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1
      // })
      document.getElementById('pixi').appendChild(app.view)

      app.loader
        .add('bg_grass', require('../assets/images/bg_grass.jpeg'))
        .load(build)

      function build() {
        // Create a new texture
        const texture = app.loader.resources.bg_grass.texture

        // Create the simple plane
        const verticesX = 10
        const verticesY = 10
        const plane = new PIXI.SimplePlane(texture, verticesX, verticesY)

        plane.x = 50
        plane.y = 50
        plane.scale.set(0.5, 0.5)
        app.stage.addChild(plane)

        // Get the buffer for vertice positions.
        const buffer = plane.geometry.getBuffer('aVertexPosition')

        // Listen for animate update
        app.ticker.add((delta) => {
          // Randomize the vertice positions a bit to create movement.
          for (let i = 0; i < buffer.data.length; i++) {
            buffer.data[i] += (Math.random() - 0.5)
          }
          buffer.update()
        })
      }
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
