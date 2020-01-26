<template>
  <el-container id="afr" class="bg-techno full-screen">
      <el-header>AFR page</el-header>
      <el-main>
        <el-row>
          <el-col :span="16">
            <apexchart ref="chart" class="line-chart" :options="options" :series="series"></apexchart>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main>
                <div class="digit-counter">
                  <h1>CURRENT</h1>
                  <div class="value">{{currentValue}}</div>
                </div>
                <div class="digit-counter">
                  <h1>MIN</h1>
                  <div class="value">{{min}}</div>
                </div>
                <div class="digit-counter">
                  <h1>MAX</h1>
                  <div class="value">{{max}}</div>
                </div>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </el-main>
  </el-container>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

  export default {
    name: 'mo-afr',
    components: {
      apexchart: VueApexCharts
    },
    data: () => {
      return {
        options: {
          chart: {
            id: 'vuechart-example',
            type: 'line',
            toolbar: { show: false },
            animations: { dynamicAnimation: false }
          },
          stroke: {
            curve: 'smooth'
          },
          yaxis: {
            min: 9,
            max: 15
          },
          annotations: { yaxis: [
            {
              y: 14.7,
              borderColor: '#775DD0',
              label: {
                borderColor: '#775DD0',
                style: {
                  color: '#fff',
                  background: '#775DD0'
                },
                text: 'Stochio'
              }
            },
            {
              y: 11,
              y2: 12,
              borderColor: '#000',
              fillColor: '#FEB019',
              opacity: 0.2,
              label: {
                borderColor: '#333',
                style: {
                  fontSize: '10px',
                  color: '#333',
                  background: '#FEB019'
                },
                text: 'Accel range'
              }
            }
          ] }
        },
        series: [{
          name: 'AFR',
          data: [14.7, 11.6, 11.7, 12, 13.6, 11, 14.7, 14.7]
        }],

        min: 0,
        max: 0,
        currentValue: 0
      }
    },
    computed: {
    },
    methods: {
      handleOdbData (_, data) {
        if (data && data.PID === 'AFR' && data.value) {
          // make a copy of the data
          let oldData = this.series[0].data.slice()
          if (oldData.length > 20) oldData = oldData.slice(-19)
          oldData.push(data.value)
          this.currentValue = data.value
          if (this.min === 0 || this.currentValue < this.min) {
            this.min = this.currentValue
          }
          if (this.currentValue > this.max) {
            this.max = this.currentValue
          }
          this.series[0].data = oldData
          this.$refs.chart.updateSeries(this.series)
        }
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('obd:data', this.handleOdbData)
    },
    destroyed () {
      this.$electron.ipcRenderer.off('obd:data', this.handleOdbData)
    }
  }
</script>

<style lang="scss">
  .digit-counter {
    flex-shrink: 0;
  }
  .digit-counter h1 {
    margin: 0;
  }
  .digit-counter .value {
    font-family: 'digit';
    font-size: 500%;
  }
</style>
