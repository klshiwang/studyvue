<template>
  <div class="klbase">
    <navlist msg="系统管理" msg2="知识库" />

    <!--搜索栏 -->
    <el-form :inline="true"  class="demo-form-inline search">
     

      <el-form-item label="名称">
        <el-input  v-model="search.name" placeholder="输入名称"></el-input>
      </el-form-item>

      <el-form-item label="问题类型">
        <el-select v-model="search.type1" placeholder="请选择问题类型">
          <el-option v-for="item in formInline.option1" :key="item.value"  :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="就诊类型">
        <el-select v-model="search.type2" placeholder="请选择就诊类型">
          <el-option v-for="item in formInline.option2" :key="item.value"  :label="item.label" :value="item.value">
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
      <el-button type="primary"  icon="el-icon-plus"  style="float: left"  @click="addition" >添加角色</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column label="序号" type="index" width="50"></el-table-column>

        <el-table-column prop="name" label="名称" width="200"></el-table-column>
        <el-table-column prop="jm" label="拼音简码" width="120"></el-table-column>
        <el-table-column prop="keyword" label="关键字"> </el-table-column>
        <el-table-column prop="type1" label="问题类型"> 
            <template slot-scope="scope">
                <span v-show="scope.row.type1 == '1'">门诊</span>
                <span v-show="scope.row.type1 == '2'">医保</span>
            </template>
        </el-table-column>
        <el-table-column prop="type2" label="就诊类型">
            <template slot-scope="scope">
                <span v-show="scope.row.type2 == '1'">诊前</span>
                <span v-show="scope.row.type2 == '2'">诊后</span>
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

                    <el-form-item v-else :label="domList.label">
                        <el-input type="textarea" :rows="2" maxlength="100" show-word-limit :placeholder="domList.placeholder" v-model="form[domList.model]">  </el-input>
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
                label:"门诊"
            },{
                value:"2",
                label:"医保"
            }],

            option2:[{
                value:"1",
                label:"诊前"
            },{
                value:"2",
                label:"诊后"
            }]

        },


      search:{
          type1:"",
          type2:"",
          name:"",
      },
      dialogVisible: false,
    //   radio: "1",
    //   dname: "",
      
     
      form:{
            name:"异地就医直报程序",
            jm: "YDJYZBCX",
            keyword:"备注备注",
            type1:"1",
            type2:"2",
            remark:"无备注",
      },
      domData:[
          {
              type:"1",
              label:"名称",
              model:"name",
              placeholder:"请输入名称"
          },{
              type:"1",
              label:"拼音简码",
              model:"jm",
              placeholder:"请输入拼音简码"
          },{
              type:"1",
              label:"关键字",
              model:"keyword",
              placeholder:"请输入关键字"
          },
          {
              type:"2",
              label:"问题类型",
              model:"type1",
              placeholder:"请选择问题类型",
              option:[
                  {label:"门诊",value:"1"},
                  {label:"医保",value:"2"}
              ]
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
            name:"异地就医直报程序",
            jm: "YDJYZBCX",
            keyword:"备注备注",
            type1:"2",
            type2:"2",
            remark:"无备注",

      }, {
            name:"本地就医直报程序",
            jm: "YDJYZBCX",
            keyword:"备注备注",
            type1:"1",
            type2:"1",
            remark:"无备注",

      },{
            name:"用户自费",
            jm: "YDJYZBCX",
            keyword:"备注备注",
            type1:"1",
            type2:"2",
            remark:"无备注",

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
        let b1 = this.search.name === "" ? true :  i.name.includes(this.search.name);
        let b2 = this.search.type1 === "" ? true : i.type1.includes(this.search.type1);
        let b3 = this.search.type2 === "" ? true : i.type2.includes(this.search.type2);
        if (b1  && b2  && b3) {
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