<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="佐证材料">
      <el-input v-model="form.attachment" />
    </el-form-item>
    <el-form-item label="课题编号">
      <el-input v-model="form.subjectNo" />
    </el-form-item>
    <el-form-item label="课题名称">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="课题类型">
      <el-input v-model="form.type" />
    </el-form-item>
    <el-form-item label="课题来源">
      <el-input v-model="form.origin" />
    </el-form-item>
    <el-form-item label="课题等级">
      <el-input v-model="form.level" />
    </el-form-item>
    <el-form-item label="课题费用">
      <el-input v-model="form.fee" />
    </el-form-item>
    <el-form-item label="课题周期">
      <el-date-picker
        v-model="form.period"
        type="date"
        placeholder="Pick a day"
      />
    </el-form-item>
    <el-form-item label="参与者">
      <el-input v-model="form.participant" />
    </el-form-item>
  </el-form>
</template>

<script>
import { ElMessage } from "element-plus";
import api from "@/http/sub_controller.js";
export default {
  props: ["flag", "id"],
  created() {
    if (!this.flag) {
      // 修改操作 拿到 id 获取单条数据
      api.One(this.id).then((res) => {
        this.form = res.data.data.subject;
      });
    } else {
      // 不管是不是修改 都重置一下表单
      this.form = {
        name: "",
        origin: "",
        type: "",
        level: "",
        period: "",
        fee: "",
        participant: "",
        finished: "",
        attachment: "",
        subjectNo: "",
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