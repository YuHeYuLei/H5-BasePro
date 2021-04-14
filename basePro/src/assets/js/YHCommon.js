import mui from './mui'
import axios from 'axios'
import utils from './utils'
import CryptoJS from 'crypto-js'
import Clipboard from 'clipboard'
import { Toast } from 'vant'

export default {
  scrollToTop (app, element, speed) {
    if (element) {
      setTimeout(function () {
        if (element && element.scrollTop > 0) {
          app.$store.state.intervalArr[0] = setInterval(function () {
            if (element && element.scrollTop > 0) {
              element.scrollTop = element.scrollTop - 100
            } else {
              clearInterval(app.$store.state.intervalArr[0])
            }
          }, speed)
        }
      }, 0)
    }
  },
  autoScroll(app, element, elementCell, speed, delay) {
    let step = 1
    if (element && elementCell) {
      setTimeout(function () {
        let stepLength = elementCell.offsetHeight
        function start () {
          clearInterval(app.$store.state.intervalArr[1])
          if (element && elementCell) {
            app.$store.state.intervalArr[1] = setInterval(function () {
              if (element.scrollTop % stepLength !== 0 && element.scrollTop !== (element.scrollHeight - element.offsetHeight)) {
                element.scrollTop += step
              } else {
                if (element.scrollTop === 0 || element.scrollTop === (element.scrollHeight - element.offsetHeight)) { // 触顶或触底
                  step *= -1
                }
                setTimeout(start, delay)
              }
            }, speed)
            element.scrollTop += step
          }
        }
        setTimeout(start, delay)
      }, 0)
    }
  },
  createIndexDB (databaseName, version, onsuccess, onupgradeneeded) {
    let YHCommon = this
    return new Promise(function (resolve) {
      let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || null
      if (indexedDB) {
        console.log('支持IndexDB')
      } else {
        Toast('不支持IndexDB')
        resolve()
      }
      // 新建、打开、更新数据库
      // databaseName不存在时自动新建 触发 onsuccess
      // databaseName存在时打开 触发 onsuccess
      // version比上一次大时自动更新 触发 onupgradeneeded
      // 异步操作，会立刻返回一个 IDBOpenDBRequest 对象。
      let request = indexedDB.open(databaseName, version)
      // request.readyState 可判断数据库当前状态 pending 表示操作正在进行 done 表示操作已完成
      let db = {
        request: request,
        result: null // 数据库实例
      }
      request.onerror = function (event) {
        console.log('数据库打开报错', request.error)
        resolve()
      }
      request.onsuccess = onsuccess || function (event) {
        // result 具有以下属性
        // name 数据库名称
        // version 版本
        // objectStoreNames 包含当前数据的所有 object store 的名字
        // onabort 指定 abort 事件（事务中止）的监听函数
        // onclose 指定 close 事件（数据库意外关闭）的监听函数
        // onerror 指定 error 事件（访问数据库失败）的监听函数
        // onversionchange 数据库版本变化时触发（发生upgradeneeded事件，或调用indexedDB.deleteDatabase()
        db.result = request.result
        request.result.onversionchange = function (e) {
          // 检查到触发更新时关闭上一次连接
          YHCommon.DBclose(db)
        }
        console.log('数据库打开成功')
        resolve(db)
      }
      request.onupgradeneeded = onupgradeneeded || function (event) {
        db.result = event.target.result
        console.log('数据库升级成功')
        resolve()
      }
      request.onblocked = function (event) {
        Toast('上次连接尚未关闭')
        resolve()
      }
    })
  },
  getIndexDBVersion (databaseName) {
    let YHCommon = this
    return new Promise(function (resolve) {
      let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || null
      if (indexedDB) {
        console.log('支持IndexDB')
      } else {
        Toast('不支持IndexDB')
        resolve()
      }
      // 新建、打开、更新数据库
      // databaseName不存在时自动新建 触发 onsuccess
      // databaseName存在时打开 触发 onsuccess
      // version比上一次大时自动更新 触发 onupgradeneeded
      // 异步操作，会立刻返回一个 IDBOpenDBRequest 对象。
      let request = indexedDB.open(databaseName)
      let db = {
        request: request,
        result: null // 数据库实例
      }
      request.onerror = function (event) {
        console.log('数据库打开报错', request.error)
        resolve()
      }
      request.onsuccess = function (event) {
        // result 具有以下属性
        // name 数据库名称
        // version 版本
        // objectStoreNames 包含当前数据的所有 object store 的名字
        // onabort 指定 abort 事件（事务中止）的监听函数
        // onclose 指定 close 事件（数据库意外关闭）的监听函数
        // onerror 指定 error 事件（访问数据库失败）的监听函数
        // onversionchange 数据库版本变化时触发（发生upgradeneeded事件，或调用indexedDB.deleteDatabase()
        db.result = request.result
        request.result.onversionchange = function (e) {
          // 检查到触发更新时关闭上一次连接
          YHCommon.DBclose(db)
        }
        console.log('数据库打开成功')
        resolve(request.result.version)
      }
      request.onupgradeneeded = function (event) {
        db.result = event.target.result
        console.log('数据库升级成功')
        resolve()
      }
      request.onblocked = function (event) {
        Toast('上次连接尚未关闭')
        resolve()
      }
    })
  },
  deleteDatabase(databaseName) {
    let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || null
    if (indexedDB) {
      console.log('支持IndexDB')
    } else {
      Toast('不支持IndexDB')
      return
    }
    // 删除数据库 会自动触发versionchange
    var DBDeleteRequest = indexedDB.deleteDatabase(databaseName)
    DBDeleteRequest.onerror = function (event) {
      console.log('deleteDatabase Error')
    }
    DBDeleteRequest.onsuccess = function (event) {
      console.log('deleteDatabase success')
    }
  },
  createObjectStore (db, listName, keyPath) {
    // 创建表 要求 在upgradeneeded事件的回调中调用
    // listName 表名
    // keyPath 主键
    var ObjectStore
    if (!db.objectStoreNames.contains(listName)) {
      if (keyPath) {
        ObjectStore = db.result.createObjectStore(listName, { keyPath: keyPath })
      } else {
        ObjectStore = db.result.createObjectStore(listName, { autoIncrement: true })
      }
    }
    return ObjectStore
  },
  createObjectStoreIndex (ObjectStore, name, attribute, unique) {
    // 创建表索引
    // name 索引名称
    // keyPath 索引所在的属性
    // 配置对象（说明该属性是否包含重复的值） 创建索引时是否允许相同的主键
    ObjectStore.createIndex(name, attribute, { unique: unique || false })
    return ObjectStore
  },
  addObjectStore (db, listName, JsonData, onsuccess, onerror) {
    // 写入一条记录
    // 事务的执行顺序是按照创建的顺序，而不是发出请求的顺序
    // listName 表名
    // JsonData {}
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    var request = db.result.transaction([listName], 'readwrite')
      .objectStore(listName)
      .add(JsonData)

    request.onsuccess = onsuccess || function (event) {
      console.log('数据写入成功')
    }
    request.onerror = onerror || function (event) {
      console.log('数据写入失败')
    }
    return request
  },
  readObjectStore(db, listName, attribute, onsuccess, onerror) {
    // 读取数据
    // listName 表名
    // attribute 主键值
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    return new Promise(function (resolve) {
      var request = db.result.transaction([listName], 'readwrite')
        .objectStore(listName)
        .get(attribute)
      request.onsuccess = onsuccess || function (event) {
        let db = event.target.result
        console.log('数据读取成功')
        resolve(db)
      }
      request.onerror = onerror || function (event) {
        console.log('数据读取失败')
        resolve()
      }
    })
  },
  searchKeyPath(db, listName, keys) {
    // 寻找keys对应的主键名
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    return new Promise(function (resolve) {
      var request = db.result.transaction([listName], 'readwrite')
        .objectStore(listName)
        .getKey(keys)
      request.onsuccess = function (event) {
        console.log(request.source)
        resolve(request.source)
      }
    })
  },
  objectStoreGetAll(db, listName, query, count, onsuccess, onerror) {
    // query
    // All keys ≤ x  IDBKeyRange.upperBound(x);
    // All keys < x  IDBKeyRange.upperBound(x, true);
    // All keys ≥ y  IDBKeyRange.lowerBound(y);
    // All keys > y  IDBKeyRange.lowerBound(y, true);
    // All keys ≥ x && ≤ y  IDBKeyRange.bound(x, y);
    // All keys > x &&< y   IDBKeyRange.bound(x, y, true, true);
    // All keys > x && ≤ y  IDBKeyRange.bound(x, y, true, false);
    // All keys ≥ x &&< y   IDBKeyRange.bound(x, y, false, true);
    // The key = z          IDBKeyRange.only(z);
    // 读取所有符合指定内容的数据 count限制返回数量
    // listName 表名
    // query 查询语句
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    return new Promise(function (resolve) {
      var request = db.result.transaction([listName], 'readonly')
        .objectStore(listName)
        .getAll(query, count)
      request.onsuccess = onsuccess || function (event) {
        console.log('数据读取成功')
        resolve(request)
      }
      request.onerror = onerror || function (event) {
        console.log('数据读取失败')
      }
    })
  },
  serachIndex(db, listName, indexName, indexValue) {
    // 假设创建了索引 indexName 在listName中寻找索引中的值 indexValue 减少性能消耗
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    return new Promise(function (resolve) {
      var transaction = db.result.transaction([listName], 'readonly')
      var store = transaction.objectStore(listName)
      var index = store.index(indexName) // 返回所有符合指定的索引对象
      var request = index.get(indexValue) // 可能取回多个数据对象
      request.onsuccess = function (e) {
        var result = e.target.result
        resolve(result)
      }
    })
  },
  upDateObjectStore (db, listName, JsonData, onsuccess, onerror, keyPath) {
    // 修改/更新表 自动递增型需要传入主键
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    return new Promise(function (resolve) {
      var request = db.result.transaction([listName], 'readwrite')
        .objectStore(listName)
        .put(JsonData, keyPath)
      request.onsuccess = onsuccess || function (event) {
        console.log('数据更新成功')
        resolve(request)
      }
      request.onerror = onerror || function (event) {
        console.log('数据更新失败')
      }
    })
  },
  removeObjectStore(db, listName, keyPathValue) {
    // 删除表数据
    // keyPathValue 主键值
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    return new Promise(function (resolve) {
      var request = db.result.transaction([listName], 'readwrite')
      .objectStore(listName)
      .delete(keyPathValue)
      request.onsuccess = function (event) {
        console.log('数据删除成功')
        resolve(request)
      }
    })
  },
  removeAllObjectStore(db, listName) {
    // 删除表所有数据
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    return new Promise(function (resolve) {
      var request = db.result.transaction([listName], 'readwrite')
        .objectStore(listName)
        .clear()
      request.onsuccess = function (event) {
        console.log('数据删除成功')
        resolve(request)
      }
    })
  },
  countObjectStore(db, listName, keys) {
    // 计算所有对应的记录数量
    if (!db.result.objectStoreNames.contains(listName)) {
      db.result.createObjectStore(listName)
    }
    var request = db.result.transaction([listName], 'readwrite')
      .objectStore(listName)
      .count(keys)

    request.onsuccess = function (event) {
      console.log('计算值')
      console.log(request.result)
    }
    return request
  },
  DBclose(db) {
    // 会等待所有事务完成后关闭 用完记得关
    db.result.close()
  },
  deleteObjectStore(db, listName) {
    // 删除指定表
    db.deleteObjectStore(listName)
    console.log('已删除')
  },
  copy (copyStyle, msg) {
    let clipboard = new Clipboard(copyStyle, {
      text: function() {
        Toast('[' + msg + '] 已复制到剪切板')
        return msg
      }
    })
    clipboard.on('success', function(e) {
      console.log(e)
    })
    clipboard.on('error', function(e) {
      console.log(e)
    })
  },
  // AES加密
  getAesString (data, key, iv) {
    let _key = CryptoJS.enc.Utf8.parse(key)
    let _iv = CryptoJS.enc.Utf8.parse(iv)
    let encrypted = CryptoJS.AES.encrypt(data, _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString() // 返回的是base64格式的密文
  },
  // AES解密
  getDAesString (encrypted, key, iv) {
    let _key = CryptoJS.enc.Utf8.parse(key)
    let _iv = CryptoJS.enc.Utf8.parse(iv)
    let base64 = CryptoJS.enc.Hex.parse(encrypted)
    let src = CryptoJS.enc.Base64.stringify(base64)
    let decrypted = CryptoJS.AES.decrypt(src, _key, {
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  },
  getAES (data) { // 加密
    var key = 'abcdefghijklmnopqrstuvwsxzABCDEF' // 密钥 Pkcs7 则需要16位 不足16位的话可能会被库自动补齐
    var iv = 'abcdefghijklmnop'
    var encrypted = this.getAesString(data, key, iv) // 密文
    // var encrypted1 = CryptoJS.enc.Utf8.parse(encrypted)
    return encrypted
  },
  getDAes (data) { // 解密
    var key = 'abcdefghijklmnopqrstuvwsxzABCDEF' // 密钥
    var iv = 'abcdefghijklmnop'
    var decryptedStr = this.getDAesString(data, key, iv)
    return decryptedStr
  },
  // 所有请求总入口 用于统一调整请求
  HttpRequest: function (conf) {
    // 可在此处统一处理conf
   // conf = {
   //   method: 'get',
   //   url: 'https://www.baidu.com',
   //   headers: {},
   //   data: {},
   //   timeout: 1000,
   //  }
    return axios(conf)
  },
  mul(arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
      m = 0
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
      m = m || 0
    }
    return ((Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m))
  },
  div(arg1, arg2) { // 精准除法
    let YHCommon = this
    let t1 = 0
    let t2 = 0
    try {
      t1 = arg1.toString().split('.')[1].length
    } catch (e) {
      t1 = 0
    }
    try {
      t2 = arg2.toString().split('.')[1].length
    } catch (e) {
      t2 = 0
    }
    let r1 = Number(arg1.toString().replace('.', ''))
    let r2 = Number(arg2.toString().replace('.', ''))
    return YHCommon.mul(r1 / r2, Math.pow(10, t2 - t1))
  },
  objToSoapxml: function (obj) {
    let YHCommon = this
    if (!Object.prototype.hasOwnProperty.call(obj, 'servername') || !Object.prototype.hasOwnProperty.call(obj, 'params')) {
      throw new Error('缺少参数')
    }
    let encode = Object.prototype.hasOwnProperty.call(obj, 'encode') ? obj.encode : true
    let xmlns = Object.prototype.hasOwnProperty.call(obj, 'xmlns') ? obj.xmlns : 'http://tempuri.org/'
    return '<?xml version=\"1.0\" encoding=\"utf-8\"?>' +
      '<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">' +
      '<soap:Body>' +
      '<' + obj.servername + ' xmlns="' + xmlns + '">' +
      YHCommon.objToXml(obj.params, encode) +
      '</' + obj.servername + '>' +
      '</soap:Body>' +
      '</soap:Envelope>'
  },
  objToXml: function (obj, encode) {
    let result = ''
    let YHCommon = this
    encode = encode === undefined ? true : encode
    mui.each(obj, function (key, value) {
      result += '<' + key + '>'
      // TO DO 未判断数组
      if (typeof value === 'string') {
        if (encode) {
          result += value.replace(/&/g, '&amp;').replace(/</g, '&amp;lt;').replace(/>/g, '&amp;gt;')
        } else {
          result += value.replace(/&/g, '&amp;')
        }
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        result += value
      } else if (mui.isObject(value)) {
        result += YHCommon.objToXml(value)
      }
      result += '</' + key + '>'
    })
    return result
  },
  stringToXml: function (data) {
    if (typeof data != 'string' || !data) {
      return null
    }
    let result
    try {
      result = new DOMParser().parseFromString(data, 'text/xml')
    } catch (e) {
      // console.log('string转换xml异常!')
      result = null
    }
    return result
  },
  xmlToString: function (data) {
    if (!data) {
      return null
    }
    let result
    try {
      result = (new XMLSerializer()).serializeToString(data)
    } catch (e) {
      // console.log('xml转换string异常!')
      result = null
    }
    return result
  },
  // EPMS定制xml转JSON
  // EPMS_xmlDataToJSON: function (data) {
  //   let xmldom = this.stringToXml(data)
  //   let AppActionResult = xmldom.getElementsByTagName('AppActionResult')[0].textContent
  //   // console.log(AppActionResult)
  //   return JSON.parse(AppActionResult)
  // },
  getConf: function (param) {
    // console.log(store.state.setting.isDingTalk)
    if (localStorage.getItem('Config')) {
      let _conf = utils.demoResponse(localStorage.getItem('Config'))
      let Config = JSON.parse(_conf)
      return Config[param]
    }
  },
  updateConf: function (param, value) {
    if (localStorage.getItem('Config')) {
      let _conf = utils.demoResponse(localStorage.getItem('Config'))
      let Config = JSON.parse(_conf)
      Config[param] = value
      _conf = utils.demoRequest(JSON.stringify(Config))
      localStorage.setItem('Config', _conf)
      // console.log('updateConf Done')
      // console.log(Config)
    }
  },
  getbaseData: function (param) {
    if (localStorage.getItem('baseData')) {
      let baseData = JSON.parse(localStorage.getItem('baseData'))
      return baseData[param]
    }
  },
  updatebaseData: function (param, value) {
    if (localStorage.getItem('baseData')) {
      let baseData = JSON.parse(localStorage.getItem('baseData'))
      baseData[param] = value
      localStorage.setItem('baseData', JSON.stringify(baseData))
    } else {
      let baseData = {}
      baseData[param] = value
      localStorage.setItem('baseData', JSON.stringify(baseData))
    }
  },
  clearbaseData: function (param, value) {
    if (localStorage.getItem('baseData')) {
      localStorage.setItem('baseData', '{}')
    }
  },
  cgnWaittingShow () {
    document.querySelector('.waitting_mask').classList = 'waitting_mask'
  },
  cgnWaittingHidden () {
    document.querySelector('.waitting_mask').classList = 'waitting_mask mui-hidden'
  },
  cgnStaticShow (isSelf) {
    if (isSelf) {
      document.querySelector('.static_mask_self').classList = 'static_mask_self'
    } else {
      document.querySelector('.static_mask').classList = 'static_mask'
    }
  },
  cgnStaticHidden (isSelf) {
    if (isSelf) {
      document.querySelector('.static_mask_self').classList = 'static_mask_self mui-hidden'
    } else {
      document.querySelector('.static_mask').classList = 'static_mask mui-hidden'
    }
  },
  cgnLoaddingShow () {
    document.querySelector('.loadding').classList = 'loadding'
  },
  cgnLoaddingHidden () {
    document.querySelector('.loadding').classList = 'loadding mui-hidden'
  },
  cgnLoaddingT1Show () {
    document.querySelector('.loaddingT1').classList = 'loaddingT1'
  },
  cgnLoaddingT1Hidden () {
    document.querySelector('.loaddingT1').classList = 'loaddingT1 mui-hidden'
  },
  cgnLoaddingT2Show () {
    document.querySelector('.loaddingT2').classList = 'loaddingT2'
  },
  cgnLoaddingT2Hidden () {
    document.querySelector('.loaddingT2').classList = 'loaddingT2 mui-hidden'
  },
  cgnLoaddingT3Show () {
    document.querySelector('.loaddingT3').classList = 'loaddingT3'
  },
  cgnLoaddingT3Hidden () {
    document.querySelector('.loaddingT3').classList = 'loaddingT3 mui-hidden'
  },
  scaleToWindow (canvas, backgroundColor) {
    var scaleX, scaleY, scale, center
    scaleX = window.innerWidth / canvas.offsetWidth
    scaleY = window.innerHeight / canvas.offsetHeight

    // Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
    scale = Math.min(scaleX, scaleY)
    canvas.style.transformOrigin = '0 0'
    canvas.style.transform = 'scale(' + scale + ')'

    // 2. Center the canvas.
    // Decide whether to center the canvas vertically or horizontally.
    // Wide canvases should be centered vertically, and
    // square or tall canvases should be centered horizontally
    if (canvas.offsetWidth > canvas.offsetHeight) {
      if (canvas.offsetWidth * scale < window.innerWidth) {
        center = 'horizontally'
      } else {
        center = 'vertically'
      }
    } else {
      if (canvas.offsetHeight * scale < window.innerHeight) {
        center = 'vertically'
      } else {
        center = 'horizontally'
      }
    }

    // Center horizontally (for square or tall canvases)
    var margin
    if (center === 'horizontally') {
      margin = (window.innerWidth - canvas.offsetWidth * scale) / 2
      canvas.style.marginTop = 0 + 'px'
      canvas.style.marginBottom = 0 + 'px'
      canvas.style.marginLeft = margin + 'px'
      canvas.style.marginRight = margin + 'px'
    }

    // Center vertically (for wide canvases)
    if (center === 'vertically') {
      margin = (window.innerHeight - canvas.offsetHeight * scale) / 2
      canvas.style.marginTop = margin + 'px'
      canvas.style.marginBottom = margin + 'px'
      canvas.style.marginLeft = 0 + 'px'
      canvas.style.marginRight = 0 + 'px'
    }

    // 3. Remove any padding from the canvas  and body and set the canvas
    // display style to "block"
    canvas.style.paddingLeft = 0 + 'px'
    canvas.style.paddingRight = 0 + 'px'
    canvas.style.paddingTop = 0 + 'px'
    canvas.style.paddingBottom = 0 + 'px'
    canvas.style.display = 'block'

    // 4. Set the color of the HTML body background
    document.body.style.backgroundColor = backgroundColor

    // Fix some quirkiness in scaling for Safari
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        // Chrome
      } else {
        // Safari
        // canvas.style.maxHeight = "100%";
        // canvas.style.minHeight = "100%";
      }
    }

    // 5. Return the `scale` value. This is important, because you'll nee this value
    // for correct hit testing between the pointer and sprites
    return scale
  },
  hitTestRectangle(r1, r2) {
    // Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy

    // hit will determine whether there's a collision
    hit = false

    // Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2
    r1.centerY = r1.y + r1.height / 2
    r2.centerX = r2.x + r2.width / 2
    r2.centerY = r2.y + r2.height / 2

    // Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2
    r1.halfHeight = r1.height / 2
    r2.halfWidth = r2.width / 2
    r2.halfHeight = r2.height / 2

    // Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX
    vy = r1.centerY - r2.centerY

    // Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth
    combinedHalfHeights = r1.halfHeight + r2.halfHeight

    // Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      // A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        // There's definitely a collision happening
        hit = true
      } else {
        // There's no collision on the y axis
        hit = false
      }
    } else {
      // There's no collision on the x axis
      hit = false
    }
    // `hit` will be either `true` or `false`
    return hit
  },
  getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2].replace(/%20/g, '+'))
    return null
  }
}
