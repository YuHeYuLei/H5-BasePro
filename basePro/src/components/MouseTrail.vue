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
      document.getElementById('pixi').appendChild(app.view)

      // Get the texture for rope.
      const trailTexture = PIXI.Texture.from(require('../assets/images/trail.png'))
      const historyX = []
      const historyY = []
      // historySize determines how long the trail will be.
      const historySize = 20
      // ropeSize determines how smooth the trail will be.
      const ropeSize = 100
      const points = []

      // Create history array.
      for (let i = 0; i < historySize; i++) {
        historyX.push(0)
        historyY.push(0)
      }
      // Create rope points.
      for (let i = 0; i < ropeSize; i++) {
        points.push(new PIXI.Point(0, 0))
      }

      // Create the rope
      const rope = new PIXI.SimpleRope(trailTexture, points)

      // Set the blendmode
      rope.blendmode = PIXI.BLEND_MODES.ADD

      app.stage.addChild(rope)

      // Listen for animate update
      app.ticker.add((delta) => {
        // Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
        // When implementing this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
        // const mouseposition = app.renderer.plugins.interaction.mouse.global
        //
        // console.log(mouseposition)
        // Update the mouse values to history
        historyX.pop()
        historyX.unshift(self.$store.state.touchs.x)
        historyY.pop()
        historyY.unshift(self.$store.state.touchs.y)
        // Update the points to correspond with history.
        for (let i = 0; i < ropeSize; i++) {
          const p = points[i]

          // Smooth the curve with cubic interpolation to prevent sharp edges.
          const ix = cubicInterpolation(historyX, i / ropeSize * historySize)
          const iy = cubicInterpolation(historyY, i / ropeSize * historySize)

          p.x = ix
          p.y = iy
        }
      })

      /**
       * Cubic interpolation based on https://github.com/osuushi/Smooth.js
       */
      function clipInput(k, arr) {
        if (k < 0) k = 0
        if (k > arr.length - 1) k = arr.length - 1
        return arr[k]
      }

      function getTangent(k, factor, array) {
        return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2
      }

      function cubicInterpolation(array, t, tangentFactor) {
        if (tangentFactor == null) tangentFactor = 1

        const k = Math.floor(t)
        const m = [getTangent(k, tangentFactor, array), getTangent(k + 1, tangentFactor, array)]
        const p = [clipInput(k, array), clipInput(k + 1, array)]
        t -= k
        const t2 = t * t
        const t3 = t * t2
        return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1]
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
