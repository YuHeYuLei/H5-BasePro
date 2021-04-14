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
    beforeMount: function () {
    },
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

      // Options for how objects interact
      // How fast the red square moves
      const movementSpeed = 0.05

      // Strength of the impulse push between two objects
      const impulsePower = 5

      // Test For Hit
      // A basic AABB check between two different squares
      function testForAABB (object1, object2) {
        const bounds1 = object1.getBounds()
        const bounds2 = object2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width &&
          bounds1.x + bounds1.width > bounds2.x &&
          bounds1.y < bounds2.y + bounds2.height &&
          bounds1.y + bounds1.height > bounds2.y
      }

      // Calculates the results of a collision, allowing us to give an impulse that
      // shoves objects apart
      function collisionResponse (object1, object2) {
        if (!object1 || !object2) {
          return new PIXI.Point(0)
        }

        const vCollision = new PIXI.Point(
          object2.x - object1.x,
          object2.y - object1.y
        )

        const distance = Math.sqrt(
          (object2.x - object1.x) * (object2.x - object1.x) +
          (object2.y - object1.y) * (object2.y - object1.y)
        )

        const vCollisionNorm = new PIXI.Point(
          vCollision.x / distance,
          vCollision.y / distance
        )

        const vRelativeVelocity = new PIXI.Point(
          object1.acceleration.x - object2.acceleration.x,
          object1.acceleration.y - object2.acceleration.y
        )

        const speed = vRelativeVelocity.x * vCollisionNorm.x +
          vRelativeVelocity.y * vCollisionNorm.y

        const impulse = impulsePower * speed / (object1.mass + object2.mass)

        return new PIXI.Point(
          impulse * vCollisionNorm.x,
          impulse * vCollisionNorm.y
        )
      }

      // Calculate the distance between two given points
      function distanceBetweenTwoPoints (p1, p2) {
        const a = p1.x - p2.x
        const b = p1.y - p2.y

        return Math.hypot(a, b)
      }

      // The green square we will knock about
      const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE)
      greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2)
      greenSquare.width = 100
      greenSquare.height = 100
      greenSquare.tint = '0x00FF00'
      greenSquare.acceleration = new PIXI.Point(0)
      greenSquare.mass = 3

      // The square you move around
      const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE)
      redSquare.position.set(0, 0)
      redSquare.width = 100
      redSquare.height = 100
      redSquare.tint = '0xFF0000'
      redSquare.acceleration = new PIXI.Point(0)
      redSquare.mass = 1

      // Listen for animate update
      app.ticker.add((delta) => {
        // Applied deacceleration for both squares, done by reducing the
        // acceleration by 0.01% of the acceleration every loop
        redSquare.acceleration.set(redSquare.acceleration.x * 0.99, redSquare.acceleration.y * 0.99)
        greenSquare.acceleration.set(greenSquare.acceleration.x * 0.99, greenSquare.acceleration.y * 0.99)

        const mouseCoords = {
          x: self.$store.state.touchs.x,
          y: self.$store.state.touchs.y
        }

        // Check whether the green square ever moves off the screen
        // If so, reverse acceleration in that direction
        if (greenSquare.x < 0 || greenSquare.x > (app.screen.width - 100)) {
          greenSquare.acceleration.x = -greenSquare.acceleration.x
        }

        if (greenSquare.y < 0 || greenSquare.y > (app.screen.height - 100)) {
          greenSquare.acceleration.y = -greenSquare.acceleration.y
        }

        // If the green square pops out of the cordon, it pops back into the
        // middle
        if ((greenSquare.x < -30 || greenSquare.x > (app.screen.width + 30)) ||
          greenSquare.y < -30 || greenSquare.y > (app.screen.height + 30)) {
          greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2)
        }

        // If the mouse is off screen, then don't update any further
        if (app.screen.width > mouseCoords.x || mouseCoords.x > 0 ||
          app.screen.height > mouseCoords.y || mouseCoords.y > 0) {
          // Get the red square's center point
          const redSquareCenterPosition = new PIXI.Point(
            redSquare.x + (redSquare.width * 0.5),
            redSquare.y + (redSquare.height * 0.5)
          )

          // Calculate the direction vector between the mouse pointer and
          // the red square
          const toMouseDirection = new PIXI.Point(
            mouseCoords.x - redSquareCenterPosition.x,
            mouseCoords.y - redSquareCenterPosition.y
          )

          // Use the above to figure out the angle that direction has
          const angleToMouse = Math.atan2(
            toMouseDirection.y,
            toMouseDirection.x
          )

          // Figure out the speed the square should be travelling by, as a
          // function of how far away from the mouse pointer the red square is
          const distMouseRedSquare = distanceBetweenTwoPoints(
            mouseCoords,
            redSquareCenterPosition
          )
          const redSpeed = distMouseRedSquare * movementSpeed

          // Calculate the acceleration of the red square
          redSquare.acceleration.set(
            Math.cos(angleToMouse) * redSpeed,
            Math.sin(angleToMouse) * redSpeed
          )
        }

        // If the two squares are colliding
        if (testForAABB(greenSquare, redSquare)) {
          // Calculate the changes in acceleration that should be made between
          // each square as a result of the collision
          const collisionPush = collisionResponse(greenSquare, redSquare)
          // Set the changes in acceleration for both squares
          redSquare.acceleration.set(
            (collisionPush.x * greenSquare.mass),
            (collisionPush.y * greenSquare.mass)
          )
          greenSquare.acceleration.set(
            -(collisionPush.x * redSquare.mass),
            -(collisionPush.y * redSquare.mass)
          )
        }

        greenSquare.x += greenSquare.acceleration.x * delta
        greenSquare.y += greenSquare.acceleration.y * delta

        redSquare.x += redSquare.acceleration.x * delta
        redSquare.y += redSquare.acceleration.y * delta
      })

      // Add to stage
      app.stage.addChild(redSquare, greenSquare)
    },
    beforeUpdate: function () {
    },
    updated: function () {
    },
    beforeDestroy: function () {
    },
    destroyed: function () {
    },
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
      $route (to, from) {
      }
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
