<template>
  <div class="navs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{msg}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{msg2}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="icon">
        <i class="el-icon-arrow-left" @click="goback"></i>
        <i class="el-icon-refresh" @click="refresh"></i>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){  //页面加载就输出一个1
        console.log(1);
    },
    inject:['myrefresh'],
    
    methods:{
        goback(){
            if(window.history.length <= 1){
                this.$router.push('/');
            }else{
                this.$router.go(-1);
            }
        },
        refresh(){
            this.myrefresh();
        }
    },


    props: {
        msg: String,
        msg2: String,
    }
};
</script>

<style scoped>
.navs{
    padding: 0 10px;
    background-color: #fff;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.navs .icon i{
    font-size: 22px;
    margin-right: 15px;
    cursor: pointer;
    
}
.navs .icon i:hover{
    color: blue;
}
</style>
