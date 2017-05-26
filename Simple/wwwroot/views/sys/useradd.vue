<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:90%;min-width:600px;">
        <el-form-item label="uuid" style="display: none">
            <el-input v-model="form.uuid"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="login_name">
            <el-input v-model="form.login_name"></el-input>
        </el-form-item>
        <el-form-item label="真实名" prop="real_name">
            <el-input v-model="form.real_name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
            <el-date-picker 
                            v-model="form.birthday"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
            <el-input-number v-model="form.age" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button @click.native.prevent="onSubmit" type="primary">保存</el-button>
            <el-button @click.native.prevent="toList">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                listLoading: false,
                form: {
                    uuid:'',
                    login_name: '',
                    real_name: '',
                    email: '',
                    birthday: '',
                    age:0
                },
                rules:{
                    login_name:[
                        {required: true, message: '请输入登录名', trigger: 'blur' },
                        {max: 30, message: '最大30个字符', trigger: 'blur' }
                    ],
                    real_name:[
                        { max: 30, message: '最大30个字符', trigger: 'blur' }
                    ],
                    email:[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
                    birthday:[
                        { type: 'date', message: '请选择日期', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                var _self = this;
                this.$refs['form'].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
                if (this.form.uuid == '') {
                    this.$http.post('/api/users', this.form).then((res) => {
                        _self.$alert('保存成功', '提示', {
                            type: 'success',
                            confirmButtonText: '确定',
                            callback: action => {
                                _self.toList();
                            }
                        });
                    });
                } else {
                    this.$http.put('/api/users', this.form).then((res) => {
                        _self.$alert('保存成功', '提示', {
                            type:'success',
                            confirmButtonText: '确定',
                            callback: action => {
                                _self.toList();
                            }
                        });
                    });
                }
                
            },
            toList(){
                this.$router.push('/users')
            },
            init(uuid){
                var _self = this;
                this.$http.get('/api/users/'+uuid).then((res)=>{
                    _self.form = res.data;
                    _self.listLoading = false;
                });
            },
        },
        mounted() {
            if(this.$route.query&&this.$route.query.uuid){
                this.listLoading=true;
                this.init(this.$route.query.uuid);
            }

        }
    }

</script>