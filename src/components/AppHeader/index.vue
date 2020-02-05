<template>
    <div class="header">
        <a href="/">
            <img class="logo" src="@/assets/logo.png" width="25px">
            <span class="company">会员管理系统</span>
        </a>
        <el-dropdown class="el-dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
    export default {
      methods: {
        handleCommand(command){
            this.$message(`点击了${command}`)
        }
      }
    }
</script>
<style scoped>
    .logo {
        vertical-align: middle;
        padding: 0px 10px 0px 20px;
    }
    .company {
        color: white;
        position: absolute;
    }
    .el-dropdown {
        float: right;
        margin-right: 30px;
    }
    .el-dropdown-link {
        color: white;
    }
</style>
