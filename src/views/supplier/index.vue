<template>
    <el-table
            :data="list"
            border
            style="width: 100%">
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
        searchMap: {}
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(){
        supplierApi.searchList(this.currentPage, this.pageSize,this.searchMap).then(response => {
          const resp = response.data
          if(resp.flag){
            this.list = resp.data.rows
            this.total = resp.data.total
            console.log(resp)
          }
        })
      },
      //编辑
      handleEdit(id){

      },
      //删除
      handleDelete(id){

      }

    }
  }
</script>

<style scoped>

</style>