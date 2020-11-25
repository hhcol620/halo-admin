<template>
  <div class="container">
    <div class="select-data">
      <a-select default-value="0"
                style="width: 120px"
                @change="handleChange">
        <a-select-option value="0">
          最近一周
        </a-select-option>
        <a-select-option value="1">
          最近一月
        </a-select-option>
        <a-select-option value="2">
          最近三个月
        </a-select-option>
      </a-select>
    </div>
    <!-- 这是图表 -->
    <div id="box"
         :style="{width: '100%', height: '400px',}"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import charts from '@/api/charts.js'
export default {
  data() {
    return {
      // 时间段
      readTimesTrend: {} // 日期对象
    }
  },
  created() {
    this.handleChange(0)
  },
  methods: {
    // 渲染交易金额和增长趋势信息
    async getReadTimesTrend() {
      const transEchart = echarts.init(document.getElementById('box'))
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['交易金额']
        },
        xAxis: [
          {
            type: 'category',
            data: this.readTimesTrend.x.reverse(),
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '浏览量',
            min: 0,
            max: this.readTimesTrend.max,
            interval: this.readTimesTrend.interval,
            axisLabel: {
              formatter: '{value} 次'
            }
          }
        ],
        series: [
          {
            name: '当天浏览量',
            type: 'line',
            data: this.readTimesTrend.y.reverse()
          }
        ]
      }
      transEchart.setOption(option)
    },
    // 时间选择器   这里发起请求
    async handleChange(type) {
      const { data: res } = await charts.request(type)
      if (res.status !== 200) {
        console.log('失败')
      } else {
        this.readTimesTrend = res.data
        // console.log(this.readTimesTrend)
        this.getReadTimesTrend()
      }
    }
  },
}
</script>

<style lang="less" scoped>
#container {
  height: 400px;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>
