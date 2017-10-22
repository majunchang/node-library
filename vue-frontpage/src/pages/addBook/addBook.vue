<template>
  <div class="page-content">
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
            <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="出版社" prop="publishHouse">
        <Input v-model="formValidate.publishHouse" placeholder="请输入出版社名称"></Input>
      </FormItem>
      <FormItem label="定价" prop="priceNum">
        <Input v-model="formValidate.priceNum" placeholder="请输入书籍定价"></Input>
      </FormItem>
      <FormItem label="书籍类别" prop="category">
        <Select v-model="formValidate.category" placeholder="请选择书籍所在类别">
          <Option value="beijing">北京市</Option>
          <Option value="shanghai">上海市</Option>
          <Option value="shenzhen">深圳市</Option>
        </Select>
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
  export default {
    data() {
      return {
        formValidate: {
          bookName: '',
          authorName: '',
          publishHouse: '',
          date: '',
          priceNum: 0,
          category: '',
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
            {required: true, message: '书籍单价不能为空', trigger: 'blur'},
            {type: 'number', message: '输入格式不正确', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择书籍类别', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入书籍介绍', trigger: 'blur'},
            {type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur'}
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
      postAddBook() {
        axios({
          method: 'post',
          url: '/proxy/fullStack/addBook',
          data: this.formValidate
        })
          .then(function (res) {
            this.$Message.success('提交成功!');
            console.log('majunchang');
            console.log(res);
          });
      }
    }
  }
</script>

<style scoped>
  @import "addBook.css";
</style>
