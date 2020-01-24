<template>
  <el-container id="menu">
    <el-row class="menu-container">
      <el-col v-for="menu in menuList" :key="menu.name" class="menu-el" :span="6">
        <div class="container">
          <div @click="changePage(menu.route)">{{ menu.label }}</div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
  export default {
    name: 'mo-main',
    data () {
      return {
        menuList: [
          {
            name: 'afr',
            label: 'AFR',
            route: '/afr'
          },
          {
            name: 'turbo',
            label: 'TURBO',
            route: ''
          }
        ]
      }
    },
    components: {
    },
    computed: {
    },
    methods: {
      changePage (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="scss">
  .menu-container {
    width: 100%;
    padding-top: 50px;
  }
  .menu-el .container {
    color: white;
    height: 110px;
    text-align: center;
    background: rgba(57, 65, 71, 0.705);
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
  }

  .menu-el .container div {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 30px;
    margin: auto;
  }
</style>
