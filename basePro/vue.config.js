const path = require('path')
// const webpack = require('webpack')
// const JsEncodePlugin = require('./js-encode-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')
// const workboxCdn = require("workbox-cdn")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: './index.html',
  filenameHashing: 'true',
  lintOnSave: true,
  pwa: {
    //配置参见
    // https://blog.csdn.net/qq_33332184/article/details/105172031
    // https://blog.csdn.net/baidu_41770130/article/details/107279809
    // https://blog.csdn.net/baidu_41770130/article/details/107279838
    // https://blog.csdn.net/wangzl1163/article/details/99633770
    // https://segmentfault.com/a/1190000018865112
    name: '雨禾玉雷',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js', // 启用pwa
      // swSrc: 'src/unregisterServiceWorker.js', // 卸载 server worker
      importWorkboxFrom: 'local', // 使用本地资源 不需要引入importScripts
      // importWorkboxFrom: 'disabled', // 使用网络资源
      // importScripts: 'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
      // ...other Workbox options...
    }
  },

  devServer: {
    proxy: {
      '/': {
        target: 'https://newmobileapptest.cgnpc.com.cn',
        ws: true,
        secure: true, // 使用的是http协议则设置为false，https协议则设置为true
        changOrigin: true, //开启代理
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  runtimeCompiler: false,
  productionSourceMap: false,
  transpileDependencies: [],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.js')
      .set('@', path.resolve(__dirname, './src'))
  },
  css: {
    requireModuleExtension: true,
    // extract: true,
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        // options here will be passed to postcss-loader
        plugins: [
          require('postcss-plugin-px2rem')({
              rootValue: 37.5, //换算基数， 默认100  ，可以设置为75这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
              // unitPrecision: 5, //允许REM单位增长到的十进制数字。
              // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
              // propBlackList: [], //黑名单
              exclude: false, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
              // selectorBlackList: [], //要忽略并保留为px的选择器
              // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
              // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
              mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
              minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/style/varibles.less')
      ]
    }
  },
  configureWebpack: config => {
    // require('vux-loader').merge(config, {
    //     options: {},
    //     plugins: ['vux-ui']
    // })
    // console.log(config.plugins)
    let con = {}
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
      con.plugins = [
        // new JsEncodePlugin({ // APP需要静态扫描的时候启用
        //     global: '$',
        //     jsReg: /(^app\..+\.js$)/,
        //     assetsPath: './dist/static/js'
        // }),
        new JavaScriptObfuscator({
          compact: true,//压缩,无换行
          controlFlowFlattening: true,//是否启用控制流扁平化(降低1.5倍的运行速度)
          controlFlowFlatteningThreshold: 0.75,//应用概率;在较大的代码库中，建议降低此值，因为大量的控制流转换可能会增加代码的大小并降低代码的速度。
          deadCodeInjection: false,//随机的死代码块(增加了混淆代码的大小)
          deadCodeInjectionThreshold: 0.4,//死代码块的影响概率
          debugProtection: true,//此选项几乎不可能使用开发者工具的控制台选项卡
          debugProtectionInterval: true,//如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
          disableConsoleOutput: false,//通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
          domainLock: [],//锁定混淆的源代码，使其仅在特定域和/或子域上运行。这使得某人只需复制并粘贴您的源代码并在其他地方运行就变得非常困难。
          identifierNamesGenerator: 'hexadecimal',//标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
          identifiersPrefix: 'isYuHeYuLei',//全局标识符添加特定前缀,在混淆同一页面上加载的多个文件时使用此选项。此选项有助于避免这些文件的全局标识符之间发生冲突。为每个文件使用不同的前缀
          inputFileName: '',
          log: false,//允许将信息记录到控制台。
          renameGlobals: false,//是否启用全局变量和函数名称的混淆
          reservedNames: [],//禁用模糊处理和生成标识符
          reservedStrings: [],//禁用字符串文字的转换
          rotateStringArray: true,//通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
          seed: 0,
          selfDefending: false,//混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
          sourceMap: false,
          sourceMapBaseUrl: '',
          sourceMapFileName: '',
          sourceMapMode: 'separate',
          stringArray: false,//删除字符串文字并将它们放在一个特殊的数组中
          stringArrayEncoding: false,//编码的所有字符串文字stringArray使用base64或rc4并插入即用其解码回在运行时的特殊代码。true（boolean）：stringArray使用编码值base64;false（boolean）：不编码stringArray值;'base64'（string）：stringArray使用编码值base64;'rc4'（string）：stringArray使用编码值rc4。大约慢30-50％base64，但更难获得初始值。建议禁用unicodeEscapeSequence带rc4编码的选项以防止非常大的混淆代码。
          stringArrayThreshold: 0.75,//调整字符串文字将插入stringArray的概率
          target: 'browser',//您可以将混淆代码的目标环境设置为以下之一：Browser;Browser No Eval;Node
          transformObjectKeys: false,//是否启用混淆对象键
          unicodeEscapeSequence: false//允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
        }, [])
      ]
    } else {
      // 为开发环境修改配置
      con.plugins = []
    }
    config.resolve.alias.mui = path.resolve(__dirname, 'src/assets/js/mui.js')
    console.log(config.resolve.alias)
    return con
  }
}
