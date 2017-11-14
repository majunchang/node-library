<template>
  <div class="page-content">
    <h1>借书</h1>
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <FormItem label="书籍名称">
        <Input v-model="formValidate.bookName" disabled placeholder="请输入修改后书籍名称"></Input>
      </FormItem>
      <FormItem label="借阅人姓名">
        <Input v-model="formValidate.userName" disabled></Input>
      </FormItem>
      <FormItem label="定价">
        <Input v-model.number="formValidate.priceNum" disabled placeholder="请输入修改后书籍定价"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="postBorrowBook">确定借书</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消借书</Button>
      </FormItem>
    </Form>
  </div>

</template>
<script>
  import axios from 'axios';
  import swal from 'sweetalert2'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        formValidate: {
          bookName: '',
          priceNum: "0",
          userName: this.user
        },
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    mounted() {
      this.initForm()
    },
    methods: {
      initForm() {
        var obj = {
          bookId: this.$route.params.id
        }
        axios({
          method: 'get',
          url: '/proxy/fullStack/borrowBook',
          params: obj
        })
          .then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              this.formValidate = res.data.result
              this.user === '' ? this.formValidate.userName = window.localStorage.getItem('user') : this.formValidate.userName = this.user;
            }
          });
      },
      handleSubmit(name) {
        console.log(this);
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$router.push({
          path: '/libraryOverView',
          name: 'libraryOverView'
        })
      },
      showTime() {
        console.log(this.formValidate);
      },
      postBorrowBook() {
        var now = new Date();
        var now1 = new Date();
        // 在Date 上边挂载一个原型函数
        Date.prototype.format = function (fmt) {
          var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
          };
          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
          }
          return fmt;
        }
        var startTime = this.handleDate('d ', 0, now);
        var cutoffTime = this.handleDate('m ', 2, now1);
//        console.log(startTime);
//        console.log(cutoffTime);
        var renew = 1;
        this.formValidate.startTime = startTime;
        this.formValidate.cutoffTime = cutoffTime;
        this.formValidate.renew = renew;
        this.formValidate.bookId = this.$route.params.id;
        //  想后台发送请求
        axios({
          method: 'post',
          url: '/proxy/fullStack/borrowBook',
          data: {
            FormData: this.formValidate,
            bookId: this.$route.params.id
          }
        })
          .then((res) => {
            if (res.data.code == 0) {
              this.$SwalModal.MaModal('借书成功')
              this.$router.push({
                path: '/libraryOverView',
                name: 'libraryOverView'
              })
            } else {
              this.$SwalModal.MaModal('借书失败')
            }
          })

//        axios({
//          methos: 'post',
//          url: '/proxy/fullstack/borrowBook',
//          data: {
//            FormData: this.formValidate,
//            bookId: this.$route.params.id
//          }
//        })
//          .then((res) => {
//            console.log(res);
//          })
      },
      handleDate(interval, number, date) {
        switch (interval) {
          case   "y "   : {
            date.setFullYear(date.getFullYear() + number);
            return date;
            break;
          }
          case   "q "   : {
            date.setMonth(date.getMonth() + number * 3);
            return date;
            break;
          }
          case   "m "   : {
            date.setMonth(date.getMonth() + number);
            return date;
            break;
          }
          case   "w "   : {
            date.setDate(date.getDate() + number * 7);
            return date;
            break;
          }
          case   "d "   : {
            date.setDate(date.getDate() + number);
            return date;
            break;
          }
          case   "h "   : {
            date.setHours(date.getHours() + number);
            return date;
            break;
          }
          case   "m "   : {
            date.setMinutes(date.getMinutes() + number);
            return date;
            break;
          }
          case   "s "   : {
            date.setSeconds(date.getSeconds() + number);
            return date;
            break;
          }
          default   : {
            date.setDate(date.getDate() + number);
            return date;
            break;
          }
        }
      },
    }
  }
</script>

<style scoped>
  form.ivu-form.ivu-form-label-right {
    width: 40%;
    margin: 0 auto;
  }

  .ivu-notice {
    top: 95px !important;
    right: 0px;
  }
</style>
