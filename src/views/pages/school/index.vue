<template>
  <div class="use_box">
    <!-- 头部搜索 -->
    <el-input
      @input="search"
      v-model="searchVal"
      placeholder="请输入学校名称"
    />
    <el-space style="margin: 10px 0px" :size="size" spacer="|">
      <el-button @click="add"> 新增信息 </el-button>
    </el-space>
    <el-table
      height="800px"
      border
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column align="center" prop="schoolName" label="学校名称" />
      <el-table-column align="center" prop="province" label="省" />
      <el-table-column align="center" prop="city" label="市/县" />
      <el-table-column align="center" prop="longitude" label="经度" />
      <el-table-column align="center" prop="latitude" label="纬度" />
      <el-table-column align="center" prop="enable" label="启用状态0/1" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="address" label="学校地址" />
      <el-table-column align="center" :show-overflow-tooltip="true" prop="description" label="学校说明" />
      <el-table-column align="center" prop="phone" width="400px" label="操作">
        <template #default="scope">
          <el-button size="small" type="success" @click="update_user(scope.row)"
            >修改</el-button
          >
          <el-popconfirm
            @confirm="delete_school(scope.row)"
            title="确定删除此学校信息吗?"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增对话框 -->
    <el-dialog v-model="addOpen" v-if="addOpen" title="操作" width="30%">
      <add :flag="isFlag" :id="id" ref="childComponent" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addOpen = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import add from "./add/index.vue";
import api from "@/http/sch_controller.js";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: {
    add,
  },
  data() {
    return {
      json: {
        current: 1,
        size: 99,
      },
      searchText: "",
      levels: [], //会员列表
      currentPage: 1, // 当前页码
      pageSize: 6, // 每页显示的数据条数
      total: 0,
      tableData: [],
      editDialogVisible: false,
      editItem: {},
      selectedRow: null,
      // 其他的 data 属性
      addOpen: false,
      isFlag: true, //新增/修改
      id: "",
      searchVal: "", //搜索条件
      tableDateCopy: [], //表格数据备份
      tagTable: [], //tag表格数据
      user_id: "", //要修改tag的会员id
      tag_id: "", //要绑定tag的id
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getLevelName(id) {
      let name = "";
      this.levels.forEach((x) => {
        if (x.id == id) {
          name = x.name;
        }
      });
      return name;
    },
    //新增方法
    add() {
      this.isFlag = true;
      this.addOpen = true;
    },
    //筛选
    search() {
      if (this.searchVal === "") {
        this.tableData = this.tableDateCopy;
        return;
      }
      let newDate = [];
      this.tableDateCopy.forEach((x) => {
        if (x.schoolName.indexOf(this.searchVal) !== -1) {
          newDate.push(x);
        }
      });
      this.tableData = newDate;
    },
    //修改会员
    update_user(row) {
      this.id = row.id;
      this.isFlag = false;
      this.addOpen = true;
    },
    //删除会员
    delete_school(row) {
      api.Del(row.id).then((res) => {
        ElMessage({
          message: "删除成功!",
          type: "success",
        });
        this.getList();
      });
    },
    getList() {
      api
        .All()
        .then((res) => {
          this.tableData = res.data.data.schools
          this.tableDateCopy = res.data.data.schools
        })
        .catch((err) => {
          ElMessage({
            message: "查询失败,请稍后重试!",
            type: "error",
          });
        });
    },
    onSubmit() {
      this.$refs.childComponent.submit();
      this.addOpen = false;
      setTimeout(() => {
        this.getList();
      }, 100);
    },
  },
};
</script>

<style lang="less" scoped>
.use_box {
  width: 100%;
  height: 100%;
}
</style>