<template>
    <div class="header">
        <a href="/">
            <img class="logo" src="@/assets/logo.png" width="25px">
            <span class="company">会员管理系统</span>
        </a>
        <el-dropdown class="el-dropdown" @command="handleCommand">
            <span class="el-dropdown-link">
                {{user.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
<!--        修改密码弹窗-->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 300px">
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import {logout} from '@/api/login'
import passwordApi from '@/api/password'

    export default {
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            console.log(value)
            callback(new Error('请输入密码'));
          } else {
            console.log('验证密码请求')
            passwordApi.checkPassword(this.user.id,value).then(response => {
              if(response.data.flag){
                //验证通过
                callback();
              }else{
                callback(new Error(response.data.message));
              }
            })
          }
        }
        var validateCheckPass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          dialogFormVisible: false,
          user: this.$store.state.user.user,
          ruleForm: {
            oldPass: '',
            pass: '',
            checkPass: ''
          },
          rules: {
            oldPass: [
              { required: true, message: '请输入旧密码', trigger: 'blur' },
              { validator: validatePass, trigger: 'blur' }
            ],
            pass: [
              { required: true, message: '请输入新密码', trigger: 'blur' }
            ],
            checkPass: [
              { required: true, message: '请再次输入密码', trigger: 'blur' },
              { validator: validateCheckPass, trigger: 'change' }
            ]
          }
        }
      },
      methods: {
        handleCommand(command){
          switch (command) {
            case 'a':
              {
                this.handlePassword()
              }
              break;
            case 'b':
              {
                this.handleLogout()
              }
              break;
            }
        },
        //退出登录
        handleLogout(){
          this.$store.dispatch('Logout').then(response => {
            if (response.flag){
              this.$router.push('/login')
            }else {
              this.$message({
                message: '退出登录失败',
                type: "error"
              })
            }
          })
        },
        //修改密码
        handlePassword(){
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['ruleForm'].resetFields()
          })
        },
        //提交新密码
        submitForm(FormName){
          console.log('修改密码')
          this.$refs[FormName].validate(valid => {
            if (valid){
              console.log('修改密码请求')
              passwordApi.changePassword(this.user.id, this.ruleForm.checkPass).then(response => {
                const resp = response.data
                this.$message({
                  message: resp.message,
                  type: resp.flag ? "success" : "error"
                })
                if (resp.flag){
                  this.dialogFormVisible = false
                  this.handleLogout()
                }
              })
            }else{
              console.log('验证不通过')
              return false
            }
          })
        },
        //重置
        resetForm(formName){
            this.$refs[formName].resetFields()
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
