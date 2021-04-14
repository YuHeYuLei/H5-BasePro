<template>
  <div :style="pageData.styleCell.mainStyle" class="modeUse_block EchartsT2_MainDiv">
    <div class="self_header" v-show="$store.state.setting.showHeader">
      <div class="self_header_return" @click="$router.back(-1)"><span
        class="iconfont icon-fanhui2 fontSizeControl_return"></span></div>
      <div class="self_header_title">{{$store.state.setting.headerTitle}}</div>
    </div>
    <div :class="$store.state.setting.showHeader ? 'self_not_header' : ''">
      <div ref="map" style="width: 100%;height:50vh"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'EchartsT2',
    data: function () {
      return {
        pageData: {
          isFrom: 'EchartsT2',
          appConf: {
            route: '',
            deBuge: true,
            browser: {}
          },
          domContorl: {},
          domData: {},
          updateData: {},
          styleCell: {
            mainStyle: {
              width: '100%',
              height: '100vh',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100vh',
              backgroundColor: '#ffffff',
              overflowY: 'scroll'
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
      // refs生命周期在mounted之后
      // https://echarts.apache.org/zh/option.html
      let app = this
      // 创建 echarts 实例。
      let myChart = app.echarts.init(app.$refs.map)
      // 用 option 描述 `数据`、`数据如何映射成图形`、`交互行为` 等。
      // option 是个大的 JavaScript 对象。
      var option = {
        dataset: {
          source: [
            [121, 'XX', 442, 43.11],
            [663, 'ZZ', 311, 91.14],
            [913, 'ZZ', 312, 92.12]
          ]
        },
        // option 每个属性是一类组件。
        legend: {},
        // 直角坐标系底板 默认单位 像素
        grid: {
          left: 100,
          right: 20,
          height: '50%',
          bottom: 100
        },
        // 提示框组件
        tooltip: {},
        // 工具栏组件
        toolbox: {},
        // 数据区缩放组件
        dataZoom: {},
        // 视觉映射组件
        visualMap: {},
        // 极坐标系底板
        // polar: {},
        // 地理坐标系
        // geo: {},
        // 如果有多个同类组件，那么就是个数组。例如这里有三个 X 轴。
        // 直角坐标系 X 轴
        xAxis: [
          // 数组每项表示一个组件实例，用 type 描述“子类型”。
          { type: 'category' },
          { type: 'category' },
          { type: 'value' }
        ],
        // 直角坐标系 Y 轴
        yAxis: [{}, {}],
        // 极坐标系角度轴
        // angleAxis: [],
        // 极坐标系半径轴
        // radiusAxis: [],
        // 这里有多个系列，也是构成一个数组。
        // 每个系列，也有 type 描述“子类型”，即“图表类型”。
        // 数据从 dataset 中取，encode 中的数值是 dataset.source 的维度 index （即第几列）
        // xAxisIndex\yAxisIndex\gridIndex 可指定使用数据
        series: [
          {
            type: 'line',
            data: [['AA', 332], ['CC', 124], ['FF', 412]],
            yAxisIndex: 0,
            xAxisIndex: 0,
            gridIndex: 0
          },
          {
            type: 'line',
            data: [2231, 1234, 552]
          },
          {
            type: 'line',
            data: [[4, 51], [8, 12]]
          }, {
            type: 'bar',
            encode: {
              x: 1,
              y: 0
            }
          },
          {
            type: 'bar',
            encode: {
              x: 1,
              y: 2
            }
          },
          {
            type: 'scatter',
            encode: {
              x: 1,
              y: 3
            }
          }]
      }
      // 调用 setOption 将 option 输入 echarts，然后 echarts 渲染图表。
      myChart.setOption(option)
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
<style src="../assets/style/varibles.less" lang="less" scoped></style>

<style scoped></style>
