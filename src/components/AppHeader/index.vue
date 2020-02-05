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
import {logout} from '@/api/login'

    export default {
      methods: {
        handleCommand(command){
          switch (command) {
            case 'a':
            {
                this.$message('修改密码')
            }
              break;
            case 'b':
              {
                logout().then(response => {
                  const resp = response.data
                  console.log(resp)
                  if (resp.flag){
                    localStorage.removeItem('msm-user')
                    localStorage.removeItem('msm-token')
                    this.$router.push('/login')
                  }else {
                    this.$message('退出登录失败')
                  }
                })
              }
              break;
            }
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
