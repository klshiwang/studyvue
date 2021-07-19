<template>
  <div class="salesman">
    <navlist msg="系统管理" msg2="业务员管理" />

    <!--搜索栏 -->
    <el-form :inline="true"  class="demo-form-inline search">
     
      <el-form-item label="机构">
        <el-select v-model="search.organ" placeholder="请选择机构">
          <el-option v-for="item in formInline.option1" :key="item.value"  :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="业务员姓名">
        <el-input  v-model="search.name" placeholder="输入业务员姓名"></el-input>
      </el-form-item>

      <el-form-item label="帐号状态">
        <el-select v-model="search.status" placeholder="请选择帐号状态">
          <el-option v-for="item in formInline.option2" :key="item.value"  :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="出生日期">
          <el-date-picker v-model="search.date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" icon="el-icon-refresh-left" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
      <el-button type="primary"  icon="el-icon-plus"  style="float: left"  @click="addition" >添加业务员</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column label="序号" type="index" width="50"></el-table-column>

        <el-table-column prop="organ" label="机构" width="200">
            <template slot-scope="scope">
                <span v-show="scope.row.organ == '1'">中国平安郑州分公司</span>
                <span v-show="scope.row.organ == '2'">三门峡中医院</span>
            </template>
        </el-table-column>
        <el-table-column prop="account" label="帐号" width="120"></el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="gender" label="性别"> 
            <template slot-scope="scope">
                <span v-show="scope.row.gender == '1'">男</span>
                <span v-show="scope.row.gender == '2'">女</span>
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="bornDate" label="出生日期"> </el-table-column>
        <el-table-column prop="status" label="用户状态">
            <template slot-scope="scope">
                <span v-show="scope.row.status == '1'">正常</span>
                <span v-show="scope.row.status == '2'">禁用</span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>

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
      <el-dialog title="添加知识库"  :visible.sync="dialogVisible" width="30%">
                        
            <el-form ref="form" :model="form" label-width="80px"  >
                <div v-for="(domList, index) in domData" :key="index">
                    <el-form-item v-if="domList.type == '1'" :label="domList.label"   >
                        <el-input v-model="form[domList.model]" :placeholder="domList.placeholder"></el-input>
                    </el-form-item>

                    <el-form-item  v-else-if="domList.type == '2'" :label="domList.label"  >
                        <el-select v-model="form[domList.model]" :placeholder="domList.placeholder" style="width:100%">
                            <el-option v-for="(item,index2) in domList.option" :key="index2" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item v-else-if="domList.type == '3'" :label="domList.label" style="width:100%">
                        <el-input type="textarea" :rows="2" maxlength="100" show-word-limit :placeholder="domList.placeholder" v-model="form[domList.model]">  </el-input>
                    </el-form-item>

                    <el-form-item v-else-if="domList.type == '4'"  :label="domList.label" style="width:100%; text-align:left" >
                        <el-radio v-for="(item3,index3) in domList.option " :key="index3" v-model="form[domList.model]" :label="item3.value">{{item3.label}}</el-radio>
                    </el-form-item>
                    
                     <el-form-item v-else :label="domList.label" >
                         <el-date-picker v-model="form[domList.model]" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width:100%"> </el-date-picker>
                    </el-form-item>
                </div>
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

        formInline:{
            option1:[{
                value:"1",
                label:"中国平安郑州分公司"
            },{
                value:"2",
                label:"三门峡中医院"
            }],

            option2:[{
                value:"1",
                label:"禁用"
            },{
                value:"2",
                label:"正常"
            }]

        },


      search:{
          organ:"",
          name:"",
          status:"",
          date:""
      },
      dialogVisible: false,
    //   radio: "1",
    //   dname: "",
      
     
      form:{
            organ:"",
            account:"",
            password:"",
            name:"",
            gender:"",
            age:"",
            mobile:"",
            bornDate:"",
            status:"",
            remark:""
      },
      domData:[
          {
              type:"2",
              label:"机构",
              model:"organ",
              placeholder:"请选择机构",
              option:[
                  {label:"中国平安郑州分公司",value:"1"},
                  {label:"三门峡中医院",value:"2"}
              ]
          },{
              type:"1",
              label:"账号",
              model:"account",
              placeholder:"请输入账号"
          },{
              type:"1",
              label:"密码",
              model:"password",
              placeholder:"请输入密码"
          },{
              type:"1",
              label:"姓名",
              model:"name",
              placeholder:"请输入姓名"
          },
          {
              type:"4",
              label:"性别",
              model:"gender",
              option:[
                  {label:"男",value:"1"},
                  {label:"女",value:"2"}
              ]
          },{
              type:"1",
              label:"年龄",
              model:"age",
              placeholder:"请输入年龄"
          },{
              type:"1",
              label:"手机号",
              model:"mobile",
              placeholder:"请输入手机号"
          },{
              type:"5",
              label:"出生年月",
              model:"bornDate",
              placeholder:"请选择出生日期"
          }, 
         
          {
              type:"3",
              label:"备注",
              model:"remark",
              placeholder:"请输入备注"
          },
          
      ],
      tableData: [
        {
          organ:"1",
          account:"13693999978",
          password:"999978",
          name:"陶鑫",
          gender:"1",
          age:"42",
          mobile:"13693999978",
          bornDate:"1982-11-13",
          status:"1",
          remark:"这是一个备注"
      }, {
          organ:"2",
          account:"13693999978",
          password:"999978",
          name:"张三",
          gender:"2",
          age:"24",
          mobile:"13693999978",
          bornDate:"1990-05-05",
          status:"1",
          remark:"张三备注"
      }, {
          organ:"1",
          account:"13693999978",
          password:"999978",
          name:"小明",
          gender:"1",
          age:"24",
          mobile:"13693999978",
          bornDate:"1988-01-01",
          status:"2",
          remark:"张三备注"
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
      jurx(row,index){
          this.jurIndex = index;
          console.log(row.jur)
          this.$nextTick(()=>{
              if(this.$refs.jur){
                this.$refs.jur.setCheckedKeys([]);
                // this.$refs.jur.setCheckedKeys(JSON.parse(JSON.stringify(row.jur)));
              }
          });
          //此处有bug
          this.jurParam.jurChecked =JSON.parse(JSON.stringify(row.jur)) ;    
          this.dialogVisible2 = true;
      },
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
            // this.form.ID = 
          this.tableData.push(JSON.parse(JSON.stringify(this.form)));
        }
          this.dialogVisible=false;
          this.isEdit = false;
      },
      confirm2(){
        let checkedKeys = this.$refs.jur.getCheckedKeys();
        // let halfCheckedKeys =  this.$refs.jur.getHalfCheckedKeys();
        let halfCheckedKeys =  [];
        let allCheckedKeys =[...checkedKeys,...halfCheckedKeys];
        this.tableData[this.jurIndex].jur = allCheckedKeys;
        console.log(allCheckedKeys);
        this.dialogVisible2 = false;
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
        this.tableData.map((i, s) => {  //模糊查找
        let b1 = this.search.organ === "" ? true :  i.organ.includes(this.search.organ);
        let b2 = this.search.name === "" ? true : i.name.includes(this.search.name);
        let b3 = this.search.status === "" ? true : i.status.includes(this.search.status);
        let b4 = this.search.date === "" ? true : i.bornDate.includes(this.search.date);
        if (b1  && b2  && b3 && b4) {
          s_arr.push(JSON.parse(JSON.stringify(i)));
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