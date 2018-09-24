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
          <input type="text" class='registerUserName' placeholder='请输入用户名' v-model='newUserName' name="name"
                 minlength="2" maxlength='18' required>
          <!--<div class="err-tips">{{ conmputeUserName(userName) }}</div>-->
          <input type="password" class='registerPassWord' placeholder='请输入密码' v-model='newPassword' name="password"
                 minlength="2" maxlength='18' required>
          <input type="text" class='registerUserName' placeholder='请输入邮箱' @blur='validataEmail' v-model='newUserEmail'
                 name="email" required>
          <p class='mailError' v-if='mailBoxError'>{{mailBoxError}}</p>
          <mu-raised-button class="sendRegisterEmail" :disabled='SendIng' :backgroundColor="bgc"
                            @click='sendRegisterEmail' :label="mailLabel"/>

          <input type="text" class='registerCheckCode' v-model='registerCheckCode' placeholder='请输入邮箱验证码'
                 v-if='whetherShowRegisterBtn'>

          <input type="submit" v-if='whetherShowRegisterBtn' value='注册新用户' class='registerSubmit'
                 @click.prevent='registerNewUser'>

        </form>
        <div class="form-bottom">
          <span class='registerNew' @click='goLogin'>返回登录</span>
          <!--<span class='forgetPas'>忘记密码</span>-->
        </div>
      </div>
    </div>
  </transition>


</template>

<script>
  import axios from 'axios'
import {mapMutations} from 'vuex'

  export default {
    props: {},
    components: {},
    data () {
      return {
        newUserName: '',
        newPassword: '',
        newUserEmail: '',
        SendIng: false,
        bgc: '#00a2de',
        mailLabel: '发送注册邮件',
        mailBoxError: '',
        registerCheckCode: '',
        whetherShowRegisterBtn: false,
        standardCheckCode: ''
      }
    },
    created () {
      this.register = true
    },
    mounted () {
      this.validate()
    },
    computed: {},
    destroyed () {
      this.register = false
  },
    methods: {
      ...mapMutations({
        'setUser': 'SET_USER'
      }),
      validate () {
        $().ready(function () {
          $('#registerForm').validate({
            debug: true
          })
          $.validator.setDefaults({
            submitHandler: function () {

            }
          })
        })
      },
      validataEmail () {
        var mailBox = this.newUserEmail
        var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

        this.mailBoxError = ''
        if (mailBox.trim() === '') {
          this.mailBoxError = '邮箱输入不能为空'
        } else if (!reg.test(mailBox)) {
          this.mailBoxError = '请输入正确的邮箱地址'
        }
      },
      sendRegisterEmail () {
        // 用户名和密码不能为空
        if (!this.newUserName || !this.newPassword) {
          this.$SwalModal.MaModal('输入有误，请检查后重新输入', 'warning')
          return
        }
        // 邮箱输入有误的时候
        if (this.mailBoxError) {
          this.$SwalModal.MaModal('邮箱格式不正确', 'warning')
          return
        }
        axios({
          url: '/proxy/fullStack/registerSendEmail',
          method: 'post',
          data: {
            mailBox: this.newUserEmail,
            userName: this.newUserName
          }
        }).then((data) => {
          if (data.data.code === 0) {
            this.SendIng = true
            this.standardCheckCode = data.data.checkCode
            this.bgc = 'gray'
            this.whetherShowRegisterBtn = true
            this.$SwalModal.MaModal('邮件发送成功，请前往注册邮箱进行查看', 'success')
            //  然后发送邮件的注册按钮 变成灰色 不可点击 并且有一个计时效果
            var time = 60
            var timer = setInterval(() => {
              time--
              this.mailLabel = `${time}秒后重新发送`
              if (time === 0) {
                this.SendIng = false
                this.bgc = '#00a2de'
                this.mailLabel = '发送注册邮件'
                clearInterval(timer)
              }
            }, 1000)
          } else {
            this.$SwalModal.MaModal('邮件发送失败！', 'error')
          }
        })
      },
      goLogin () {
        this.$router.push({
          path: '/login',
          name: 'login'
        })
      },
      registerNewUser () {
        // 用户名和密码不能为空
        if (!this.newUserName || !this.newPassword || !this.registerCheckCode) {
          this.$SwalModal.MaModal('输入有误，请检查后重新输入', 'warning')
          return
        }
        // 邮箱输入有误的时候
        if (this.mailBoxError) {
          this.$SwalModal.MaModal('邮箱格式不正确', 'warning')
          return
        }
        if (this.registerCheckCode.toLocaleUpperCase() != this.standardCheckCode.toLocaleString()) {
          this.$SwalModal.MaModal('验证码输入不正确', 'warning')
          return
        }

        var obj = {
          password: this.newPassword,
          username: this.newUserName,
          mailBox: this.newUserEmail
        }
        axios.get(`/proxy/${this.$url}/register`, {
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
