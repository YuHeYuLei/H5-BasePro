<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block taskCenter_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="$router.back(-1)"><span class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <van-collapse v-model="pageData.domContorl.activeName" accordion>
        <van-collapse-item title="模板" name="t1" size="large">
          <div class="taskCenterList" @click="launch('taskCenter_launch_detail')">
            <img class="taskCenterList_LeftImg" src="../assets/images/wn-taskccenter-8.png">
            <span>基础流程模板</span>
            <img class="taskCenterList_rightImg" src="../assets/images/wn-message-arrow.png">
          </div>
        </van-collapse-item>
        <van-collapse-item title="测试" name="t3" size="large">
          <div class="taskCenterList" @click="launch('dbDetail_oncallhdm')">
            <img class="taskCenterList_LeftImg" src="../assets/images/wn-taskccenter-4.png">
            <span>不同场景的同一流程</span>
            <img class="taskCenterList_rightImg" src="../assets/images/wn-message-arrow.png">
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'taskCenter',
    data: function () {
      return {
        pageData: {
          isFrom: 'taskCenter',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {
            activeName: 't1'
          },
          domData: {},
          updateData: {},
          styleCell: {
            mainStyle: {
              width: '100%',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100vh',
              backgroundColor: '#fff',
              overflowY: 'scroll'
            }
          }
        }
      }
    },
    beforeCreate: function () {},
    created: function () {},
    beforeMount: function () {},
    mounted: function () {},
    beforeUpdate: function () {},
    updated: function () {},
    beforeDestroy: function () {},
    destroyed: function () {
    },
    filters: {},
    methods: {
      launch (type) {
        let app = this
        let params = {
          type: type
        }
        app.$router.push({
          name: 'taskCenter_launch',
          params: params
        })
      },
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
<style scoped src="../assets/css/mui.min.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>

<style scoped>
  .taskCenterList {
    width: 100%;
    height: 55px;
    line-height: 55px;
    background: #fff;
    padding-top: 5px;
    margin-bottom: 1px;
  }

  .taskCenterList_LeftImg {
    margin-top: 9px;
    margin-left: 15px;
    width: 33px;
    /*height: 33px;*/
    float: left;
  }

  .taskCenterList span {
    font-size: 15px;
    font-weight: 600;
    padding-left: 10px;
    color: #222;
    float: left;
  }

  .taskCenterList_rightImg {
    margin-top: 17px;
    width: 7px;
    height: 11px;
    float: right;
    margin-right: 15px;
  }

  .taskCenter_MainDiv >>> .van-cell__title {
    font-size: 16px;
    font-weight: 600;
  }
</style>
