<template>
  <div :style="pageData.styleCell.mainStyle" class="taskCenter_launch_zbtb_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="$router.back(-1)"><span class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <div class="taskCenter_launch_zbtb_form">
        <van-form @submit="onSubmit" @failed="onFailed">
          <div class="taskCenter_launch_zbtb_model title_model taskCenter_launch_zbtb_model_jbxx">
            <van-collapse v-model="pageData.domContorl.baseActiveNames">
              <van-collapse-item title="基本信息" name="baseData">
                <div class="taskCenter_launch_zbtb_modelInner title_InnerModel taskCenter_launch_zbtb_modeljbxxInner">
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_zblx">
                    <van-field
                      readonly
                      clickable
                      name="picker"
                      :value="pageData.domData.zblx_text"
                      label="值班类型"
                      placeholder="请选择"
                      type="textarea"
                      rows="1"
                      autosize
                      :rules="[{ required: true, message: '请选择值班类型' }]"
                      @click="pageData.domContorl.zblx_showPicker = true"
                    />
                    <van-popup v-model="pageData.domContorl.zblx_showPicker" position="bottom">
                      <van-picker
                        show-toolbar
                        :columns="pageData.domData.zblx_columns"
                        @confirm="zblx_onConfirm"
                        @cancel="pageData.domContorl.zblx_showPicker = false"
                      />
                    </van-popup>
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_zbb">
                    <van-field
                      readonly
                      clickable
                      name="picker"
                      :value="pageData.domData.zbb_text"
                      label="值班表"
                      type="textarea"
                      rows="1"
                      autosize
                      placeholder="请选择"
                      :rules="[{ required: true, message: '请选择值班表' }]"
                      @click="pageData.domContorl.zbb_showPicker = true"
                    />
                    <van-popup v-model="pageData.domContorl.zbb_showPicker" position="bottom">
                      <van-picker
                        show-toolbar
                        :columns="pageData.domData.zbb_columns"
                        @confirm="zbb_onConfirm"
                        @cancel="pageData.domContorl.zbb_showPicker = false"
                        :item-height="66"
                      />
                    </van-popup>
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_nf">
                    <van-field
                      v-model="pageData.domData.nf_value"
                      name="年份"
                      label="年 份"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_zc">
                    <van-field
                      v-model="pageData.domData.zc_value"
                      name="周次"
                      label="周 次"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_yjbm">
                    <van-field
                      v-model="pageData.domData.yjzbm_value"
                      name="应急组/部门"
                      label="应急组/部门"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_zbbgw">
                    <van-field
                      v-model="pageData.domData.zbbgw_value"
                      name="值班表岗位"
                      label="值班表岗位"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>

                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_zbkssj">
                    <van-field
                      v-model="pageData.domData.zbkssj_value"
                      name="值班开始时间"
                      label="值班开始时间"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_zbjssj">
                    <van-field
                      v-model="pageData.domData.zbjssj_value"
                      name="值班结束时间"
                      label="值班结束时间"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_Oncallhrq">
                    <van-field
                      v-model="pageData.domData.Oncallhrq_value"
                      name="OnCall会日期"
                      label="OnCall会日期"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_Oncallhdd">
                    <van-field
                      v-model="pageData.domData.Oncallhdd_value"
                      name="OnCall会地点"
                      label="OnCall会地点"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_timeCell taskCenter_launch_zbtb_tbkssj">
                    <van-field
                      readonly
                      clickable
                      name="picker"
                      :value="pageData.domData.tbkssj_value"
                      label="替班开始时间"
                      placeholder="请选择"
                      :rules="[{ required: true, message: '请输入替班开始时间' }]"
                      @click="tbkssj_click()"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                    <van-popup v-model="pageData.domContorl.tbkssj_showPicker" position="bottom">
                      <van-datetime-picker
                        show-toolbar
                        type="datetime"
                        :min-date="pageData.domContorl.minDate"
                        :max-date="pageData.domContorl.maxDate"
                        title="选择时间"
                        @confirm="tbkssj_onConfirm"
                        @cancel="pageData.domContorl.tbkssj_showPicker = false"
                        v-model="pageData.domContorl.tbkssj_currentDate"
                      />
                    </van-popup>
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_timeCell taskCenter_launch_zbtb_tbjssj">
                    <van-field
                      readonly
                      clickable
                      name="picker"
                      :value="pageData.domData.tbjssj_value"
                      label="替班结束时间"
                      placeholder="请选择"
                      :rules="[{ required: true, message: '请输入替班结束时间' }]"
                      @click="tbjssj_click()"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                    <van-popup v-model="pageData.domContorl.tbjssj_showPicker" position="bottom">
                      <van-datetime-picker
                        show-toolbar
                        type="datetime"
                        :min-date="pageData.domContorl.minDate"
                        :max-date="pageData.domContorl.maxDate"
                        title="选择时间"
                        @confirm="tbjssj_onConfirm"
                        @cancel="pageData.domContorl.tbjssj_showPicker = false"
                        v-model="pageData.domContorl.tbjssj_currentDate"
                      />
                    </van-popup>
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_radio taskCenter_launch_zbtb_qjlx">
                    <van-field type="textarea"
                               rows="1"
                               autosize
                               name="radio" label="请假类型"
                               :rules="[{ required: true, message: '请选择处理结果'}]">
                      <template #input>
                        <van-radio-group v-model="pageData.domData.qjlx_value" direction="horizontal">
                          <van-radio name="Sure">请假</van-radio>
                          <van-radio name="unSure">代开</van-radio>
                        </van-radio-group>
                      </template>
                    </van-field>
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_selectPeople taskCenter_launch_zbtb_sqr" @click="selectPerson('sqr_value')">
                    <van-field
                      v-model="pageData.domData.sqr_value"
                      name="申请人"
                      label="申请人"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                      :rules="[{ required: true, message: '请输入申请人' }]"
                    />
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_tbr">
                    <van-field
                      readonly
                      clickable
                      name="picker"
                      :value="pageData.domData.tbr_text"
                      label="替班人"
                      placeholder="请选择"
                      :rules="[{ required: true, message: '请选择替班人' }]"
                      @click="tbr_click()"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                    <van-popup v-model="pageData.domContorl.tbr_showPicker" position="bottom">
                      <van-picker
                        show-toolbar
                        :columns="pageData.domData.tbr_columns"
                        @confirm="tbr_onConfirm"
                        @cancel="pageData.domContorl.tbr_showPicker = false"
                      />
                    </van-popup>
                  </div>
                  <div class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_textarea taskCenter_launch_zbtb_sqyy">
                    <van-field
                      v-model="pageData.domData.sqyy_value"
                      rows="3"
                      autosize
                      label="申请原因"
                      type="textarea"
                      placeholder=""
                      :rules="[{ required: true, message: '请输入申请原因' }]"
                    />
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
          <div class="taskCenter_launch_zbtb_model title_model taskCenter_launch_zbtb_model_clxx">
            <van-collapse v-model="pageData.domContorl.dealActiveNames">
              <van-collapse-item title="处理信息" name="dealData">
                <div class="taskCenter_launch_zbtb_modelInner title_InnerModel taskCenter_launch_zbtb_modelclxxInner">
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_dqclhj">
                    <van-field
                      v-model="pageData.domData.dqclhj_value"
                      name="当前处理环节"
                      label="当前处理环节"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_xybclhj">
                    <van-field
                      v-model="pageData.domData.xybclhj_value"
                      name="下一步处理环节"
                      label="下一步处理环节"
                      placeholder=""
                      :readonly="true"
                      type="textarea"
                      rows="1"
                      autosize
                    />
                  </div>
                  <div
                    class="taskCenter_launch_zbtb_cell taskCenter_launch_zbtb_readonlyCell taskCenter_launch_zbtb_xybclr">
                    <van-field
                      v-model="pageData.domData.xybclr_value"
                      name="下一步处理人"
                      label="下一步处理人"
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
            <div class="blank">&#160;</div>
            <div class="submitButtom">
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
    name: 'taskCenter_launch_detail',
    data: function () {
      return {
        pageData: {
          isFrom: 'taskCenter_launch_detail',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {
            zblx_showPicker: false,
            zbb_showPicker: false,
            tbkssj_showPicker: false,
            tbr_showPicker: false,
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            tbkssj_currentDate: new Date(),
            tbjssj_currentDate: new Date(),
            tbjssj_showPicker: false,
            baseActiveNames: ['baseData'],
            dealActiveNames: ['dealData']
          },
          domData: {
            zblx_text: '',
            zblx_value: '',
            zblx_columns: [],
            zblx_selectItem: {},
            zbb_text: '',
            zbb_value: '',
            zbb_columns: [],
            yjzbm_value: '',
            zbbgw_value: '',
            nf_value: '',
            zc_value: '',
            zbkssj_value: '',
            Oncallhrq_value: '',
            Oncallhdd_value: '',
            tbkssj_value: '',
            tbjssj_value: '',
            tbr_text: '',
            tbr_value: '',
            tbr_columns: [],
            sqyy_value: '',
            sqr_value: '',
            dqclhj_value: '',
            xybclhj_value: '',
            xybclr_value: '',
            qjlx_value: '',
            allResponse: {
              GetDutyType: {},
              GetDutyTableList: [],
              UserPostInfo: {},
              nextStepResponse: {}
            },
            cfID: '',
            nextUserNum: '',
            nextUserName: ''
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
    },
    mounted: function () {
      let app = this
      let YHCommon = app.YHCommon
      // YHCommon.cgnStaticShow()
      // 以下判断存在先后顺序 调整时请注意 不要问我为什么不用else 因为丑
      // 选人确定后返回
      if (YHCommon.getbaseData('selectPerson') && YHCommon.getbaseData('selectPerson') !== '{}') {
        let domData = JSON.parse(YHCommon.getbaseData('selectPerson'))
        // 更新页面数据
        YHCommon.updatebaseData('selectPerson', '{}')
        app.$set(app.pageData, 'domData', domData)
        return
      }
      // 选人直接返回
      if (YHCommon.getbaseData('isFrom') && YHCommon.getbaseData('isFrom') == JSON.stringify(app.pageData.isFrom)) {
        let domData = JSON.parse(YHCommon.getbaseData('domData'))
        // 更新页面数据
        app.$set(app.pageData, 'domData', domData)
        YHCommon.updatebaseData('isFrom', '')
        YHCommon.updatebaseData('domData', '')
        return
      }
      let response = {
        'StatUs': 1,
        'List': {
          'DataList': '[{"Code":"DutyType_1","Name":"基地总体值班"},{"Code":"DutyType_2","Name":"技术值班"},{"Code":"DutyType_3","Name":"大修值班"},{"Code":"DutyType_4","Name":"防冻值班"},{"Code":"DutyType_5","Name":"核应急值班"},{"Code":"DutyType_6","Name":"工程值班"},{"Code":"DutyType_7","Name":"核服值班"},{"Code":"DutyType_DutyType_8","Name":"国家核应急值班网络"}]'
        }
      }
      let _response = response.List.DataList
      _response = JSON.parse(_response)
      let List = _response
      for (var item in List) {
        List[item]['text'] = List[item].Name
        List[item]['value'] = List[item].Code
      }
      // 缓存值班表周期信息
      app.$set(app.pageData.domData.allResponse, 'GetDutyType', List)
      // 更新值班表周期选项
      app.$set(app.pageData.domData, 'zblx_columns', List)
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
      zblx_onConfirm (zblx_value) {
        let app = this
        // let YHCommon = app.YHCommon
        // 存储已选值班表选项
        app.$set(app.pageData.domData, 'zblx_selectItem', zblx_value)
        app.$set(app.pageData.domData, 'zblx_text', zblx_value.text)
        // 清除已选 值班表
        app.$set(app.pageData.domData, 'zbb_text', '')
        let response = {
          'StatUs': 1,
          'List': {
            'DataList': '[{"Id":"b83c4476-26a3-4aca-bf67-6f9ce89814de","DutytableId":"b83c4476-26a3-4aca-bf67-6f9ce89814de","TemplateId":"1e190de7-2794-4fdb-bb64-b4a58e842ebc","DutytableDetailId":null,"DutyTable":"2021.06.02-2021.06.09中国广核电力股份有限公司核应急值班表","DutyType":"核应急值班","DutyDeptId":null,"DutyDeptName":null,"DutyTablePost":null,"MonthInfo":2021,"WeeklyInfo":25,"ProposerStaffNo":null,"ProposerStaffName":null,"ProposerStartDate":"2021-06-02T14:30:00","ProposerEndDate":"2021-06-09T14:30:00","ForPeopleStaffNo":null,"ForPeopleStaffName":null,"ForPeopleStartDate":null,"ForPeopleEndDate":null,"OnCallDate":"2021-06-04T15:00:00","OnCallPlace":null,"Companyid":null,"Companyname":null,"Dutyyear":null,"IsStatus":null,"State":1}]'
          }
        }
        let _response = response.List.DataList
        _response = JSON.parse(_response)
        // 更新zbb_columns 追加text value
        let zbb_columns = []
        for (var item in _response) {
          let zbb_columns_inner = _response[item]
          zbb_columns_inner.text = _response[item].DutyTable
          zbb_columns_inner.value = _response[item].Id
          zbb_columns.push(zbb_columns_inner)
        }
        app.$set(app.pageData.domData, 'zbb_columns', zbb_columns)
        // 存储完整请求数据
        app.$set(app.pageData.domData.allResponse, 'GetDutyTableList', _response)
        // 自动补全 申请人 = 当前人员（目前需求要求）
        // app.$set(app.pageData.domData, 'sqr_value', '[' + YHCommon.getConf('UserNo') + '] ' + YHCommon.getConf('UserName'))
        app.$set(app.pageData.domContorl, 'zblx_showPicker', false)
      },
      zbb_onConfirm (value) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.updatebaseData('zbtb_selectedZBB', JSON.stringify(value))
        app.pageData.domData.zbb_text = value.text
        app.pageData.domData.zbb_value = value.value
        // 自动补全 年份 周次 值班开始时间 值班结束时间 on-call会日期 on-call会地点
        app.pageData.domData.nf_value = value.MonthInfo
        app.pageData.domData.zc_value = value.WeeklyInfo
        app.pageData.domData.zbkssj_value = value.ProposerStartDate.replace(/T/g, ' ')
        app.pageData.domData.zbjssj_value = value.ProposerEndDate.replace(/T/g, ' ')
        app.pageData.domData.Oncallhrq_value = value.OnCallDate.replace(/T/g, ' ')
        app.pageData.domData.Oncallhdd_value = value.OnCallPlace
        // 自动修正 minDate maxDate 范围不超过值班表时间 并重新初始化 替班开始时间 替班结束时间 替班人
        let date = value.ProposerStartDate.replace(/-/g, ',').replace(/T/g, ',').replace(/:/g, ',')
        date = date.split(',')
        date = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5])
        app.$set(app.pageData.domContorl, 'minDate', date)
        app.$set(app.pageData.domData, 'tbkssj_value', '')
        date = value.ProposerEndDate.replace(/-/g, ',').replace(/T/g, ',').replace(/:/g, ',')
        date = date.split(',')
        date = new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5])
        app.$set(app.pageData.domContorl, 'maxDate', date)
        app.$set(app.pageData.domData, 'tbjssj_value', '')
        app.$set(app.pageData.domData, 'tbr_columns', [])
        app.$set(app.pageData.domData, 'tbr_value', '')
        app.$set(app.pageData.domData, 'tbr_text', '')
        Toast('初始化页面信息,请稍等...')
        app.$set(app.pageData.domContorl, 'zbb_showPicker', false)
      },
      tbkssj_click () {
        let app = this
        if (app.pageData.domData.zbb_value !== '') {
          app.pageData.domContorl.tbkssj_showPicker = true
        } else {
          Toast('请先选择值班表!')
        }
      },
      tbjssj_click () {
        let app = this
        if (app.pageData.domData.zbb_value !== '') {
          app.pageData.domContorl.tbjssj_showPicker = true
        } else {
          Toast('请先选择值班表!')
        }
      },
      tbr_click () {
        let app = this
        if (app.pageData.domData.tbkssj_value !== '' && app.pageData.domData.tbjssj_value !== '') {
          Toast('获取替班人列表中,请稍等...')
        } else {
          Toast('请先选择替班开始以及结束时间!')
        }
      },
      tbr_onConfirm (tbr_value) {
        let app = this
        app.pageData.domData.tbr_text = tbr_value.text
        app.pageData.domData.tbr_value = tbr_value.value
        app.$set(app.pageData.domData, 'xybclr_value', tbr_value.text)
      },
      tbkssj_onConfirm (value) {
        let app = this
        let year = value.getFullYear()
        let month = value.getMonth() + 1 > 9 ? (value.getMonth() + 1) : ('0' + (value.getMonth() + 1))
        let data = value.getDate() > 9 ? (value.getDate()) : ('0' + (value.getDate()))
        let hours = value.getHours() > 9 ? (value.getHours()) : ('0' + (value.getHours()))
        let minutes = value.getMinutes() > 9 ? (value.getMinutes()) : ('0' + value.getMinutes())
        let time = year + '-' + month + '-' + data + ' ' + hours + ':' + minutes
        app.pageData.domData.tbkssj_value = time
        app.pageData.domContorl.tbkssj_showPicker = false
      },
      tbjssj_onConfirm (value) {
        let app = this
        let year = value.getFullYear()
        let month = value.getMonth() + 1 > 9 ? (value.getMonth() + 1) : ('0' + (value.getMonth() + 1))
        let data = value.getDate() > 9 ? (value.getDate()) : ('0' + (value.getDate()))
        let hours = value.getHours() > 9 ? (value.getHours()) : ('0' + (value.getHours()))
        let minutes = value.getMinutes() > 9 ? (value.getMinutes()) : ('0' + value.getMinutes())
        let time = year + '-' + month + '-' + data + ' ' + hours + ':' + minutes
        app.pageData.domData.tbjssj_value = time
        app.pageData.domContorl.tbjssj_showPicker = false
      },
      selectPerson (aim) {
        let app = this
        let params = {
          domData: JSON.parse(JSON.stringify(app.pageData.domData)),
          aim: aim,
          isFrom: app.pageData.isFrom
        }
        app.$router.push({
          name: 'selectPerson',
          params: params
        })
      },
      onSubmit (submitValues) {
        let app = this
        let YHCommon = app.YHCommon
        console.log(submitValues)
        YHCommon.cgnStaticShow()
        Dialog.confirm({
          title: '',
          message: '确认发起提交操作？'
        }).then(() => {
          // on confirm
          Toast('请求发起中,请稍等...')
          let result = {
            isSuccess: new Date().getTime() % 2 === 0,
            message: new Date().getTime() % 2 === 0 ? '提交成功' : '提交失败，请重试'
          }
          if (result.isSuccess) {
            setTimeout(function () {
                YHCommon.cgnStaticHidden()
                // 释放缓存
                YHCommon.clearbaseData()
                app.$router.back(-1)
                Toast(result.message)
              }, 2000)
            } else {
              Toast(result.message)
              YHCommon.cgnStaticHidden()
            }
        }).catch(() => {
          YHCommon.cgnStaticHidden()
          // on cancel
        })
      },
      onFailed (errorInfo) {
        Toast(errorInfo.errors[0].message)
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
  .taskCenter_launch_zbtb_form {
    margin-top: 2px;
  }

  .taskCenter_launch_zbtb_cell {
    width: calc(100% - 10px);
    margin-bottom: 1px;
    margin-left: 5px;
    border-radius: 5px;

  }

  .taskCenter_launch_zbtb_cell:after {
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 16px;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }

  .taskCenter_launch_zbtb_cell >>> .van-field__label {
    color: #666;
    font-size: 13px;
    width: 100px;
  }

  .taskCenter_launch_zbtb_cell >>> .van-cell {
    padding-left: 5px;
    min-height: 33px;
    line-height: 33px;
  }

  .taskCenter_launch_zbtb_readonlyCell >>> .van-field__control {
    background: #fff !important;
    border-radius: 5px;
    text-align: center;
    height: 33px;
    padding: 5px;
    border: none !important;
  }

  .taskCenter_launch_zbtb_cell >>> .van-field__control {
    background: #F8F8FF;
    border-radius: 5px;
    text-align: center;
    height: 33px;
    color: #b5b5b5;
    padding: 5px;
    border: 1px solid #FF6347;
  }

  .taskCenter_launch_zbtb_textarea >>> .van-field__control {
    background: #F8F8FF;
    border-radius: 5px;
    text-align: left;
    height: 33px;
    color: #b5b5b5;
    padding: 5px;
  }
  .taskCenter_launch_zbtb_cell >>> .van-ellipsis {
    white-space: normal;
    padding: 30px;
  }

  .taskCenter_launch_zbtb_model >>> .van-collapse {
    /*padding-left: 15px;*/
  }

  .taskCenter_launch_zbtb_MainDiv >>> .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #fff;
  }

  /*.taskCenter_launch_zbtb_MainDiv >>> .van-cell{*/
  /*background-image: linear-gradient(#fff, #f5f5f5, #fff);*/
  /*}*/
  .taskCenter_launch_zbtb_cell:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
  }

  .blank {
    width: 100%;
    height: 88px;
    background: #fff;
  }
  /*.taskCenter_launch_zbtb_model >>> .van-cell.van-cell--clickable.van-collapse-item__title{*/
    /*position: sticky;*/
    /*top: 0;*/
    /*z-index: 99;*/
    /*border-bottom: 1px solid #e5e5e5;*/
  /*}*/
  /*.taskCenter_launch_zbtb_model >>> .van-cell.van-cell--clickable.van-collapse-item__title > .van-cell__title{*/
    /*font-size: 15px;*/
    /*font-weight: 600;*/
  /*}*/
  /*.taskCenter_launch_zbtb_modelInner >>> .van-cell.van-cell--clickable.van-collapse-item__title{*/
    /*position: relative;*/
    /*top: 0;*/
    /*z-index: 0;*/
    /*border-bottom: none;*/
  /*}*/
  /*.taskCenter_launch_zbtb_modelInner >>> .van-cell.van-cell--clickable.van-collapse-item__title > .van-cell__title{*/
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
  .taskCenter_launch_zbtb_radio >>> .van-field__control {
    background: #fff !important;
    padding: 5px;
    border: none !important;
  }

  .taskCenter_launch_zbtb_radio >>> .van-radio--horizontal {
    margin-right: 10px;
  }
</style>
