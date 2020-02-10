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
        payTypeOptions
      }
    },
    created() {
      this.fetchData()
    },
    methods:{
      fetchData(){
            memberApi.searchList(this.currentPage,this.size,this.searchMap).then(response => {
              const resp = response.data
              console.log(resp.data)
              this.list = resp.data.rows
              this.total = resp.data.total
            })
      },
      handleEdit(id){
        console.log(id)
      },
      handleDelete(id){
        console.log(id)
      },
      handleSizeChange(val) {
        this.size = val
        this.fetchData()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
        console.log(`当前页: ${val}`);
      },
      onSubmit(){
        this.fetchData()
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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