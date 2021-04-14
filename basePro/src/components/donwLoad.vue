<template>
  <div>
    <div class="title">附件下载指引</div>
    <div ref='copy' data-clipboard-action='copy' data-clipboard-target='#urlsinput' class="links" @click="copyMsg">
      如果无法正常打开文件，点击此处后在外部浏览器上打开
    </div>
    <div style="display: none;">
      <a href="" id="files" download="">如无反应，复制下方连接在外部浏览器打开</a>
    </div>
    <div class="removeOut">
      <input id="urlsinput" type='text' v-model='url'/>
    </div>
  </div>
</template>

<script>
  import '../assets/css/animate.css'
  import { Toast } from 'vant'

  export default {
    name: 'donwLoad',
    data () {
      return {
        url: '',
        clipboardBtn: null
      }
    },
    mounted () {
      let app = this
      console.log('donwLoad')
      app.clipboardBtn = new app.Clipboard(app.$refs.copy)
    },
    methods: {
      returnIndex () {
        this.forwardPassData('returnIndex')
      },
      copyMsg () {
        let app = this
        let clipboard = app.clipboardBtn
        console.log(clipboard)
        clipboard.on('success', function (e) {
          console.log(e)
          Toast('复制成功')
        })
        clipboard.on('erroe', function (e) {
          console.log(e)
          Toast('复制失败')
        })
        let msg = document.getElementById('urlsinput')
        console.log(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          window.getSelection().removeAllRanges()
          let range = document.createRange()
          range.selectNode(msg)
          window.getSelection().addRange(range)
          document.execCommand('copy')
          window.getSelection().removeAllRanges()
        } else {
          msg.select()
          document.execCommand('copy')
        }
      },
      donwloadFile (donwloadUrl) {
        let app = this
        let dd = app.dd
        // var aimUrl = 'https://newmobileapptest.cgnpc.com.cn/apphost/EPMSViewFile/'
        // if (location.href.indexOf('test') !== -1 || location.href.indexOf('local') !== -1) {
        //     aimUrl = 'https://newmobileapp.cgnpc.com.cn/apphost/EPMSViewFile/'
        // }
        // let url = aimUrl + '9402d049-e48d-4fff-9381-0365f6e40077.pdf'
        let url = donwloadUrl
        // console.log(url)
        app.$set(app, 'url', url)
        // let a = document.getElementById('files')
        // a.href = url
        // a.donwLoad = params.fileName
        // a.click()
        // 检测是钉钉还是智慧中广核
        let browser = app.YHCommon.getConf('browser')
        if (browser.versions.userAgent.indexOf('DingTalk') === -1) {
          console.log('非钉钉环境')
          window.location.href = url
        } else {
          if (browser.versions.userAgent.indexOf('cgntalk') !== -1) {
            // 智慧中广核
            dd._invoke('exclusive.sdk.invoke', {
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
          } else {
            dd.ready(function () {
              dd.biz.util.openLink({
                url: url,
                onSuccess: function (result) {
                  console.log(result)
                },
                onFail: function (err) {
                  console.log(err)
                }
              })
            })
          }
        }
        // let token = JSON.parse(localStorage.getItem('baseConf')).token
        // let fileRealName = params.fileRealName
        // let fileName = params.fileName
        // let newfileRealName = fileRealName.toLocaleLowerCase()
        // let fileTypes = {
        //     'txt': 'data:text/plain;base64,',
        //     'doc': 'data:application/msword;base64,',
        //     'docx': 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,',
        //     'xls': 'data:application/vnd.ms-excel;base64,',
        //     'xlsx': 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
        //     'pdf': 'data:application/pdf;base64,',
        //     'pptx': 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,',
        //     'ppt': 'data:application/vnd.ms-powerpoint;base64,',
        //     'png': 'data:image/png;base64,',
        //     'jpg': 'data:image/jpeg;base64,',
        //     'jpeg': 'data:image/jpeg;base64,',
        //     'gif': ' data:image/gif;base64,',
        //     'svg': 'data:image/svg+xml;base64,',
        //     'ico': 'data:image/x-icon;base64,',
        //     'bmp': 'data:image/bmp;base64,'
        // }
        // let fileType = fileTypes[newfileRealName.split('.')[1]]
        // app.$axios({
        //     url: '/cgn.cnoc.fma.app.fma.downloadFmaFile',
        //     method: 'POST',
        //     data: { fileRealName: fileRealName, fileName: fileName },
        //     headers: {
        //         token: token
        //     },
        //     responseType: 'blob'
        // }).then(data => {
        //     console.log(data)
        //     if (window.navigator.msSaveOrOpenBlob) {
        //         alert('msSaveOrOpenBlob')
        //         navigator.msSaveBlob(data.data, fileRealName)
        //         return
        //     } else {
        //         alert('no msSaveOrOpenBlob')
        //         let files = new window.File([blob], fileRealName, {type: fileType})
        //         let a = document.getElementById('files')
        //         let blob = data.data;
        //         let fileReader = new FileReader()
        //         fileReader.onload = function (e) {
        //             let base64File = e.target.result.split(',')[1]
        //             base64File = fileType + base64File
        //             console.log(base64File)
        //             a.href = base64File
        //             a.innerText = base64File
        //             a.download = fileRealName
        //             a.click()
        //         }
        //        fileReader.readAsDataURL(blob)
        //         window.URL.revokeObjectURL(href)
        //     }
        // }).catch((e) => {
        //     console.log(e)
        // })
        // }, 10)
      },
      forwardPassData (methods, params) { // 父组件的方法
        this.$emit(methods, params)
      }
    }
  }
</script>

<style scoped>
  .trunback {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    padding-left: 15px;
    background: #004a86;
    color: #f9f9f9;
  }

  .title {
    width: 100%;
    height: 66px;
    line-height: 66px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #004a86;
  }

  .links {
    color: #0069AC;
    margin-left: 15px;
    margin-right: 15px;
    width: calc(100% - 30px);
    text-align: center;
  }

  .removeOut {
    position: fixed;
    top: -100px;
    left: 0;
  }
</style>
