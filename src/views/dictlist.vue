<template>
  <div class="dict">
    <navlist msg="系统管理" msg2="字典管理" />

    <!--搜索栏 -->
    <el-form :inline="true" class="demo-form-inline search">
      <el-form-item label="字典名称">
        <el-input
          v-model="dname"
          placeholder="输入字典名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio v-model="radio" label="1">正常</el-radio>
        <el-radio v-model="radio" label="2">禁用</el-radio>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" icon="el-icon-refresh-left" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
      <el-button type="primary"  icon="el-icon-plus"  style="float: left"  @click="addition" >添加字典</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column
          prop="dname"
          label="字典名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="code" label="code" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态"> 
            <template slot-scope="scope">
                <span v-show="scope.row.status == '1'">正常</span>
                <span v-show="scope.row.status == '2'">禁用</span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="time" label="创建时间"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
             <el-link :underline="false" style="margin:10px" class="el-icon-edit">编辑</el-link>
             <el-link :underline="false" style="margin:10px" class="el-icon-s-operation">列表</el-link>
             <el-link :underline="false" style="margin:10px" class="el-icon-delete" @click="del(scope.row,scope.$index)">删除</el-link>
          </template>
        </el-table-column>
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

    <!-- 弹出框 -->
      <el-dialog title="添加角色"  :visible.sync="dialogVisible" width="30%"   v-show="dialogVisible">
                        
            <el-form ref="form" :model="form" label-width="80px"  >
                <el-form-item label="字典名称">
                    <el-input v-model="form.dname"></el-input>
                </el-form-item>
                <el-form-item label="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                 <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
        dialogVisible: false,
      radio: "1",
      dname: "",
      // formInline: {
      //   options: [
      //     {
      //       value: "1",
      //       label: "系统日志",
      //     },
      //     {
      //       value: "2",
      //       label: "登陆日志",
      //     },
      //     {
      //       value: "3",
      //       label: "操作日志",
      //     },
      //   ],
      // },
      value: "",
        form:{
            dname: "活动类型",
            code: "sys_activity_type",
            status: "1",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        },
      tableData:[],
      tableData1: [
        {
            dname: "tableData1",
            code: "sys_activity_type",
            status: "1",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        },
        {
            dname: "tableData1",
            code: "sys_activity_type",
            status: "1",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        },
        {
            dname: "tableData1",
            code: "sys_customers_source",
            status: "2",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        }
      ],tableData2: [
        {
            dname: "tableData2",
            code: "sys_activity_type",
            status: "1",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        },
        {
            dname: "tableData2",
            code: "sys_activity_type",
            status: "1",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        },
        {
            dname: "tableData2",
            code: "sys_customers_source",
            status: "2",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        }
      ],tableData3: [
        {
            dname: "tableData3",
            code: "sys_activity_type",
            status: "1",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        },
        {
            dname: "tableData3",
            code: "sys_activity_type",
            status: "1",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        },
        {
            dname: "tableData3",
            code: "sys_customers_source",
            status: "2",
            remark: "备注备注",
            time: "2021-07-14 10:00",
        }
      ],
      currentPage4: 1,
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
  mounted(){
    // let id = this.$route.query.id;  //接收通过query传来的参数

    let id = this.$route.params.id;   //接收通过params传来的参数
    if(id === "1"){
      this.tableData = this.tableData1;
    }else if(id === "2"){
      this.tableData = this.tableData2;
    }else{
      this.tableData = this.tableData3;
    }
    
  },
  inject: ["myrefresh"],
  methods: {
      del(row,index){
          console.log(index);
          this.tableData.splice(index,1);
      },
      confirm(){
          this.form.time = new Date().toLocaleString()
          this.tableData.push(JSON.parse(JSON.stringify(this.form)));
          this.dialogVisible=false;
        
      },
      colse(){
          for(let i in this.form){
              this.form[i]="";
          }
      },
    addition() {
        // console.log("添加字典按键");
        this.dialogVisible=true;
        this.colse();
    },
    reset() {
      // 重置方法
      this.myrefresh();
    },
    onSubmit() {
      console.log(this.value);
      let s_arr = [];
      this.tableData.map((i, s) => {
        if (i.dname === this.dname && i.status === this.radio) {
          s_arr.push(i);
        }
        this.tableData = s_arr;
      });
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
.dict {
  margin: -20px;
}
.search {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search > * {
  margin-left: 20px;
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
.el-dialog .el-form{
    padding: 20px;
    box-sizing: border-box;
    width: 90%;
}
.el-dialog{
    width: 200px;
}
.el-dialog .el-form-item{
    margin: 20px auto; 
}
.table {
  background-color: #fff;
  width: 80vw;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px;
}

.el-pagination {
  padding: 20px 0;
  float: right;
  margin-right: 50px;
}
</style>