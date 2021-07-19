<template>
  <div class="role">
    <navlist msg="系统管理" msg2="角色管理" />

    <!--搜索栏 -->
    <el-form :inline="true"  class="demo-form-inline search">
     

      <el-form-item label="角色名称">
        <el-input  v-model="search.role" placeholder="输入角色名称"></el-input>
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
        <el-table-column prop="id" label="ID" width="120"></el-table-column>
        <el-table-column prop="role" label="角色名称" width="120"></el-table-column>
       
        
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
             <el-link :underline="false" style="margin:10px" class="el-icon-edit" @click="edit(scope.row,scope.$index)">编辑</el-link>
             <el-link :underline="false" style="margin:10px" class="el-icon-share" @click="jurx(scope.row,scope.$index)">权限</el-link>
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
      <el-dialog title="添加角色"  :visible.sync="dialogVisible" width="30%">
                        
            <el-form ref="form" :model="form" label-width="80px"  >
                
                <el-form-item label="角色名称">
                    <el-input v-model="form.role"></el-input>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" :rows="2" maxlength="100" show-word-limit placeholder="请输入内容" v-model="form.remark">  </el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 权限弹出框 -->
        <el-dialog title="权限设置"  :visible.sync="dialogVisible2" width="30%">
            <el-tree
            :data="jurData"
            show-checkbox
            node-key="id"
            ref="jur" 
            :default-expanded-keys="jurParam.jurExpanded"
            :default-checked-keys="jurParam.jurChecked"
            :props="defaultProps">
            
            </el-tree>


            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="confirm2">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
        jurParam:{
            jurExpanded:[1,2,3],
            jurChecked:[]
        },
        jurIndex: "",
        //权限数据start
        jurData: [{
          id: 1,
          label: '系统设置',
          children: [{
            id: 4,
            label: '菜单管理',
          },{
            id: 9,
            label: '用户管理',
          }]
        }, {
          id: 2,
          label: '业务员',
          children: [{
            id: 5,
            label: '新建业务员'
          }, {
            id: 6,
            label: '业务员管理'
          }]
        }, {
          id: 3,
          label: '协作单位',
          children: [{
            id: 7,
            label: '新建协作单位'
          }, {
            id: 8,
            label: '协作单位'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        //权限数据end
        
       


      search:{
        role:"",
      },
      dialogVisible: false,
      dialogVisible2:false,
      radio: "1",
      dname: "",
      
     
      form:{
            id:1,
            role: "1",
            remark:"备注备注"
      },
      tableData: [
        {
            id:1,
            role: "普通用户",
            remark:"备注备注",
            jur:[5,7,9]
      }, {
            id:18,
            role: "高级用户",
            remark:"备注备注",
            jur:[4,5]
      }, {
            id:19,
            role: "管理员",
            remark:"备注备注",
            jur:[5,7,8]
      },
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