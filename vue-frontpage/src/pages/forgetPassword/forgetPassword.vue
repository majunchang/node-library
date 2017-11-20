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
              <mu-raised-button class="beginRegister" @click='beginRegister' backgroundColor="#00a2de" label="开始找回"/>
            </div>
          </div>
        </div>
      </div>

      <div class="page page2">
        <div class="contain">
          <div class="content">
            <h1 class='firstStepTitle'>第一步 &nbsp;&nbsp;&nbsp; 输入您的用户名</h1>
            <mu-text-field
              hintTextClass='firstStepHint'
              inputClass='firstStepInput'
              hintText="请输入您原先的用户名"
              v-model='prevUserName'
              @blur='validateInput("userName")'
              :errorText='userNameError'/>
            <br/>
            <mu-text-field
              hintTextClass='firstStepHint'
              inputClass='firstStepInput'
              hintText="请输入您的邮箱"
              v-model='mailBox'
              @blur='validateInput("mailBox")'
              :errorText='mailBoxError'/>
            <br/>
            <mu-raised-button class="firstStepBtn" backgroundColor="#00a2de"
                              @click='firstStepNext' label="下一步"/>
          </div>
        </div>
      </div>

      <div class="page page3">
        <div class="contain">
          <div class="content">
            <h1 class='secondStepTitle'>第二步 &nbsp;&nbsp;&nbsp; 设置邮箱和新密码</h1>
            <p class='boxModel'>
              盒子型号：<span class='boxMS'>XXXX</span>
              小团队版: <span>V1.0.0</span>
            </p>
            <p class='boxDesc'>
              超级管理员是本系统中权限最大的管理员，能够进入盒子后台对盒子的软件升级,使用情况，用户以及访问控制，网络配置进行操作。请您牢记您的超级管理员账号。超级管理员账号和盒子绑定。每个盒子仅有唯一的超级管理员。
            </p>
            <mu-text-field
              hintTextClass='secondStepHint'
              inputClass='secondStepInput'
              hintText="请输入邮箱的验证码"/>
            <br/>
            <mu-text-field
              hintTextClass='secondStepHint'
              inputClass='secondStepInput'
              hintText="请输入新密码"/>
            <br/>
            <mu-text-field
              hintTextClass='secondStepHint'
              inputClass='secondStepInput'
              hintText="请确认新密码"/>
            <br/>
            <mu-raised-button class="firstStepBtn secondStepBtn" backgroundColor="#273840"
                              @click='secondStepPrev' label="上一步"/>
            <mu-raised-button class="firstStepBtn" backgroundColor="#00a2de"
                              @click='secondStepNext' label="确认更改"/>
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

            <mu-raised-button class="thirdStepBtn" backgroundColor="#00a2de"
                              @click='thirdStepNext' label="回到登录页"/>
          </div>
        </div>
      </div>

      <!--<div class="page page5">-->
      <!--<div class="contain">-->
      <!--<p class="txt">第五屏</p>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <!--<button id='btn'> 点我向下滚动 </button>-->
    <!--<button id='btnUp'> 点我向上滚动 </button>-->
  </div>
</template>


<script>
  import {FullPage} from '../../plugins/fullPage.min'
  import axios from 'axios'


  export default {
    props: {},
    components: {},
    data() {
      return {
        runPage: '',
        //  注册的第一步
        prevUserName: '',
        mailBox: '',
        userNameError: '',
        mailBoxError: '',

      }
    },
    created() {

    },
    mounted() {
      var runPage;
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
          console.log('滚动到了第 ' + (index + 1) + ' 屏');
        }
      });
      // 在这里 挂载到this上面
      this.runPage = runPage

    },
    computed: {},
    methods: {
      validateInput(str) {

        if (str === 'userName') {
          var userName = this.prevUserName;
          // 检测为空
          this.userNameError = '';
          if (userName.trim() === '') {
            this.userNameError = '用户名不能为空';
            return
          }
        } else if (str === 'mailBox') {
          var mailBox = this.mailBox;
          var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
          this.mailBoxError = '';
          if (mailBox.trim() === '') {
            this.mailBoxError = '邮箱输入不能为空';
          } else if (!reg.test(mailBox)) {
            this.mailBoxError = '请输入正确的邮箱地址';
          }
          return
        }
      },
      beginRegister() {
        //  1 首先在这里调用接口
        //  2 使屏幕滚动
        this.runPage.next();
      },
      firstStepNext() {

        if (this.userNameError && this.mailBoxError) {
          return
        }
        //  将用户输入的用户名和邮箱 发送给后台
        axios({
          url: '/proxy/fullStack/SendEmail',
          method: 'post',
          data: {
            userName: this.prevUserName,
            mailBox: this.mailBox
          },
        })
          .then((res) => {
            console.log(res);
          })
        this.runPage.next();
      },
      secondStepPrev() {
        this.runPage.prev();
      },
      secondStepNext() {
        this.runPage.next();
      },
      thirdStepNext() {
        this.runPage.next();
      }
    }
  }
</script>

<style scoped>
  @import "forgetPassWord.css";
</style>
