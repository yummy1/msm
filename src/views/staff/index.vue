<template>
    <div>
        <!--        搜索条件-->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="username">
                <el-input v-model="searchMap.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
                <el-button type="danger" icon="el-icon-edit" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!--        供应商列表-->
        <el-table
                :data="list"
                border
                height="380"
                v-loading="loading"
                style="width: 100%">
            <el-table-column type="index" width="80" label="序号"></el-table-column>
            <el-table-column prop="username" label="账号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="salary" label="薪酬"></el-table-column>
            <el-table-column prop="entryDate" label="入职时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--        分页-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <!--        新增供应商弹窗-->
        <el-dialog title="员工编辑" :visible.sync="dialogFormVisible" style="width:950px">
            <el-form
                    :model="pojo"
                    label-width="100px"
                    style="width: 400px"
                    :rules="rules"
                    ref="addForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="pojo.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="pojo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="pojo.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="pojo.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="薪酬" prop="salary">
                    <el-input v-model="pojo.salary" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入职时间" prop="entryDate">
                    <el-date-picker
                            v-model="pojo.entryDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="pojo.id === null ? add('addForm') : edit('addForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>

  import staffApi from '@/api/staff'
  export default {
    data(){
      return {
        list: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: true,
        searchMap: {
          username: '',
          name: ''
        },
        pojo: {
          id: null,
          username: '',
          name: '',
          age: null,
          mobile: '',
          salary: null,
          entryDate: null
        },
        dialogFormVisible: false,
        rules:{
          username:[{required: true, message: '账号不能为空', trigger: 'blur'}],
          name:[{required: true, message: '姓名不能为空', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.loading = true
        staffApi.searchList(this.currentPage, this.pageSize,this.searchMap).then(response => {
          const resp = response.data
          this.loading = false
          if(resp.flag){
            this.list = resp.data.rows
            this.total = resp.data.total
          }
        })
      },
      //新增
      handleAdd(){
        this.dialogFormVisible = true
        //$nextTick异步方法
        this.$nextTick(() => {
          this.$refs['addForm'].resetFields()
        })
      },
      add(formName){
        this.$refs[formName].validate(valid => {
          if (valid){
            staffApi.add(this.pojo).then(response => {
              const resp = response.data
              if (resp.flag){
                this.dialogFormVisible = false
                this.fetchData()
              }else{
                this.$message({
                  type: 'warning',
                  message: resp.message
                })
              }
            })
          }else{
            return false
          }
        })
      },
      //编辑
      handleEdit(id){
        this.handleAdd()
        staffApi.getById(id).then(response => {
          const resp = response.data
          if(resp.flag){
            this.pojo = resp.data
          }
        })
      },
      edit(formName){
        this.$refs[formName].validate(valid => {
          if (valid){
            staffApi.edit(this.pojo).then(response => {
              const resp = response.data
              if (resp.flag){
                this.dialogFormVisible = false
                this.fetchData()
              }else{
                this.$message({
                  type: 'warning',
                  message: resp.message
                })
              }
            })
          }else{
            return false
          }
        })
      },
      //删除
      handleDelete(id){
        this.$confirm('您确定要删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          staffApi.delete(id).then(response => {
            const resp = response.data
            if(resp.flag){
              this.fetchData()
            }
            this.$message({
              type: resp.flag ? 'success':'warning',
              message: resp.message
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.fetchData()
      },
      //搜索
      onSubmit(){
        this.fetchData()
      },
      //重置
      resetForm(formName){
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
    .demo-form-inline{
        margin-top: 20px;
    }
</style>