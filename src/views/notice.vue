<template>
  <div class="notice">
    <navlist msg="系统管理" msg2="公告管理" />

    <!--搜索栏 -->
    <el-form :inline="true"  class="demo-form-inline search">
     
      <el-form-item label="文章类型">
        <el-radio v-model="search.type" label="1">公告</el-radio>
        <el-radio v-model="search.type" label="2">资讯</el-radio>
      </el-form-item>

      <el-form-item label="文章名称">
        <el-input  v-model="search.title" placeholder="输入文章标题"></el-input>
      </el-form-item>

     

      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" icon="el-icon-refresh-left" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="table">
      <el-button type="primary"  icon="el-icon-plus"  style="float: left"  @click="addition" >添加文章</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column label="序号" type="index" width="50"></el-table-column>

        <el-table-column prop="title" label="文章标题" width="200"></el-table-column>
        <el-table-column prop="type" label="文章类型" width="120">
            <template slot-scope="scope">
                <span v-show="scope.row.type == '1'">公告</span>
                <span v-show="scope.row.type == '2'">资讯</span>
            </template>
        </el-table-column>
        <el-table-column prop="isTop" label="是否置顶">
             <template slot-scope="scope">
                <span v-show="scope.row.isTop == true">是</span>
                <span v-show="scope.row.isTop == false">否</span>
            </template>
        </el-table-column>
        <el-table-column prop="count" label="点击量"> </el-table-column>

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
      <el-dialog title="添加知识库"  :visible.sync="dialogVisible" width="80%">
                        
            <el-form ref="form" :model="form" label-width="80px"  >
                <el-form-item  label="文章标题"   >
                    <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
                </el-form-item>

                <el-form-item  label="文章类型"  >
                    <el-select v-model="form.type" placeholder="请选择文章类型" style="width:100%">
                        <el-option   label="公告" value="1"></el-option>
                        <el-option   label="资讯" value="2"></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item  label="是否置顶"  style="text-align:left">
                     <el-switch v-model="form.isTop"   active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>

                <el-form-item label="内容"  style="line-height:0">
                      <quill-editor :options="editorOption" v-model="form.content" style="height:500px;margin-bottom: 60px; line-height:20px"></quill-editor>
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
       editorOption: {
	          placeholder: "请在这里输入",
	          modules:{
	            toolbar:[
	              ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
	              ['blockquote', 'code-block'],     //引用，代码块
	              [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
	              [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
	              [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
	              [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
	              [{ 'direction': 'rtl' }],             // 文本方向
	              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
	              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
	              [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
	              [{ 'font': [] }],     //字体
	              [{ 'align': [] }],    //对齐方式
	              ['clean'],    //清除字体样式
	            ]
	           }
	          },
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
          title:"",
          type: "1",
      },
      dialogVisible: false,
      
    //   dname: "",
      
     
      form:{
            title:"医保转诊流程和办理方法",
            type:"1",
            isTop:true,
            count:23,
            content:""
      },
      
      tableData: [
        {
            title:"挂号办理方法",
            type:"1",
            isTop:true,
            count:50,
            content:""
        }, {
            title:"出院的相关手续办理",
            type:"2",
            isTop:false,
            count:23,
            content:""
        },{
            title:"医保转诊流程和办理方法。",
            type:"2",
            isTop:true,
            count:2,
            content:""
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
      
        if(this.isEdit){
          this.tableData.splice(this.editIndex,1,JSON.parse(JSON.stringify(this.form)));  
        }else{
            // this.form.ID = 
          this.tableData.push(JSON.parse(JSON.stringify(this.form)));
        }
          this.dialogVisible=false;
          this.isEdit = false;
      },
     
      colse(){
          for(let i in this.form){
              this.form[i]="";
              this.form.isTop=true;
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
        let b1 = this.search.title === "" ? true :  i.title.includes(this.search.title);
        let b2 = this.search.type === "" ? true : i.type.includes(this.search.type);
        if (b1  && b2 ) {
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