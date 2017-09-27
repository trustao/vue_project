<template>
  <div class="wrap">
    <v-nav></v-nav>
    <h1>demo</h1>
    <div class="charts">
      <div v-for="chart in charts" class="chart-item">
        <pie :chartData="chart.data" :color="chart.color"></pie>
      </div>
    </div>
    <div id="loading" v-if="loading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
  import utils from '../../utils/http'
  import Pie from '../../components/PieChart'
  import Nav from '../../components/Nav'
  export default {
    data () {
      return {
        charts: [
          {
            data: {
              legend: [],
              data: []
            },
            color: ['#ff9f75', '#ffb535', '#ffe5bb']
          },
          {
            data: {
              legend: [],
              data: []
            },
            color: ['#599bff', '#1cb7f1', '#baddff']
          }
        ],
        loading: true
      }
    },
    components: {
      pie: Pie,
      'v-nav': Nav
    },
    methods: {
      getData () {
        utils.get('/ad/json_ad_plan_data?param={%22start_date%22:%222017-09-20%2000:00:00%22,%22end_date%22:%222017-09-27%2023:59:59%22}')
          .then((d) => {
            console.log(d)
            this.loading = false
            const data = []
            const legend = []
            d.data.data.result.info.forEach((v) => {
              data.push({
                name: v.date,
                value: v.total_click
              })
              legend.push(v.date)
            })
            this.charts.forEach((item) => {
              item.data.data = data
              item.data.legend = legend
            })
          })
            .catch((err) => {
              console.log(err)
            })
      }
    },
    created () {
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/mixin.less";
  .wrap{
    width: 100%;
    height: 500px;
    h1{
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      color: lightgreen;
    }
    .charts{
      width: 100%;
      height: 450px;
      display: flex;
      flex-direction: column;
      .chart-item{
        flex:1;
        background: #f2f2f2;
      }
    }
    #loading {
      position: absolute;
      top: 47%;
      left: 45%;
      width: 40px;
      height: 40px;
      .bg-image(loading);
      .loader {
        position: relative;
        top: 34px;
        width: 15px;
        height: 15px;
        border: 6px solid #f9e9e9;
        border-top-color: #c42828;
        border-radius: 50%;
        animation: loader-rotate 1s linear infinite;
        margin: -28px auto 0 auto;
      }
    }
  }
  @keyframes loader-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
