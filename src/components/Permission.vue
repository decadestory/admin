<template>
    <section permission-template>
    
        <el-form :inline="true" search-form label-position="right" label-suffix=":">
            <el-form-item label="关键字" props="keyWord">
                <el-input placeholder="请输入关键字" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" style="margin-left:20px;" @click="Query(1)">查询</el-button>
            </el-form-item>
        </el-form>
    
        <el-button-group list-btn>
            <el-button icon="plus" @click="showAddPermission"> 添加权限</el-button>
            <el-button icon="delete" @click="batchDelPermission"> 批量删除</el-button>
        </el-button-group>
    
        <el-table ref="permissionTable" :data="ListData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="Name" label="名称"></el-table-column>
            <el-table-column prop="PType" label="类型" :formatter="formatPType"></el-table-column>
            <el-table-column prop="Code" label="代码"></el-table-column>
            <el-table-column prop="ParentCode" label="上级代码"></el-table-column>
            <el-table-column prop="Link" label="链接"></el-table-column>
            <el-table-column prop="Icon" label="图标"></el-table-column>
            <el-table-column prop="Remark" label="备注"></el-table-column>
            <el-table-column prop="AddTime" label="创建日期"></el-table-column>
            <el-table-column prop="EditTime" label="更新日期"></el-table-column>
            <el-table-column prop="Enable" label="是否可用" width="100">
                <template scope="scope">
                    <el-tag v-text="scope.row.Enable === true ? '启用' : (scope.row.Enable === false ? '禁用' : '未知')" :type="scope.row.Enable === true ? 'success' : (scope.row.Enable === false ? 'danger' : 'primary')">
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="showEditPermission(scope.$index, ListData)">编辑</el-button>
                    <el-button size="small" type="danger" @click="delPermission(scope.$index, ListData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <el-pagination epager @size-change="sizeChange" @current-change="pageChange" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
    
        <el-dialog v-model="showAddPermissionDialog" title="添加权限" :modal="true" :close-on-click-modal="false">
            <el-form :model="permissionForm" label-width="80px">
                <el-form-item label="名称" prop="Name">
                    <el-input v-model="permissionForm.Name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="PType">
                    <el-select v-model="permissionForm.PType" placeholder="请选择权限类型">
                        <el-option v-for="item in pTypeOptions" :label="item.name" :value="item.val" :key="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代码" prop="Code">
                    <el-input v-model="permissionForm.Code"></el-input>
                </el-form-item>
                <el-form-item label="上级代码" prop="ParentCode" v-show="permissionForm.PType!=40">
                    <el-input v-model="permissionForm.ParentCode"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="Link" v-show="permissionForm.PType!=40">
                    <el-input v-model="permissionForm.Link"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="Icon" v-show="permissionForm.PType!=40">
                    <el-input v-model="permissionForm.Icon"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="Remark">
                    <el-input v-model="permissionForm.Remark"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="Enable">
                    <el-radio-group v-model="permissionForm.Enable">
                        <el-radio class="radio" :label="true">启用</el-radio>
                        <el-radio class="radio" :label="false">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="showAddPermissionDialog = false">取 消</el-button>
                <el-button type="primary" @click.native="addPermission" :loading="saveLoading">添加</el-button>
            </div>
        </el-dialog>
    
        <el-dialog v-model="showEditPermissionDialog" title="编辑权限" :modal="true" :close-on-click-modal="false">
            <el-form :model="permissionForm" label-width="80px">
                <el-form-item label="名称" prop="Name">
                    <el-input v-model="permissionForm.Name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="PType">
                    <el-select v-model="permissionForm.PType" placeholder="请选择权限类型">
                        <el-option v-for="item in pTypeOptions" :label="item.name" :value="item.val" :key="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="代码" prop="Code">
                    <el-input v-model="permissionForm.Code"></el-input>
                </el-form-item>
                <el-form-item label="上级代码" prop="ParentCode" v-show="permissionForm.PType!=40">
                    <el-input v-model="permissionForm.ParentCode"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="Link" v-show="permissionForm.PType!=40">
                    <el-input v-model="permissionForm.Link"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="Icon" v-show="permissionForm.PType!=40">
                    <el-input v-model="permissionForm.Icon"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="Remark">
                    <el-input v-model="permissionForm.Remark"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="Enable">
                    <el-radio-group v-model="permissionForm.Enable">
                        <el-radio class="radio" :label="true">启用</el-radio>
                        <el-radio class="radio" :label="false">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="showEditPermissionDialog = false">取 消</el-button>
                <el-button type="primary" @click.native="editPermission" :loading="saveLoading">保存</el-button>
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
            showAddPermissionDialog: false,
            showEditPermissionDialog: false,
            saveLoading: false,
            pageSize: 15,
            pageTotal: 1,
            keyWord: '',
            pTypeOptions: [{ name: "菜单", val: 10 }, { name: "按钮", val: 20 }, { name: "自定义", val: 30 }, { name: "特殊", val: 40 }],
            permissionForm: {
                Id: 0,
                PType: 10,
                Name: '首页',
                Code: 'home',
                ParentCode: '',
                Link: '/home',
                Icon: 'icon-home',
                Remark: '首页',
                EditTime: '',
                AddTime: '',
                Enable: true
            }
        }
    },
    mounted() {
        this.Query(1);
    },
    methods: {
        Query(page) {
            NProgress.start();

            this.$http.get(global.SERVER_URL + "/Permission/FindPage/" + page + "?pageSize=" + this.pageSize + "&keyWord=" + this.keyWord).then(data => {
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
                    this.$refs.permissionTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.permissionTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        showAddPermission() {
            this.showAddPermissionDialog = true;
        },
        showEditPermission(index, rows) {
            this.permissionForm = this.deepCopy(rows[index]);
            this.showEditPermissionDialog = true;
        },
        addPermission() {
            if (this.permissionForm.PType === 40) {
                this.permissionForm.ParentCode = "";
                this.permissionForm.Link = "";
                this.permissionForm.Icon = "";
            }


            this.saveLoading = true;
            this.$http.post(global.SERVER_URL + "/Permission/Add", this.permissionForm).then(data => {
                this.saveLoading = false;
                if (data.body.IsOk === true) {
                    this.Query();
                    this.showAddPermissionDialog = false;
                    return this.$message.success(data.body.Msg);
                } else
                    this.$message.error(data.body.Msg);
            }, response => {
                console.info(response);
            })
        },
        editPermission() {
            if (this.permissionForm.PType === 40) {
                this.permissionForm.ParentCode = "";
                this.permissionForm.Link = "";
                this.permissionForm.Icon = "";
            }

            this.saveLoading = true;
            this.$http.post(global.SERVER_URL + "/Permission/Edit", this.permissionForm).then(data => {
                this.saveLoading = false;
                if (data.body.IsOk === true) {
                    this.showEditPermissionDialog = false;
                    this.Query();
                    return this.$message.success(data.body.Msg);
                } else
                    this.$message.error(data.body.Msg);
            }, response => {
                console.info(response);
            })
        },
        delPermission(index, rows) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                NProgress.start();
                this.$http.post(global.SERVER_URL + "/Permission/Del/" + rows[index].Id).then(data => {
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
        batchDelPermission() {
            var delIds = [];
            for (var item in this.multipleSelection)
                delIds.push(this.multipleSelection[item].Id);

            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                NProgress.start();
                this.$http.post(global.SERVER_URL + "/Permission/Del", { Ids: delIds }).then(data => {
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
        formatPType(row, column) {
            switch (row.PType) {
                case 10:
                    return "菜单";
                case 20:
                    return "按钮";
                case 30:
                    return "自定义";
                case 40:
                    return "特殊";
                default:
                    return "未知";
            }
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