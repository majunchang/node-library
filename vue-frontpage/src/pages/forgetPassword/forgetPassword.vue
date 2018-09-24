<template>
    <div>
        <div id="pageContain">
            <div class="page page1 current">
                <div class="contain">
                    <div class="content">
                        <div class="greetleft">
                            <img src="/static/images/boxModel.png" alt="">
                        </div>
                        <div class="greetright">
                            <h1 class='greetTitle'>欢迎开始您的寻回密码之旅</h1>
                            <p class='greet-info'>密码巡回将开始为您服务</p>
                            <p class='greet-info gs'>请确认您的邮箱需要可以正常接收邮件</p>
                            <mu-raised-button class="beginRegister" @click='beginRegister' backgroundColor="#00a2de" label="开始找回" />
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="page page2">
                <div class="contain">
                    <div class="content">
                        <h1 class='firstStepTitle'>第一步 &nbsp;&nbsp;&nbsp; 输入您的用户名和可用邮箱</h1>
                        <mu-text-field hintTextClass='firstStepHint' inputClass='firstStepInput' hintText="请输入您原先的用户名" v-model='prevUserName' @blur='validateInput("userName")' :errorText='userNameError' />
                        <br/>
                        <mu-text-field hintTextClass='firstStepHint' inputClass='firstStepInput' hintText="请输入您的邮箱" v-model='mailBox' @blur='validateInput("mailBox")' :errorText='mailBoxError' />
                        <br/>
                        <mu-raised-button class="firstStepBtn" :disabled='SendIng' :backgroundColor="bgc" @click='firstStepNext' :label="mailLabel" />
                    </div>
                </div>
            </div>
    
            <div class="page page3">
                <div class="contain">
                    <div class="content">
                        <h1 class='secondStepTitle'>第二步 &nbsp;&nbsp;&nbsp; 输入邮箱验证码并设置新密码</h1>
    
    
                        <mu-text-field hintTextClass='secondStepHint' inputClass='secondStepInput' hintText="请输入邮箱的验证码" v-model='mailCheckNum' @blur='validateInput("mailCheckNum")' :errorText='mailCheckNumError' />
                        <br/>
                        <mu-text-field hintTextClass='secondStepHint' inputClass='secondStepInput' hintText="请输入新密码" v-model='newPas' @blur='validateInput("newPas")' :errorText='newPasError' />
                        <br/>
                        <mu-text-field hintTextClass='secondStepHint' inputClass='secondStepInput' hintText="请确认新密码" v-model='confirmNewPas' @blur='validateInput("confirmNewPas")' :errorText='confirmNewPasError' />
                        <br/>
                        <mu-raised-button class="firstStepBtn secondStepBtn" backgroundColor="#273840" @click='secondStepPrev' label="上一步" />
                        <mu-raised-button class="firstStepBtn" backgroundColor="#00a2de" @click='secondStepNext' label="确认更改" />
                    </div>
                </div>
            </div>
    
            <div class="page page4">
                <div class="contain">
                    <div class="content">
                        <h1 class='thirdStepTitle'>第三步 &nbsp;&nbsp;&nbsp; 更改密码成功</h1>
                        <p class='thirdDescOne'>
                            您已经成功修改密码
                        </p>
    
                        <mu-raised-button class="thirdStepBtn" backgroundColor="#00a2de" @click='thirdStepNext' label="回到登录页" />
                    </div>
                </div>
            </div>
        </div>
        <!--<button id='btn'> 点我向下滚动 </button>-->
        <!--<button id='btnUp'> 点我向上滚动 </button>-->
    </div>
</template>


<script>
import { FullPage } from '../../plugins/fullPage.min'
import axios from 'axios'

export default {
  props: {},
  components: {},
  data () {
    return {
      runPage: '',
      //  注册的第一步
      prevUserName: '',
      mailBox: '',
      userNameError: '',
      mailBoxError: '',
      SendIng: false,
      bgc: '#00a2de',
      mailLabel: '发送邮件',
      // 注册的第二步
      mailCheckNum: '',
      mailCheckNumError: '',
      newPas: '',
      newPasError: '',
      confirmNewPas: '',
      confirmNewPasError: ''
    }
  },
  created () {

  },
  mounted () {
    var runPage
    runPage = new FullPage({
      id: 'pageContain',
      slideTime: 800,
      effect: {
        transform: {
          translate: 'X'
        },
        opacity: [0, 1]
      },
      mode: '',
      easing: 'ease',
      callback: function (index, thisPage) {
        console.log('滚动到了第 ' + (index + 1) + ' 屏')
      }
    })
    // 在这里 挂载到this上面
    this.runPage = runPage
  },
  computed: {},
  methods: {
    validateInput (str) {
      if (str === 'userName') {
        var userName = this.prevUserName
        // 检测为空
        this.userNameError = ''
        if (userName.trim() === '') {
          this.userNameError = '用户名不能为空'
        }
      } else if (str === 'mailBox') {
        var mailBox = this.mailBox
        var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        this.mailBoxError = ''
        if (mailBox.trim() === '') {
          this.mailBoxError = '邮箱输入不能为空'
        } else if (!reg.test(mailBox)) {
          this.mailBoxError = '请输入正确的邮箱地址'
        }
      } else if (str == 'mailCheckNum') {
        this.mailCheckNumError = ''
        if (this.mailCheckNum.trim() === '') {
          this.mailCheckNumError = '验证码不能为空'
        }
      } else if (str == 'newPas') {
        this.newPasError = ''
        if (this.newPas.trim() === '') {
          this.newPasError = '新密码不能为空'
        }
      } else if (str == 'confirmNewPas') {
        this.confirmNewPasError = ''
        if (this.confirmNewPas.trim() === '') {
          this.confirmNewPasError = '确认密码不能为空'
        }
      }
    },
    beginRegister () {
      //  1 首先在这里调用接口
      //  2 使屏幕滚动
      this.runPage.next()
    },
    firstStepNext () {
      // 验证是否为空
      if (!this.prevUserName || !this.mailBox) {
        this.$SwalModal.MaModal('请正确输入', 'warning')
        return
      }
      //  验证是否报错
      if (this.userNameError && this.mailBoxError) {
        return
      }
      this.SendIng = true
      this.bgc = 'gray'
      axios({
        url: '/proxy/fullStack/SendEmail',
        method: 'post',
        data: {
          userName: this.prevUserName,
          mailBox: this.mailBox
        }
      })
        .then((res) => {
          if (res.data.code === 0) {
            //  将用户输入的用户名和邮箱 发送给后台

            this.$SwalModal.MaModal('邮件已经发送成功，请注意查收')
            var time = 60
            var timer = setInterval(() => {
              time--
              this.mailLabel = `${time}秒后重新发送`
              if (time === 0) {
                this.SendIng = false
                clearInterval(timer)
                this.mailLabel = '重新发送'
                this.bgc = '#00a2de'
              }
            }, 1000)
            this.runPage.next()
          } else {
            this.SendIng = false
            this.bgc = '#00a2de'
            this.$SwalModal.MaModal('邮件发送失败', 'error')
          }
        })
    },
    secondStepPrev () {
      this.runPage.prev()
    },
    secondStepNext () {
      //
      if (this.newPas.trim() != this.confirmNewPas.trim()) {
        this.$Notice.error({
          title: '通知',
          desc: '两次密码输入不一致，请检查',
          duration: 1
        })
        return
      }
      axios({
        url: '/proxy/fullStack/changePas',
        method: 'post',
        data: {
          userName: this.prevUserName.trim(),
          mailCheckNum: this.mailCheckNum.trim(),
          newPas: this.newPas.trim()
        }
      })
        .then((res) => {
          if (res.data.code === 0) {
            this.runPage.next()
          } else {
            this.$SwalModal.MaModal('邮件发送失败', 'error')
          }
        })
    },
    thirdStepNext () {
      // 回到登录页
      this.$router.push({
        name: 'login',
        path: '/login'
      })
    }
  }
}
</script>

<style scoped>
@import "forgetPassWord.css";
</style>
