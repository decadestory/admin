<template>
  <div id="app">
    <el-menu theme="dark" mode="horizontal" style="line-height: 60px;">
      <el-submenu index="1" logout>
        <template slot="title"><i class="el-icon-setting"></i>Jerry </template>
        <el-menu-item index="2-1"><i class="el-icon-setting"></i>退出登录</el-menu-item>
      </el-submenu>
      <div logo><img src="./assets/logo.png" height="30"> EAdmin</div>
    </el-menu>
    <div main>
      <div main-menu>
        <el-menu default-active="2" vmenu @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
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
  
  [logout] {
    float: right !important;
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
  
  #app {
    height: 100%;
  }
</style>