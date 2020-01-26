<template>
  <div id="app">
    <mo-title-bar
      v-if="isRenderer()"
      :showActions="showWindowActions"
    />
    <router-view />
  </div>
</template>

<script>
  import is from 'electron-is'
  import TitleBar from '@/components/Native/TitleBar'
  import { mapState } from 'vuex'
  import { getLangDirection } from '@shared/utils'

  export default {
    name: 'Motrix',
    components: {
      [TitleBar.name]: TitleBar
    },
    computed: {
      ...mapState('app', {
        systemTheme: state => state.systemTheme
      }),
      ...mapState('preference', {
        showWindowActions: state => {
          return (is.windows() || is.linux()) && state.config.hideAppMenu
        },
        rpcSecret: state => state.config.rpcSecret,
        theme: state => state.config.theme,
        locale: state => state.config.locale,
        dir: state => getLangDirection(state.config.locale)
      }),
      themeClass: function () {
        if (this.theme === 'auto') {
          return `theme-${this.systemTheme}`
        } else {
          return `theme-${this.theme}`
        }
      },
      i18nClass: function () {
        return `i18n-${this.locale}`
      },
      dirClass: function () {
        return `dir-${this.dir}`
      }
    },
    methods: {
      isRenderer: is.renderer,
      updateRootClassName: function () {
        const { themeClass = '', i18nClass = '', dirClass = '' } = this
        const className = `${themeClass} ${i18nClass} ${dirClass}`
        document.documentElement.className = className
      }
    },
    beforeMount: function () {
      this.updateRootClassName()
    },
    mounted () {
      // hide cursor
      document.body.style.cursor = 'none'
    },
    watch: {
      themeClass: function (val, oldVal) {
        this.updateRootClassName()
      },
      i18nClass: function (val, oldVal) {
        this.updateRootClassName()
      },
      dirClass: function (val, oldVal) {
        this.updateRootClassName()
      }
    }
  }
</script>

<style>
</style>
