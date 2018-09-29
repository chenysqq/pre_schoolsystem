<template>
  <div id="app">
    <myheader></myheader>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
  data() {  
      return{
        
      }
  },
	created() {  
      this.$router.push({path:'/login'})
  }
}
</script>

<style scoped>
    #app {
      font-family: '微软雅黑';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: left;
      color: #2c3e50;
    }
    a{text-decoration:none}
</style>
