<template>
  <div class="user">
    <navlist msg="系统管理" msg2="用户管理" />

    <!--搜索栏 -->
    <el-form :inline="true"  class="demo-form-inline search">
      <el-form-item label="用户角色">
        <el-select v-model="search.role" placeholder="请选择用户角色">
          <el-option v-for="item in formInline.options1" :key="item.value"  :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户姓名">
        <el-input  v-model="search.realName" placeholder="输入用户姓名"></el-input>
      </el-form-item>

      <el-form-item label="账号状态">
        <el-select v-model="search.status" placeholder="请选择账号状态">
          <el-option v-for="item in formInline.options2" :key="item.value"  :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" icon="el-icon-refresh-left" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
      <el-button type="primary"  icon="el-icon-plus"  style="float: left"  @click="addition" >添加账号</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="role" label="角色" width="120">
          <template slot-scope="scope">
              <span v-show="scope.row.role == '1'" style="color:green">普通用户</span>
              <span v-show="scope.row.role == '2'" style="color:red">高级用户</span>
              <span v-show="scope.row.role == '3'" style="color:#f90">管理员</span>
          </template>
        </el-table-column>
        <el-table-column prop="organ" label="机构" width="120"></el-table-column>
        <el-table-column prop="type" label="用户类型"> 
             <template slot-scope="scope">
                <span v-show="scope.row.type == '1'">普通用户</span>
                <span v-show="scope.row.type == '2'">高级用户</span>
                <span v-show="scope.row.type == '3'">管理员</span>
            </template>
        </el-table-column>
        <el-table-column prop="uName" label="用户名" width="150"></el-table-column>
        <el-table-column prop="realName" label="姓名" width="150"></el-table-column>
        <el-table-column prop="contact" label="联系人" width="150"></el-table-column>
        <el-table-column prop="tel" label="联系电话" width="150"></el-table-column>
        <el-table-column prop="status" label="状态"> 
            <template slot-scope="scope">
                <span v-show="scope.row.status == '1'">正常</span>
                <span v-show="scope.row.status == '2'">禁用</span>
                <span v-show="scope.row.status == '3'">锁定</span>
            </template>
        </el-table-column>
        
        <el-table-column prop="lastTime" label="最后登陆时间"> </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
             <el-link :underline="false" style="margin:10px" class="el-icon-edit" @click="edit(scope.row,scope.$index)">编辑</el-link>
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
      <el-dialog title="添加账号"  :visible.sync="dialogVisible" width="30%">
                        
            <el-form ref="form" :model="form" label-width="80px"  >
                <el-form-item label="角色">
                    <el-select v-model="form.role" placeholder="请选择" style="width:100%">
                        <el-option v-for="item in formInline.options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="用户类型">
                    <el-select v-model="form.type" placeholder="请选择" style="width:100%">
                        <el-option v-for="item in formInline.options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="用户名">
                    <el-input v-model="form.uName"></el-input>
                </el-form-item>

                <el-form-item label="姓名">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="出生日期">
                    <el-date-picker v-model="form.bornDate" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
                </el-form-item>

                <el-form-item label="联系人">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>

                <el-form-item label="联系电话">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>


                <el-form-item label="用户状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="1">正常</el-radio>
                        <el-radio label="2">禁用</el-radio>
                        <el-radio label="3">锁定</el-radio>
                    </el-radio-group>
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
      search:{
        role:"",
        realName:"",
        status:""
      },
      dialogVisible: false,
      radio: "1",
      dname: "",
      formInline: {
        options1: [
          {
            value: "1",
            label: "普通用户",
          },
          {
            value: "2",
            label: "高级用户",
          },{
            value: "3",
            label: "管理员",
          }
        ],
        options2: [
          {
            value: "1",
            label: "正常",
          },
          {
            value: "2",
            label: "禁用",
          },{
            value: "3",
            label: "锁定",
          }
        ]
      },
     
      form:{
            role: "1",
            organ: "有关部门1",
            type:"2",
            uName:"youguanbumen1",
            realName: "张一",
            contact:"张小一",
            tel:"1999999999",
            status:"1",
            lastTime:"2021-7-15 14:27:46",
            gender:"1",
            bornDate:"2000-1-1"
      },
      tableData: [
        {
            role: "1",
            organ: "有关部门1",
            type:"2",
            uName:"youguanbumen1",
            realName: "张一",
            contact:"张小一",
            tel:"1999999999",
            status:"1",
            lastTime:"2021-7-15 14:27:46",
            gender:"1",
            bornDate:"2000-1-1"
        },{
            role: "2",
            organ: "有关部门2",
            type:"2",
            uName:"youguanbumen2",
            realName: "张二",
            contact:"张小二",
            tel:"1999999999",
            status:"3",
            lastTime:"2021-7-15 14:27:46",
            gender:"1",
            bornDate:"2000-1-1"
        },{
            role: "3",
            organ: "有关部门3",
            type:"2",
            uName:"youguanbumen3",
            realName: "张三",
            contact:"张小三",
            tel:"1999999999",
            status:"2",
            lastTime:"2021-7-15 14:27:46",
            gender:"1",
            bornDate:"2000-1-1"
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
      value:"",
      value1: "",
      value2: "",
      isEdit:false,
      editIndex:0,
    };
  },
  inject: ["myrefresh"],
  methods: {
      edit(row,index){
        this.isEdit = true
        this.editIndex = index
        console.log(row);
        this.form = JSON.parse(JSON.stringify(row));
        this.dialogVisible=true;
      },
      del(row,index){
          // console.log(row);
          this.tableData.splice(index,1);
      },
      
      confirm(){
        // console.log(JSON.stringify(this.form));
        if(this.isEdit){
          this.tableData.splice(this.editIndex,1,JSON.parse(JSON.stringify(this.form)));  
        }else{
          this.tableData.push(JSON.parse(JSON.stringify(this.form)));
        }
          this.dialogVisible=false;
          this.isEdit = false;
      },
      colse(){
          for(let i in this.form){
              this.form[i]="";
          }
      },
    addition() {
        this.isEdit = false
        // console.log("添加字典按键");
        this.dialogVisible=true;
        this.colse();
    },
    reset() {
      // 重置方法
      this.myrefresh();
    },
    onSubmit() {
      let s_arr = [];
      this.tableData.map((i, s) => {
        let b1 = this.search.role === "" ? true : i.role === this.search.role;
        let b2 = this.search.realName === "" ? true : i.realName === this.search.realName;
        let b3 = this.search.status === "" ? true : i.status === this.search.status;
        if (b1  && b2  && b3) {
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