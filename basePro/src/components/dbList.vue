<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block dbList_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="$router.back(-1)"><span class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <!--需要控制滚动时，需给外部div一个class 然后控制这个class的滚动-->
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <div class="dbList_ListDiv">
        <van-pull-refresh v-model="pageData.domContorl.refreshing" @refresh="onRefresh">
          <van-list v-model="pageData.domContorl.loading" :finished="pageData.domContorl.finished" finished-text="没有更多了"
                    @load="onLoad">
            <van-cell v-show="pageData.domContorl.listShow" v-for="value in pageData.domData.list"
                      :key="value.InstanceId">
              <div class="cellDiv" @click="goDetail(value)">
                <div class="cellDiv_title">{{value.InstanceName}}</div>
                <div class="cellDiv_uper">
                  <div class="cellDiv_User">[{{value.CreateUserNo}}] {{value.CreateUserName}}</div>
                  <div class="cellDiv_Data">{{value.CreateDate | changeDate}}</div>
                </div>
                <div class="cellDiv_downer">
                  <div class="cellDiv_CurrentStateName">当前环节: {{value.CurrentStateName}}</div>
                  <div class="cellDiv_FlowName">{{value.FlowName}}</div>
                </div>
              </div>
            </van-cell>
            <div class="list_noData" v-show="!pageData.domContorl.listShow">暂无数据</div>
            <!--<div class="list_decorate"><span class="decorate iconfont">&#xe68b;</span></div>-->
          </van-list>
        </van-pull-refresh>
        <div class="dbList_scrollToTop scrollToTop" @click="scrollToTop">
          <img src="../assets/images/blackTop.png" class="blackTop">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'dbList',
    data: function () {
      return {
        pageData: {
          isFrom: 'dbList',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {
            loading: false,
            finished: false,
            refreshing: false,
            listShow: false
          },
          domData: {
            list: []
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
      let app = this
      app.getListData()
    },
    mounted: function () {},
    beforeUpdate: function () {
    },
    updated: function () {},
    beforeDestroy: function () {},
    destroyed: function () {},
    filters: {
      changeDate (date) {
        let newDate = date.toString()
        newDate = newDate.replace(/T/g, ' ')
        newDate = newDate.substring(0, newDate.indexOf('.'))
        return newDate
      }
    },
    methods: {
      scrollToTop () {
        let app = this
        let YHCommon = app.YHCommon
        if (app.$store.state.setting.showHeader) {
          YHCommon.scrollToTop(app, document.querySelector('.MainDiv'), 10)
        }
      },
      getListData (callback) {
        let app = this
        let response = {
          'StatUs': 1,
          'List': {
            'DataCount': 18,
            'DataList': [{
              'InstanceId': '53f39f0a-cbb9-41c3-a440-97b177a0b9fd',
              'InstanceName': '值班表审批[2021.06.02-2021.06.09中国广核电力股份有限公司核应急值班表]',
              'FlowName': '值班表审批流程',
              'TaskUrlPath': 'DutyManageNew/DutyTable/Approve?instanceId=b83c4476-26a3-4aca-bf67-6f9ce89814de',
              'CurrentStateCode': '020',
              'CurrentStateName': '审查',
              'CreateDate': '2021-03-22T15:39:47.877',
              'CreateUserNo': 'P980090',
              'CreateUserName': '呙明志',
              'BusinessID': 'b83c4476-26a3-4aca-bf67-6f9ce89814de',
              'CompanyID': null,
              'FlowCode': 'DutyTableApproveFlow'
            }, {
              'InstanceId': '1dfea5e6-7566-4a17-8f02-3579d269cab1',
              'InstanceName': '[Pxmwllw]罗立伟申请取消岗位：文书A[CEH12]授权',
              'FlowName': '应急岗位授权取消流程',
              'TaskUrlPath': 'OrgManager/PostCancel/CancelAudit?instanceId=2cedf5ca-e415-472a-a3c3-76389f429261',
              'CurrentStateCode': '010',
              'CurrentStateName': '部门领导审核',
              'CreateDate': '2021-03-04T09:37:30.48',
              'CreateUserNo': 'Pxmwllw',
              'CreateUserName': '罗立伟',
              'BusinessID': '2cedf5ca-e415-472a-a3c3-76389f429261',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeCancel'
            }, {
              'InstanceId': 'bbd95c79-19b2-409b-867d-b8f160a05bd8',
              'InstanceName': '[PXMWLLW]罗立伟申请变更岗位授权：红沿河应急总指挥[HY-SED]->红沿河分队队长[HY-ERT1]',
              'FlowName': '应急岗位授权变更流程',
              'TaskUrlPath': 'OrgManager/PostChange/ChangeAudit?instanceId=1bd76755-62df-4cf3-a081-dd543a9c8f9c',
              'CurrentStateCode': '030',
              'CurrentStateName': '应急经理审核',
              'CreateDate': '2021-03-03T18:30:07.43',
              'CreateUserNo': 'PXMWLLW',
              'CreateUserName': '罗立伟',
              'BusinessID': '1bd76755-62df-4cf3-a081-dd543a9c8f9c',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeChange'
            }, {
              'InstanceId': '6d6a877c-79e3-4083-b52d-133f14bb6efe',
              'InstanceName': '[PXMWLLW]罗立伟申请岗位：红沿河分队队长[HY-ERT1]',
              'FlowName': '应急岗位授权申请流程',
              'TaskUrlPath': 'OrgManager/NuPostApply/ApplyAudit?instanceId=528bd9ff-5bc0-4685-b1b6-ca98cbec6fd3',
              'CurrentStateCode': '020',
              'CurrentStateName': '应急经理审核',
              'CreateDate': '2021-03-03T17:08:55.513',
              'CreateUserNo': 'PXMWLLW',
              'CreateUserName': '罗立伟',
              'BusinessID': '528bd9ff-5bc0-4685-b1b6-ca98cbec6fd3',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeApply'
            }, {
              'InstanceId': '56336205-24d4-45a6-9b72-18a0326686f6',
              'InstanceName': '[P980090]周俊杰申请变更岗位授权：外事联络专员[CEH10]->大亚湾总队机械B[GD-ERT2B]',
              'FlowName': '应急岗位授权变更流程',
              'TaskUrlPath': 'OrgManager/PostChange/ChangeAudit?instanceId=c1a733c0-6153-4b17-92d4-79555f4b1a70',
              'CurrentStateCode': '030',
              'CurrentStateName': '应急经理审核',
              'CreateDate': '2021-02-04T19:02:09.373',
              'CreateUserNo': 'P980090',
              'CreateUserName': '周俊杰',
              'BusinessID': 'c1a733c0-6153-4b17-92d4-79555f4b1a70',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeChange'
            }, {
              'InstanceId': '3764ec91-cb78-443e-9364-cb7421cb71d1',
              'InstanceName': '[P620393]周俊杰申请变更岗位授权：大亚湾总队机械B[GD-ERT2B]->外事联络专员[CEH10]',
              'FlowName': '应急岗位授权变更流程',
              'TaskUrlPath': 'OrgManager/PostChange/ChangeAudit?instanceId=e938110d-f8f0-4313-a675-a752bb2a4b0b',
              'CurrentStateCode': '010',
              'CurrentStateName': '部门领导审核',
              'CreateDate': '2021-02-01T19:46:26.88',
              'CreateUserNo': 'P620393',
              'CreateUserName': '周俊杰',
              'BusinessID': 'e938110d-f8f0-4313-a675-a752bb2a4b0b',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeChange'
            }, {
              'InstanceId': '8a1fe8ac-0a68-41c1-991e-f2d8073b3f92',
              'InstanceName': 'On-Call会点名2021.02.10-2021.02.17中国广核电力股份有限公司核应急值班表',
              'FlowName': 'On-Call会点名流程',
              'TaskUrlPath': 'DutyManage/OnCall/OnCallRecord?OmID=8133174e-2964-4703-ba0c-45b680c28fad',
              'CurrentStateCode': '000',
              'CurrentStateName': '草稿',
              'CreateDate': '2021-01-30T14:41:07.967',
              'CreateUserNo': 'P620393',
              'CreateUserName': '周俊杰',
              'BusinessID': '8133174e-2964-4703-ba0c-45b680c28fad',
              'CompanyID': null,
              'FlowCode': 'OnCallMettingTask'
            }, {
              'InstanceId': 'bde5df10-4d99-438b-8e34-7dd631a33d95',
              'InstanceName': '[P620393]周俊杰申请取消岗位：红沿河分队队长[HY-ERT1]授权',
              'FlowName': '应急岗位授权取消流程',
              'TaskUrlPath': 'OrgManager/PostCancel/CancelAudit?instanceId=f78478dd-ad2e-4f5a-a878-63c0dca3aed8',
              'CurrentStateCode': '015',
              'CurrentStateName': '应急人员审核',
              'CreateDate': '2021-01-29T17:25:15.263',
              'CreateUserNo': 'P620393',
              'CreateUserName': '周俊杰',
              'BusinessID': 'f78478dd-ad2e-4f5a-a878-63c0dca3aed8',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeCancel'
            }, {
              'InstanceId': '568e5797-e1ca-4721-bf7d-a5f1202651ab',
              'InstanceName': '[P620393]周俊杰申请变更岗位授权：红沿河分队队长[HY-ERT1]->法律保险顾问[CEH7]',
              'FlowName': '应急岗位授权变更流程',
              'TaskUrlPath': 'OrgManager/PostChange/ChangeAudit?instanceId=17bf8475-a9ed-4203-af60-dc7bf488c016',
              'CurrentStateCode': '010',
              'CurrentStateName': '部门领导审核',
              'CreateDate': '2021-01-29T17:24:22.127',
              'CreateUserNo': 'P620393',
              'CreateUserName': '周俊杰',
              'BusinessID': '17bf8475-a9ed-4203-af60-dc7bf488c016',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeChange'
            }, {
              'InstanceId': '381acf1f-a691-49f5-a368-4e26cdc0cfea',
              'InstanceName': '[P620393]周俊杰On-Call会请假流程',
              'FlowName': 'On-Call会请假流程',
              'TaskUrlPath': 'DutyManage/OnCallNew/OnCallLeaveEdit?instanceId=c395228c-8aac-455f-bcab-8849a48034a9',
              'CurrentStateCode': '000',
              'CurrentStateName': '申请',
              'CreateDate': '2021-01-29T09:16:37.14',
              'CreateUserNo': 'P620393',
              'CreateUserName': '周俊杰',
              'BusinessID': 'c395228c-8aac-455f-bcab-8849a48034a9',
              'CompanyID': null,
              'FlowCode': 'OnCallLeaveFlow'
            }, {
              'InstanceId': 'f665637a-a5cf-48ae-9c6f-69b9bcf8b713',
              'InstanceName': '[P620393]周俊杰On-Call会请假流程',
              'FlowName': 'On-Call会请假流程',
              'TaskUrlPath': 'DutyManage/OnCallNew/OnCallLeaveEdit?instanceId=2b17fd02-f795-419f-b9cd-2dcfc65c6ee4',
              'CurrentStateCode': '000',
              'CurrentStateName': '申请',
              'CreateDate': '2021-01-29T09:16:14.167',
              'CreateUserNo': 'P620393',
              'CreateUserName': '周俊杰',
              'BusinessID': '2b17fd02-f795-419f-b9cd-2dcfc65c6ee4',
              'CompanyID': null,
              'FlowCode': 'OnCallLeaveFlow'
            }, {
              'InstanceId': '8898ddf6-abca-405d-9129-8d80dac959f9',
              'InstanceName': '[P137466]沈宗文On-Call会请假流程',
              'FlowName': 'On-Call会请假流程',
              'TaskUrlPath': 'DutyManage/OnCallNew/OnCallLeaveAudit?instanceId=660394da-51b6-4950-a7c7-5d442dc0ef32',
              'CurrentStateCode': '020',
              'CurrentStateName': '审批',
              'CreateDate': '2021-01-29T09:15:10.95',
              'CreateUserNo': 'P137466',
              'CreateUserName': '沈宗文',
              'BusinessID': '660394da-51b6-4950-a7c7-5d442dc0ef32',
              'CompanyID': null,
              'FlowCode': 'OnCallLeaveFlow'
            }, {
              'InstanceId': '8309ed0d-d2e4-486a-93ac-8340a8603de3',
              'InstanceName': '[P203014]韩敏On-Call会请假流程',
              'FlowName': 'On-Call会请假流程',
              'TaskUrlPath': 'DutyManage/OnCallNew/OnCallLeaveAudit?instanceId=f9f19dc2-775c-4d94-9ac5-4f1952ba3e33',
              'CurrentStateCode': '010',
              'CurrentStateName': '代开人确认',
              'CreateDate': '2021-01-27T18:44:06.807',
              'CreateUserNo': 'P203014',
              'CreateUserName': '韩敏',
              'BusinessID': 'f9f19dc2-775c-4d94-9ac5-4f1952ba3e33',
              'CompanyID': null,
              'FlowCode': 'OnCallLeaveFlow'
            }, {
              'InstanceId': '86ac4d11-2a8e-4662-a8cf-2983fed425da',
              'InstanceName': '[P137466]沈宗文On-Call会请假流程',
              'FlowName': 'On-Call会请假流程',
              'TaskUrlPath': 'DutyManage/OnCallNew/OnCallLeaveAudit?instanceId=9cd904d2-e140-4f80-b32c-ab0deab77c14',
              'CurrentStateCode': '020',
              'CurrentStateName': '审批',
              'CreateDate': '2021-01-26T16:33:35.173',
              'CreateUserNo': 'P137466',
              'CreateUserName': '沈宗文',
              'BusinessID': '9cd904d2-e140-4f80-b32c-ab0deab77c14',
              'CompanyID': null,
              'FlowCode': 'OnCallLeaveFlow'
            }, {
              'InstanceId': '05db1d70-5095-4fa1-b997-ff742f8710ed',
              'InstanceName': '[P137466]沈宗文On-Call会请假流程',
              'FlowName': 'On-Call会请假流程',
              'TaskUrlPath': 'DutyManage/OnCallNew/OnCallLeaveAudit?instanceId=ae178ed6-6f17-4a55-9c7e-8030bd46b69d',
              'CurrentStateCode': '020',
              'CurrentStateName': '审批',
              'CreateDate': '2021-01-26T10:59:08.213',
              'CreateUserNo': 'P137466',
              'CreateUserName': '沈宗文',
              'BusinessID': 'ae178ed6-6f17-4a55-9c7e-8030bd46b69d',
              'CompanyID': null,
              'FlowCode': 'OnCallLeaveFlow'
            }, {
              'InstanceId': 'eef67555-37da-4fd7-86dc-da3cab225fe5',
              'InstanceName': '[P137466]沈宗文On-Call会请假流程',
              'FlowName': 'On-Call会请假流程',
              'TaskUrlPath': 'DutyManage/OnCallNew/OnCallLeaveAudit?instanceId=b3f93fce-a328-4589-b6e8-440daaccea51',
              'CurrentStateCode': '020',
              'CurrentStateName': '审批',
              'CreateDate': '2021-01-26T10:58:45.907',
              'CreateUserNo': 'P137466',
              'CreateUserName': '沈宗文',
              'BusinessID': 'b3f93fce-a328-4589-b6e8-440daaccea51',
              'CompanyID': null,
              'FlowCode': 'OnCallLeaveFlow'
            }, {
              'InstanceId': 'fcf1ab98-c562-4096-aa35-8f6129fdb598',
              'InstanceName': '[P620393]周俊杰申请变更岗位授权：红沿河分队队长[HY-ERT1]->阳江总队机械C[GYERT2C]',
              'FlowName': '应急岗位授权变更流程',
              'TaskUrlPath': 'OrgManager/PostChange/ChangeAudit?instanceId=8d80f4a6-bd2b-4c41-8860-c11ac6c0f920',
              'CurrentStateCode': '010',
              'CurrentStateName': '部门领导审核',
              'CreateDate': '2021-01-19T15:43:33.07',
              'CreateUserNo': 'P980090',
              'CreateUserName': '呙明志',
              'BusinessID': '8d80f4a6-bd2b-4c41-8860-c11ac6c0f920',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeChange'
            }, {
              'InstanceId': 'ff5a09f5-e98f-4000-a953-05318cb7417f',
              'InstanceName': '[P620393]周俊杰申请取消岗位：文书A[CEH12]授权',
              'FlowName': '应急岗位授权取消流程',
              'TaskUrlPath': 'OrgManager/PostCancel/CancelAudit?instanceId=3f94b533-9e50-4820-a90e-47a3ed583208',
              'CurrentStateCode': '010',
              'CurrentStateName': '部门领导审核',
              'CreateDate': '2021-01-19T15:35:46.917',
              'CreateUserNo': 'P980090',
              'CreateUserName': '呙明志',
              'BusinessID': '3f94b533-9e50-4820-a90e-47a3ed583208',
              'CompanyID': null,
              'FlowCode': 'PostAuthorizeCancel'
            }]
          }
        }
        setTimeout(function () {
          let _response = response.List
          if (_response.DataCount !== 0) {
            app.$set(app.pageData.domContorl, 'listShow', true)
            // 过滤  CurrentStateCode !== '000' || FlowName === '值班确认流程'
            let DataList = []
            for (var item in _response.DataList) {
              if (_response.DataList[item].CurrentStateCode !== '000' || _response.DataList[item].FlowName === '值班确认流程' || _response.DataList[item].FlowName === 'On-Call会点名流程') {
                DataList.push(_response.DataList[item])
              }
            }
            app.$set(app.pageData.domData, 'list', DataList)
          }
          app.$set(app.pageData.domContorl, 'loading', false)
          app.$set(app.pageData.domContorl, 'refreshing', false)
          app.$set(app.pageData.domContorl, 'finished', true)
          if (callback) {
            callback()
          }
        }, 1000)
      },
      goDetail (listData) {
        let app = this
        app.$router.push({
          name: 'dbDetail',
          params: listData
        })
      },
      onLoad () {
      },
      onRefresh () {
        let app = this
        // 清空列表数据
        app.$set(app.pageData.domContorl, 'loading', true)
        app.$set(app.pageData.domContorl, 'refreshing', true)
        app.$set(app.pageData.domContorl, 'finished', false)
        // 重新加载数据
        this.getListData()
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
    components: {}
  }
</script>

<style src="../fonts/iconfont.css"></style>
<style src="../assets/css/vant.css"></style>
<style scoped src="../assets/css/mui.min.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>

<style scoped>
  .cellDiv {
    width: 100%;
    min-height: 80px;
  }

  .cellDiv_title {
    font-size: 15px;
    padding-left: 15px;
    width: 100%;
    height: auto;
    font-weight: 500;
    color: #666;
  }

  .cellDiv_uper {
    margin-top: 5px;
    width: 100%;
  }

  .cellDiv_downer {
    width: 100%;
  }

  .cellDiv_Data {
    padding-left: 5px;
    width: 50%;
    height: 22px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
    float: right;
    text-align: left;
  }

  .cellDiv_FlowName {
    padding-left: 5px;
    width: 50%;
    height: 22px;
    font-size: 12px;
    font-weight: 300;
    color: #999;
    float: right;
    text-align: left;
  }

  .cellDiv_User {
    padding-left: 15px;
    width: 50%;
    height: 22px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
    float: left;
    text-align: left;
  }

  .cellDiv_CurrentStateName {
    padding-left: 15px;
    width: 50%;
    height: 22px;
    font-size: 12px;
    font-weight: 300;
    color: #999;
    float: left;
    text-align: left;
  }

  .list_decorate {
    width: 100%;
    height: 33px;
    line-height: 33px;
    text-align: center;
    background: #f4f4f4;
  }

  .decorate {
    animation: colorChange 2s infinite ease-out 1s;
    color: #e5e5e5;
  }

  @keyframes colorChange {
    0% {
      color: #e5e5e5;
    }
    50% {
      color: #0086b3;
    }
    100% {
      color: #e5e5e5;
    }
  }

  .list_noData {
    width: calc(100% - 30px);
    text-align: center;
    font-weight: 300;
    font-size: 15px;
    padding-top: 50%;
    margin-left: 15px;
    border: solid #e5e5e5 1px;
    height: calc(100vh - 55px);
    color: #999;
    background: #ffffff;
    animation: colorWidthSide 1s infinite ease-out .5s;
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

  .dbList_ListDiv >>> .van-cell {
    background-image: linear-gradient(#f9f9f9, #ffffff);
  }

  .dbList_ListDiv >>> .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #e5e5e5;
  }
  .scrollToTop {
    position: fixed;
    bottom: 66px;
    right: 30px;
    opacity: 0.4;
  }
  .blackTop {
    width: 40px;
    height: 40px;
  }
</style>
