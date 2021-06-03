<template>
  <el-container class="one">
    
<!--    头部区域-->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="">
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>

    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">
<!--        侧边栏菜单区-->
        <el-menu
            :uniqueOpened="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
<!--       el-submenu表示一级菜单,template表示一级菜单的模板区-->
          <el-submenu :index="item.id + ''" v-for="item in resList" :key="item.id">
            <template #title>
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
<!--            二级菜单,也有模板区-->
            <el-menu-item index="chindItem.id + ''" v-for="chindItem in item.children" :key="chindItem.id">
              <template #title>
                <i class="el-icon-location"></i>
                <span>{{chindItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      右边主体内容-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  //created生命周期函数，表示vue对象创建完成调用的方法，但是此时还没有挂载和渲染
  created() {
    this.listMenus();
  },
  data(){
    return{
      resList:[]
    }
  },
  name: "home",
  methods:{
    loginOut(){
      //删除保存在浏览器的token
      window.sessionStorage.clear()
      //重定向到登录页面
      this.$router.push('/login')
    },
    async listMenus(){
      //发起获取菜单栏数据的请求
      const {data:res} = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.resList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
//头部样式
.el-header{
  background-color: #2c3e50;
  //定义当前盒模型为弹性盒子，以便后续操作
  /*
  弹性盒子由弹性容器(Flex container)和弹性子元素(Flex item)组成。
  弹性容器通过设置 display 属性的值为 flex 或 inline-flex将其定义为弹性容器。
  弹性容器内包含了一个或多个弹性子元素
   */
  display: flex;
  /*
  在弹性盒对象的 <div> 元素中的各项周围留有空白.
  space-between:中间留
  space-around:均匀的多个空白
  space-evenly:均匀的多个空白
   */
  //justify-content: space-between;
  justify-content:space-between;
  //设置内部边距为0
  //padding-left: 0;
  //居中对齐弹性盒的各项 <div> 元素
  align-items: center;
  //设置文本颜色
  color: #eeeeee;
  //设置文本大小
  font-size: 20px;
  //嵌套样式,对div的样式进行修改
  > div{
    display: flex;
    align-items: center;
    span{
      //设置做外边距
      margin-left:15px ;
    }

  }

}

//侧边栏样式
.el-aside{

}

//内容主体区样式
.el-main{
  background-color: #eeeeee;
}

//整个布局样式
.el-main{
  height: 100vh;
}
</style>