<template>
    <div>
<!--        筛选条件-->
        <el-form ref="searchForm" :inline="true" :model="searchMap" class="demo-form-inline">
            <el-form-item prop="name">
                <el-input v-model="searchMap.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="searchMap.code" placeholder="商品编号"></el-input>
            </el-form-item>
            <el-form-item prop="supplierName">
                <el-input
                        readonly
                        @click.native="dialogSupplierVisible = true"
                        v-model="searchMap.supplierName"
                        placeholder="选择供应商">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="danger" @click="handleAdd">新增</el-button>
                <el-button @click="resetForm('searchForm')">重置</el-button>
            </el-form-item>
        </el-form>
<!--        列表展示-->
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
<!--        选择供应商弹窗-->
        <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="500px">
            <supplier :isDialog="true" @supplier-selected="supplierSelectedCallback"></supplier>
        </el-dialog>
<!--        新增商品表单-->
        <el-dialog
                title="商品编辑"
                :visible.sync="dialogFormVisible"
                width="500px">
            <el-form
                    ref="addForm"
                    :rules="rules"
                    :model="pojo"
                    label-width="80px">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="pojo.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品编码" prop="code">
                    <el-input v-model="pojo.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品规格" prop="spec">
                    <el-input v-model="pojo.spec" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="零售价" prop="retailPrice">
                    <el-input v-model="pojo.retailPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="进货价" prop="purchasePrice">
                    <el-input v-model="pojo.purchasePrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存数" prop="storageNum">
                    <el-input v-model="pojo.storageNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierName">
                    <el-input
                            readonly
                            @click.native="selectedSupplier"
                            v-model="pojo.supplierName"
                            autocomplete="off">
                    </el-input>
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
    import goodsApi from '@/api/goods'
    import supplier from '../supplier'
  export default {
    components: {supplier},
    data(){
      return {
        list: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchMap: {
          name: '',
          code: '',
          spec: '',
          supplierName: '',
          supplierId: ''
        },
        pojo: {
          id: null,
          name: '',
          code: '',
          spec: '',
          retailPrice: 0.0,
          purchasePrice: 0.0,
          storageNum: 0,
          supplierName: '',
          supplierId: ''
        },
        dialogSupplierVisible: false,
        dialogFormVisible: false,
        isEdit: false,
        rules: {
          name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
          code: [{ required: true, message: '请输入商品编号', trigger: 'blur' }],
          retailPrice: [{ required: true, message: '请输入零售价', trigger: 'blur' }]
        }
      }
    },
    created() {
        this.fetchData()
    },
    methods: {
      //请求数据
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
      //编辑
      handleEdit(id){
        this.handleAdd()
        goodsApi.getById(id).then(response => {
          const resp = response.data
          if(resp.flag){
            this.pojo = resp.data
          }else{
            this.$message({
              message:resp.message,
              type: "warning"
            })
          }
        })
      },
      edit(formName){
        goodsApi.edit(this.pojo).then(response => {
          if (response.data.flag){
            this.dialogFormVisible = false
            this.fetchData()
          }else{
            this.$message({
              message:resp.message,
              type: "warning"
            })
          }
        })
      },
      //删除
      handleDelete(id){
        this.$confirm('确认删除改件商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          goodsApi.delete(id).then(response => {
            const resp = response.data
            if (resp.flag){
              this.fetchData()
            }
            this.$message({
              message: resp.message,
              type:resp.flag ? "success" : "warning"
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      //每页数量改变
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.fetchData()
      },
      //当前页数改变
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.fetchData()
      },
      //搜索
      onSubmit(){
        this.fetchData()
      },
      //选择供应商回调
      supplierSelectedCallback(val){
        console.log('收到回调' + JSON.stringify(val))
        if (!this.isEdit){
          this.searchMap.supplierName = val.name
          this.searchMap.supplierId = val.id
        }else{
          this.pojo.supplierName = val.name
          this.pojo.supplierId = val.id
        }
        this.dialogSupplierVisible = false
      },
      //重置
      resetForm(formName){
        this.$refs[formName].resetFields()
      },
      //新增
      handleAdd(){
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['addForm'].resetFields()
        })
      },
      add(formName){
        goodsApi.add(this.pojo).then(reponse => {
          const resp = reponse.data
          if(resp.flag){
            this.dialogFormVisible = false
            this.fetchData()
          }else{
            this.$message({
              message:resp.message,
              type: "warning"
            })
          }
        })
      },
      //编辑时选择供应商
      selectedSupplier(){
        this.dialogSupplierVisible = true
        this.isEdit = true
      }
    }
  }
</script>

<style scoped>
    .demo-form-inline {
        margin-top: 20px;
    }
</style>