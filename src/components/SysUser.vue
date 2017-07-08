<template>
  <section sysUser-template>

    <el-form :inline="true" search-form label-position="right" label-suffix=":">
      <el-form-item label="关键字" props="keyWord">
        <el-input placeholder="请输入关键字" v-model="keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" style="margin-left:20px;" @click="Query(1)">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button-group list-btn>
      <el-button icon="plus" @click="showAddSysUser"> 添加用户</el-button>
      <el-button icon="delete" @click="batchDelSysUser"> 批量删除</el-button>
    </el-button-group>

    <el-table ref="sysUserTable" :data="ListData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="Account" label="账号"></el-table-column>
      <el-table-column prop="PhoneNumber" label="手机号"></el-table-column>
      <el-table-column prop="Email" label="邮箱"></el-table-column>
      <el-table-column prop="AddTime" label="创建日期"></el-table-column>
      <el-table-column prop="Enable" label="是否可用" width="100">
        <template scope="scope">
          <el-tag v-text="scope.row.Enable === true ? '启用' : (scope.row.Enable === false ? '禁用' : '未知')" :type="scope.row.Enable === true ? 'success' : (scope.row.Enable === false ? 'danger' : 'primary')">
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="showEditSysUser(scope.$index, ListData)">编辑</el-button>
          <el-button size="small" type="danger" @click="delSysUser(scope.$index, ListData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination epager @size-change="sizeChange" @current-change="pageChange" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
    </el-pagination>

    <el-dialog v-model="showAddSysUserDialog" title="添加用户" :modal="true" :close-on-click-modal="false">
      <el-form :model="sysUserForm" label-width="80px" >
        <el-form-item label="账号" prop="Account">
          <el-input v-model="sysUserForm.Account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pwd">
          <el-input v-model="sysUserForm.Pwd" type="Password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="PhoneNumber">
          <el-input v-model="sysUserForm.PhoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="Email">
          <el-input v-model="sysUserForm.Email"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="Enable">
          <el-radio-group v-model="sysUserForm.Enable">
            <el-radio class="radio" :label="true">启用</el-radio>
            <el-radio class="radio" :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showAddSysUserDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="addSysUser" :loading="saveLoading">添加</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="showEditSysUserDialog" title="编辑用户" :modal="true" :close-on-click-modal="false">
      <el-form :model="sysUserForm" label-width="80px" >
        
        <el-form-item label="账号" prop="Account">
          <el-input v-model="sysUserForm.Account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pwd">
          <el-input v-model="sysUserForm.Pwd" type="Password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="PhoneNumber">
          <el-input v-model="sysUserForm.PhoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="Email">
          <el-input v-model="sysUserForm.Email"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="Enable">
          <el-radio-group v-model="sysUserForm.Enable">
            <el-radio class="radio" :label="true">启用</el-radio>
            <el-radio class="radio" :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showEditSysUserDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="editSysUser" :loading="saveLoading">保存</el-button>
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
        showAddSysUserDialog: false,
        showEditSysUserDialog: false,
        saveLoading: false,
        pageSize: 15,
        pageTotal: 1,
        keyWord: "",
        sysUserForm: {
          Id: 0,
          Account: "Hello",
          Pwd: '123456',
          Email: "18961156547@qq.com",
          PhoneNumber: "18961156547",
          Enable: true,
          AddTime: ''
        }
      }
    },
    mounted() {
      this.Query(1);
    },
    methods: {
      Query(page) {
        NProgress.start();
        
        this.$http.get(global.SERVER_URL + "/SysUser/FindPage/" + page + "?pageSize=" + this.pageSize + "&keyWord=" + this.keyWord).then(data => {
          if (data.body.IsOk === true) {
            this.ListData = data.body.Data.DataList;
            this.pageTotal = data.body.Data.Total;
          }
          else
            this.$message.error(data.body.Msg);
          NProgress.done();
        }, response => {
          console.info(response);
        })
      },
      sizeChange(size) {
        this.pageSize = size;
        this.Query(1);
      },
      pageChange(page) {
        this.Query(page);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.sysUserTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.sysUserTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //性别显示转换
      formatSex(row, column) {
        return row.Gender == true ? '男' : row.Gender == false ? '女' : '未知';
      },
      showAddSysUser() {
        this.showAddSysUserDialog = true;
      },
      showEditSysUser(index, rows) {
        this.sysUserForm = this.deepCopy(rows[index]);
        this.showEditSysUserDialog = true;
      },
      addSysUser() {
        this.saveLoading = true;
        this.$http.post(global.SERVER_URL + "/SysUser/Add", this.sysUserForm).then(data => {
          if (data.body.IsOk === true) {
            this.Query();
            this.showAddSysUserDialog = false;
            this.saveLoading = false;
            return this.$message.success(data.body.Msg);
          } else
            this.$message.error(data.body.Msg);
        }, response => {
          console.info(response);
        })
      },
      editSysUser() {
        this.saveLoading = true;
        this.$http.post(global.SERVER_URL + "/SysUser/Edit", this.sysUserForm).then(data => {
          if (data.body.IsOk === true) {
            this.saveLoading = false;
            this.showEditSysUserDialog = false;
            this.Query();
            return this.$message.success(data.body.Msg);
          } else
            this.$message.error(data.body.Msg);
        }, response => {
          console.info(response);
        })
      },
      delSysUser(index, rows) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          this.$http.post(global.SERVER_URL + "/SysUser/Del/" + rows[index].Id).then(data => {
            NProgress.done();
            if (data.body.IsOk === true) {
              this.Query();
              this.$message.success(data.body.Msg);
            } else
              this.$message.error(data.body.Msg);

          }, response => {
            console.info(response);
          })
        }).catch(() => { });
      },
      batchDelSysUser() {
        var delIds = [];
        for (var item in this.multipleSelection)
          delIds.push(this.multipleSelection[item].Id);

        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          this.$http.post(global.SERVER_URL + "/SysUser/Del", { Ids: delIds }).then(data => {
            NProgress.done();
            if (data.body.IsOk === true) {
              this.Query();
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
    float: right;
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