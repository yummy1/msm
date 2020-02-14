<template>
    <div>
        <el-table
                :data="list"
                border
                height="360"
                style="width: 100%">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="code" label="商品编码"></el-table-column>
            <el-table-column prop="spec" label="商品规格"></el-table-column>
            <el-table-column prop="retailPrice" label="零售价" width="90"></el-table-column>
            <el-table-column prop="purchasePrice" label="进货价" width="90"></el-table-column>
            <el-table-column prop="storageNum" label="库存数量" width="90"></el-table-column>
            <el-table-column prop="supplierName" label="供应商"></el-table-column>
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
    </div>
</template>

<script>
    import goodsApi from '@/api/goods'
  export default {
    data(){
      return {
        list: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchMap: {
          name: '',
          code: '',
          supplierName: ''
        }
      }
    },
    created() {
        this.fetchData()
    },
    methods: {
      fetchData(){
        goodsApi.searchList(this.currentPage, this.pageSize, this.searchMap).then(response => {
          const resp = response.data
          console.log(resp)
          if(resp.flag){
            this.total = resp.data.total
            this.list = resp.data.rows
            console.log(this.list)
          }
        })
      },
      handleEdit(id){

      },
      handleDelete(id){

      }
    }
  }
</script>

<style scoped>

</style>