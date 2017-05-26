<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" v-on:click="add">添加</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="infos" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="login_name" label="登录名" sortable>
            </el-table-column>
            <el-table-column prop="real_name" label="真实姓名" sortable>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" sortable>
            </el-table-column>
            <el-table-column prop="birthday" :formatter="formatDate" label="生日" sortable>
            </el-table-column>
            <el-table-column prop="age" label="年龄" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="warning" size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="del(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:left;"></el-pagination>
        </el-col>
    </section>
</template>
<script>
    import ElCol from "element-ui/packages/col/src/col";
    export default {
        components: {ElCol}, data(){
            return {
                filters:{
                    name:'',
                },
                infos:[],
                listLoading: false,
                page:1,
                total:0
            };
        },
        methods:{
                search:function(){
                    var _self =this;
                    _self.listLoading=true;
                    this.$http.get('/api/users/p',{
                        params:{
                            name:_self.filters.name,
                            page:_self.page,
                            pagesize:10
                        }
                    }).then((response)=>{
                        _self.infos=response.data.list;
                        _self.total=response.data.total;
                        _self.listLoading=false;
                    },(response)=>{

                    }).catch((response)=>{});

                },
                add:function(){
                    this.$router.push('/useradd')
                },
                edit:function(index,row){
                    this.$router.push(
                        { path: '/useradd', query: { uuid: row.uuid }}
                    )
                },
                del:function(index,row){
                    var _self =this;
                    this.$confirm('确定删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _self.$http.delete('/api/users/'+row.uuid).then((res)=>{
                            _self.search();
                            _self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        },(res)=>{
                            _self.$message({
                                type: 'srror',
                                message: '删除失败!'
                            });
                        }).catch();



                    });


                },
                handleCurrentChange:function(p){
                    this.page = p;
                    this.search();
                },
                formatDate: function (row, column) {
                    if (row.birthday == '') return '';
                    var d = new Date(row.birthday);
                    return d.getFullYear() + "-" + (d.getMonth()+1) + "-"+d.getDate();
                }
        },
        mounted() {
            this.search();
        }
    }
</script>