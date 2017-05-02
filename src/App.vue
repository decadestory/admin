<template>
  <div id="app">
    <el-menu theme="dark" mode="horizontal" style="line-height: 60px; border-radius:0;">
      <el-submenu index="1" logout>
        <template slot="title"><i class="el-icon-setting"></i>Jerry </template>
        <el-menu-item index="2-1"><i class="el-icon-setting"></i>退出登录</el-menu-item>
      </el-submenu>
      <div logo ><img src="./assets/logo.png" height="30">EAdmin</div>
    </el-menu>
    <div main>
      <div main-menu>
        <el-menu default-active="1" vmenu router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>首页</template>
            <el-menu-item-group>
              <template slot="title">Dashbord</template>
              <el-menu-item index="/home">登录统计 </el-menu-item>
              <el-menu-item index="1-2">业务统计</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="管理中心">
              <el-menu-item index="1-3">管理策略</el-menu-item>
            </el-menu-item-group> 
            <el-submenu index="1-4">
              <template slot="title">管理设置</template>
              <el-menu-item index="1-4-1">管理内容</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="/users"><i class="el-icon-menu"></i>用户管理</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>角色管理</el-menu-item>
          <el-menu-item index="4"><i class="el-icon-setting"></i>权限管理</el-menu-item>
          <el-menu-item index="5"><i class="el-icon-setting"></i>城市区域管理</el-menu-item>
          <el-menu-item index="6"><i class="el-icon-setting"></i>配置中心</el-menu-item>
          <el-menu-item index="7"><i class="el-icon-setting"></i>系统管理</el-menu-item>
        </el-menu>
      </div>
      <div c-title>活动列表</div>
      <div main-container>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components:{}
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
    margin-right: 10px;
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
    position: fixed;
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
    position: fixed;
    top: 100px;
    right: 0;
    left: 250px;
    bottom: 0;
    padding: 20px;
    overflow: auto;
  }
  
  [bb-top] {
    margin-bottom: 20px;
  }
  
  [epager] {
    margin-top: 20px;
    padding: 0;
    display: block;
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
    z-index: 999;
  }
  
  .el-form--inline .el-form-item__label {
    width: 70px;
  }
  
  [list-btn] {
    margin-bottom: 10px;
  }
</style>