<template>
  <div class="layout">
    <!-- 用户管理主页面 布局 -->
    <!-- 菜单栏栏 -->
    <div class="menu_">
      <div class="profile">
        <h3>后台管理系统</h3>
      </div>
      <el-menu router default-active="st_index" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>学生管理</span>
          </template>
          <el-menu-item index="/st_index">
            <el-icon><document /></el-icon>
            <span>学生信息表</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/sh_index">
          <el-icon><document /></el-icon>
          <span>学校管理</span>
        </el-menu-item>
        <el-menu-item index="/cs_index">
          <el-icon><setting /></el-icon>
          <span>班级管理</span>
        </el-menu-item>
        <el-menu-item index="/sci_index">
          <el-icon><setting /></el-icon>
          <span>科研管理</span>
        </el-menu-item>
        <el-menu-item @click="exit">
          <el-icon><Close /></el-icon>
          <span>退出登录</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 主体区域 -->
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  methods: {
    exit() {
      localStorage.removeItem("status");
      this.$router.push({ name: "login" });
      ElMessage({
        message: "退出成功!",
        type: "success",
      });
    },
  },
};
</script>

<style lang="less">
.layout {
  width: 100%;
  height: calc(100vh);
  display: flex;
  .menu_ {
    width: 300px;
    height: 100%;
    .profile {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #409EFF;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
}
</style>