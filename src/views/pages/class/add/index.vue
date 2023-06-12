<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="学校名称">
      <el-input v-model="form.school" />
    </el-form-item>
    <el-form-item label="学院名称">
      <el-input v-model="form.major" />
    </el-form-item>
    <el-form-item label="专业">
      <el-input v-model="form.depart" />
    </el-form-item>
    <el-form-item label="班级">
      <el-input v-model="form.name" />
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from "element-plus";
import api from "@/http/cls_controller.js";
export default {
  props: ["flag", "id"],
  created() {
    if (!this.flag) {
      // 修改操作 拿到 id 获取单条数据
      api.One(this.id).then((res) => {
        this.form = res.data.data.classinfo;
      });
    } else {
      // 不管是不是修改 都重置一下表单
      this.form = {
        school: "",
        depart: "",
        major: "",
        name: "",
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
        school: "",
        depart: "",
        major: "",
        name: "",
      },
    };
  },
  methods: {
    submit() {
      if (this.flag) {
        api
          .Add(this.form)
          .then((res) => {
            ElMessage({
              message: res.data.msg,
              type: "success",
            });
          })
          .catch((err) => {
            ElMessage({
              message: "提交数据学校名称重复",
              type: "error",
            });
          });
      } else {
        api
          .Edit(this.form)
          .then((res) => {
            ElMessage({
              message: res.data.msg,
              type: "success",
            });
          })
          .catch((err) => {
            ElMessage({
              message: "提交数据学校名称重复",
              type: "error",
            });
          });
      }

      this.form = {
        school: "",
        depart: "",
        major: "",
        name: "",
      };
    },
  },
};
</script>

<style>
</style>