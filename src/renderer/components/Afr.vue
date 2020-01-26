<template>
  <el-container id="afr" class="bg-techno full-screen">
      <el-header>AFR page</el-header>
      <el-main>
        <apexchart ref="chart" width="500" :options="options" :series="series"></apexchart>
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
        }]
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
</style>
