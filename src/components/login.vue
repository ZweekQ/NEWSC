<template>
  <div class="login">
    <div class="login_box">
<!--      头像区-->
      <div class="login_img">
        <img src="../assets/logo.png" alt="">
      </div>
<!--      登录表单区-->

      <!--      用户名-->
<!--     绑定ref通过$refs获取指定的表单对象,rules是验证表单的输入，model是双向绑定表单的输入数据-->
      <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>

        <!--      密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>

        <!--      按钮区-->
        <el-form-item class="buts">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="loginFormRef">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data(){
    return{
      //登录表单的数据绑定对象
      loginForm:{
        username:'',
        password:''
      },
      loginFormRules:{
        //验证账号
        username:[
            { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //验证密码
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{

    //重置，清空输入框
    loginFormRef(){
      this.$refs.loginFormRef.resetFields();
    },

    //登录验证 async异步
    login(){
      //loginFormRef是表单的引用对象
      //validate是提点击登录之后的回调函数,是预验证，验证表单输入的值是否合法，不是指向服务器发起请求验证，结果为true或者false，valid就是回调函数的结果
      this.$refs.loginFormRef.validate(async valid =>{
        console.log(valid)
        if (!valid) return;

        //发起异步请求，返回一个promise对象
        // this.$http.post("/login",this.loginForm).then(data => console.log(data.data))
        //{data:ref}搭配await，简化相应的结果
        const {data:ref} = await this.$http.post("/login",this.loginForm)

        //$message是登录或失败给出的弹窗提示，调用相应的方法弹出相应的提示内容
        //ref.meta.status是获取请求之后的返回的结果(状态码),200表示失败
        if (ref.meta.status !== 200) return this.$message.error("登陆失败");
         this.$message.success("登陆成功")
        //登录成功之后将token保存到sessionStorage
        window.sessionStorage.setItem("token",ref.data.token)
        await this.$router.push("/home")
      })
    }
  }
}
</script>

<!--scoped表示当前样式只在修饰当前-->
<style lang="less" scoped>

  .login{
    height:100vh;
    background-color: #2c3e50;
  }

  .login_box{
    background-color: azure;
    height: 300px;
    width: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 3px;
  }

  //登录图标
  .login_img{
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    padding: 10px;
    left: 50%;
    box-shadow: 0 0 10px #ddd;
    transform: translate(-50%,-50%);
    border: 1px solid #eee;
    background-color: #eeeeee;

    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: deeppink;
    }
  }

//  按钮
  .buts{
    display: flex;
    justify-content: center;
  }

//  登录表单
  .login_form{
    position: absolute;
    bottom: 50%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    top: 30%;
  }
</style>