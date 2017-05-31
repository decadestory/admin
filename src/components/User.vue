<template>
  <section user-template>

    <el-form :inline="true" search-form label-position="right" label-suffix=":">
      <el-form-item label="账号">
        <el-input placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" style="margin-left:20px;">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button-group list-btn>
      <el-button icon="plus" @click="showAddUser"> 添加用户</el-button>
      <el-button icon="delete" @click="batchDelUser"> 批量删除</el-button>
    </el-button-group>

    <el-table ref="userTable" :data="ListData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="Account" label="账号"></el-table-column>
      <el-table-column prop="Name" label="姓名"></el-table-column>
      <el-table-column prop="Phone" label="手机号"></el-table-column>
      <el-table-column prop="EMail" label="邮箱"></el-table-column>
      <el-table-column prop="Gender" label="性别" width="65" :formatter="formatSex"></el-table-column>
      <el-table-column prop="AddTime" label="创建日期"></el-table-column>
      <el-table-column prop="Enable" label="是否可用" width="100">
        <template scope="scope">
          <el-tag v-text="scope.row.Enable === true ? '启用' : (scope.row.Enable === false ? '禁用' : '未知')" :type="scope.row.Enable === true ? 'success' : (scope.row.Enable === false ? 'danger' : 'primary')">
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="showEditUser(scope.$index, ListData)">编辑</el-button>
          <el-button size="small" type="danger" @click="delUser(scope.$index, ListData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination epager layout="prev, pager, next" :total="1000">
    </el-pagination>

    <el-dialog v-model="showAddUserDialog" title="添加用户" :modal="true" :close-on-click-modal="false">
      <el-form :model="userForm" label-width="80px" :rules="saveFormRules">
        <el-form-item label="账号" prop="Account">
          <el-input v-model="userForm.Account" auto-complete="off"></el-input>
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
        <el-form-item label="性别" prop="Gender">
          <el-select v-model="userForm.Gender" placeholder="请选择性别">
            <el-option v-for="item in genderOptions" :label="item.name" :value="item.val" :key="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="Enable">
          <el-radio-group v-model="userForm.Enable">
            <el-radio class="radio" :label="true">启用</el-radio>
            <el-radio class="radio" :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showAddUserDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="addUser" :loading="saveLoading">添加</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="showEditUserDialog" title="编辑用户" :modal="true" :close-on-click-modal="false">
      <el-form :model="userForm" label-width="80px" :rules="saveFormRules">
        <el-form-item label="账号" prop="Account">
          <el-input v-model="userForm.Account" auto-complete="off"></el-input>
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
        <el-form-item label="性别" prop="Gender">
          <el-select v-model="userForm.Gender" placeholder="请选择性别">
            <el-option v-for="item in genderOptions" :label="item.name" :value="item.val" :key="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="Enable">
          <el-radio-group v-model="userForm.Enable">
            <el-radio class="radio" :label="true">启用</el-radio>
            <el-radio class="radio" :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showEditUserDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="editUser" :loading="saveLoading">保存</el-button>
      </div>
    </el-dialog>


  </section>
</template>
<script>
  import NProgress from 'nprogress'

  export default {
    data() {
      return {
        ListData: [],
        multipleSelection: [],
        showAddUserDialog: false,
        showEditUserDialog: false,
        saveLoading: false,
        saveFormRules: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
        },
        genderOptions: [{
          name: "男",
          val: true
        }, {
          name: "女",
          val: false
        }],
        userForm: {
          Id: 0,
          Account: "Hello",
          Name: 'Hello',
          Password: '123456',
          EMail: "18961156547@qq.com",
          Phone: "18961156547",
          Gender: true,
          Enable: true,
          AddTime: '',
          AddUser: '',
          EditTime: '',
          EditUser: ''
        }
      }
    },
    mounted() {
      this.initTable();
    },
    methods: {
      initTable() {
        NProgress.start();
        this.$http.get(global.SERVER_URL + "/User/FindPage/1").then(data => {
          if (data.body.IsOk === true)
            this.ListData = data.body.Data;
          else
            this.$message.error(data.body.Msg);
          NProgress.done();
        }, response => {
          console.info(response);
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.userTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.userTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //性别显示转换
      formatSex(row, column) {
        return row.Gender == true ? '男' : row.Gender == false ? '女' : '未知';
      },
      showAddUser() {
        this.showAddUserDialog = true;
      },
      showEditUser(index, rows) {
        this.userForm = this.deepCopy(rows[index]);
        this.showEditUserDialog = true;
      },
      addUser() {
        this.saveLoading = true;
        this.$http.post(global.SERVER_URL + "/User/Add", this.userForm).then(data => {
          if (data.body.IsOk === true) {
            this.initTable();
            this.showAddUserDialog = false;
            this.saveLoading = false;
            return this.$message.success(data.body.Msg);
          } else
            this.$message.error(data.body.Msg);
        }, response => {
          console.info(response);
        })
      },
      editUser() {
        this.saveLoading = true;
        this.$http.post(global.SERVER_URL + "/User/Edit", this.userForm).then(data => {
          if (data.body.IsOk === true) {
            this.saveLoading = false;
            this.showEditUserDialog = false;
            this.initTable();
            return this.$message.success(data.body.Msg);
          } else
            this.$message.error(data.body.Msg);
        }, response => {
          console.info(response);
        })
      },
      delUser(index, rows) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          this.$http.post(global.SERVER_URL + "/User/Del/" + rows[index].Id).then(data => {
            NProgress.done();
            if (data.body.IsOk === true) {
              this.initTable();
              this.$message.success(data.body.Msg);
            } else
              this.$message.error(data.body.Msg);

          }, response => {
            console.info(response);
          })
        }).catch(() => { });
      },
      batchDelUser() {
        var delIds = [];
        for (var item in this.multipleSelection)
          delIds.push(this.multipleSelection[item].Id);

        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          this.$http.post(global.SERVER_URL + "/User/Del", { Ids: delIds }).then(data => {
            NProgress.done();
            if (data.body.IsOk === true) {
              this.initTable();
              this.$message.success(data.body.Msg);
            } else
              this.$message.error(data.body.Msg);
          }, response => {
            console.info(response);
          })
        }).catch(() => { });
      },
      deepCopy(obj) {
        var result = {};
        for (var key in obj) {
          result[key] = obj[key];
        }
        return result;
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
  }

  [search-form] {
    border: 1px solid #dfe6ec;
    padding-top: 20px;
    margin-bottom: 10px;
    border-radius: 2px;
  }

  [search-form] .el-form-item__label {
    width: 70px;
  }

  [list-btn] {
    margin-bottom: 10px;
  }
</style>