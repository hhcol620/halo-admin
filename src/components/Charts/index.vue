<template>
  <div>
    <!-- 这是组件 -->
    <figure class="highcharts-figure">
      <div id="container"></div>
    </figure>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json', function (
      data
    ) {
      Highcharts.chart('container', {
        chart: {
          zoomType: 'x',
        },
        title: {
          text: '阅读增量曲线分析',
        },
        subtitle: {
          text:
            document.ontouchstart === undefined
              ? 'Click and drag in the plot area to zoom in'
              : 'Pinch the chart to zoom in',
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          title: {
            text: '阅读人次',
          },
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
              ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },

        series: [
          {
            type: 'area',
            name: 'USD to EUR',
            data: data,
          },
        ],
      })
    })
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
