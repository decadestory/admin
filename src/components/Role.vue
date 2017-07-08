<template>
  <section role-template>
  
    <el-form :inline="true" search-form label-position="right" label-suffix=":">
      <el-form-item label="关键字" props="keyWord">
        <el-input placeholder="请输入关键字" v-model="keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" style="margin-left:20px;" @click="Query(1)">查询</el-button>
      </el-form-item>
    </el-form>
  
    <el-button-group list-btn>
      <el-button icon="plus" @click="showAddRole"> 添加</el-button>
      <el-button icon="delete" @click="batchDelRole"> 删除</el-button>
      <el-button icon="edit" @click="showBatchPermission"> 权限</el-button>
    </el-button-group>
  
    <el-table ref="roleTable" :data="ListData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="Name" label="角色名称"></el-table-column>
      <el-table-column prop="Code" label="角色代码"></el-table-column>
      <el-table-column prop="AddTime" label="创建日期"></el-table-column>
      <el-table-column prop="Enable" label="是否可用" width="100">
        <template scope="scope">
          <el-tag v-text="scope.row.Enable === true ? '启用' : (scope.row.Enable === false ? '禁用' : '未知')" :type="scope.row.Enable === true ? 'success' : (scope.row.Enable === false ? 'danger' : 'primary')">
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template scope="scope">
          <el-button size="small" @click="showCurPermission(scope.$index, ListData)">权限</el-button>
          <el-button size="small" @click="showEditRole(scope.$index, ListData)">编辑</el-button>
          <el-button size="small" type="danger" @click="delRole(scope.$index, ListData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-pagination epager @size-change="sizeChange" @current-change="pageChange" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
    </el-pagination>
  
    <el-dialog v-model="showAddRoleDialog" title="添加角色" :modal="true" :close-on-click-modal="false">
      <el-form :model="roleForm" label-width="80px">
        <el-form-item label="角色名称" prop="Name">
          <el-input v-model="roleForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="Code">
          <el-input v-model="roleForm.Code"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="Enable">
          <el-radio-group v-model="roleForm.Enable">
            <el-radio class="radio" :label="true">启用</el-radio>
            <el-radio class="radio" :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showAddRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="addRole" :loading="saveLoading">添加</el-button>
      </div>
    </el-dialog>
  
    <el-dialog v-model="showEditRoleDialog" title="编辑角色" :modal="true" :close-on-click-modal="false">
      <el-form :model="roleForm" label-width="80px">
        <el-form-item label="角色名称" prop="Name">
          <el-input v-model="roleForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="角色代码" prop="Code">
          <el-input v-model="roleForm.Code"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="Enable">
          <el-radio-group v-model="roleForm.Enable">
            <el-radio class="radio" :label="true">启用</el-radio>
            <el-radio class="radio" :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showEditRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="editRole" :loading="saveLoading">保存</el-button>
      </div>
    </el-dialog>
  
    <el-dialog v-model="showSetPermissionDialog" title="设置权限" :modal="true" :close-on-click-modal="false">
      <el-tabs v-model="curtab">
        <el-tab-pane label="菜单按钮权限" name="menu-btn">
          <el-tree :data="permissions" show-checkbox node-key="Id" :props="props" ref="tree" :default-checked-keys="userspp"> </el-tree>
        </el-tab-pane>
        <el-tab-pane label="特殊权限" name="user-per">
          <el-table ref="permissionTable" :data="sppData" border style="width: 100%" @selection-change="phandleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="Name" label="权限名称"></el-table-column>
            <el-table-column prop="Code" label="权限代码"></el-table-column>
            <el-table-column prop="Remark" label="备注"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showSetPermissionDialog = false">取 消</el-button>
        <el-button type="primary" @click.native="setPermission" :loading="saveLoading">保存</el-button>
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
      sppData: [],
      userspp: [],
      curPerUsers: [],
      multipleSelection: [],
      pmultipleSelection: [],
      showAddRoleDialog: false,
      showEditRoleDialog: false,
      showSetPermissionDialog: false,
      saveLoading: false,
      pageSize: 15,
      pageTotal: 1,
      keyWord: "",
      curtab: 'menu-btn',
      permissions: [],
      props: { label: "NameStr", children: "Children" },
      roleForm: {
        Id: 0,
        Name: '管理员',
        Code: 'admin',
        Enable: true,
        AddTime: '',
        AddRole: '',
        EditTime: '',
        EditRole: ''
      }
    }
  },
  mounted() {
    this.Query(1);
  },
  methods: {
    Query(page) {
      NProgress.start();

      this.$http.get(global.SERVER_URL + "/Role/FindPage/" + page + "?pageSize=" + this.pageSize + "&keyWord=" + this.keyWord).then(data => {
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
          this.$refs.roleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.roleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    ptoggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.permissionTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.permissionTable.clearSelection();
      }
    },
    phandleSelectionChange(val) {
      this.pmultipleSelection = val;
    },
    formatSex(row, column) {
      return row.Gender == true ? '男' : row.Gender == false ? '女' : '未知';
    },
    showAddRole() {
      this.showAddRoleDialog = true;
    },
    showEditRole(index, rows) {
      this.roleForm = this.deepCopy(rows[index]);
      this.showEditRoleDialog = true;
    },
    showCurPermission(index, rows) {
      this.curPerUsers = [];
      this.curPerUsers.push(rows[index].Id);
      this.showPermissionDialog(rows[index].Id);
    },
    showBatchPermission() {
      this.showPermissionDialog();
      this.curPerUsers = [];
      for (var item in this.multipleSelection)
        this.curPerUsers.push(this.multipleSelection[item].Id);
    },
    setPermission() {
      var model = { RoleIds: this.curPerUsers, PermissionIds: this.$refs.tree.getCheckedKeys(true) };
      for (var item in this.pmultipleSelection)
        model.PermissionIds.push(this.pmultipleSelection[item].Id);

      this.saveLoading = true;
      this.$http.post(global.SERVER_URL + "/RolePermission/Add", model).then(data => {
        this.saveLoading = false;
        if (data.body.IsOk === true) {
          return this.$message.success(data.body.Msg);
        }
        else
          this.$message.error(data.body.Msg);
        NProgress.done();
      }, response => {
        console.info(response);
      })

    },
    addRole() {
      this.saveLoading = true;
      this.$http.post(global.SERVER_URL + "/Role/Add", this.roleForm).then(data => {
        if (data.body.IsOk === true) {
          this.Query();
          this.showAddRoleDialog = false;
          this.saveLoading = false;
          return this.$message.success(data.body.Msg);
        } else
          this.$message.error(data.body.Msg);
      }, response => {
        console.info(response);
      })
    },
    editRole() {
      this.saveLoading = true;
      this.$http.post(global.SERVER_URL + "/Role/Edit", this.roleForm).then(data => {
        if (data.body.IsOk === true) {
          this.saveLoading = false;
          this.showEditRoleDialog = false;
          this.Query();
          return this.$message.success(data.body.Msg);
        } else
          this.$message.error(data.body.Msg);
      }, response => {
        console.info(response);
      })
    },
    delRole(index, rows) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        NProgress.start();
        this.$http.post(global.SERVER_URL + "/Role/Del/" + rows[index].Id).then(data => {
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
    batchDelRole() {
      var delIds = [];
      for (var item in this.multipleSelection)
        delIds.push(this.multipleSelection[item].Id);

      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        NProgress.start();
        this.$http.post(global.SERVER_URL + "/Role/Del", { Ids: delIds }).then(data => {
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
    showPermissionDialog(uid) {
      this.showSetPermissionDialog = true;
      if (!uid) uid = 0;

      this.$http.get(global.SERVER_URL + "/Permission/GetTopTreeData?uid=" + uid).then(data => {
        if (data.body.IsOk === true) {
          this.permissions = data.body.Data.Children;
          this.userspp = data.body.Data.UserPermissions;

        }
        else
          this.$message.error(data.body.Msg);
      }, response => {
        console.info(response);
      });

      this.$http.get(global.SERVER_URL + "/Permission/FindPage/1?pageSize=1000&keyWord=PType:40&&uid=" + uid).then(data => {
        if (data.body.IsOk === true) {
          this.sppData = data.body.Data.DataList;

          var _this = this;
          setTimeout(function () {
            _this.sppData.forEach(r => {
              data.body.ExtData.forEach(d => {
                if (r.Id == d) {
                  console.info(r.Id + "-->" + d);
                  _this.$refs.permissionTable.toggleRowSelection(r);
                }
              });
            });
          }, 500);

        }
        else
          this.$message.error(data.body.Msg);
      }, response => {
        console.info(response);
      })


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