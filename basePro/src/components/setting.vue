<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block setting_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="returnControl()"><span class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <div :class="$store.state.setting.showHeader ? 'showHeader_iframe' : 'default_iframe'" v-if="pageData.domContorl.iframeShow" :style="pageData.styleCell.List_iframeShow">
        <iframe src="" width="100%" height="100%" frameborder='1' id="iframe"></iframe>
      </div>
      <van-collapse v-model="pageData.domData.localControl">
        <van-collapse-item title="应用设置" name="1">
          <div class="localControlcell fontSizeControl">
            <van-field name="stepper" label="字体控制">
              <template #input>
                <van-stepper max="5" v-model="pageData.domData.fontSizeControl" disable-input @change="ChangelocalControl"/>
              </template>
            </van-field>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">主题切换</div>
            <div class="block block_xiayu" @click="changeStyle('xiayu')">&#160;</div>
            <div class="block block_FF8C00" @click="changeStyle('FF8C00')">&#160;</div>
            <div class="block block_guohua" @click="changeStyle('guohua')">&#160;</div>
            <div class="block block_null" @click="changeStyle()">&#160;</div>
            <!--<div class="jiantou iconfont">&#xe690;</div>-->
          </div>
          <div class="localControlcell nightMode">
            <van-field name="nightMode" label="夜间模式">
              <template #input>
                <van-switch v-model="pageData.domData.nightMode" @change="nightModeChange()"/>
              </template>
            </van-field>
          </div>
          <div class="localControlcell tapMusic">
            <van-field name="tapMusic" label="开关音效">
              <template #input>
                <van-switch v-model="pageData.domData.tapMusic" @change="tapMusicChange()"/>
              </template>
            </van-field>
          </div>
          <div class="localControlcell changeStyle" @click="hiddenSysTitle(!$store.state.setting.showHeader)">
            <div class="localControlcell_title">自定义头部开关</div>
            <div class="jiantou iconfont">{{$store.state.setting.showHeader ? 'ON' : 'OFF'}}</div>
          </div>
          <div class="localControlcell changeStyle" @click="sysBlackControl(!$store.state.setting.sysBlack)">
            <div class="localControlcell_title">物理返回开关</div>
            <div class="jiantou iconfont">{{!$store.state.setting.sysBlack ? 'ON' : 'OFF'}}</div>
          </div>
          <div class="localControlcell changeStyle" @click="clearServerWorker()">
            <div class="localControlcell_title">清除serverWorker</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div></div>
        </van-collapse-item>
        <van-collapse-item title="功能组件" name="2">
          <van-collapse v-model="pageData.domContorl.IndexDBList">
            <van-collapse-item title="IndexDB数据库" name="1">
              <!--新增数据 读取数据 遍历数据 更新数据 删除数据 使用索引-->
              <div class="localControlcell changeStyle" @click="creatIndexDB('YuHe', pageData.domData.indexDBVersion)">
                <div class="localControlcell_title">创建数据库【YuHe】</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="creatIndexDB('YuHe', pageData.domData.indexDBVersion - 1 + 2)">
                <div class="localControlcell_title">升级/更新数据库【Ver: {{pageData.domData.indexDBVersion}}】</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="creatIndexDBList('YuHe', pageData.domData.indexDBVersion - 1 + 2, 'YuHeCell01', 'YuHeCellInner01')">
                <div class="localControlcell_title">创建表</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="creatIndexDBIndex('YuHe', pageData.domData.indexDBVersion - 1 + 2, 'YuHeCell01', 'YuHeCellInner01', [{ indexMark: 'searchMark', attribute: 'YuHeCellInner02', unique: true}])">
                <div class="localControlcell_title">增加索引</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="changeIndexDBIndex('YuHe', pageData.domData.indexDBVersion - 1 + 2, 'YuHeCell01', 'YuHeCellInner01', [{ indexMark: 'searchMark', attribute: 'YuHeCellInner03', unique: true}])">
                <div class="localControlcell_title">修改索引</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="deleteIndexDBIndex('YuHe', pageData.domData.indexDBVersion - 1 + 2, 'YuHeCell01', 'YuHeCellInner01', [{ indexMark: 'searchMark'}])">
                <div class="localControlcell_title">删除索引</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="createIndexDBIndex('YuHe', pageData.domData.indexDBVersion - 1 + 2, 'YuHeCell02', 'YuHeCellInner01', [{ indexMark: 'searchMark', attribute: 'YuHeCellInner02', unique: true}])">
                <div class="localControlcell_title">创建表并对属性增加索引</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="addIndexDBObjectStore('YuHe', 'YuHeCell02', { YuHeCellInner01: '1号', YuHeCellInner02: '2号', YuHeCellInner03: '3号' })">
                <div class="localControlcell_title">指定表追加一条记录</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="addIndexDBObjectStore('YuHe', 'YuHeCell02', { YuHeCellInner01: '2号', YuHeCellInner02: '3号', YuHeCellInner03: '5号' })">
                <div class="localControlcell_title">指定表追加一条记录2</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="readIndexDBObjectStore('YuHe', 'YuHeCell02', '1号')">
                <div class="localControlcell_title">根据主键值寻找记录</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="readIndexDBObjectStore('YuHe', 'YuHeCell02', '1号')">
                <div class="localControlcell_title">根据主键值寻找记录2</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="searchIndexDBKeyPath('YuHe', 'YuHeCell02', '1号')">
                <div class="localControlcell_title">根据主键值寻找主键名</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="IndexDBserachIndex('YuHe', 'YuHeCell02', 'searchMark', '3号')">
                <div class="localControlcell_title">根据索引以及值寻找记录</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="objectIndexDBStoreGetAll('YuHe', 'YuHeCell02')">
                <div class="localControlcell_title">获取指定表所有记录</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="upDateIndexDBObjectStore('YuHe', 'YuHeCell02', 'YuHeCellInner01', { YuHeCellInner01: '2号', YuHeCellInner03: '3号' })">
                <div class="localControlcell_title">修改记录</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="coverIndexDBObjectStore('YuHe', 'YuHeCell02', 'YuHeCellInner01', { YuHeCellInner01: '2号', YuHeCellInner03: '3号' })">
                <div class="localControlcell_title">覆盖记录</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="deleteIndexDBObjectStore('YuHe', 'YuHeCell02', 'YuHeCellInner01', { YuHeCellInner01: '2号'}, 'YuHeCellInner03')">
                <div class="localControlcell_title">删除记录某个字段</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="deleteIndexDBKeyPath('YuHe', 'YuHeCell02', '2号')">
                <div class="localControlcell_title">删除主键值对应记录</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="deleteIndexDBAllbjectStore('YuHe', 'YuHeCell02')">
                <div class="localControlcell_title">删除全部表数据</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="deleteIndexDBThebjectStore('YuHe', pageData.domData.indexDBVersion - 1 + 2, 'YuHeCell02')">
                <div class="localControlcell_title">删除表</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="deleteIndexDB('YuHe')">
                <div class="localControlcell_title">删除数据库</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div></div>
            </van-collapse-item>
          </van-collapse>
          <van-collapse v-model="pageData.domContorl.echars">
            <van-collapse-item title="echars集成" name="1">
              <div class="localControlcell changeStyle" @click="goEcharts('T1')">
                <div class="localControlcell_title">ECharts T1 入门</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div class="localControlcell changeStyle" @click="goEcharts('T2')">
                <div class="localControlcell_title">ECharts T2 基础概念概览</div>
                <div class="jiantou iconfont">&#xe690;</div>
              </div>
              <div></div>
            </van-collapse-item>
          </van-collapse>
          <div class="localControlcell changeStyle" @click="showMenu">
            <div class="localControlcell_title">右侧菜单</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <van-popup v-model="pageData.domContorl.showMenu" position="right" :style="pageData.styleCell.MenuStyle">
            <van-field
              readonly
              clickable
              name="picker"
              :value="pageData.domData.value"
              label="选择器"
              placeholder="点击选择城市"
              @click="pageData.domContorl.showPicker = true"
            />
          </van-popup>
          <van-popup v-model="pageData.domContorl.showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="pageData.domData.columns"
              @confirm="onConfirm"
              @cancel="pageData.domContorl.showPicker = false"
            />
          </van-popup>
          <div class="localControlcell changeStyle">
            <van-field label="空　　　格" value="空格       空格　　　空格"/>
          </div>
          <div class="uploader">
            <div class="uploaderTitle">附件上传</div>
            <div class="uploaderBody">
              <!--<van-field name="uploader" label="文件上传">-->
              <!--<template #input>-->
              <!--<van-uploader v-model="pageData.domData.uploader"/>-->
              <!--</template>-->
              <!--</van-field>-->
              <van-field name="uploader">
                <template #input>
                  <van-uploader v-model="pageData.domData.uploader" :after-read="afterRead" @oversize="onOversize"
                                :max-size="5000 * 1024" :before-read="beforeRead">
                    <template #preview-cover="{ file }">
                      <div class="preview-cover van-ellipsis">{{ file.name }}</div>
                    </template>
                  </van-uploader>
                  <!--before-read为promsie的场景 用于压缩等预处理-->
                  <!--<van-uploader v-model="pageData.domData.uploader" :after-read="afterRead" @oversize="onOversize" :before-read="asyncBeforeRead"></van-uploader>-->
                </template>
              </van-field>
            </div>
          </div>
          <div class="localControlcell changeStyle" @click="donwLoadFiles('https://www.yuheyulei.com/donwload/04.pdf')">
            <div class="localControlcell_title">附件下载</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle" @click="viewFile('./01.pdf', 'isBase64')">
            <div class="localControlcell_title">附件预览</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle" @click="viewFileIframe('./01.pdf', 'isBase64')">
            <div class="localControlcell_title">iframe模式</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle copyStyle" @click="copy('.copyStyle', '雨禾玉雷')">
            <div class="localControlcell_title">复制到剪切板</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">仿文件系统</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle" @click="ScreenshotContorl()">
            <div class="localControlcell_title">截图禁止[Android APP]</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">手势密码</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">指纹识别[APP]</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">本地文件库(加密)[APP]</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">离线应用开关</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle" @click="checkNet()">
            <div class="localControlcell_title">网络检测[APP]</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">离线请求池</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">APP 下载</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle">
            <div class="localControlcell_title">APP 检查更新</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div></div>
        </van-collapse-item>
        <van-collapse-item title="API调试" name="3">
          <div>天气地理</div>
          <div>扫描二维码</div>
          <div>摇一摇</div>
          <div>录音</div>
          <div>播放录音</div>
          <div>语音转文字</div>
          <div>手机振动</div>
          <div>打开应用</div>
          <div>设备信息</div>
        </van-collapse-item>
        <van-collapse-item title="管理员控制" name="4">
          <div class="localControlcell changeStyle" @click="getCode">
            <div class="localControlcell_title">获取code值</div>
            <div class="jiantou iconfont">&#xe690;</div>
          </div>
          <div class="localControlcell changeStyle copyStyle" @click="copy('.copyStyle', pageData.domData.code)" v-show="pageData.domData.code !== ''">
            <div class="localControlcell_title">{{pageData.domData.code}}</div>
          </div>
          <div>切换人员(code)</div>
          <div>切换人员(员工号)</div>
          <div>启用调试</div>
          <div>离线模式</div>
          <div>领航员</div>
        </van-collapse-item>
      </van-collapse>
      <donw-load v-show="pageData.domContorl.donwLoadShow" @returnIndex="returnIndexShow" ref="donwLoaders"></donw-load>
    </div>
  </div>
</template>

<script>
  import { Toast, Popup, Dialog } from 'vant'
  import donwLoad from './donwLoad'
  import base64Data from '../assets/js/base64Data'

  export default {
    name: 'setting',
    data: function () {
      return {
        pageData: {
          isFrom: 'setting',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {
            showMenu: false,
            showPicker: false,
            donwLoadShow: false,
            iframeShow: false,
            messenger: null,
            IndexDBList: [],
            echars: []
          },
          domData: {
            localControl: ['1'],
            fontSizeControl: 1,
            nightMode: false,
            tapMusic: false,
            value: '',
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            fileArr: [],
            uploader: [],
            UploadFileMsgs: [],
            copyDate: '复制到剪切板的内容是雨禾玉雷',
            IndexDB: {},
            indexDBVersion: 1,
            code: ''
          },
          updateData: {},
          styleCell: {
            mainStyle: {},
            MenuStyle: {
              width: '60%',
              height: '100vh',
              overflow: 'scroll'
            },
            List_iframeShow: {}
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
      let dd = app.dd
      let YHCommon = app.YHCommon
      if (YHCommon.getConf('fristTimeSetFont')) {
        app.$set(app.pageData.domData, 'fontSizeControl', YHCommon.getConf('fristTimeSetFont') - 1 + 1)
      }
      if (YHCommon.getConf('tapMusic') == 'true') {
        app.$set(app.pageData.domData, 'tapMusic', true)
      } else {
        app.$set(app.pageData.domData, 'tapMusic', false)
      }
      if (YHCommon.getConf('modeUse') == 'nightMode') {
        app.$set(app.pageData.domData, 'nightMode', true)
      }
      // 处理iframe返回
      if (app.$store.state.setting.isDingTalk) {
        dd.ready(function () {
          dd.biz.navigation.setLeft({
            control: true,
            text: '返回',
            onSuccess: function(result) {
              console.log(result)
              // 如果control为true，则onSuccess将在发生按钮点击事件被回调
              // 检查iframe是否被展示，如果被展示则收起iframe 否则返回上一级页面
              console.log('IOS有效，安卓无效')
              if (app.pageData.domContorl.iframeShow) {
                app.iframeHidden()
              } else {
                console.log('返回上一级')
                app.$router.back(-1)
              }
            },
            onFail: function(err) {
              console.log(err)
            }
          })
        })
      }
      // 自动获取数据库版本号
      YHCommon.getIndexDBVersion('YuHe').then(function (version) {
        app.$set(app.pageData.domData, 'indexDBVersion', version)
      })
    },
    beforeUpdate: function () {},
    updated: function () {},
    beforeDestroy: function () {
    },
    destroyed: function () {
    },
    filters: {},
    methods: {
      checkNet () {
        let app = this
        let mui = app.mui
        // 防止反复注册
        if (!app.$store.state.setting.hasListenSysNet) {
          document.addEventListener('netchange', function (e) {
            if (mui.os.plus) {
              // 用于更新netWorkType的状态
              /* eslint-disable */
              let nt = plus.networkinfo.getCurrentType()
              switch (nt){
                case plus.networkinfo.CONNECTION_ETHERNET:
                case plus.networkinfo.CONNECTION_WIFI:
                  app.isWIFI()
                  break;
                case plus.networkinfo.CONNECTION_CELL2G:
                case plus.networkinfo.CONNECTION_CELL3G:
                case plus.networkinfo.CONNECTION_CELL4G:
                  app.isCellular()
                  break
                default:
                  // offLine
                  app.$store.state.setting.NetWork = 1
                  break
              }
            }
          }, false)
          app.$store.state.setting.hasListenSysNet = true
        }
      },
      isWIFI () {
        let app = this
        app.checkInline(4, 6)
      },
      isCellular () {
        let app = this
        app.checkInline(3, 5)
      },
      checkInline (NetWorkType_success, NetWorkType_error) {
        let app = this
        let YHCommon = app.YHCommon
        new Promise(function (resolve) {
          let conf = {
            method: 'get',
            url: 'https://www.baidu.com',
            timeout: 1000,
          }
          YHCommon.HttpRequest(conf).then(function (response) {
            resolve('success', response)
            console.log(response.data)
            console.log(response.status)
            console.log(response.statusText)
            console.log(response.headers)
            console.log(response.config)
          }).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request)
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message)
            }
            console.log(error.config)
            resolve('error', error)
          })
        }).then(function (type, data) {
          // 不在外网则在内网
          if (type == 'success') {
            app.$store.state.setting.NetWork = NetWorkType_success
          } else {
            app.$store.state.setting.NetWork = NetWorkType_error
          }
        })
      },
      ScreenshotContorl () {
        let app = this
        let mui = app.mui
        console.log('禁止截屏')
        // http://cache.baiducontent.com/c?m=qcfUYQTOzkhJL8LbDF5mQ_kTlsxiStc4uUk5N6ytd8pHsOTkrVT4CMdP4yhMtXA8HQCPCbHHWcvHyndDyDaBIqa-t60-5TQOBmmajmQJQlfoklXMtk8xTFOYxfo5VEvYxhaBK9PLm9f3MTbz_KFeVFknaEtRUx2uY2Rij2J3ak7&p=8d6ec716d9c11bb54ebd9b7a0e7a&newp=9e759a41d5d20ae506f1c7710f5e92695d0fc20e3ad6db01298ffe0cc4241a1a1a3aecbf2c241504d3c3796505a94a58e9f331763d0034f1f689df08d2ecce7e3ec36d6a6c&s=565030e1fce4e481&user=baidu&fm=sc&query=%2EaddFlags%280x00002000%29&qid=c282ca1e000bad37&p1=1
        if (mui.os.plus) {
          /* eslint-disable */
          console.log('禁止截屏')
          if (plus.os.name === 'Android') {
            let Activity = plus.android.runtimeMainActivity()
            var mwindow  = Activity.getWindow()
            plus.android.importClass(mwindow)
            mwindow.addFlags(0x00002000)
            /* eslint-enable */
          }
        }
      },
      goEcharts (aim) {
        let app = this
        app.$router.push({
          name: 'echarts' + aim
        })
      },
      sysBlackControl (boolen) {
        let app = this
        // 返回控制
        if (!app.$store.state.setting.hasListenSysBack) {
          // 注册后发现无法移除
          document.addEventListener('backbutton', app.backbuttonFun)
          // 防止反复注册
          app.$store.state.setting.hasListenSysBack = true
        }
        app.$store.state.setting.sysBlack = boolen
      },
      backbuttonFun(e) {
        let app = this
        let dd = app.dd
        if (!app.$store.state.setting.sysBlack) {
          e.preventDefault()
        } else {
          if (app.$store.state.setting.headerTitle == '首页') {
            if (app.$store.state.setting.isDingTalk) {
              Dialog.confirm({
                title: '确定退出应用？',
                message: '将返回应用列表'
              })
                .then(() => {
                  dd.ready(function () {
                    dd.biz.navigation.close({
                      onSuccess: function(result) {},
                      onFail: function(err) {
                        console.log(err)
                      }
                    })
                  })
                })
                .catch(() => {
                  // on cancel
                })
            } else if (app.$store.state.setting.isWX) {} else {
              Toast('没有退路啦！')
            }
          } else {
            app.$router.back(-1)
          }
          e.preventDefault()
        }
      },
      returnControl () {
        let app = this
        if (!app.pageData.domContorl.iframeShow) {
          app.$router.back(-1)
        } else {
          app.$set(app.pageData.domContorl, 'iframeShow', false)
        }
      },
      hiddenSysTitle (boolen) {
        let app = this
        let dd = app.dd
        app.$store.state.setting.showHeader = boolen
        if (app.$store.state.setting.isDingTalk) {
          dd.ready(function () {
            dd.biz.navigation.hideBar({
              hidden: boolen, // true：隐藏，false：显示
              onSuccess: function (result) {
                console.log(result)
              },
              onFail: function (err) {
                console.log(err)
              }
            })
          })
        }
        if (app.$store.state.setting.isWX) {}
      },
      clearServerWorker () {
        location.href = './CSW.html'
      },
      creatIndexDB (databaseName, version) {
        let app = this
        let YHCommon = app.YHCommon
        console.log('开始创建数据库', databaseName, version)
        // 可定义onsuccess, onupgradeneeded
        app.$set(app.pageData.domData, 'indexDBVersion', version)
        YHCommon.createIndexDB(databaseName, version).then(function (db) {
          if (db) {
            app.pageData.domData.IndexDB = db
          }
        })
      },
      deleteIndexDB (databaseName) {
        let app = this
        let YHCommon = app.YHCommon
        console.log('删除数据库')
        YHCommon.deleteDatabase(databaseName)
        app.$set(app.pageData.domData, 'indexDBVersion', 1)
      },
      creatIndexDBList (databaseName, version, listName, keyPath) {
        let app = this
        let YHCommon = app.YHCommon
        console.log('开始创建数据库', databaseName, version)
        app.$set(app.pageData.domData, 'indexDBVersion', version)
        YHCommon.createIndexDB(databaseName, version, null, function (e) {
          // 需要更新后才执行 所以version要增加
          let db = e.target.result
          let ObjectStore = null
          if (!db.objectStoreNames.contains(listName)) {
            if (keyPath) {
              ObjectStore = db.createObjectStore(listName, { keyPath: keyPath })
            } else {
              ObjectStore = db.createObjectStore(listName, { autoIncrement: true })
            }
          }
          if (!ObjectStore) {
            Toast('已存在该表名，创建表失败')
            console.log('已存在该表名，创建表失败')
            return
          }
          db.onversionchange = function (event) {
            // 检查到触发更新时关闭上一次连接
            YHCommon.DBclose(e.target)
          }
          console.log('执行到这里了', ObjectStore)
        })
      },
      creatIndexDBIndex (databaseName, version, listName, keyPath, index) {
        // index 索引数组 [{ indexMark: '索引名', attribute: '索引的属性名', unique: 是否可重复}]
        let app = this
        let YHCommon = app.YHCommon
        console.log('开始创建数据库', databaseName, version)
        app.$set(app.pageData.domData, 'indexDBVersion', version)
        YHCommon.createIndexDB(databaseName, version, null, function (e) {
          let db = e.target.result
          if (!db.objectStoreNames.contains(listName)) {
            Toast('表名不存在')
            console.log('表名不存在')
            return
          }
          let objectStore = e.target.transaction.objectStore(listName)
          if (index) {
            for (var item in index) {
              let indexMark = index[item].indexMark
              let attribute = index[item].attribute
              let unique = index[item].unique
              objectStore.createIndex(indexMark, attribute, { unique: unique })
            }
          }
          db.onversionchange = function (event) {
            // 检查到触发更新时关闭上一次连接
            YHCommon.DBclose(e.target)
          }
        })
      },
      changeIndexDBIndex (databaseName, version, listName, keyPath, index) {
        let app = this
        let YHCommon = app.YHCommon
        console.log('开始创建数据库', databaseName, version)
        app.$set(app.pageData.domData, 'indexDBVersion', version)
        YHCommon.createIndexDB(databaseName, version, null, function (e) {
          let db = e.target.result
          if (!db.objectStoreNames.contains(listName)) {
            Toast('表名不存在')
            console.log('表名不存在')
            return
          }
          let objectStore = e.target.transaction.objectStore(listName)
          if (index) {
            for (var item in index) {
              let indexMark = index[item].indexMark
              let attribute = index[item].attribute
              let unique = index[item].unique
              let indexNames = objectStore.indexNames
              if (indexNames.contains(indexMark)) {
                objectStore.deleteIndex(indexMark)
              }
              objectStore.createIndex(indexMark, attribute, { unique: unique })
            }
          }
          db.onversionchange = function (event) {
            // 检查到触发更新时关闭上一次连接
            YHCommon.DBclose(e.target)
          }
        })
      },
      deleteIndexDBIndex (databaseName, version, listName, keyPath, index) {
        let app = this
        let YHCommon = app.YHCommon
        console.log('开始创建数据库', databaseName, version)
        app.$set(app.pageData.domData, 'indexDBVersion', version)
        YHCommon.createIndexDB(databaseName, version, null, function (e) {
          let db = e.target.result
          if (!db.objectStoreNames.contains(listName)) {
            Toast('表名不存在')
            console.log('表名不存在')
            return
          }
          let objectStore = e.target.transaction.objectStore(listName)
          if (index) {
            for (var item in index) {
              let indexMark = index[item].indexMark
              let indexNames = objectStore.indexNames
              if (indexNames.contains(indexMark)) {
                objectStore.deleteIndex(indexMark)
              }
            }
          }
          db.onversionchange = function (event) {
            // 检查到触发更新时关闭上一次连接
            YHCommon.DBclose(e.target)
          }
        })
      },
      createIndexDBIndex(databaseName, version, listName, keyPath, index) {
        // 创建/打开数据库+表+主键并为指定属性追加索引
        // index 索引数组 [{ indexMark: '索引名', attribute: '索引的属性名', unique: 是否可重复}]
        let app = this
        let YHCommon = app.YHCommon
        console.log('开始创建数据库', databaseName, version)
        app.$set(app.pageData.domData, 'indexDBVersion', version)
        YHCommon.createIndexDB(databaseName, version, null, function (e) {
          let db = e.target.result
          let ObjectStore = null
          if (!db.objectStoreNames.contains(listName)) {
            if (keyPath) {
              ObjectStore = db.createObjectStore(listName, { keyPath: keyPath })
            } else {
              ObjectStore = db.createObjectStore(listName, { autoIncrement: true })
            }
          }
          if (!ObjectStore) {
            Toast('已存在该表名，创建表失败')
            console.log('已存在该表名，创建表失败')
            return
          }
          if (index) {
            for (var item in index) {
              let indexMark = index[item].indexMark
              let attribute = index[item].attribute
              let unique = index[item].unique
              ObjectStore = YHCommon.createObjectStoreIndex(ObjectStore, indexMark, attribute, unique)
              console.log('执行到这里了', ObjectStore)
            }
          }
          db.onversionchange = function (event) {
            // 检查到触发更新时关闭上一次连接
            YHCommon.DBclose(e.target)
          }
        })
      },
      addIndexDBObjectStore (databaseName, listName, JsonData) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          let result = YHCommon.addObjectStore(db, listName, JsonData)
          console.log(result)
        })
      },
      readIndexDBObjectStore (databaseName, listName, value) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.readObjectStore(db, listName, value).then(function (list) {
            console.log(list)
          })
        })
      },
      searchIndexDBKeyPath (databaseName, listName, value) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.searchKeyPath(db, listName, value).then(function (list) {
            console.log(list.keyPath)
          })
        })
      },
      objectIndexDBStoreGetAll (databaseName, listName, vaule) {
        let app = this
        let YHCommon = app.YHCommon
        let query = null
        if (vaule) {
          query = IDBKeyRange.only(vaule)
        }
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.objectStoreGetAll(db, listName, query).then(function (list) {
            console.log('如果不知道则从这里找keyPath', list)
            console.log(list.result)
          })
        })
      },
      IndexDBserachIndex (databaseName, listName, indexName, Value) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.serachIndex(db, listName, indexName, Value).then(function (request) {
            console.log(request)
          })
        })
      },
      coverIndexDBObjectStore (databaseName, listName, keyPath, jsonData) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.upDateObjectStore(db, listName, jsonData).then(function (request) {
            YHCommon.readObjectStore(db, listName, jsonData[keyPath]).then(function (_list) {
              console.log('数据已更新', _list)
            })
          })
        })
      },
      upDateIndexDBObjectStore (databaseName, listName, keyPath, jsonData) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.readObjectStore(db, listName, jsonData[keyPath]).then(function (list) {
            if (list) {
              for (var item in list) {
                for (var innerItem in jsonData) {
                  if (!list[innerItem]) {
                    list[innerItem] = jsonData[innerItem]
                  }
                  if (item == innerItem) {
                    list[item] = jsonData[innerItem]
                  }
                }
              }
              jsonData = list
            }
            YHCommon.upDateObjectStore(db, listName, jsonData).then(function (request) {
              YHCommon.readObjectStore(db, listName, jsonData[keyPath]).then(function (_list) {
                console.log('数据已更新', _list)
              })
            })
          })
        })
      },
      deleteIndexDBObjectStore (databaseName, listName, keyPath, jsonData, deleteobj) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.readObjectStore(db, listName, jsonData[keyPath]).then(function (list) {
            console.log(list)
            if (list) {
              for (var item in list) {
                if (item == deleteobj) {
                  delete list[item]
                }
              }
              jsonData = list
              console.log(jsonData)
            }
            YHCommon.upDateObjectStore(db, listName, jsonData).then(function (request) {
              YHCommon.readObjectStore(db, listName, jsonData[keyPath]).then(function (_list) {
                console.log('已删除', _list)
              })
            })
          })
        })
      },
      deleteIndexDBKeyPath (databaseName, listName, vaule) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.removeObjectStore(db, listName, vaule).then(function (request) {
            YHCommon.objectStoreGetAll(db, listName).then(function (list) {
              console.log(list.result)
            })
          })
        })
      },
      deleteIndexDBAllbjectStore (databaseName, listName) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.createIndexDB(databaseName).then(function (db) {
          YHCommon.removeAllObjectStore(db, listName).then(function (request) {
            YHCommon.objectStoreGetAll(db, listName).then(function (list) {
              console.log(list.result)
            })
          })
        })
      },
      deleteIndexDBThebjectStore (databaseName, version, listName) {
        let app = this
        let YHCommon = app.YHCommon
        app.$set(app.pageData.domData, 'indexDBVersion', version)
        YHCommon.createIndexDB(databaseName, version, null, function (e) {
          // 需要更新后才执行 所以version要增加
          let db = e.target.result
          YHCommon.deleteObjectStore(db, listName)
          console.log(db.objectStoreNames)
          db.onversionchange = function (event) {
            // 检查到触发更新时关闭上一次连接
            YHCommon.DBclose(e.target)
          }
        })
      },
      copy (copyStyle, msg) {
        let app = this
        let YHCommon = app.YHCommon
        YHCommon.copy(copyStyle, msg)
      },
      viewFileIframe(url, type) {
        let app = this
        // '仅支持PDF 本地文件或byte文件流, 不支持跨域'
        console.log(url)
        console.log(type)
        let getFileUrl = url
        let pdfAsDataUri = ''
        type = type || 'isBase64'
        new Promise(function (resolve) {
          if (type == 'isbyte') { // 未测试
            // 发起请求获取 data
            let data = '后端返回的byte[]数组'
            let PDFData = data // data是byte[]数组 需后端返回
            let rawLength = PDFData.length
            var array = new Uint8Array(new ArrayBuffer(rawLength))
            for (var i = 0; i < rawLength; i++) {
              array[i] = PDFData.charCodeAt(i) & 0xff
            }
            getFileUrl = array
            resolve()
          } else if (type == 'isBase64') { // 已测试
            // 发起请求获取 base64
            // 这里就是pdf文件的base64码，我是通过session传递base64的
            pdfAsDataUri = base64Data.pdfDemo
            resolve()
          } else {
            // 本地文件实体 已测试 钉钉不支持
            resolve()
          }
        }).then(function () {
          let viewFileUrl = '/generic/web/viewer.html'
          if (type == 'isFile') {
            viewFileUrl = viewFileUrl + '?file=' + getFileUrl
          }
          if (location.href.indexOf('index.html') !== -1) {
            viewFileUrl = location.href.substring(0, location.href.indexOf('index.html') - 1) + viewFileUrl
          } else {
            viewFileUrl = location.href.substring(0, location.href.indexOf('#') - 1) + viewFileUrl
          }
          app.$set(app.pageData.domContorl, 'iframeShow', true)
          setTimeout(function () {
            document.getElementById('iframe').setAttribute('src', viewFileUrl)
            app.showMsg(pdfAsDataUri)
          }, 10)
        })
      },
      iframeHidden() {
        let app = this
        document.getElementById('iframe').setAttribute('src', '')
        app.$set(app.pageData.domContorl, 'iframeShow', false)
      },
      showMsg: function (pdfAsDataUri) {
        // 与Iframe交互
        let app = this
        app.pageData.domContorl.messenger = new window.Messenger('parent', 'projectName')
        console.log('messenger', app.pageData.domContorl.messenger)
        let iframe = document.getElementById('iframe')
        app.pageData.domContorl.messenger.addTarget(iframe.contentWindow, 'iframe')
        setTimeout(function () {
          app.pageData.domContorl.messenger.targets['iframe'].send(pdfAsDataUri)
        }, 1000)
        app.pageData.domContorl.messenger.listen(function (msg) {
          // 双击收起或隐藏头部
          console.log(msg)
          msg = JSON.parse(msg)
          app.$set(app.pageData.styleCell, 'ListHead', msg.ListHead)
          app.$set(app.pageData.styleCell, 'iframeShow', msg.iframeShow)
        })
      },
      viewFile (url, type) {
        // '仅支持PDF 本地文件或byte文件流, 不支持跨域'
        let app = this
        let dd = app.dd
        let YHCommon = app.YHCommon
        let getFileUrl = url
        let browser = YHCommon.getConf('browser')
        var strArrMark = 0
        // type = type || 'isFile'
        type = type || 'isBase64'
        // 文件流处理
        new Promise(function (resolve) {
          if (type == 'isbyte') { // 未测试
            // 发起请求获取 data
            let data = '后端返回的byte[]数组'
            let PDFData = data // data是byte[]数组 需后端返回
            let rawLength = PDFData.length
            var array = new Uint8Array(new ArrayBuffer(rawLength))
            for (var i = 0; i < rawLength; i++) {
              array[i] = PDFData.charCodeAt(i) & 0xff
            }
            getFileUrl = array
            resolve()
          } else if (type == 'isBase64') { // 已测试
            // 发起请求获取 base64
            let pdfAsDataUri = base64Data.pdfDemo
            let strArr = []
            let n = 512 * 512
            let l = pdfAsDataUri.length
            for (i = 0; i < l / n; i++) {
              var a = pdfAsDataUri.slice(n * i, n * (i + 1))
              strArr.push(a)
            }
            if (browser.versions.userAgent.indexOf('DingTalk') === -1) {
              sessionStorage.setItem('_imgUrl', pdfAsDataUri)
              resolve()
            } else {
              dd.ready(function () {
                dd.util.domainStorage.setItem({
                  name: 'strArrLength', // 存储信息的key值
                  value: strArr.length, // 存储信息的Value值
                  onSuccess: function (info) {
                    console.log(JSON.stringify(info))
                  },
                  onFail: function (err) {
                    alert(JSON.stringify(err))
                  }
                })
                for (let item in strArr) {
                  dd.util.domainStorage.setItem({
                    name: '_imgUrl' + item, // 存储信息的key值
                    value: strArr[item], // 存储信息的Value值
                    onSuccess: function (info) {
                      strArrMark++
                      if (strArrMark == strArr.length) {
                        resolve()
                      }
                    },
                    onFail: function (err) {
                      alert(JSON.stringify(err))
                    }
                  })
                }
              })
            }
          } else {
            // 本地文件实体 已测试
            resolve()
          }
        }).then(function () {
          let viewFileUrl = '/generic/web/viewer.html'
          if (type == 'isFile') {
            viewFileUrl = viewFileUrl + '?file=' + getFileUrl
          }
          if (location.href.indexOf('index.html') !== -1) {
            viewFileUrl = location.href.substring(0, location.href.indexOf('index.html') - 1) + viewFileUrl
          } else {
            viewFileUrl = location.href.substring(0, location.href.indexOf('#') - 1) + viewFileUrl
          }
          // 检测是钉钉还是智慧中广核 或者非钉钉环境
          if (browser.versions.userAgent.indexOf('DingTalk') === -1) {
            console.log('非钉钉环境')
            window.location.href = viewFileUrl
          } else {
            if (browser.versions.userAgent.indexOf('cgntalk') === -1) {
              app.dd._invoke('exclusive.sdk.invoke', {
                url: 'landrayWPS://open?' + viewFileUrl,
                enableShare: true,
                onSuccess: function (event) {
                  console.log('success', JSON.stringify(event))
                },
                onFail: function (failErr) {
                  console.log('调用失败', failErr)
                  if (JSON.stringify(failErr) == 'Not authorized') {
                    alert('需要在【和管家】应用中安装【智慧中广核】以及【安全阅读器】并打开激活以访问附件！')
                  }
                  alert('失败：' + JSON.stringify(failErr))
                }
              })
              return
            }
            dd.ready(function () {
              dd.biz.util.openLink({
                url: viewFileUrl,
                onSuccess: function (result) {
                  console.log(result)
                },
                onFail: function (err) {
                  console.log(err)
                }
              })
            })
          }
        })
      },
      donwLoadFiles (url) {
        let app = this
        let YHCommon = app.YHCommon
        let browser = YHCommon.getConf('browser')
        // app.$set(app.pageData.domContorl, 'donwLoadShow', true)
        // 如果是智慧中广核
        if (browser.versions.userAgent.indexOf('cgntalk') === -1) {
          app.dd._invoke('exclusive.sdk.invoke', {
            url: 'landrayWPS://open?' + url,
            enableShare: true,
            onSuccess: function (event) {
              console.log('success', JSON.stringify(event))
            },
            onFail: function (failErr) {
              console.log('调用失败', failErr)
              if (JSON.stringify(failErr) == 'Not authorized') {
                alert('需要在【和管家】应用中安装【智慧中广核】以及【安全阅读器】并打开激活以访问附件！')
              }
              alert('失败：' + JSON.stringify(failErr))
            }
          })
          return
        }
        app.$refs.donwLoaders.donwloadFile(url)
      },
      returnIndexShow () {
        let app = this
        app.$set(app.pageData.domContorl, 'donwLoadShow', false)
      },
      beforeRead (file) {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片')
          return false
        }
        return true
        // app.asyncBeforeRead(file).then(function (data) {
        //   console.log(data)
        //   return true
        // }).catch(function (err) {
        //   console.log(err)
        //   return false
        // })
      },
      asyncBeforeRead (file) {
        return new Promise((resolve, reject) => {
          if (file.type !== 'image/jpeg') {
            Toast('请上传 jpg 格式图片')
            reject(new Error('请上传 jpg 格式图片'))
          } else {
            let img = new File(['foo'], 'bar.jpg', {
              type: 'image/jpeg'
            })
            resolve(img)
          }
        })
      },
      onOversize (file) {
        console.log(file)
        Toast('文件大小不能超过 500kb')
      },
      afterRead (file) {
        // 此时可以自行将文件上传至服务器 实现自动上传 每上传一个文件自动独立触发一次
        console.log(file)
        file.status = 'uploading'
        file.message = '上传中...'

        setTimeout(() => {
          file.status = 'failed'
          file.message = '上传失败'
        }, 10000)
      },
      /**
       * @param url               上传目标地址 可自定义 默认 ''
       * @param file              文件实体
       * @param UploadFileMsg     如有曾上传但暂停时产生的UploadFileMsg
       * @param cancelFun         取消上传后执行 可自定义 默认 app.cancelFun
       * @param onUploadProgress  上传状态 可自定义 默认 app.onUploadProgress
       * @param fileArr           文件实体来源数组
       * @param index             对应文件实体来源数组下标
       * @param successCallback   上传成功返回 可自定义 默认 app.successCallback
       * @param errCallback       上传异常返回 可自定义 默认 app.errCallback
       * @returns {Q.Promise<any>}
       */
      upload (params) { // 单个文件上传 可兼容断点续传 需要后端支持 // 未测试
        let app = this
        let YHCommon = app.YHCommon
        let CancelToken = new app.axios.CancelToken(function (cancel) {
          console.log(cancel)
        })
        let source = CancelToken.source()
        let UploadFileMsg = params.UploadFileMsg || {
          url: params.url || '',
          file: params.file,
          source: source,
          fileArr: params.fileArr, // 当前操作的文件数组 对应 app.pageData.domData.uploader
          index: params.index, // 当前操作的文件对应于该数组的下标
          isFileBlock: false, // 非断点续传
          hasSent: 0, // 已上传进度 对应 progressEvent.loaded 的叠加
          total: 0, // 完整进度 仅第一次上传时更新此值
          ID: new Date().getTime() // 必然唯一的标识 可以用于告诉后端需要覆盖的文件是哪个
        }
        // 禁止同一文件重复上传
        let UploadFileMsgs = app.pageData.domData.UploadFileMsgs
        for (var item in UploadFileMsgs) {
          if (UploadFileMsgs[item].fileArr == UploadFileMsg.fileArr && UploadFileMsgs[item].index == UploadFileMsg.index) {
            Toast('请不要重复上传同一文件')
            return
          }
        }
        // 插入队列
        app.pageData.domData.UploadFileMsgs.push(UploadFileMsg)
        let param = new FormData() // 创建form对象
        // 如果为断点续传 则截断file
        let file = UploadFileMsg.file
        if (UploadFileMsg.isFileBlock) {
          file = file.slice(UploadFileMsg.hasSent + 1, UploadFileMsg.total)
        }
        param.append('file', file) // 通过append向form对象添加数据
        // param.append('chunk', '别的数据') // 添加form表单中其他数据 比如断点续传对应的文件名
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        return YHCommon.HttpRequest({
          method: 'post',
          url: params.url || '',
          data: param,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: function (progressEvent) {
            // 实时更新上传状态 并存储至对应的UploadFileMsg中
            if (params.onUploadProgress) {
              params.onUploadProgress(UploadFileMsg, progressEvent)
            } else {
              app.onUploadProgress(UploadFileMsg, progressEvent)
            }
          },
          cancelToken: CancelToken
        }).then(function (response) {
          console.log(response)
          if (params.successCallback) {
            params.successCallback(UploadFileMsg, response)
          } else {
            app.successCallback(UploadFileMsg, response)
          }
        }).catch(function (error) {
          if (app.axios.isCancel(error)) {
            // console.log('Request canceled', error.message)
            if (params.cancelFun) {
              params.cancelFun(UploadFileMsg)
            } else {
              app.cancelFun(UploadFileMsg)
            }
          } else {
            // 处理错误
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              console.log(error.request)
            } else {
              console.log('Error', error.message)
            }
            if (params.errCallback) {
              params.errCallback(UploadFileMsg, error)
            } else {
              app.errCallback(UploadFileMsg, error)
            }
            console.log(error.config)
          }
        })
      },
      onUploadProgress (UploadFileMsg, progressEvent) { // 未测试
        let app = this
        console.log(progressEvent)
        // 追加hasSent
        UploadFileMsg.hasSent = (UploadFileMsg.hasSent - 1 + 1) + (progressEvent.loaded - 1 + 1)
        // 有两种 一种是普通上传 一种是断点续传
        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
        if (UploadFileMsg.isFileBlock) {
          // 断点续传
          complete = (UploadFileMsg.hasSent / UploadFileMsg.total * 100 | 0)
        } else {
          // 寻找 app.pageData.domData.UploadFileMsgs 中对应的 UploadFileMsg 追加上传百分比与修改状态
          UploadFileMsg.total = progressEvent.total
          UploadFileMsg.isFileBlock = true
        }
        console.log(complete)
        // 找到 UploadFileMsgs 队列中的UploadFileMsg 替换里面的值
        app.upDataUploadFileMsgs(UploadFileMsg)
        // 重置页面上的下载状态样式  如 页面百分比更新
      },
      cancelFun (UploadFileMsg, cancel) { // 未测试
        console.log(cancel)
      },
      suspendUpload (index) { // 断点续传  暂停 // 未测试
        let app = this
        // 需要记录当前暂停的 UploadFileMsg 存起来 当点击继续时重复使用
        if (app.searchFileArrTOuploader(index)) {
          app.searchFileArrTOuploader(index).source.cancel('暂停上传')
        }
        // 重置页面上的下载状态样式  如按钮文字改为 继续
      },
      goOnUpload (index) { // 断点续传 开始
        let app = this
        if (app.searchFileArrTOuploader(index)) {
          app.upload({
            UploadFileMsg: app.searchFileArrTOuploader(index)
          })
          // 重置页面上的下载状态样式 如按钮文字改为 暂停
        }
      },
      cancelUpload (index) { // 完全取消上传
        let app = this
        let UploadFileMsgs = app.pageData.domData.UploadFileMsgs
        let uploader = app.pageData.domData.uploader
        for (var item in UploadFileMsgs) {
          if (UploadFileMsgs[item].fileArr == uploader && index == UploadFileMsgs[item].index) {
            UploadFileMsgs[item].source.cancel('完全取消上传')
            UploadFileMsgs.splice(item, 1)
            // 重置页面上的下载状态样式 如按钮文字改为 开始上传 并清除百分比等状态
          }
        }
      },
      upDataUploadFileMsgs (UploadFileMsg) { // 更新 UploadFileMsgs 的内容
        let app = this
        let UploadFileMsgs = app.pageData.domData.UploadFileMsgs
        for (var item in UploadFileMsgs) {
          if (UploadFileMsgs[item].ID == UploadFileMsg.ID) {
            UploadFileMsgs[item] = UploadFileMsg
          }
        }
      },
      searchFileArrTOuploader (index) { // 根据 uploader 的 index 找到 UploadFileMsgs 中对应的 UploadFileMsg // 未测试
        let app = this
        let UploadFileMsgs = app.pageData.domData.UploadFileMsgs
        let uploader = app.pageData.domData.uploader
        for (var item in UploadFileMsgs) {
          if (UploadFileMsgs[item].fileArr == uploader && index == UploadFileMsgs[item].index) {
            return UploadFileMsgs[item]
          }
        }
        return null
      },
      successCallback (UploadFileMsg, response) {
        // 上传完毕后需要改变上传按钮状态 防止重复上传
        let app = this
        let UploadFileMsgs = app.pageData.domData.UploadFileMsgs
        for (var item in UploadFileMsgs) {
          if (UploadFileMsgs[item].ID == UploadFileMsg.ID) {
            // 上传完成就干掉
            UploadFileMsgs.splice(item, 1)
            // 重置页面上的下载状态样式 如按钮文字改为 已完成 并清除百分比等状态
          }
        }
        console.log(response)
      },
      errCallback (UploadFileMsg, error) {
        let app = this
        let UploadFileMsgs = app.pageData.domData.UploadFileMsgs
        for (var item in UploadFileMsgs) {
          if (UploadFileMsgs[item].ID == UploadFileMsg.ID) {
            // 上传失败就干掉
            UploadFileMsgs.splice(item, 1)
            // 重置页面上的下载状态样式 如按钮文字改为 上传异常 重置全部状态以及 并清除百分比等
          }
        }
        console.log(error)
      },
      onConfirm (value) {
        let app = this
        app.pageData.domData.value = value
        app.pageData.domContorl.showPicker = false
      },
      ChangelocalControl (value) {
        let app = this
        let YHCommon = app.YHCommon
        if (!YHCommon.getConf('fristTimeSetFont')) {
          Toast('修改此项将会可能导致页面发生变化（如无法对齐）,请注意')
        }
        let fontSize = YHCommon.getConf('originalFontSize').replace('px', '')
        YHCommon.updateConf('fristTimeSetFont', value)
        document.documentElement.style.fontSize = (fontSize - 1 + 1 + value - 1 + 1) + 'px'
        if (value == 1) {
          document.documentElement.style.fontSize = YHCommon.getConf('originalFontSize')
        }
      },
      changeStyle (color) {
        let app = this
        let YHCommon = app.YHCommon
        if (color) {
          if (color == 'guohua') {
            document.querySelector('.styleMask').style.background = 'url("' + require('../assets/images/leaders4.jpeg') + '")'
            YHCommon.updateConf('styleMask', color)
          } else if (color == 'xiayu') {
            document.querySelector('.styleMask').style.background = 'url("' + require('../assets/images/xaiyu.gif') + '")'
            YHCommon.updateConf('styleMask', color)
          } else {
            document.querySelector('.styleMask').style.background = '#' + color
            YHCommon.updateConf('styleMask', color)
          }
        } else {
          document.querySelector('.styleMask').style.background = 'none'
          YHCommon.updateConf('styleMask', 'none')
        }
      },
      nightModeChange () {
        let app = this
        let YHCommon = app.YHCommon
        if (app.pageData.domData.nightMode) {
          YHCommon.updateConf('modeUse', 'nightMode')
          document.getElementsByClassName('MainDiv')[0].className = 'MainDiv nightMode'
        } else {
          YHCommon.updateConf('modeUse', '')
          document.getElementsByClassName('MainDiv')[0].className = 'MainDiv'
        }
      },
      tapMusicChange () {
        let app = this
        let YHCommon = app.YHCommon
        if (app.pageData.domData.tapMusic) {
          YHCommon.updateConf('tapMusic', 'true')
        } else {
          YHCommon.updateConf('tapMusic', 'false')
        }
      },
      showMenu () {
        let app = this
        app.pageData.domContorl.showMenu = !app.pageData.domContorl.showMenu
      },
      onLoad () {
      },
      getCode() {
        let app = this
        let dd = app.dd
        let YHCommon = app.YHCommon
        // 判断平台 是否为 钉钉或微信
        if (app.$store.state.setting.isDingTalk || app.$store.state.setting.isWX) {
          if (app.$store.state.setting.isDingTalk) {
            console.log(YHCommon.getConf('ddcorpId'))
            dd.ready(function() {
              dd.runtime.permission.requestAuthCode({
                corpId: YHCommon.getConf('ddcorpId'), // 企业id
                onSuccess: function (info) {
                  let code = info.code
                  app.$set(app.pageData.domData, 'code', code)
                },
                onFail: function(err) {
                  alert('dd error:' + JSON.stringify(err))
                }
              })
            })
          } else {
            if (!YHCommon.getUrlParam('code')) {
              Toast('微信平台需要第二次进入的时候才能获取code值')
              let wxAuthUrl = './wxAuth.html?appid=' + YHCommon.getConf('wxAppId')
              window.location.href = wxAuthUrl
            } else {
              app.$set(app.pageData.domData, 'code', YHCommon.getUrlParam('code'))
            }
          }
        } else {
          Toast('别闹')
        }
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
      Popup,
      donwLoad,
      Dialog
    }
  }
</script>

<style src="../fonts/iconfont.css"></style>
<style src="../assets/css/vant.css"></style>
<style scoped src="../assets/css/mui.min.css"></style>
<style src="../assets/style/varibles.less" lang="less" scoped></style>

<style scoped>
  .fontSizeControl >>> van-cell__title {
    float: left;
  }

  .fontSizeControl >>> van-cell__value {
    float: right;
  }

  .fontSizeControl >>> .van-field__body {
    float: right;
  }

  .localControlcell:not(:last-child) {
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    min-height: 50px;
    line-height: 50px;
  }

  .localControlcell_title {
    min-width: 100px;
    height: 100%;
    float: left;
    padding-left: 15px;
    font-size: 14px;
    color: #646566;
  }

  .jiantou {
    width: 100px;
    height: 100%;
    float: right;
    text-align: right;
    padding-right: 15px;
  }

  .nightMode >>> .van-field__body, .tapMusic >>> .van-field__body {
    padding-left: 70%;
  }

  .nightMode >>> .van-switch__node, .tapMusic >>> .van-switch__node {
    top: -2px
  }

  .block {
    margin: 5px;
    width: 33px;
    height: 33px;
    float: right;
    padding-right: 5px;
    border: 1px solid #e5e5e5;
  }

  .block_xiayu {
    background: url("../assets/images/xaiyu.gif");
  }

  .block_FF8C00 {
    background: #FF8C00;
  }

  .block_F08080 {
    background: #F08080;
  }

  .block_null {
    background: #fff;
  }

  .block_guohua {
    background: url("../assets/images/leaders4.jpeg");
  }

  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }

  .uploaderTitle {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }

  .uploaderBody {
    border: 1px solid #e5e5e5;
    margin: 5px;
    padding: 5px;
  }

  .uploaderBody >>> .van-uploader__upload, .uploaderBody >>> .van-uploader__preview {
    margin: 5px;
    padding: 0;
    border: 1px solid #e5e5e5;
  }

  .uploaderBody >>> .van-cell {
    padding: 0;
  }

  .changeStyle {
    padding-right: 10px;
  }

  .showHeader_iframe {
    position: absolute;
    top: 44px;
    width: 100%;
    height:calc(100vh - 44px);
    z-index: 999;
  }
  .default_iframe {
    position: absolute;
    top: 0;
    width: 100%;
    height:calc(100vh);
    z-index: 999;
  }
</style>
