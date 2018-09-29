<template>
    <el-container>
        <el-main>
            <el-form  label-position="right"  inline="true" label-width="100px" :model="user" class="demo-form-inline"  status-icon :rules="rules2" ref="ruleForm2">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" style="width:200px" v-model="user.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" style="width:200px" v-model="user.password" auto-complete="off"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
    

<script>
export default {
    name: 'Login',
    data(){
        return{
            loginUrl:'http://localhost:8989/user/login',
            ruleForm2: {
                pass: '',
                checkPass: '',
                age: ''
            }, 
            user:{
                username:'',
                password:''
            }         
        }
    },
    created(){},
    methods:{
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        submitForm(){
            this.$axios.post(url, {username: this.loginForm.username,password: this.loginForm.pass})
            .then(res => {
                console.log(res.data);
                this.$message.success('登录成功');
                let data = res.data;
                //根据store中set_token方法将token保存至localStorage/sessionStorage中，
                data["Authentication-Token"];
                //获取token的value值
                this.$store.commit('set_token', data["Authentication-Token"]); 
                if (store.state.token) {
                    this.$router.push('/')
                    console.log(store.state.token)
                }else {
                    this.$router.replace('/login');
                } }).catch(error => {
                    // this.$message.error(error.status)
                    //this.loading = false
                    //this.loginBtn = "登录"
                    this.$message.error('账号或密码错误');
                    // console.log(error) 
                })
        }
    }
}
</script>

<style scoped>
    
    .el-main {
        width:1000px;
        height:530px;
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        background: url('~@/assets/img/back2.jpg') center center no-repeat;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
      }
    #app {
      font-family: '微软雅黑';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: left;
      color: #2c3e50;
    }
    a{text-decoration:none}
</style>
