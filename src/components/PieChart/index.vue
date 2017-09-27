<template>
  <div style="width: 100%;height: 100%;" ref="chart"></div>
</template>

<script>
  import Echarts from 'echarts'
  export default {
    props: {
      chartData: {
        type: Object
      },
      color: {
        type: Array
      }
    },
    data () {
      return {
        chart: null,
        shadow: false
      }
    },
    computed: {
      options () {
        return {
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/> {d}%'
          },
          grid: {
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
          },
          color: this.color,
          title: {
            text: this.chartData.name,
            textStyle: {
              color: '#959595',
              fontSize: '15',
              fontWeight: 400
            }
          },
          legend: {
            orient: 'vertical',
            right: '4%',
            bottom: '0%',
            textStyle: {
              fontSize: 13,
              color: '#959595'
            },
            itemGap: 5,
            itemWidth: 12,
            itemHeight: 12,
            borderRaduis: 6,
            data: this.chartData.legend
          },
          series: [
            {
              name: '',
              type: 'pie',
              z: 5,
              tooltip: {
                show: false
              },
              hoverAnimation: false,
              radius: ['25%', '70%'],
              center: ['50%', '46%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  backgroundColor: '#f9f9f9',
                  borderColor: '#e6e6e6',
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: [5, 8, 5, 10],
                  formatter: '{d}%',
                  textStyle: {
                    fontSize: 14,
                    color: '#282828'
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 2
//                  shadowColor: 'rgba(0, 0, 0, 0.5)',
//                  shadowBlur: 3
                }
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 15,
                  length2: 10,
                  lineStyle: {
                    color: 'transparent'
                  }
                }
              },
              data: this.chartData.data
            },
            {
              name: '',
              type: 'pie',
              tooltip: {
                show: false
              },
              z: 2,
              hoverAnimation: false,
              radius: ['0%', '72%'],
              center: ['50%', '46%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#fff',
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                  shadowBlur: 3
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [1]
            }
          ]
        }
      }
    },
    watch: {
      options: {
        deep: true,
        handler: function (val) {
          this.chart.setOption(val)
          this.shadow = true
        }
      }
    },
    mounted () {
      this.chart = Echarts.init(this.$refs.chart)
    }
  }
</script>

<style lang="less">

</style>
