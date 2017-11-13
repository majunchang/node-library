<template>
  <div class="page-content">
    <h1>添加新书籍</h1>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="书籍名称" prop="bookName">
        <Input v-model="formValidate.bookName" placeholder="请输入书籍名称"></Input>
      </FormItem>
      <FormItem label="作者名称" prop="authorName">
        <Input v-model="formValidate.authorName" placeholder="请输入作者名称"></Input>
      </FormItem>
      <FormItem label="出版日期">
        <Row>
          <Col span="11">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date" @on-change='showTime'></DatePicker>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="出版社" prop="publishHouse">
      <Input v-model="formValidate.publishHouse" placeholder="请输入出版社名称"></Input>
      </FormItem>
      <FormItem label="定价" prop="priceNum">
      <Input v-model.number="formValidate.priceNum" placeholder="请输入书籍定价"></Input>
      </FormItem>
      <FormItem label="书籍类别" prop="category">
      <Select v-model="formValidate.category" placeholder="请选择书籍所在类别">
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
      <Input v-model.number="formValidate.bookCount" placeholder="请输入书籍定价"></Input>
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
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // 在这里将所有信息 传递给后台
            this.postAddBook();
          } else {
            this.$Message.error('输入存在错误，无法进行提交');
          }
        })
      },
      handleReset(name) {

        this.$refs[name].resetFields();
      },
      showTime() {

      },
      postAddBook() {
        var _this = this;
        axios({
          method: 'post',
          url: '/proxy/fullStack/addBook',
          data: {FormData: this.formValidate}
        })
          .then(function (res) {
            if(res.data.code===0){
              _this.$Notice.success({
                title: '添加书籍通知',
                desc: '添加书籍成功',
                duration: 1
              });
              _this.handleReset('formValidate');
            }
            else {
              _this.$Notice.error({
                title: '添加书籍通知',
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
  @import "addBook.css";
</style>
