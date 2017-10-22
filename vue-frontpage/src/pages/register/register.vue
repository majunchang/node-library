<template>
  <transition name='register'>
    <div class="register-right-content" v-show='register'>
      <div class="register-form">
        <div class="form-title">
          <div class="title-one">
            欢迎来到图书馆注册页面
          </div>
          <div class="title-two">
            注册成为图书馆的新用户
          </div>
          <div class="title-three">The whole world is in your hand</div>
        </div>
        <form action="" id='registerForm'>
          <input type="text" class='registerUserName' placeholder='请输入用户名' v-model='newUserName' name="name" minlength="2" maxlength='8' required>
          <!--<div class="err-tips">{{ conmputeUserName(userName) }}</div>-->
          <input type="password" class='registerPassWord' placeholder='请输入密码' v-model='newPassword' name="password" minlength="2" maxlength='8' required>
          <input type="submit" value='注册新用户' class='registerSubmit' @click.prevent='registerNewUser'>
        </form>
        <div class="form-bottom">
          <span class='registerNew' @click='goLogin'>返回登录</span>
          <span class='forgetPas'>忘记密码</span>
        </div>
      </div>
    </div>
  </transition>


</template>

<script>
  import axios from 'axios';
  import {mapMutations} from 'vuex'

  export default {
    props: {},
    components: {},
    data() {
      return {
        newUserName: '',
        newPassword: ''
      }
    },
    created() {
      this.register = true
    },
    mounted(){
      this.validate()
    },
    computed: {},
    destroyed() {
      this.register = false;
    },
    methods: {
      ...mapMutations({
        'setUser': 'SET_USER'
      }),
      validate(){
        $().ready(function () {
          $("#registerForm").validate({
            debug: true
          });
          $.validator.setDefaults({
            submitHandler: function() {

            }
          });
        })
      },
      goLogin() {
        this.$router.push({
          path: '/login',
          name: 'login'
        })
      },
      registerNewUser() {
//        console.log($('.registerUserName'));
//        console.log(this.newPassword);
//        console.log(this.newUserName);
        var obj = {
          password: this.newPassword,
          username: this.newUserName
        }
        axios.get(`${this.$url}/register`, {
          params: obj
        }).then((res) => {
          if (res.data.code === 0) {
            // 在这里 说明请求已经发送成功  跳转到登录页面
            this.setUser(obj)
            this.$router.push({
              path: '/login',
              name: 'login'
            })
          }
          console.log(res.data);
        })
      }
    }
  }
</script>

<style scoped>
  @import "register.css";

  .register-enter-active {
    transition: all .5s
  }

  .register-enter {
    opacity: 0;
  }

  .register-right-content {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%, 0);
    -webkit-transition: all 1s;
    transition: all 1s;
  }

  .register-form {
    position: relative;
    width: 480px;
  }
</style>
