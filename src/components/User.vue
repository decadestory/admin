<template>
  <div user-template>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button-group list-btn>
      <el-button icon="edit"> 编辑</el-button>
      <el-button icon="share"> 分享</el-button>
      <el-button icon="delete"> 删除</el-button>
    </el-button-group>

    <el-table :data="tableData3" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
    </el-table>

    <el-pagination epager layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          age: 33
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          age: 33
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          age: 33
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          age: 33
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          age: 33
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          age: 33
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          age: 33
        }]
      }
    }
  }

</script>



<style>
  [epager] {
    margin-top: 20px;
    padding: 0;
    display: block;
  }
  
  [c-title] {
    position: fixed;
    top: 60px;
    left: 250px;
    right: 0;
    height: 50px;
    line-height: 50px;
    margin: 0;
    padding-left: 20px;
    background-color: #eef1f6;
    font-weight: bold;
    z-index: 999;
  }
  
  .el-form--inline .el-form-item__label {
    width: 70px;
  }
  
  [list-btn] {
    margin-bottom: 10px;
  }
</style>