<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="学校">
      <el-input v-model="form.school" />
    </el-form-item>
    <el-form-item label="部门">
      <el-input v-model="form.depart" />
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model="form.major" />
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.studentName" />
    </el-form-item>
    <el-form-item label="学号">
      <el-input v-model="form.studentNo" />
    </el-form-item>
     <el-form-item label="班级">
      <el-input v-model="form.classinfo" />
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from "element-plus";
import api from "@/http/stu_controller.js";
export default {
  props: ["flag", "id"],
  created() {
    if (!this.flag) {
      // 修改操作 拿到 id 获取单条数据
      api.One(this.id).then((res) => {
        this.form = res.data.data.student
      });
    } else {
      // 不管是不是修改 都重置一下表单
      this.form = {
        school: "", //学校
        depart: "", //部门
        major: "", //专业
        studentName: "", //姓名
        studentNo: "", //学号
      };
    }
  },
  data() {
    return {
      json: {
        current: 1,
        size: 99,
      },
      form: {
        school: "", //学校
        depart: "", //部门
        classinfo:"",//班级
        major: "", //专业
        studentName: "", //姓名
        studentNo: "", //学号
      },
    };
  },
  methods: {
    submit() {
      this.id === "" || this.id === undefined
        ? api.Add(this.form)
        : api
            .Edit(this.form)
            .then((res) => {
              ElMessage({
                message: res.data.msg,
                type: "success",
              });
              this.form = {
                nickname: "", //昵称
                username: "", //账号
                password: "", //密码
                phone: "", //手机号码
                status: "1", //启用状态 默认启用
              };
            })
            .catch((err) => {
              ElMessage({
                message: "提交数据不能为空,或者数据重复",
                type: "error",
              });
            });
    },
  },
};
</script>

<style>
</style>