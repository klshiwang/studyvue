<template>
  <div class="menu">
    <navlist msg="系统管理" msg2="菜单管理" />

    <!--搜索栏 -->
    <el-form :inline="true"  class="demo-form-inline search">
      <el-form-item label="菜单名称">
        <el-input  v-model="dname" placeholder="输入菜单名称"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="status" placeholder="请选择状态">
          <el-option v-for="item in formInline.options" :key="item.value"  :label="item.label" :value="item.value">
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
      <el-button type="primary"  icon="el-icon-plus"  style="float: left"  @click="addition" >添加菜单</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="mname" label="菜单名称" width="180"></el-table-column>
        <el-table-column prop="icon" label="图标" width="180">
            <template slot-scope="scope">
                <i :class="scope.row.icon" style="font-size:22px"></i>
               
            </template>
        </el-table-column>
        <el-table-column prop="path" label="组件路径" width="180"></el-table-column>
        <el-table-column prop="status" label="状态"> 
            <template slot-scope="scope">
                <span v-show="scope.row.status == '1'">正常</span>
                <span v-show="scope.row.status == '2'">禁用</span>
            </template>
        </el-table-column>
        <el-table-column prop="type" label="使用类型"> 
             <template slot-scope="scope">
                <span v-show="scope.row.type == '1'">平台</span>
                <span v-show="scope.row.type == '2'">非平台</span>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="菜单备注"> </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
             <el-link :underline="false" style="margin:10px" class="el-icon-edit">编辑</el-link>
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
      <el-dialog title="添加菜单"  :visible.sync="dialogVisible" width="30%"   v-show="dialogVisible">
                        
            <el-form ref="form" :model="form" label-width="80px"  >
                <el-form-item label="菜单名称">
                    <el-input v-model="form.mname"></el-input>
                </el-form-item>

                <el-form-item label="菜单等级">
                    <el-radio-group v-model="form.level">
                        <el-radio label="1">一级菜单</el-radio>
                        <el-radio label="2">一级菜单</el-radio>
                    </el-radio-group>
                </el-form-item>

                 <el-form-item label="父级菜单" v-show="form.level == '2'">
                    <el-select v-model="form.father" placeholder="请选择" style="width:100%">
                        <el-option v-for="item in formInline.options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="使用类型">
                    <el-select v-model="form.type" placeholder="请选择" style="width:100%">
                        <el-option v-for="item in formInline.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              
                <el-form-item label="菜单路径" v-show="form.level == '2'">
                    <el-input v-model="form.url" ></el-input>
                </el-form-item>

                <el-form-item label="菜单备注">
                    <el-input v-model="form.remark"></el-input>
                </el-form-item>


                <el-form-item label="菜单状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="1">正常</el-radio>
                        <el-radio label="2">失效</el-radio>
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
      dialogVisible: false,
      radio: "1",
      dname: "",
      status:"",
      formInline: {
        options: [
          {
            value: "1",
            label: "全部",
          },
          {
            value: "2",
            label: "平台",
          },{
            value: "3",
            label: "机构",
          }
        ],
        options1: [
          {
            value: "1",
            label: "父级菜单1",
          },
          {
            value: "2",
            label: "父级菜单2",
          },{
            value: "3",
            label: "父级菜单3",
          }
        ]
      },
      
     
      form:{
        level:"1",
        father:"",
        type: "",
        dname: "活动类型",
        code: "sys_activity_type",
        status: "1",
        remark: "备注备注",
        time: "2021-07-14 10:00",
      },
      tableData: [
        {
            id:1,
            mname: "客户档",
            icon: "el-icon-tickets",
            path:"",
            status: "1",
            type:"2",
            remark: "备注备注",
        },{
            id:2,
            mname: "业务员",
            icon: "el-icon-s-custom",
            path:"",
            status: "2",
            type:"1",
            remark: "备注备注",
            children: [{
                id: 21,
                mname: "业务员",
                icon: "el-icon-s-custom",
                path:"",
                status: "2",
                type:"1",
                remark: "备注备注"
            }, {
                id: 22,
                mname: "业务员",
                icon: "el-icon-s-custom",
                path:"",
                status: "2",
                type:"1",
                remark: "备注备注"
          }]
        },{
            id:3,
            mname: "协作单位",
            icon: "el-icon-office-building",
            path:"",
            status: "1",
            type:"1",
            remark: "备注备注",
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
      
    };
  },
  inject: ["myrefresh"],
  methods: {
      del(row,index){
          console.log(row);
        //   this.tableData.splice(index,1);
        if(row.children){
            if(row.children.length > 0){
                alert("菜单中有内容");
            }else{
                this.remove(row.id)
            }
        }else{
                this.remove(row.id)
        }
       
      },
      remove(id){  //删除指定id的菜单
          let ids =  id.toString().split('');
          console.log(ids)
          if(ids.length == 1){ //一级菜单删除
            for(let i =0;i<this.tableData.length;i++){
                if(Number(ids[0]) == this.tableData[i].id ){
                    this.tableData.splice(i,1);
                } 
            }
          }else{  //二级菜单删除
              for(let i =0;i<this.tableData.length;i++){
                if(Number(ids[0]) == this.tableData[i].id ){
                    for(let j =0;j<this.tableData[i].children.length;j++){
                        if(id == this.tableData[i].children[j].id){
                            this.tableData[i].children.splice(j,1);
                        }
                    }
                    
                } 
            }
          }
          
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