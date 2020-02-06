<template>
    <div class="main">
        
        <app-link></app-link>
        <router-view></router-view>
    </div>
</template>
<script>
import AppLink from './line'
export default {
    components:{
        AppLink
    }
}
</script>
