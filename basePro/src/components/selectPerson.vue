<template>
  <div :style="pageData.styleCell.mainStyle" class="selectPerson_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="$router.back(-1)"><span
        class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <div class="search">
        <van-search
          v-model="pageData.domData.value"
          placeholder="请输入完整员工号"
          input-align="left"
          @search="onSearch"
          @input="onInput"
        />
      </div>
      <div class="personCell" v-show="pageData.domContorl.showUserData">
        <van-radio-group v-model="pageData.domData.radio">
          <van-radio v-for="(value, index) in pageData.domData.userData" :key="index"
                     @click="selectPerson(value)">
            <div class="selectPerson_top">[{{value.StaffNo}}] {{value.Name}} {{value.OfficeAddr}}</div>
            <div class="selectPerson_down">{{value.CorpName}}/{{value.DeptName}}</div>
            <template #icon="props">
              <img class="img-icon"
                   :src="props.checked ? pageData.domContorl.activeIcon : pageData.domContorl.inactiveIcon"/>
            </template>
          </van-radio>
        </van-radio-group>
      </div>
      <div class="noData" v-show="!pageData.domContorl.showUserData">
        <div style="padding-top: 50%">暂无数据</div>
        <div>(暂不支持模糊检索)</div>
      </div>
    </div>
  </div>
</template>

<script>

  import { Toast } from 'vant'

  export default {
    name: 'selectPerson',
    data: function () {
      return {
        pageData: {
          isFrom: 'selectPerson',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {
            activeIcon: require('../assets/images/user-active.png'),
            inactiveIcon: require('../assets/images/user-inactive.png'),
            showUserData: false
          },
          domData: {
            radio: '',
            value: '',
            beforePageData: {},
            onInputTimeout: {},
            selectPersonTimeOut: {},
            aim: '',
            userData: {
              'DataList': {
                'Id': '176384',
                'StaffNo': 'P620393',
                'Name': '周俊杰',
                'NameInPY': 'ZHOU JUN JIE',
                'DeptID': '10873',
                'OfficeAddr': '广东省深圳市中广核大厦8楼',
                'AllTels': '15975597927',
                'Email': '',
                'MobilePhone': '15975597927',
                'OfficeTel': '15975597927',
                'CorpName': 'CGNP|中国广核电力股份有限公司',
                'DeptName': 'CIT|信息技术中心信息技术中心信息技术中心信息技术中心信息技术中心信息技术中心信息技术中心信息技术中心信息技术中心',
                'BPNumber ': '',
                'Position': '',
                'SHTTel': '',
                'ShortPY': 'ZJJ'
              }
            }
          },
          updateData: {},
          styleCell: {
            mainStyle: {
              width: '100%',
              height: '100vh'
            }
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
      let YHCommon = app.YHCommon
      // 缓存domData
      // console.log(app.$route.params.isFrom)
      YHCommon.updatebaseData('domData', JSON.stringify(app.$route.params.domData))
      YHCommon.updatebaseData('isFrom', JSON.stringify(app.$route.params.isFrom))
      let domData = JSON.parse(JSON.stringify(app.$route.params.domData))
      let aim = app.$route.params.aim
      app.$set(app.pageData.domData, 'beforePageData', domData)
      app.$set(app.pageData.domData, 'aim', aim)
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
      onSearch (val) {
        // GetUsersInfo
        // let app = this
        // let epmsAxios = app.epmsAxios
        // 发起数据获取 GetDutyConfirmDetail
        Toast('视图数据更新中,请稍等...')
        // let params = {
        //   'ActionType': 'GetUsersInfo',
        //   'ParamList': JSON.stringify({
        //     UserId: val
        //   })
        // }
        // epmsAxios.SoapHttpRequest(params).then(function (response) {
        //   let _response = epmsAxios.EPMS_xmlDataToJSON(response.data).List
        //   if (_response.DataList && _response.DataList.Name !== '') {
        //     app.$set(app.pageData.domData, 'userData', _response)
        //     app.$set(app.pageData.domContorl, 'showUserData', true)
        //   }
        // })
      },
      onInput (val) {
        let app = this
        clearTimeout(app.pageData.domData.onInputTimeout)
        app.pageData.domData.onInputTimeout = setTimeout(function () {
          // let epmsAxios = app.epmsAxios
          // // 发起数据获取 GetDutyConfirmDetail
          // let params = {
          //   'ActionType': 'GetUsersInfo',
          //   'ParamList': JSON.stringify({
          //     UserId: val
          //   })
          // }
          Toast('视图数据更新中,请稍等...')
          // epmsAxios.SoapHttpRequest(params).then(function (response) {
          //   let _response = epmsAxios.EPMS_xmlDataToJSON(response.data).List
          //   if (_response.DataList.Name !== '') {
          //     app.$set(app.pageData.domData, 'userData', _response)
          //     app.$set(app.pageData.domContorl, 'showUserData', true)
          //   }
          // })
        }, 2000)
      },
      selectPerson (value) {
        let app = this
        let YHCommon = app.YHCommon
        clearTimeout(app.pageData.domData.selectPersonTimeOut)
        app.pageData.domData.selectPersonTimeOut = setTimeout(function () {
          app.pageData.domData.beforePageData[app.pageData.domData.aim] = '[' + value.StaffNo + ']' + value.Name
          // 缓存检索的人员结果，如有需要从这里取
          YHCommon.updatebaseData('selectPersonData', JSON.stringify(value))
          YHCommon.updatebaseData('selectPerson', JSON.stringify(app.pageData.domData.beforePageData))
          app.$router.back(-1)
        }, 500)
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
      $route (to, from) {
      }
    },
    components: {
      Toast
    }
  }
</script>

<style src="../fonts/iconfont.css"></style>
<style src="../assets/css/vant.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>

<style scoped>
  .search >>> .van-search__content {
    border-radius: 5px;
  }

  .img-icon {
    height: 20px;
  }

  .personCell {
    width: calc(100% - 30px);
    min-height: 55px;
    padding: 15px;
    background: #f5f5f5;
  }

  .personCell >>> .van-radio-old {
    background: #f5f5f5;
    padding: 5px;
  }

  .selectPerson_top {
    width: 100%;
    min-height: 25px;
    margin-top: 5px;
    line-height: 25px;
    font-size: 13px;
    font-weight: 700;
    color: #b5b5b5;
    word-break: break-all;
  }

  .selectPerson_down {
    width: 100%;
    min-height: 25px;
    line-height: 25px;
    font-size: 13px;
    font-weight: 300;
    color: #b5b5b5;
    word-break: break-all
  }

  .noData {
    width: calc(100% - 30px);
    text-align: center;
    font-weight: 300;
    font-size: 15px;
    margin-left: 15px;
    border: solid #e5e5e5 1px;
    height: calc(100vh - 55px);
    color: #999;
    background: #ffffff;
    animation: colorWidthSide 5s infinite ease-out .5s;
  }

  @keyframes colorWidthSide {
    0% {
      width: calc(100% - 30px);
      margin-left: 15px;
    }
    50% {
      width: 100%;
      margin-left: 0;
    }
    100% {
      width: calc(100% - 30px);
      margin-left: 15px;
    }
  }
</style>
