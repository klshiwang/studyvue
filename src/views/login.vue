<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    

    <el-form class="form" ref="form" :model="form" label-width="80px">
      <h3>Smart-HCRM 医院客户关系管理系统</h3>
      <el-form-item label="用户名:">
        <el-input v-model="form.name" style="width: 88%"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password" style="width: 88%"></el-input>
      </el-form-item>
      <el-form-item >
      <el-button class="confirm" type="success" @click="go" style="width: 88%">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },

  methods: {
    go: function () {
      this.$router.push("/about");
    },
  },
};
</script>

<style scoped>
.home {
  background: url("~@/assets/login.jpg") no-repeat center center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  width: 500px;
  height: 300px;
  background-color:rgba(241, 241, 241,0.5);
  box-shadow: 2px 2px 10px 2px #ddd;
  margin: 0;
  padding-top: 20px;

}
.form h3{
  line-height: 2em;
}
.confirm{
  margin: 0;
  
}
</style>