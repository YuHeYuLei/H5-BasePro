<template>
  <div :style="pageData.styleCell.mainStyle" class="dbDetail_oncallhdm_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="$router.back(-1)"><span class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <div class="dbDetail_oncallhdm_form">
        <van-form @submit="onSubmit">
          <div class="dbDetail_oncallhdm_model title_model dbDetail_oncallhdm_model_jbxx">
            <van-collapse v-model="pageData.domContorl.baseActiveNames">
              <van-collapse-item title="详情01" name="baseData">
                <div class="dbDetail_oncallhdm_modelInner title_InnerModel dbDetail_oncallhdm_modeljbxxInner">
                  <div class="dbDetail_oncallhdm_cell dbDetail_oncallhdm_zbb" v-if="pageData.domData.isFromLaunch">
                    <van-field
                      readonly
                      clickable
                      name="picker"
                      :value="pageData.domData.zbb_text"
                      label="发起时追加"
                      type="textarea"
                      rows="1"
                      autosize
                      placeholder="请选择"
                      :rules="[{ required: true, message: '请选择值班表'}]"
                      @click="pageData.domContorl.zbb_showPicker = true"
                    />
                    <van-popup v-model="pageData.domContorl.zbb_showPicker" position="bottom">
                      <van-picker
                        show-toolbar
                        :columns="['非发起时是看不见的']"
                        @confirm="zbb_onConfirm"
                        @cancel="pageData.domContorl.zbb_showPicker = false"
                        :item-height="66"
                      />
                    </van-popup>
                  </div>
                  <div class="dbDetail_oncallhdm_cell dbDetail_oncallhdm_readonlyCell dbDetail_oncallhdm_zbbmc"
                       v-if="!pageData.domData.isFromLaunch">
                    <van-field
                      readonly
                      clickable
                      :value="pageData.domData.zbbmc_value"
                      label="值班表名称"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div class="dbDetail_oncallhdm_cell dbDetail_oncallhdm_readonlyCell dbDetail_oncallhdm_nf">
                    <van-field
                      v-model="pageData.domData.nf_value"
                      rows="1"
                      autosize
                      label="年份"
                      type="textarea"
                      placeholder=""
                    />
                  </div>
                  <div class="dbDetail_oncallhdm_cell dbDetail_oncallhdm_readonlyCell dbDetail_oncallhdm_zq">
                    <van-field
                      v-model="pageData.domData.zq_value"
                      rows="1"
                      autosize
                      label="周期"
                      type="textarea"
                      placeholder=""
                    />
                  </div>
                  <div class="dbDetail_oncallhdm_cell dbDetail_oncallhdm_readonlyCell dbDetail_oncallhdm_zbrq">
                    <van-field
                      v-model="pageData.domData.zbrq_value"
                      label="值班日期"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div class="dbDetail_oncallhdm_cell dbDetail_oncallhdm_readonlyCell dbDetail_oncallhdm_OnCallhrq">
                    <van-field
                      v-model="pageData.domData.OnCallhrq_value"
                      name="OnCall会日期"
                      label="OnCall会日期"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
          <div class="dbDetail_oncallhdm_model title_model dbDetail_oncallhdm_model_clxx">
            <van-collapse v-model="pageData.domContorl.dealActiveNames">
              <van-collapse-item title="详情02" name="dealData">
                <div class="dbDetail_oncallhdm_modelInner title_InnerModel dbDetail_oncallhdm_modelclxxInner">
                  <div class="OnCallCell" v-for="(value, index) in pageData.domData.allResponse.GetOnCallDetailList.List"
                       :key="index">
                    <!--<div class="OnCallCell_gw">点名序号:</div>-->
                    <van-collapse v-model="value.dianming">
                      <van-collapse-item
                        :title="'NO:  ' + (index + 1) + (value.dianming == '1' ? '　' + value.PostName : '　 ' + value.DutyName + '　[' + value.PostName + ']')"
                        name="1">
                        <div class="OnCallCell_inner">
                          <div class="OnCallCell_inner_cell OnCallCell_yjgw">应急岗位: {{value.PostName}}</div>
                          <div class="OnCallCell_inner_cell OnCallCell_gwdm">岗位代码: {{value.PostCode}}</div>
                          <div class="OnCallCell_inner_cell OnCallCell_xm">姓名: <span>{{value.DutyName}}</span></div>
                          <div class="OnCallCell_inner_cell OnCallCell_zbdh copyStyle"
                               @click="copy('.copyStyle', value.OfficeTel)">值班电话: {{value.OfficeTel}}
                          </div>
                          <div class="OnCallCell_inner_cell OnCallCell_grsj copyStyle"
                               @click="copy('.copyStyle', value.OnCallNo)">个人手机: <a style="color: #0069ac;"
                                                                                    :href="'tel:' + value.OnCallNo">{{value.OnCallNo}}</a>
                          </div>
                          <div class="OnCallCell_inner_cell_bottom">
                            <div class="OnCallCell_selecter" v-if="pageData.domData.IsOnCall == '1'">
                              <van-field name="radio" :rules="[{ required: true, message: '请选择人员状态!' }]">
                                <template #input>
                                  <van-radio-group v-model="pageData.domData.dm_value[index]" direction="horizontal">
                                    <van-radio name="1">正常</van-radio>
                                    <van-radio name="2">请假</van-radio>
                                    <van-radio name="3">迟到</van-radio>
                                    <van-radio name="4">缺席</van-radio>
                                    <van-radio name="5">代开</van-radio>
                                  </van-radio-group>
                                </template>
                              </van-field>
                            </div>
                            <div class="OnCallCell_bz" v-if="pageData.domData.dm_value[index] !== '1'">
                              <div class="OnCallCell_bz_title">备注</div>
                              <div class="OnCallCell_bz_inner">
                                <van-field
                                  clickable
                                  type="textarea"
                                  v-model="pageData.domData.allBZ[index]"
                                  rows="1"
                                  autosize
                                  :name="'bz_' + index"
                                  placeholder="点击输入备注信息（50字内）"
                                  :rules="[{ validator, message: '请输入正确内容(50字内)' }]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </van-collapse-item>
                    </van-collapse>
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
            <div class="blank" v-if="pageData.domData.IsOnCall == '1'">&#160;</div>
            <div class="submitButtom" v-if="pageData.domData.IsOnCall == '1'">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast, Dialog } from 'vant'

  // 流程类根源模板页 包含选人控件 日期控件 校验与提交模板
  export default {
    name: 'dbDetail_oncallhqj',
    data: function () {
      return {
        pageData: {
          isFrom: 'dbDetail_oncallhqj',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {
            zbb_showPicker: false,
            baseActiveNames: ['baseData'],
            dealActiveNames: ['dealData']
          },
          domData: {
            isFromLaunch: false,
            zbb_text: '',
            zbb_value: '',
            zbb_columns: [],
            zbbmc_value: '',
            nf_value: '',
            zq_value: '',
            zbrq_value: '',
            OnCallhrq_value: '',
            zbb_columns_selected: {},
            dm_value: [],
            allBZ: [],
            allResponse: {
              GetOnCallList: {
                IsOnCall: 0
              },
              GetOnCallDetailList: {
                List: [{
                  PostName: '01',
                  PostCode: '02',
                  DutyName: '03',
                  OfficeTel: '04',
                  OnCallNo: '04',
                  IsOnCall: '1',
                  dianming: ['1']
                }, {
                  PostName: '02',
                  PostCode: '02',
                  DutyName: '03',
                  OfficeTel: '04',
                  OnCallNo: '04',
                  IsOnCall: '1',
                  dianming: ['1']
                }, {
                  PostName: '03',
                  PostCode: '02',
                  DutyName: '03',
                  OfficeTel: '04',
                  OnCallNo: '04',
                  IsOnCall: '1',
                  dianming: ['1']
                }, {
                  PostName: '04',
                  PostCode: '02',
                  DutyName: '03',
                  OfficeTel: '04',
                  OnCallNo: '04',
                  IsOnCall: '1',
                  dianming: ['1']
                }, {
                  PostName: '05',
                  PostCode: '02',
                  DutyName: '03',
                  OfficeTel: '04',
                  OnCallNo: '04',
                  IsOnCall: '1',
                  dianming: ['1']
                }]
              },
              GetOnCallAudit: {}
            },
            IsOnCall: 1
          },
          updateData: {},
          styleCell: {
            mainStyle: {
              width: '100%',
              height: '100vh',
              background: '#fff'
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
      let app = this
      if (app.$route.params.isFrom && app.$route.params.isFrom === 'taskCenter_launch') {
        // 发起
        app.$set(app.pageData.domData, 'isFromLaunch', true)
      }
    },
    mounted: function () {},
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
      copy (copyStyle, msg) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.copy(copyStyle, msg)
      },
      validator (value) {
        if (value.length > 49) {
          return false
        } else {
          return true
        }
      },
      zbb_onConfirm (zbb_value) {
        console.log(zbb_value)
      },
      onSubmit () {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.cgnStaticShow()
        Dialog.confirm({
          title: '',
          message: '确认发起提交操作？'
        }).then(() => {
          let _response = {
            result: true,
            Message: '提交成功'
          }
          if (_response.result) {
            setTimeout(function () {
              YHCommon.cgnStaticHidden()
              // 释放缓存
              YHCommon.clearbaseData()
              app.$router.back(-1)
              Toast(_response.Message)
            }, 2000)
          } else {
            Toast(_response.Message)
            YHCommon.cgnStaticHidden()
          }
        })
          .catch(() => {
            YHCommon.cgnStaticHidden()
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
      $route (to, from) {
      }
    },
    components: {
      Toast,
      Dialog
    }
  }
</script>

<style src="../fonts/iconfont.css"></style>
<style src="../assets/css/vant.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>
<style scoped>
  .dbDetail_oncallhdm_form {
    margin-top: 2px;
  }

  .dbDetail_oncallhdm_cell {
    width: calc(100% - 10px);
    margin-bottom: 1px;
    margin-left: 5px;
    border-radius: 5px;

  }

  .dbDetail_oncallhdm_cell:after {
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
  }

  .dbDetail_oncallhdm_cell >>> .van-field__label {
    color: #666;
    font-size: 13px;
    width: 100px;
  }

  .dbDetail_oncallhdm_cell >>> .van-cell {
    padding-left: 5px;
    min-height: 33px;
    line-height: 33px;
  }

  .dbDetail_oncallhdm_model >>> .van-cell__title {
    font-size: 14px;
  }

  .dbDetail_oncallhdm_readonlyCell >>> .van-field__control {
    font-size: 14px;
    background: #fff !important;
    border-radius: 5px;
    text-align: center;
    height: 33px;
    padding: 5px;
    border: none !important;
  }

  .dbDetail_oncallhdm_cell >>> .van-field__control {
    font-size: 14px;
    background: #F8F8FF;
    border-radius: 5px;
    text-align: center;
    height: 33px;
    color: #b5b5b5;
    padding: 5px;
    border: 1px solid #FF6347;
  }

  .dbDetail_oncallhdm_textarea >>> .van-field__control {
    font-size: 14px;
    background: #F8F8FF;
    border-radius: 5px;
    text-align: left;
    height: 33px;
    color: #b5b5b5;
    padding: 5px;
  }

  .dbDetail_oncallhdm_sqyy >>> .van-field__control {
    font-size: 14px;
    background: #f5f5f5;
    border-radius: 5px;
    text-align: center;
    height: 33px;
    color: #b5b5b5;
    padding: 5px;
  }

  .dbDetail_oncallhdm_cell >>> .van-picker-column__item {
    /*line-height: 44px;*/
  }

  .dbDetail_oncallhdm_model >>> .van-collapse {
    /*padding-left: 15px;*/
  }

  .OnCallCell >>> .van-collapse {
    padding-left: 0;
  }

  .OnCallCell >>> .van-cell__title {
    font-size: 16px;
    font-weight: 600;
  }

  .OnCallCell >>> .van-cell.van-cell--clickable.van-collapse-item__title.van-collapse-item__title--expanded {
    border-radius: 5px;
  }

  .OnCallCell >>> .van-cell.van-cell--clickable.van-collapse-item__title {
    border-radius: 5px;
  }

  .dbDetail_oncallhdm_model_clxx >>> .van-collapse-item__content {
    padding: 15px;
  }

  .dbDetail_oncallhdm_radio >>> .van-field__control {
    font-size: 15px !important;
    background: #fff !important;
    padding: 5px;
    border: none !important;
  }

  .dbDetail_oncallhdm_MainDiv >>> .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #fff;
  }

  .OnCallCell_selecter >>> .van-radio-old {
    width: 20%;
    float: left;
    text-align: center;
  }

  .OnCallCell_selecter >>> .van-radio--horizontal {
    /*margin-right: 3px;*/
    margin: 10px;
  }

  .OnCallCell_selecter >>> .van-cell {
    margin-top: 10px;
    padding: 10px 0px;
    background: none;
  }

  .OnCallCell {
    /*padding-bottom: 10px;*/
    border: 5px solid #0086b3;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .OnCallCell_gw {
    width: calc(100% - 20px);
    height: 33px;
    color: #f5f5f5;
    font-size: 15px;
    line-height: 33px;
    padding: 0 10px;
    background: #0086b3;
  }

  .OnCallCell_inner {
    width: calc(100% - 20px);
    min-height: 88px;
    padding: 10px;
    /*background: #f9f9f9;*/
    border-radius: 5px;
    border: 1px solid #0086b3;
  }

  .OnCallCell_inner_cell {
    width: calc(100% - 20px);
    min-height: 33px;
    line-height: 33px;
    font-size: 15px;
    color: #b5b5b5;
    /*background: #0086b3;*/
    padding: 5px;
  }

  .OnCallCell_inner_cell:first-child {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  .OnCallCell_grsj {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .OnCallCell_xm span {
    color: #FFA500;
    font-weight: 800;
  }

  .OnCallCell_bz {
    background: #fff;
    border-radius: 5px;
    border: 1px solid #FF6347;
    padding: 5px;
  }

  .dbDetail_oncallhdm_cell >>> .van-picker-column__item {
  }

  .dbDetail_oncallhdm_cell:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }

  .blank {
    width: 100%;
    height: 88px;
    background: #fff;
  }

  .OnCallCell >>> .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
    border-width: 0 0;
  }

  .dbDetail_oncallhdm_cell >>> .van-ellipsis {
    white-space: normal;
    padding: 30px;
  }

  /*.dbDetail_oncallhdm_model >>> .van-cell.van-cell--clickable.van-collapse-item__title {*/
    /*position: sticky;*/
    /*top: 0;*/
    /*z-index: 99;*/
    /*border-bottom: 1px solid #e5e5e5;*/
  /*}*/

  /*.dbDetail_oncallhdm_model >>> .van-cell.van-cell--clickable.van-collapse-item__title > .van-cell__title {*/
    /*font-size: 15px;*/
    /*font-weight: 600;*/
  /*}*/

  /*.dbDetail_oncallhdm_modelInner >>> .van-cell.van-cell--clickable.van-collapse-item__title {*/
    /*position: relative;*/
    /*top: 0;*/
    /*z-index: 0;*/
    /*border-bottom: none;*/
  /*}*/

  /*.dbDetail_oncallhdm_modelInner >>> .van-cell.van-cell--clickable.van-collapse-item__title > .van-cell__title {*/
    /*font-size: 14px;*/
    /*font-weight: 500;*/
  /*}*/

  .submitButtom {
    position: fixed;
    left: 16px;
    bottom: 22px;
    margin-right: 16px;
    margin-top: 16px;
    margin-bottom: 16px;
    width: calc(100% - 32px);
    opacity: 0.8;
    z-index: 99;
  }
</style>
