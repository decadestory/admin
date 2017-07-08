<template>
    <section region-template>
    
        <el-form :inline="true" search-form label-position="right" label-suffix=":">
            <el-form-item label="关键字" props="keyWord">
                <el-input placeholder="请输入关键字" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="search" style="margin-left:20px;" @click="Query(1)">查询</el-button>
            </el-form-item>
        </el-form>
    
        <el-button-group list-btn>
            <el-button icon="plus" @click="showAddRegion"> 添加区域</el-button>
            <el-button icon="delete" @click="batchDelRegion"> 批量删除</el-button>
        </el-button-group>
    
        <el-table ref="regionTable" :data="ListData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="DistrictName" label="区县名称"></el-table-column>
            <el-table-column prop="DistrictId" label="区县代码"></el-table-column>
            <el-table-column prop="CityName" label="城市名称"></el-table-column>
            <el-table-column prop="CityId" label="城市代码"></el-table-column>
            <el-table-column prop="ProvinceName" label="省名"></el-table-column>
            <el-table-column prop="ProvinceId" label="省代码"></el-table-column>
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
                    <el-button size="small" @click="showEditRegion(scope.$index, ListData)">编辑</el-button>
                    <el-button size="small" type="danger" @click="delRegion(scope.$index, ListData)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <el-pagination epager @size-change="sizeChange" @current-change="pageChange" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
    
        <el-dialog v-model="showAddRegionDialog" title="添加区域" :modal="true" :close-on-click-modal="false">
            <el-form :model="regionForm" label-width="80px">
                <el-form-item label="区县名称" prop="DistrictName">
                    <el-input v-model="regionForm.DistrictName"></el-input>
                </el-form-item>
                <el-form-item label="区县代码" prop="DistrictId">
                    <el-input v-model="regionForm.DistrictId"></el-input>
                </el-form-item>
                <el-form-item label="城市名称" prop="CityName">
                    <el-input v-model="regionForm.CityName"></el-input>
                </el-form-item>
                <el-form-item label="城市代码" prop="CityId">
                    <el-input v-model="regionForm.CityId"></el-input>
                </el-form-item>
                <el-form-item label="省名" prop="ProvinceName">
                    <el-input v-model="regionForm.ProvinceName"></el-input>
                </el-form-item>
                <el-form-item label="省代码" prop="ProvinceId">
                    <el-input v-model="regionForm.ProvinceId"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="Enable">
                    <el-radio-group v-model="regionForm.Enable">
                        <el-radio class="radio" :label="true">启用</el-radio>
                        <el-radio class="radio" :label="false">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="showAddRegionDialog = false">取 消</el-button>
                <el-button type="primary" @click.native="addRegion" :loading="saveLoading">添加</el-button>
            </div>
        </el-dialog>
    
        <el-dialog v-model="showEditRegionDialog" title="编辑区域" :modal="true" :close-on-click-modal="false">
            <el-form :model="regionForm" label-width="80px">
                  <el-form-item label="区县名称" prop="DistrictName">
                    <el-input v-model="regionForm.DistrictName"></el-input>
                </el-form-item>
                <el-form-item label="区县代码" prop="DistrictId">
                    <el-input v-model="regionForm.DistrictId"></el-input>
                </el-form-item>
                <el-form-item label="城市名称" prop="CityName">
                    <el-input v-model="regionForm.CityName"></el-input>
                </el-form-item>
                <el-form-item label="城市代码" prop="CityId">
                    <el-input v-model="regionForm.CityId"></el-input>
                </el-form-item>
                <el-form-item label="省名" prop="ProvinceName">
                    <el-input v-model="regionForm.ProvinceName"></el-input>
                </el-form-item>
                <el-form-item label="省代码" prop="ProvinceId">
                    <el-input v-model="regionForm.ProvinceId"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="Enable">
                    <el-radio-group v-model="regionForm.Enable">
                        <el-radio class="radio" :label="true">启用</el-radio>
                        <el-radio class="radio" :label="false">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
    
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="showEditRegionDialog = false">取 消</el-button>
                <el-button type="primary" @click.native="editRegion" :loading="saveLoading">保存</el-button>
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
            showAddRegionDialog: false,
            showEditRegionDialog: false,
            saveLoading: false,
            pageSize: 15,
            pageTotal: 1,
            keyWord: "",
            regionForm: {
                Id: 0,
                DistrictId: "0",
                DistrictName: '全国',
                CityId: '0',
                CityName: "全国",
                ProvinceId: "0",
                ProvinceName: '全国',
                AddTime: '',
                EditTime: '',
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

            this.$http.get(global.SERVER_URL + "/Region/FindPage/" + page + "?pageSize=" + this.pageSize + "&keyWord=" + this.keyWord).then(data => {
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
                    this.$refs.regionTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.regionTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        showAddRegion() {
            this.showAddRegionDialog = true;
        },
        showEditRegion(index, rows) {
            this.regionForm = this.deepCopy(rows[index]);
            this.showEditRegionDialog = true;
        },
        addRegion() {
            this.saveLoading = true;
            this.$http.post(global.SERVER_URL + "/Region/Add", this.regionForm).then(data => {
                if (data.body.IsOk === true) {
                    this.Query();
                    this.showAddRegionDialog = false;
                    this.saveLoading = false;
                    return this.$message.success(data.body.Msg);
                } else
                    this.$message.error(data.body.Msg);
            }, response => {
                console.info(response);
            })
        },
        editRegion() {
            this.saveLoading = true;
            this.$http.post(global.SERVER_URL + "/Region/Edit", this.regionForm).then(data => {
                if (data.body.IsOk === true) {
                    this.saveLoading = false;
                    this.showEditRegionDialog = false;
                    this.Query();
                    return this.$message.success(data.body.Msg);
                } else
                    this.$message.error(data.body.Msg);
            }, response => {
                console.info(response);
            })
        },
        delRegion(index, rows) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                NProgress.start();
                this.$http.post(global.SERVER_URL + "/Region/Del/" + rows[index].Id).then(data => {
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
        batchDelRegion() {
            var delIds = [];
            for (var item in this.multipleSelection)
                delIds.push(this.multipleSelection[item].Id);

            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                NProgress.start();
                this.$http.post(global.SERVER_URL + "/Region/Del", { Ids: delIds }).then(data => {
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