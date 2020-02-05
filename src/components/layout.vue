<template>
    <div>
        <app-header></app-header>
        <app-navbar></app-navbar>
        <app-main></app-main>
    </div>
</template>


<script>
  import AppHeader from './AppHeader'
  import AppNavbar from './AppNavbar'
  import AppMain from './AppMain'
  export default {
    components: {AppHeader, AppNavbar, AppMain}
  }
</script>

<style scoped>
    .header {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        line-height: 50px;
        background: #2d3a4b;
    }
    .navbar {
        position: absolute;
        top: 50px;
        left: 0px;
        bottom: 0px;
        width: 230px;
        overflow-y: auto;
        background: #545c64;
    }
    .main {
        position: absolute;
        top: 50px;
        left: 230px;
        bottom: 0px;
        right: 0px;
        padding: 10px;
        overflow-y: auto;
    }
</style>