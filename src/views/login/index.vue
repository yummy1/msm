<template>
    <div class="login-container">
        <el-form class="login-form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">
            <h2 class="login-tittle">会员管理系统</h2>
            <el-form-item label="账号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import {login,getUserInfo} from '@/api/login'
  export default {
    data() {
      return {
        name: "index",
        ruleForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            login(this.name, this.password).then(response => {
              const res = response.data
              console.log(res,res.flag,res.message,res.data.token)
              if (res.flag){
                getUserInfo(res.data.token).then( response => {
                  const user = response.data
                  console.log(user,user.flag,user.message)
                  if (user.flag){
                    localStorage.setItem('msm-token',res.data.token)
                    localStorage.setItem('msm-user',JSON.stringify(user.data))
                    this.$router.push('/')
                  }else{
                    this.$message({
                      message: user.message,
                      type: 'warning'
                    });
                  }
                })
              }else{
                this.$message({
                  message: res.message,
                  type: 'warning'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style>
    .login-form {
        width: 330px;
        margin: 160px auto;
        padding: 40px;
        background: rgba(255,255,255,0.8);
        border-radius: 20px;
    }
    .login-tittle {
        color: black;
        text-align: center;
    }
    .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url("../../assets/loginBG.jpg");
    }
</style>
