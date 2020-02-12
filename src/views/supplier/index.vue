<template>
    <div>
<!--        搜索条件-->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="供应商名称"></el-input>
            </el-form-item>
            <el-form-item prop="linkman">
                <el-input v-model="searchMap.linkman" placeholder="联系人"></el-input>
            </el-form-item>
            <el-form-item prop="moblie">
                <el-input v-model="searchMap.moblie" placeholder="手机号"></el-input>
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
            <el-table-column prop="name" width="150" label="供应商名称"></el-table-column>
            <el-table-column prop="linkman" width="80" label="联系人"></el-table-column>
            <el-table-column prop="mobile" width="130" label="手机号码"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
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
        <el-dialog title="供应商编辑" :visible.sync="dialogFormVisible" style="width:950px">
            <el-form
                    :model="pojo"
                    label-width="100px"
                    style="width: 400px"
                    :rules="rules"
                    ref="addForm">
                <el-form-item label="供应商名称" prop="name">
                    <el-input v-model="pojo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman">
                    <el-input v-model="pojo.linkman" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="pojo.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="pojo.remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>

  import supplierApi from '@/api/supplier'
  export default {
    data(){
      return {
        list: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: true,
        searchMap: {
          name: '',
          linkman: '',
          mobile: ''
        },
        pojo: {
          id: null,
          name: '',
          linkman: '',
          mobile: '',
          remark: ''
        },
        dialogFormVisible: false,
        rules:{
          name:[{required: true, message: '名称不能为空', trigger: 'blur'}],
          linkman:[{required: true, message: '联系人不能为空', trigger: 'blur'}],
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.loading = true
        supplierApi.searchList(this.currentPage, this.pageSize,this.searchMap).then(response => {
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
      add(){
        supplierApi.add(this.pojo).then(response => {
          console.log(response.data)
          const resp = response.data
          if (resp.flag){
            this.dialogFormVisible = false
            this.fetchData()
          }
        })
      },
      //编辑
      handleEdit(id){
        handleAdd()
        supplierApi.getById(id).then(response => {
          const resp = response.data
          console.log(resp)
          if(resp.flag){
            this.pojo = resp.data
          }
        })
      },
      //删除
      handleDelete(id){

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