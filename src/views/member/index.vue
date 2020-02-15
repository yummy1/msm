<template>
    <div>
      <!-- 条件查询 -->
      <el-form :inline="true" :model="searchMap" ref="searchMap" class="demo-form-inline">
        <el-form-item prop="cardNum">
          <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
        </el-form-item>
        <el-form-item prop="user">
          <el-input v-model="searchMap.user" placeholder="会员名称"></el-input>
        </el-form-item>
        <el-form-item prop="payType">
          <el-select placeholder="支付类型" v-model="searchMap.payType">
            <el-option v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
             ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birthday">
          <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birthday"
          type="date"
          placeholder="开卡日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="danger" @click="handleAdd">新增</el-button>
          <el-button @click="resetForm('searchMap')">重置</el-button>
        </el-form-item>
</el-form>
      <!-- 列表 -->
      <el-table
      :data="list"
      height="380"
      border
      style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="cardNum" label="会员卡号"></el-table-column>
        <el-table-column prop="name" label="会员姓名"></el-table-column>
        <el-table-column prop="birthday" label="会员生日"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="integral" label="可用积分"></el-table-column>
        <el-table-column prop="money" label="开卡金额"></el-table-column>
        <el-table-column label="支付类型">
          <template slot-scope="scope">
            <span>{{scope.row.payType | payTypeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="会员地址"></el-table-column>
        <el-table-column label="操作" width="150">
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
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      <!-- 新增会员弹窗-->
      <el-dialog title="新增会员" :visible.sync="dialogFormVisible" style="width:950px">
        <el-form
                ref="addForm"
                :rules="rules"
                label-width="100px"
                label-position="right"
                style="width: 400px"
                :model="pojo">
          <el-form-item prop="cardNum" label="会员卡号">
            <el-input v-model="pojo.cardNum"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="会员姓名">
            <el-input v-model="pojo.name"></el-input>
          </el-form-item>
          <el-form-item prop="birthday" label="会员生日">
            <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="pojo.birthday"
                    type="date"
                    placeholder="请点击选择">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="pojo.phone"></el-input>
          </el-form-item>
          <el-form-item label="开卡金额" prop="money">
            <el-input v-model="pojo.money"></el-input>
          </el-form-item>
          <el-form-item label="会员积分" prop="integral">
            <el-input v-model="pojo.integral"></el-input>
          </el-form-item>
          <el-form-item prop="payType" label="支付方式">
            <el-select placeholder="支付类型" v-model="pojo.payType">
              <el-option v-for="option in payTypeOptions"
                         :key="option.type"
                         :label="option.name"
                         :value="option.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员地址" prop="address">
            <el-input type="textarea" v-model="pojo.address"></el-input>
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
  import memberApi from '@/api/member'
  const payTypeOptions = [
    {type: 1, name:'现金'},
    {type: 2, name:'微信'},
    {type: 3, name:'支付宝'},
    {type: 4, name:'银行卡'},
  ]
  export default {
    data(){
      return {
        list:[],
        currentPage: 1,
        total: 0,
        size: 10,
        searchMap: {
          cardNum: '',
          user: '',
          payType: '',
          birthday: ''
        },
        payTypeOptions,
        pojo: {
          id: null,
          cardNum: '',
          name: '',
          birthday: '',
          phone: '',
          money: 0,
          integral: 0,
          payType: '',
          address: ''
        },
        dialogFormVisible: false,
        rules: {
          cardNum:[{required: true, message: '卡号不能为空', trigger: 'blur'}],
          name:[{required: true, message: '姓名不能为空', trigger: 'blur'}],
          payType:[{required: true, message: '支付方式不能为空', trigger: 'blur'}]
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods:{
      //请求数据
      fetchData(){
          memberApi.searchList(this.currentPage,this.size,this.searchMap).then(response => {
            const resp = response.data
            console.log(resp.data)
            if(resp.flag){
              this.list = resp.data.rows
              this.total = resp.data.total
            }
          })
      },
      //每页数量改变
      handleSizeChange(val) {
        this.size = val
        this.fetchData()
        console.log(`每页 ${val} 条`);
      },
      //当前页数改变
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
        console.log(`当前页: ${val}`);
      },
      //搜索
      onSubmit(){
        this.fetchData()
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //新增会员
      add(formName) {
        console.log('新增结束')
        this.$refs[formName].validate((valid) => {
          if (valid){
            memberApi.add(this.pojo).then(response => {
              const resp = response.data
              console.log(resp)
              if(resp.flag){
                //新增成功,刷新列表数据
                this.fetchData()
                this.dialogFormVisible = false
              }else{
                this.$message({
                  message: resp.message,
                  type: 'warning'
                })
              }
            })
          }else {
            console.log('验证失败')
            return false
          }
        })
      },
      //新增弹窗
      handleAdd(){
        this.dialogFormVisible = true
        //$nextTick异步方法
        this.$nextTick(() => {
          this.$refs['addForm'].resetFields()
        })
      },
      //编辑弹窗
      handleEdit(id){
        console.log(id)
        //先清空,并弹出编辑窗口
        this.handleAdd()
        memberApi.searchById(id).then(response => {
          console.log(response.data)
          const resp = response.data
          if (resp.flag){
            this.pojo = resp.data
          }
        })
      },
      //编辑
      edit(formName) {
        console.log('编辑结束')
        this.$refs[formName].validate((valid) => {
          if (valid){
            memberApi.edit(this.pojo).then(response => {
              console.log(response.data)
              const resp = response.data
              if(resp.flag){
                this.fetchData()
                this.dialogFormVisible = false
              }
            })
          }else{
            console.log('验证失败')
            return false
          }
        })
      },
      //删除
      handleDelete(id){
        console.log(id)
        this.$confirm('是否删除该会员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          memberApi.deleteById(id).then(response => {
            const resp = response.data
            this.$message({
              type: resp.flag ? 'success': 'error',
              message: resp.flag ? '删除成功!': '删除失败'
            });
            if(resp.flag){
              this.fetchData()
            }
          })
        }).catch(() => {

        });
      },

    },
    filters: {
      payTypeFilter(type){
        //此处省略大括号
        //在过滤器中不能引用this
          const payObj = payTypeOptions.find(obj => obj.type === type)
          return payObj? payObj.name : null
      }
    }
  }
</script>

<style scoped>
  .demo-form-inline {
    margin-top: 20px;
  }
</style>