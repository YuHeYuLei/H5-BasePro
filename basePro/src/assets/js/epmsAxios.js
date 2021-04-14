import YHCommon from './YHCommon'
import { Toast } from 'vant'

export default {
// EPMS系统定制 (广核EPMS系统定制) Soap请求总入口 用于统一调整请求
  SoapHttpRequest: function (params) {
    let epmsAxios = this
    // console.log(params)
    // 非登录方法则全部追加AccessToken和UserNo作为校验值
    if (params['ActionType'] !== 'Login') {
      let ParamList = params.ParamList
      ParamList = JSON.parse(ParamList)
      ParamList['UserNo'] = YHCommon.getConf('UserNo')
      ParamList['AccessToken'] = YHCommon.getConf('AccessToken')
      ParamList = JSON.stringify(ParamList)
      params.ParamList = ParamList
      YHCommon.cgnLoaddingT2Show()
    }
    // 如果有需要则在此处添加加密
    if (params.ParamList) {
      let ParamList = params.ParamList
      // console.log(ParamList)
      // console.log(YHCommon.getAES(ParamList))
      console.log(params['ActionType'], YHCommon.getDAes(YHCommon.getAES(ParamList)))
      params.ParamList = YHCommon.getAES(ParamList)
    }
    return new Promise(resolve => {
      YHCommon.HttpRequest({
        method: 'post',
        url: '/apphost/EPMS',
        headers: {
          'Content-Type': 'text/xml;charset=utf-8',
          'SOAPAction': 'http://mobile.epms/AppAction'
        },
        data: YHCommon.objToSoapxml({
          servername: 'AppAction',
          xmlns: 'http://mobile.epms/',
          params: params
        })
      }).then(function (response) {
        YHCommon.cgnLoaddingT2Hidden()
        // 统一错误处理
        YHCommon.cgnLoaddingHidden()
        YHCommon.cgnWaittingHidden()
        YHCommon.cgnStaticHidden()
        // console.log(response.status)
        if (response.status === 200) {
          if (epmsAxios.EPMS_xmlDataToJSON(response.data).StatUs <= 0) {
            Toast('未查询到数据或相应权限')
            // Toast('未查询到数据或相应权限,请截图后联系管理员!:::' + JSON.stringify(params))
          } else {
            if (epmsAxios.EPMS_xmlDataToJSON(response.data).List && epmsAxios.EPMS_xmlDataToJSON(response.data).List.DataList) {
              if (typeof epmsAxios.EPMS_xmlDataToJSON(response.data).List.DataList == 'string') {
                let DataList = JSON.parse(epmsAxios.EPMS_xmlDataToJSON(response.data).List.DataList)
                let result = true
                if (DataList.Result || DataList.result) {
                  result = DataList.Result ? DataList.Result : DataList.result
                }
                if (!result) {
                  Toast(DataList.Message ? DataList.Message : DataList.message)
                } else {
                  resolve(response)
                }
              } else {
                resolve(response)
              }
            } else {
              resolve(response)
            }
          }
        } else {
          Toast('请求错误,请联系管理员')
          // Toast('请求错误,请联系管理员！请截图后联系管理员!:::' + JSON.stringify(params))
        }
      }).catch(function () {
        // 关闭所有mask
        YHCommon.cgnLoaddingHidden()
        YHCommon.cgnWaittingHidden()
        YHCommon.cgnStaticHidden()
        YHCommon.cgnLoaddingT2Hidden()
        Toast('请求错误,请联系管理员')
        // Toast('请求错误,请联系管理员！请截图后联系管理员!:::' + JSON.stringify(params))
      })
    })
  },
  EPMS_Auth: function (code, callback) {
    let epmsAxios = this
    let params = {
      'ActionType': 'Login',
      'ParamList': JSON.stringify({
        requestAuthCode: code
      })
    }
    YHCommon.cgnWaittingShow()
    epmsAxios.SoapHttpRequest(params).then(function (response) {
      // console.log(response.data)
      let _response = epmsAxios.EPMS_xmlDataToJSON(response.data).List.DataList
      // console.log(_response)
      YHCommon.updateConf('AccessToken', _response.AccessToken)
      YHCommon.updateConf('UserId', _response.UserId)
      YHCommon.updateConf('UserNo', _response.UserNo)
      if (YHCommon.getConf('originalUserNo') == '') {
        YHCommon.updateConf('originalUserNo', _response.UserNo)
      }
      YHCommon.updateConf('UserName', _response.UserName)
      YHCommon.updateConf('DeptId', _response.DeptId)
      YHCommon.updateConf('DeptName', _response.DeptName)
      params = {
        'ActionType': 'GetUserCompany',
        'ParamList': JSON.stringify({
          UserId: YHCommon.getConf('UserNo')
        })
      }
      epmsAxios.SoapHttpRequest(params).then(function (response) {
        console.log(response.data)
        _response = epmsAxios.EPMS_xmlDataToJSON(response.data).List.DataList
        // console.log(_response)
        //  存储公司信息
        YHCommon.updateConf('allCompanyConf', JSON.stringify(_response))
        // 显示公司选择框 选择完毕后往下执行
        if (callback) {
          callback(_response)
        }
      })
    })
  },
  afterSelectCompany (_response, callback) {
    let epmsAxios = this
    YHCommon.cgnWaittingShow()
    YHCommon.updateConf('CompanyId', _response.CompanyId)
    YHCommon.updateConf('CompanyName', _response.CompanyName)
    YHCommon.updateConf('CompanyName', _response.Company_Level)
    let params = {
      'ActionType': 'IfAuthorize',
      'ParamList': JSON.stringify({
        CompanyId: _response.CompanyId,
        UserId: YHCommon.getConf('UserNo')
      })
    }
    epmsAxios.SoapHttpRequest(params).then(function (response) {
      // console.log(response.data)
      let _response = epmsAxios.EPMS_xmlDataToJSON(response.data).List.DataList[0]
      YHCommon.updateConf('Key', _response.Key)
      YHCommon.updateConf('Value', _response.Value)
      // console.log(_response)
      // console.log(localStorage.getItem('Config'))
      YHCommon.cgnWaittingHidden()
      if (callback) {
        callback()
      }
    })
  },
  // EPMS定制xml转JSON
  EPMS_xmlDataToJSON: function (data) {
    let xmldom = YHCommon.stringToXml(data)
    let AppActionResult = xmldom.getElementsByTagName('AppActionResult')[0].textContent
    // console.log(AppActionResult)
    return JSON.parse(AppActionResult)
  }
}
