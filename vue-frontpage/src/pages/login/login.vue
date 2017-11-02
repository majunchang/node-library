<template>
  <div class="login">
    <div class="left-image">
    </div>
    <div class="right-content">
      <div class="form">
        <div class="form-title">
          <div class="title-one">
            欢迎使用图书馆
          </div>
          <div class="title-two">
            全世界就在你的手中
          </div>
          <div class="title-three">The whole world is in your hand</div>
        </div>
        <form action="" id='loginForm'>
          <input type="text" class='loginUserName' placeholder='请输入用户名' v-model='userName' name="name" minlength="2"
                 maxlength='8' required>
          <!--<div class="err-tips">{{ conmputeUserName(userName) }}</div>-->
          <input type="password" class='loginPassWord' placeholder='请输入密码' name="password" minlength="2" maxlength="8"
                 required v-model='passWord'>
          <input type="submit" value='登录' class='loginSubmit' @click='login'>
        </form>
        <div class="form-bottom">
          <span class='registerNew' @click='goRegister'>注册新用户</span>
          <span class='forgetPas' @click='showNotice'>忘记密码</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import validation from '../../../static/plugin/jquery.validate'

  export default {
    props: {},
    components: {},
    data() {
      return {
        userName: '',
        passWord: ''
      }
    },
    created() {

    },
    mounted() {
      this.toggleLeftImg()
      this.validate()
    },
    computed: {},
    methods: {
      validate() {
//        $("#loginForm").validate();
        $().ready(function () {
          $("#loginForm").validate({
            debug: true
          });
          $.validator.setDefaults({
            submitHandler: function () {

            }
          });
        })
      },
      toggleLeftImg() {

      },
      conmputeUserName(value) {
        var str = '';
        if (value.trim() === '') {
          str = '用户名不能为空'

        }
        return str;
      },
      goRegister() {
        this.$router.push({
          path: '/register',
          name: 'register'
        })
      },
      showNotice() {
        this.$Notice.success({
          title: '这是通知标题',
          desc: '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
        })
      },
      login() {
        if ($('.error').length) {
          return
        }
        var _this = this;
        axios({
          method: 'post',
          url: '/proxy/fullStack/login',
          data: {
            name: this.userName,
            password: this.passWord
          },
        })
          .then(function (res) {
            if (res.data.code === 0) {
              _this.$Notice.success({
                title: '登录通知',
                desc: '恭喜您已经登录成功',
                duration: 1
              })
              setTimeout(()=>{
                _this.$router.push({
                  path: '/index',
                  name: 'index'
                })
              },1000)

            } else {
              _this.$Notice.error({
                title: '登录通知',
                desc: res.data.message,
                duration: 1
              })
            }
          });

      }
    }
  }
</script>

<style scoped>
  @import "base.css";
  @import "login.css";
</style>
