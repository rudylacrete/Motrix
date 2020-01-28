<template>
  <div></div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'mo-obd-loading',
    data () {
      return {
        background: 'rgba(0, 0, 0, 0.9)'
      }
    },
    mounted () {
      // create a factory where the context is static thanks to es6 context binding
      this.loaderFactory = () => this.$loading({
        text: this.loadingText,
        background: this.background,
        fullscreen: true
      })
      // create loader when component is mounted if required
      if (!this.obdConnected) this.loader = this.loaderFactory()
    },
    computed: {
      loadingText () {
        return this.$t('app.obd-loading')
      },
      ...mapState('obd', {
        obdConnected: state => state.connected
      })
    },
    watch: {
      obdConnected (val, oldVal) {
        console.log(`Obd status changed: ${val}`)
        if (val) {
          this.$nextTick(() => { // Loading should be closed asynchronously
            this.loader.close()
            this.loader = null
          })
        } else {
          // create a loader (will be showed automatically)
          this.loader = this.loaderFactory()
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
