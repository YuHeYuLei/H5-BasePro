<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block dbDetail_MainDiv">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'dbDetail',
    data: function () {
      return {
        pageData: {
          isFrom: 'dbDetail',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {},
          domData: {
            title: '待办详情'
          },
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
      // 根据流程类型修改title
      let FlowName = JSON.stringify(app.$route.params.FlowName)
      console.log(FlowName)
      app.$set(app.pageData.domData, 'title', 'On-Call会点名')
      app.$router.replace({
        name: 'dbDetail_oncallhdm',
        params: JSON.parse(JSON.stringify(app.$route.params))
      })
    },
    beforeUpdate: function () {
    },
    updated: function () {},
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
<style scoped src="../assets/css/mui.min.css"></style>
<style scoped></style>
