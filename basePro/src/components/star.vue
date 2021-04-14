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
      let PIXI = this.PIXI
      let width = document.getElementsByClassName('pixi_MainDiv')[0].clientWidth
      let height = document.getElementsByClassName('pixi_MainDiv')[0].clientHeight
      const app = new PIXI.Application({
        width: width, // 宽度
        height: height, // 高度
        antialias: true, // 反锯齿
        resolution: 1, // 分辨率
        backgroundColor: 0x000000
      })
      document.getElementById('pixi').appendChild(app.view)

      // Get the texture for rope.
      const starTexture = PIXI.Texture.from(require('../assets/images/star0.png'))

      const starAmount = 1000
      let cameraZ = 0
      const fov = 20
      const baseSpeed = 0.025
      let speed = 0
      let warpSpeed = 0
      const starStretch = 5
      const starBaseSize = 0.05

      // Create the stars
      const stars = []
      for (let i = 0; i < starAmount; i++) {
        const star = {
          sprite: new PIXI.Sprite(starTexture),
          z: 0,
          x: 0,
          y: 0
        }
        star.sprite.anchor.x = 0.5
        star.sprite.anchor.y = 0.7
        randomizeStar(star, true)
        app.stage.addChild(star.sprite)
        stars.push(star)
      }

      function randomizeStar(star, initial) {
        star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000

        // Calculate star positions with radial random coordinate so no star hits the camera.
        const deg = Math.random() * Math.PI * 2
        const distance = Math.random() * 50 + 1
        star.x = Math.cos(deg) * distance
        star.y = Math.sin(deg) * distance
      }

      // Change flight speed every 5 seconds
      // setInterval(() => {
      //   warpSpeed = warpSpeed > 0 ? 0 : 1
      // }, 5000)

      // Listen for animate update
      app.ticker.add((delta) => {
        // Simple easing. This should be changed to proper easing function when used for real.
        warpSpeed = warpSpeed * 1.001 + 0.001
        if (warpSpeed > 2) {
          warpSpeed = 2
        }
        speed += (warpSpeed - speed) / 20
        cameraZ += delta * 10 * (speed + baseSpeed)
        for (let i = 0; i < starAmount; i++) {
          const star = stars[i]
          if (star.z < cameraZ) randomizeStar(star)

          // Map star 3d position to 2d with really simple projection
          const z = star.z - cameraZ
          star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2
          star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2

          // Calculate star scale & rotation.
          const dxCenter = star.sprite.x - app.renderer.screen.width / 2
          const dyCenter = star.sprite.y - app.renderer.screen.height / 2
          const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter)
          const distanceScale = Math.max(0, (2000 - z) / 2000)
          star.sprite.scale.x = distanceScale * starBaseSize
          // Star is looking towards center so that y axis is towards center.
          // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
          star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width
          star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2
        }
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
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
