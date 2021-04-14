import YHCommon from './YHCommon'
import mui from './mui'
import { Toast } from 'vant'

export default {
  save_Setting: {
    'setAction': 'com.jit.iasauth', // oauth|iasauth
    'appID': 'taskapp', // 向4A项目组申请
    'client_secret': YHCommon.getConf('NODE_ENV') === 'production' ? 'TASK@app20200601' : 'task@app', // 向4A项目组申请
    'isPortal': true,
    'token': ''
  },
  getHAD (callback) {
    /* eslint-disable */
    mui.ajax('https://uap-mt.cgnpc.com.cn/api/portal/v1/clientconfig',{
      data: {},
      dataType: 'json',// 服务器返回json格式数据
      type: 'get',// HTTP请求类型
      timeout: 10000,// 超时时间设置为10秒；
      headers: {'Content-Type': 'application/json'},
      success: function(data) {
        document.getElementById('HADbackground1').style.display = 'block'
        // document.getElementById('background2').style.display = 'block';
        document.getElementById('HADlogo').src = 'data:image/png;base64,' + data.data.logoData
        document.getElementById('HADhadName').innerText = data.data.title
        document.getElementById('HADver').innerText = 'Version ' + data.data.version
        document.getElementById('HADlogo2').src = 'data:image/png;base64,' + data.data.logoData
        document.getElementById('HADhadName2').innerText = data.data.title
        document.getElementById('HADhadName3').innerText = data.data.title
        document.getElementById('HADver2').innerText = 'Version ' + data.data.version
        document.getElementById('HADAuthentication').innerText = '正在认证...'
        document.getElementById('HADdonwload_button').addEventListener('tap', function() {
          // 打开UEM
          let appInf = 'com.nq.mdm'
          console.log(plus.runtime.isApplicationExist({pname: appInf}))
          if (plus.runtime.isApplicationExist({pname: appInf, action: ''})) {
            Toast('请移步至集团和管家应用市场下载' + data.data.title)
            plus.runtime.launchApplication({pname: appInf, extra: {}}, function (e) {
              console.log(e)
            })
          } else {
            Toast('请安装集团和管家应用市场')
          }
        })
        if (callback) {
          callback()
        }
      },
      error: function(xhr,type,errorThrown) {
        console.log(xhr)
        console.log(errorThrown)
        console.log(type)
      }
    })
  },
  isInstallApk() {
    try {
      var packageName = YHCommon.getConf('NODE_ENV') === 'production' ? 'cn.com.jit.jianbao' : 'cn.com.jit.jianbao.t'
      var main = plus.android.runtimeMainActivity()
      var packageManager = main.getPackageManager()
      var PackageManager = plus.android.importClass(packageManager)
      var packageInfo = packageManager.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES)
      if (typeof (packageInfo) == 'undefined' || packageInfo == '') {
        // 检测到和安盾未安装
        document.getElementById('HADbackground1').style.display = 'none'
        document.getElementById('HADbackground2').style.display = 'block'
        return false
      }
      return true
    } catch (err) {
      // 检测到和安盾未安装
      document.getElementById('HADbackground1').style.display = 'none'
      document.getElementById('HADbackground2').style.display = 'block'
      return false
    }
  },
  callOauth(cb) {
    let _self = this
    let oauthResult
    document.getElementById('HADbackground').style.display = 'block'
    if (_self.isInstallApk()) {
      let main = plus.android.runtimeMainActivity()
      let Intent = plus.android.importClass('android.content.Intent')
      let intent = new Intent()
      if (YHCommon.getConf('NODE_ENV') === 'production') {
        intent.setPackage('cn.com.jit.jianbao')
      } else {
        intent.setPackage('cn.com.jit.jianbao.t')
      }
      console.log(JSON.stringify(_self.save_Setting))
      intent.setAction(_self.save_Setting.setAction)// oauth|iasauth
      intent.putExtra('appID', _self.save_Setting.appID)
      intent.putExtra('client_secret', _self.save_Setting.client_secret)
      // intent.putExtra("isPortal", _self.save_Setting.isPortal);
      // 回调
      main.onActivityResult = function(requestCode, resultCode, data) {
        if (requestCode == 1001) {
          if (resultCode == -1) {
            console.log('oauth服务回调成功，开始获取参数')
            console.log(data.getStringExtra('result'))
            oauthResult = data.getStringExtra('result')
            console.log(oauthResult)
            var oauthResultJson = JSON.parse(oauthResult)
            console.log(result)
            if (oauthResultJson.msg === 'success') {
              if (oauthResultJson.data.access_token) {
                oauthResultJson.data.client_id = _self.save_Setting.appID
                setTimeout(function () {
                  _self.save_Setting.token = JSON.stringify(oauthResultJson.data)
                  YHCommon.updateConf('_4Atoken', JSON.stringify(oauthResultJson.data))
                }, 10)
              }
            }
          } else if (resultCode == 0) {
            Toast('操作被取消')
          } else {
            Toast('非法操作')
          }
        }
        cb && cb(oauthResult)
      }
      main.startActivityForResult(intent, 1001)
    } else {
      // 检测到和安盾未安装
      document.getElementById('HADbackground1').style.display = 'none'
      document.getElementById('HADbackground2').style.display = 'block'
      cb && cb(oauthResult)
    }
    /* eslint-enable */
  }
}
