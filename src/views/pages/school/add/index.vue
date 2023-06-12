<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="学校名称">
      <el-input v-model="form.schoolName" />
    </el-form-item>
    <el-form-item label="省">
      <el-input v-model="form.province" />
    </el-form-item>
    <el-form-item label="市">
      <el-input v-model="form.city" />
    </el-form-item>
    <el-form-item label="县">
      <el-input v-model="form.area" />
    </el-form-item>
    <el-form-item label="经度">
      <el-input v-model="form.longitude" />
    </el-form-item>
    <el-form-item label="纬度">
      <el-input v-model="form.latitude" />
    </el-form-item>
    <el-form-item label="启用状态0/1">
      <el-input v-model="form.enable" />
    </el-form-item>
    <el-form-item label="学校地址">
      <el-input v-model="form.address" />
    </el-form-item>
    <el-form-item label="学校说明">
      <el-input v-model="form.description" />
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from "element-plus";
import api from "@/http/sch_controller.js";
export default {
  props: ["flag", "id"],
  created() {
    if (!this.flag) {
      // 修改操作 拿到 id 获取单条数据
      api.One(this.id).then((res) => {
        this.form = res.data.data.school;
      });
    } else {
      // 不管是不是修改 都重置一下表单
      this.form = {
        schoolName: "", //学校名称
        province: "", //省
        area: "", //县
        enable: "", //启用状态
        description: "", //学校说明
        longitude: "", //经度
        latitude: "", //纬度
        address: "", //地址
        city: "", //市
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
        schoolName: "", //学校名称
        province: "", //省
        area: "", //县
        enable: "", //启用状态
        description: "", //学校说明
        longitude: "", //经度
        latitude: "", //纬度
        address: "", //地址
        city: "", //市
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
        schoolName: "", //学校名称
        province: "", //省
        area: "", //县
        enable: "", //启用状态
        description: "", //学校说明
        longitude: "", //经度
        latitude: "", //纬度
        address: "", //地址
        city: "", //市
      };
    },
  },
};
</script>

<style>
</style>