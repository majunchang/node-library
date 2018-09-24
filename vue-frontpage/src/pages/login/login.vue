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
          <div class="check-box">
            <input type="text" placeholder='请输入验证码'name='identifyCode' class='identifyCode' v-model='identifyCode'>
            <div id="checking" @click='clickChecking'></div>
          </div>
          <input type="submit" value='登录' class='loginSubmit' @click='login' >
        </form>
        <div class="form-bottom">
          <span class='registerNew' @click='goRegister'>注册新用户</span>
          <span class='forgetPas' @click='goForgetPassWord'>忘记密码</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
import validation from '../../../static/plugin/jquery.validate'
  import {mapMutations} from 'vuex'

  export default {
    props: {},
    components: {},
    data () {
      return {
        userName: '',
        passWord: '',
        identifyCode: '',
        identifyStandard: ''
      }
    },
    created () {

    },
    mounted () {
      this.validate()
      this.identifyStandard = this.identifyMethod('checking')
  },
    computed: {},
    methods: {
      ...mapMutations({
        'setUser': 'SET_USER'
      }),
      validate () {
        $().ready(function () {
          $('#loginForm').validate({
            debug: true
          })
          $.validator.setDefaults({
            submitHandler: function () {

            }
          })
        })
      },
      conmputeUserName (value) {
        var str = ''
        if (value.trim() === '') {
          str = '用户名不能为空'
        }
        return str
      },
      goRegister () {
        this.$router.push({
          path: '/register',
          name: 'register'
        })
      },
      showNotice () {
        this.$Notice.success({
          title: '这是通知标题',
          desc: '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
        })
      },
      login () {
        if (!this.userName || !this.passWord) {
          return
        }
        if (this.identifyCode.toLocaleUpperCase() != this.identifyStandard.toLocaleUpperCase()) {
          this.$SwalModal.MaModal('验证码错误', 'error')
          return
        }

        if ($('.error').length) {
          return
        }
        var _this = this
        axios({
          method: 'post',
          url: '/proxy/fullStack/login',
          data: {
            name: this.userName,
            password: this.passWord
          }
        })
          .then(function (res) {
            if (res.data.code === 0) {
              _this.$Notice.success({
                title: '登录通知',
                desc: '恭喜您已经登录成功',
                duration: 1
              })
              setTimeout(() => {
                _this.$router.push({
                  path: '/homePage',
                  name: 'dashboard'
                })
              }, 1000)
              // 在这里将用户存入vuex
              _this.setUser(_this.userName)
            } else {
              _this.$Notice.error({
                title: '登录通知',
                desc: res.data.message,
                duration: 1
              })
            }
          })
      },
      identifyMethod (id) {
        var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
          'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
          'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6',
          '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
          'I', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        // 可以 随意添加各种颜色
        var colors = ['blue', 'orange', 'deeppink', 'yellow', 'gray', 'chocolate', 'cadetblue'],
          // 用来存放 4个字符串的
          value = [],
          // 通过id获取dom元素
          checking = getId(id),
          btn = getId('btn'),
          cvs = document.createElement('canvas'),
          ctx = cvs.getContext('2d'),
          valCreate,
          h = h || 35,
          w = w || 120,
          // 背景的索引
          bgCount

        cvs.height = h
        cvs.width = w
        create()

        function create () {
          // 先生成4个字符放到数组里
          for (var i = 0; i < 4; i++) {
            value.push(arr[Math.round(Math.random() * (arr.length - 1))])
          }
          // 绘制之前要先清空画布
          cvs.width = cvs.width
          // 在隐藏的画布上绘制
          bgCount = Math.round(Math.random() * (colors.length - 1))
          // ctx.fillStyle = colors[bgCount];
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, cvs.width, cvs.height)
          for (var i = 0; i < value.length; i++) {
            // 记录文字的索引 用于与背景的比较

            var textCount = Math.round(Math.random() * (colors.length - 1))
            while (textCount === bgCount) {
              textCount = Math.round(Math.random() * (colors.length - 1))
            }
            ctx.beginPath()
            ctx.fillStyle = colors[textCount]
            ctx.font = '45px Courier New'
            ctx.fillText(value[i], 30 * i, 28)
          }

          // 将画布的内容 转成base64
          checking.innerHTML = ''
          var img = document.createElement('img')
          img.src = cvs.toDataURL('image/png')
          // 将数组里的内容 转成字符串存储到变量里用于判断
          valCreate = value.join('')
          // 清空数组
          value = []
          // 展示到页面上
          checking.appendChild(img)
        }
        return valCreate
        function getId (id) {
          return document.getElementById(id)
        }
      },
      clickChecking () {
        this.identifyStandard = this.identifyMethod('checking')
      },
      goForgetPassWord () {
        this.$router.push({
          name: 'forgetPassWord',
          path: '/forgetPassWord'
        })
      }
    }
  }
</script>

<style scoped>
  @import "base.css";
  @import "login.css";
</style>
