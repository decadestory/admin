<template>
  <el-form id="login" :model="loginform" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="Account">
      <el-input type="text" v-model="loginform.Account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="Pwd">
      <el-input type="password" v-model="loginform.Pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="Submit">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import NProgress from 'nprogress'

  export default {
    name: 'login',
    data() {
      return {
        loginform: {
          Account: 'admin',
          Pwd: 'admin'
        },
        checked: true
      };
    },
    methods: {
      Submit() {
        NProgress.start();
         this.$http.post(global.SERVER_URL + "/SysUser/Login", this.loginform).then(data => {
          NProgress.done();
          if (data.body.IsOk === true) {
             var _this = this;
            _this.$router.replace('/dashbord');
          } else
            this.$message.error(data.body.Msg);
        }, response => {
          console.info(response);
        })
      }
    }
  }

</script>
<style scoped>
  .el-menu,
  [main-menu],
  [c-title] {
    display: none;
  }

  [main-container] {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

<style scoped>
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 120px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .loginform {
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
</style>