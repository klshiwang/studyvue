<template>
  <div class="log">
    <navlist msg="系统管理" msg2="日志管理" />

    <!--搜索栏 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline search">
      <el-form-item label="日志类型">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in formInline.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="日志标题">
        <el-input v-model="formInline.user" placeholder="日志标题"></el-input>
      </el-form-item>

      <el-form-item label="时间范围">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button >
      </el-form-item>
      <el-form-item>
        <el-button type="default" icon="el-icon-refresh-left">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column
          prop="title"
          label="日志标题"
          width="180"
        ></el-table-column>
        <el-table-column prop="type" label="日志类型" width="180">
          <template slot-scope="scope">
            <span v-show="scope.row.type == 1">系统日志</span>
            <span v-show="scope.row.type == 2">登陆日志</span>
            <span v-show="scope.row.type == 3">操作日志</span>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="日志内容"> </el-table-column>
        <el-table-column prop="IP" label="日志ip"> </el-table-column>
        <el-table-column prop="time" label="创建时间"> </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        options: [
          {
            value: 1,
            label: "系统日志",
          },
          {
            value: 2,
            label: "登陆日志",
          },
          {
            value: 3,
            label: "操作日志",
          },
        ],
      },
      value: "",

      tableData: [
        {
          title: "系统登陆",
          type: 1,
          text: "宏方红登陆系统。",
          IP: "192.168.0.1",
          time: "2021-07-14 10:00",
        },
        {
          title: "系统登陆",
          type: 1,
          text: "宏方红登陆系统。",
          IP: "192.168.0.1",
          time: "2021-07-14 10:00",
        },
        {
          title: "系统登陆",
          type: 1,
          text: "宏方红登陆系统。",
          IP: "192.168.0.1",
          time: "2021-07-14 10:00",
        },
        {
          title: "系统登陆",
          type: 3,
          text: "宏方红登陆系统。",
          IP: "192.168.0.1",
          time: "2021-07-14 10:00",
        },
        {
          title: "系统登陆",
          type: 2,
          text: "宏方红登陆系统。",
          IP: "192.168.0.1",
          time: "2021-07-14 10:00",
        },
      ],
      currentPage4: 4,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style scoped>
.log {
  margin: -20px;
}
.search {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-form {
  background-color: #fff;
  width: 80vw;
  margin: 20px auto;
  padding: 10px 0;
}
.el-form-item {
  margin-bottom: 0;
}
.table {
  background-color: #fff;
  width: 80vw;
  margin: 0 auto;
  overflow: hidden;
}

.el-pagination {
  padding: 20px 0;
  float: right;
  margin-right: 50px;
}
</style>