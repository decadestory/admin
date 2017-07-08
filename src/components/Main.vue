<template>
  <div id="home">
    <el-menu theme="dark" mode="horizontal" style="line-height: 60px; border-radius:0;">
      <el-submenu index="1" logout>
        <template slot="title">
          <i class="el-icon-setting"></i>{{curUser}} </template>
        <el-menu-item index="2-1" @click="exit">
          <i class="el-icon-setting"></i>退出登录</el-menu-item>
      </el-submenu>
      <a logo href="/">
        <img src="../assets/logo.png" height="30">统一权限管理系统</a>
    </el-menu>
    <div main>
      <div main-menu>
        <el-menu :router="true" default-active="/home" @select="setTitle" vmenu>
          <el-menu-item index="/dashbord">
            <i class="fa fa-heartbeat"></i> 仪表盘
          </el-menu-item>

           <el-menu-item index="/user">
            <i class="fa fa-heartbeat"></i> 用户管理
          </el-menu-item>
          <el-menu-item index="/role">
            <i class="fa fa-address-card-o"></i> 角色管理</el-menu-item>
          <el-menu-item index="/permission">
            <i class="fa fa-street-view"></i> 权限管理</el-menu-item>
          <el-menu-item index="/region">
            <i class="fa fa-map-o"></i> 城市区域管理</el-menu-item>
          <el-menu-item index="6">
            <i class="fa fa-cog"></i> 配置中心</el-menu-item>
          <el-submenu index="/sysUser">
            <template slot="title">
              <i class="fa fa-user-circle-o"></i> 系统管理</template>
            <el-menu-item-group>
              <el-menu-item index="/sysUser">
                <i class="fa fa-user-circle-o"></i> 系统用户管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div c-title>{{mainTitle}}</div>
      <div main-container>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data() {
    return {
      mainTitle: "",
      curUser: ""
    };
  },
  mounted() {
    this.mainTitle = this.$route.name;
    if (this.$route.name === undefined) {
      this.$router.replace('/dashbord')
      this.mainTitle = "仪表盘";
    }
  }, created() {
    // var _this = this;
    // var cookie = this.$cookie.get('.epms');
    // console.info(cookie);
    // if (cookie == null) return _this.$router.replace('/login');

    // this.$http.post(global.SERVER_URL + "/SysUser/CurUser", null).then(data => {
    //   if (data.body.IsOk === true) {
    //     this.curUser = data.body.Data.Account;
    //   } else
    //     _this.$router.replace('/login');
    // });
  },
  methods: {
    setTitle() {
      var _this = this;
      setTimeout(function () {
        console.info(_this.$route);
        _this.mainTitle = _this.$route.name;
      }, 100);
    },
    exit() {
      var _this = this;
      this.$http.post(global.SERVER_URL + "/SysUser/Exit", null).then(data => {
        this.$cookie.delete('.epms');
        this.$router.replace('/login')
      });


    }
  }
}

</script>

<style scope>
[logout] {
  float: right !important;
  right: 20px;
}

[logo] {
  float: left;
  margin-left: 20px;
  color: #bfcbd9;
  font-weight: bold;
  font-size: 18px;
}

[logo] img {
  vertical-align: middle;
  margin-right: 7px;
}

[vmenu] {
  min-height: 100%;
}

[main] {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

[main-menu] {
  width: 250px;
  height: 100%;
  overflow-y: auto;
}

[main-container] {
  position: absolute;
  top: 50px;
  right: 0;
  left: 250px;
  bottom: 0;
  padding: 20px;
  overflow: auto;
}
</style>