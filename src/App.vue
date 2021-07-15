<template>
  <div id="app">
    <el-container>
      <!-- header -->
      <el-header style="padding: 0" v-if="logined">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"
            ><a href="https://www.ele.me" target="_blank"
              >订单管理</a
            ></el-menu-item
          >
        </el-menu>
      </el-header>

      <el-container>
        <!-- left-side -->
        <el-aside
          width="200px"
          style="height: calc(100vh - 60px)"
          v-if="logined"
        >
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                router
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <el-submenu
                  v-for="(item, index) in navs"
                  :index="item.id"
                  :key="index"
                >
                  <template style="padding: 0" slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-for="(item2, index2) in item.list"
                      :index="item2.url"
                      :key="index2"
                    >
                      {{ item2.name }}
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <el-main>
          <router-view v-if="isrefresh" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
export default {
  watch: {
    $route(to, from) {
      console.log(to, from);
      if (to.path == "/logo") {
        this.logined = false;
      } else {
        this.logined = true;
      }
    },
  },

  data() {
    return {
      isrefresh: true,
      logined: false,

      activeIndex: "1",
      activeIndex2: "1",
      navs: [
        {
          id: "1",
          name: "系统设置",
          icon: "el-icon-s-tools",
          list: [
            {
              name: "菜单管理",
              url: "/menu",
            },
            {
              name: "用户管理",
              url: "/user",
            },
            {
              name: "角色管理",
              url: "/",
            },
            {
              name: "日志管理",
              url: "/log",
            },{
              name: "字典管理",
              url: "/dict",
            },
          ],
        },
        {
          id: "2",
          name: "工作日志",
          icon: "el-icon-notebook-2",
          list: [
            {
              name: "日志查看",
              url: "/",
            },
            {
              name: "日志统计",
              url: "",
            },
          ],
        },
      ],
    };
  },
  provide() {
    return {
      myrefresh: this.refresh,
    };
  },
  methods: {
    refresh() {
      this.isrefresh = false;
      this.$nextTick(() => {
        this.isrefresh = true;
      });
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

.el-main {
  position: absolute;
  top: 60px;
  left: 200px;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0;
}
.el-header {
  width: 100vw;
}
.el-aside {
  position: absolute;
  top: 60px;
  left: 0;
}
li.el-submenu > div {
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
