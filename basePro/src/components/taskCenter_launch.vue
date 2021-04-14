<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block taskCenter_launch_MainDiv">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'taskCenter_launch',
    data: function () {
      return {
        pageData: {
          isFrom: 'taskCenter_launch',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {},
          domData: {},
          updateData: {},
          styleCell: {
            mainStyle: {}
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
      let type = JSON.stringify(app.$route.params.type)
      switch (type) {
        case '"taskCenter_launch_detail"':
          app.$router.replace({ name: 'taskCenter_launch_detail' })
          break
        case '"dbDetail_oncallhdm"':
          app.$router.replace({
            name: 'dbDetail',
            params: {
              isFrom: 'taskCenter_launch'
            }
          })
          break
        default:
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
<style scoped></style>
