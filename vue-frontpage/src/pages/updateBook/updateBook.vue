<template>
  <div class="page-content">
    <h1>更新书籍</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="书籍名称" prop="bookName">
        <Input v-model="formValidate.bookName" placeholder="请输入修改后书籍名称"></Input>
      </FormItem>
      <FormItem label="作者名称" prop="authorName">
        <Input v-model="formValidate.authorName" placeholder="请输入修改后作者名称"></Input>
      </FormItem>
      <FormItem label="出版日期">
        <Row>
          <Col span="11">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="选择修改后日期" v-model="formValidate.date"
                        @on-change='showTime'></DatePicker>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="出版社" prop="publishHouse">
        <Input v-model="formValidate.publishHouse" placeholder="请输入修改后出版社名称"></Input>
      </FormItem>
      <FormItem label="定价" prop="priceNum">
        <Input v-model.number="formValidate.priceNum" placeholder="请输入修改后书籍定价"></Input>
      </FormItem>
      <FormItem label="书籍类别" prop="category">
        <Select v-model="formValidate.category" placeholder="请选择修改后书籍所在类别">
          <Option value="中国文学">中国文学</Option>
          <Option value="数理化学">数理化学</Option>
          <Option value="政治法律">政治法律</Option>
          <Option value="经典著作">经典著作</Option>
          <Option value="医药卫生">医药卫生</Option>
          <Option value="计算机技术">计算机技术</Option>
          <Option value="财经管理">财经管理</Option>
        </Select>
      </FormItem>
      <FormItem label="数量" prop="bookCount">
        <Input v-model.number="formValidate.bookCount" placeholder="请输入修改后书籍定价"></Input>
      </FormItem>
      <FormItem label="介绍" prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>

</template>
<script>
  import axios from 'axios';
  import swal from 'sweetalert2'

  export default {
    data() {
      return {
        formValidate: {
          bookName: '',
          authorName: '',
          publishHouse: '',
          date: '',
          priceNum: "0",
          category: '',
          bookCount: 0,
          desc: ''
        },
        ruleValidate: {
          bookName: [
            {required: true, message: '书籍名称不能为空', trigger: 'blur'}
          ],
          authorName: [
            {required: true, message: '作者名称不能为空', trigger: 'blur'}
          ],
          publishHouse: [
            {required: true, message: '出版社名称不能为空', trigger: 'blur'}
          ],
          date: [
            {required: true, type: 'date', message: '请选择书籍出版日期', trigger: 'change'}
          ],
          priceNum: [
            {required: true, message: '书籍单价不能为空', trigger: 'blur', type: "number", message: '输入格式不正确'},
          ],
          bookCount: [
            {required: true, message: '书籍添加数量不能为空', trigger: 'blur', type: "number", message: '输入格式不正确'},
          ],
          category: [
            {required: true, message: '请选择书籍类别', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入书籍介绍', trigger: 'blur'},
            {type: 'string', min: 2, message: '介绍不能少于20字', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.initForm()
    },
    methods: {
      initForm() {
        var obj = {
          bookId: this.$route.params.id
        }
        var _this = this;
        axios({
          method: 'get',
          url: '/proxy/fullStack/updateBook',
          params: obj
        })
          .then(function (res) {
            if (res.data.code === 0) {
              _this.formValidate = res.data.result
            }
          });
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 在这里将所有信息 传递给后台
            this.postUpdateBook();
          } else {
            this.$Message.error('输入存在错误，无法进行提交');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      showTime() {
        console.log(this.formValidate);
      },
      postUpdateBook() {

        var _this = this;
        axios({
          method: 'post',
          url: '/proxy/fullStack/updateBook',
          data: {
            FormData: this.formValidate,
            bookId: this.$route.params.id
          }
        })
          .then(function (res) {
            if (res.data.code === 0) {
              _this.$SwalModal.MaModal('更新书籍成功')
              // 跳转回到藏书总览页
              _this.$router.push({
                path:'/libraryOverView',
                name:'libraryOverView'
              })
              _this.handleReset('formValidate');
            }
            else {
              _this.$Notice.error({
                title: '更新书籍通知',
                desc: res.data.message,
                duration: 1000
              })
            }
          });
      }
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
