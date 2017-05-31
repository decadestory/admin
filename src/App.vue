<template>
  <div id="app">
    <el-menu theme="dark" mode="horizontal" style="line-height: 60px; border-radius:0;">
      <el-submenu index="1" logout>
        <template slot="title"><i class="el-icon-setting"></i>Jerry </template>
        <el-menu-item index="2-1"><i class="el-icon-setting"></i>退出登录</el-menu-item>
      </el-submenu>
      <a logo href="/"><img src="./assets/logo.png" height="30">统一权限管理系统</a>
    </el-menu>
    <div main>
      <div main-menu>
        <el-menu :router="true" default-active="/home" @select="setTitle" vmenu>
          <el-menu-item index="/home"><i class="fa fa-heartbeat"></i> 首页</el-menu-item>
          <el-submenu index="/user">
            <template slot="title"><i class="fa fa-user-circle-o"></i> 用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="/user"><i class="fa fa-bar-chart"></i> 用户列表 </el-menu-item>
              <el-menu-item index="/usercity"><i class="fa fa-bar-chart"></i> 用户城市管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/role"><i class="fa fa-address-card-o"></i> 角色管理</el-menu-item>
          <el-menu-item index="/permission"><i class="fa fa-street-view"></i> 权限管理</el-menu-item>
          <el-menu-item index="5"><i class="fa fa-map-o"></i> 城市区域管理</el-menu-item>
          <el-menu-item index="6"><i class="fa fa-cog"></i> 配置中心</el-menu-item>
          <el-menu-item index="7"><i class="fa fa-tasks"></i> 系统管理</el-menu-item>
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
    name: 'app',
    data() {
      return {
        mainTitle: "首页"
      };
    },
     mounted() {
        this.mainTitle = this.$route.name;
     },
    methods:{
      setTitle(){
        var _this = this;
        setTimeout(function(){
          console.info(_this.$route);
          _this.mainTitle = _this.$route.name;
        },100);
      }
    }
  }

</script>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  a {
    text-decoration: none;
  }

  #app {
    height: 100%;
  }

  [logout] {
    float: right !important;
    right:20px;
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