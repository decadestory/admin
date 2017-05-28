<template>
  <div user-template>

    <el-form :inline="true" search-form label-position="right" label-suffix=":">
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button-group list-btn>
      <el-button icon="plus" @click="AddUser"> 添加用户</el-button>
      <el-button icon="delete"> 批量删除</el-button>
    </el-button-group>

    <el-table ref="multipleTable" :data="ListData" border style="width: 100%" 
    @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>      
      <el-table-column prop="Id" label="编号"></el-table-column>      
      <el-table-column prop="Account" label="账号"></el-table-column>      
      <el-table-column prop="Name" label="姓名"></el-table-column>
      <el-table-column prop="Phone" label="手机号"></el-table-column>
      <el-table-column prop="EMail" label="邮箱"></el-table-column>
      <el-table-column prop="Gender" label="性别" width="65" :formatter="formatSex"></el-table-column>
      <el-table-column prop="AddTime" label="创建日期"></el-table-column>
      <el-table-column prop="Enable" label="是否可用" width="100" :formatter="formatEnable"></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small">编辑</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination epager layout="prev, pager, next" :total="1000">
    </el-pagination>

    <el-dialog  v-model="userDialog" :close-on-click-modal="false">
			<el-form :model="userForm" label-width="80px" :rules="saveFormRules" ref="editForm">
				<el-form-item label="账号" prop="Account">
					<el-input v-model="userForm.Account" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="Gender">
					<el-select v-model="userForm.Gender" placeholder="请选择性别">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否启用" prop="Enable">
					<el-radio-group v-model="userForm.Enable">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="姓名" prop="Name">
					<el-input v-model="userForm.Name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="Password">
					<el-input v-model="userForm.Password" type="Password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="Phone">
					<el-input v-model="userForm.Phone"></el-input>
				</el-form-item>
				<el-form-item label="邮箱地址" prop="EMail">
					<el-input v-model="userForm.EMail"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="userDialog = false">取 消</el-button>
				<el-button type="primary" @click.native="Submit" :loading="saveLoading">保存</el-button>
			</div>
		</el-dialog>

  </div>
</template>
<script>
  import NProgress from 'nprogress'

  export default {
    name: 'user',
    data() {
      return {
        ListData: [],
        multipleSelection: [],
        userDialog:false,
        saveLoading:false,
        saveFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
        userForm:{
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
          },
      }
    },
		mounted() {
      NProgress.start();
			this.$http.get("http://localhost:2000/User/findpage/1").then(data => {
				this.ListData = data.body.Data;
        NProgress.done();
			}, response => {
				console.info(response);
			})
		},
    methods:{
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //性别显示转换
			formatSex: function (row, column) {
				return row.Gender == true ? '男' : row.Gender == false ? '女' : '未知';
			},
			//是否可用
			formatEnable: function (row, column) {
				return row.Enable == true ? '启用' : row.Enable == false ? '禁用' : '未知';
			},
      AddUser:function(){
        this.userDialog =true;
      }
     }
  }

</script>



<style scope>
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

   [search-form]{
     border:1px solid #dfe6ec;
     padding-top:20px;
     margin-bottom:10px;
     border-radius:2px;
   }

  [search-form] .el-form-item__label{
    width:70px;
  }
  
  [list-btn] {
    margin-bottom: 10px;
  }
</style>